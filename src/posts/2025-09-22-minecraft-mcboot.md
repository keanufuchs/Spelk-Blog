---
title: "Minecraft Server on Demand with Limbo and Velocity Proxy"
date: 2025-09-27
layout: post.njk
---

Minecraft servers need a lot of performance, especially with multiple players, plugins, and large worlds. However, an enterprise blade server running 24/7 consumes significant power. So I devised a solution to optimize resource usage while ensuring a seamless experience for players.

**My Hardware Setup**

I'm running a hybrid approach with two different machines: an **Intel NUC** that stays online 24/7 for its energy efficiency, paired with a powerful **Supermicro 1HE Blade** that only spins up when needed for high-performance gaming.

> **The Challenge:** Players expect servers to be always available, but running enterprise hardware continuously consumes significant power and increases costs.

**The Solution:** Using a **Limbo server** as an always-online lobby on the efficient NUC, while the blade server automatically starts when players join and gracefully shuts down during idle periods. This creates a seamless player experience while optimizing power consumption.

---

## Limbo Server (Fallback Server)

A **Limbo server** is a fallback server.  
It doesn’t host a real world, but simply parks players until the main server is ready.

- Players see no "Server offline" message
    
- Minimal environment for waiting
    
- Saves energy without losing gameplay comfort
    

---

## Orchestrating with Velocity Proxy

**Velocity** serves as the intelligent traffic director in this setup. When players connect, they're actually connecting to the proxy, which then seamlessly routes them to the appropriate server based on availability. This architecture ensures that player identities (UUIDs and skins) remain intact through modern forwarding protocols.
    

### Configuring Paper Servers for Proxy Integration

Both Paper servers need specific configuration to work harmoniously with the Velocity proxy. The key insight here is that authentication moves from the individual servers to the proxy level, creating a centralized security model.

**Server Properties Configuration**
First, we disable online mode on each Paper server since the proxy handles authentication:

```properties
# server.properties
online-mode=false
```

**Velocity Integration Setup**
Next, we enable Velocity support in the Paper configuration, establishing a secure communication channel:

```yaml
# config/paper-global.yml
proxies:
  velocity:
    enabled: true
    online-mode: true
    secret: "my-secret"
```

The secret key ensures secure communication between proxy and servers - you'll find this generated automatically in your Velocity proxy folder as `forwarding.secret`.

---

### Velocity Proxy Configuration

The Velocity configuration defines our server topology and connection logic. Here's how we set up the intelligent routing:

```ini
# velocity.toml
player-info-forwarding-mode = "modern"

[servers]
limbo = "127.0.0.1:30066"    # Local NUC lobby server
main = "192.168.10.9:25565"  # Remote blade main server

try = ["limbo", "main"]
```

This configuration creates a fallback hierarchy where players initially connect to the local `limbo` server, then get automatically transferred to the `main` server once it becomes available. The modern forwarding mode ensures player data integrity throughout the process.
    

---

## Automating Player Transfers with VelocityLimboHandler

Automatically move players from Limbo to the main server when it’s online:

1. Place [VelocityLimboHandler](https://hangar.papermc.io/AkselGlyholt/VelocityLimboHandler) in `/plugins` of the Velocity proxy
    
2. On first start, it generates configuration files
    

`plugins/velocity-limbo-handler/config.yml`:

With a 1-second check interval, players experience minimal delay when transitioning from lobby to the main game world.

---

## The Brain: Python Automation Script

The heart of this system is a Python script that continuously monitors player activity and manages the blade server's power state. It uses the [mcstatus library](https://github.com/Dinnerbone/mcstatus) to check player counts on the proxy, sends IPMI commands for hardware power control, and gracefully shuts down the Minecraft server via RCON before cutting power.

### Prerequisites and Dependencies

Before diving into the script, ensure you have the necessary tools installed. The setup should run on Python 3.12+ (I recommend using [pyenv](https://github.com/pyenv/pyenv) for version management), the mcstatus library for Minecraft server communication, and mcrcon for remote console access:

```bash
# Install Python dependencies
pip install mcstatus

# Build and install mcrcon
git clone https://github.com/Tiiffi/mcrcon.git
cd mcrcon && make && sudo make install

# Install screen for detached sessions
sudo apt install screen
```
    

### Python Script Placeholder

```python
#!/usr/bin/env python3
"""
Minecraft Auto-Power Controller

- Checks player count on the Velocity proxy (192.168.10.10)
- Starts the Blade Minecraft server (192.168.10.9) via IPMI
- Waits until the Blade server is online
- Shuts down the Blade safely: Minecraft stop via RCON + Blade off via IPMI
"""

from mcstatus import JavaServer
import subprocess
import time
import os
import logging
from typing import Optional

# --- Configuration ---
MC_PROXY_HOST   = os.getenv("MC_PROXY_HOST", "192.168.10.10")
MC_PROXY_PORT   = int(os.getenv("MC_PROXY_PORT", "25565"))

MC_BACKEND_HOST = os.getenv("MC_BACKEND_HOST", "192.168.10.9")
MC_BACKEND_PORT = int(os.getenv("MC_BACKEND_PORT", "25565"))

BMC_HOST = os.getenv("BMC_HOST", "192.168.10.8")
BMC_USER = os.getenv("BMC_USER", "ADMIN")
BMC_PASS = os.getenv("BMC_PASS", "ADMIN")

# RCON for graceful shutdown
USE_RCON = True
RCON_HOST = os.getenv("RCON_HOST", MC_BACKEND_HOST)
RCON_PORT = int(os.getenv("RCON_PORT", "25575"))
RCON_PASS = os.getenv("RCON_PASS", "Magenta!123")

# Timings
CHECK_INTERVAL = int(os.getenv("CHECK_INTERVAL", "3"))    # seconds between checks
GRACE_PERIOD = int(os.getenv("GRACE_PERIOD", "15"))      # seconds idle before shutdown
POWER_ON_WAIT = int(os.getenv("POWER_ON_WAIT", "180"))   # timeout for Blade after IPMI power on
IPMI_CMD_TIMEOUT = int(os.getenv("IPMI_CMD_TIMEOUT", "15"))

# Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s: %(message)s")
log = logging.getLogger("mc-power")

# --- mcstatus objects ---
proxy_server = JavaServer(MC_PROXY_HOST, MC_PROXY_PORT)
backend_server = JavaServer(MC_BACKEND_HOST, MC_BACKEND_PORT)

# --- Helper functions ---
def run_cmd(cmd: list[str], timeout: int = IPMI_CMD_TIMEOUT) -> subprocess.CompletedProcess:
    try:
        return subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
    except subprocess.TimeoutExpired as e:
        log.warning("Command timeout: %s", " ".join(cmd))
        raise

def ipmi_base() -> list[str]:
    return ["ipmitool", "-I", "lanplus", "-H", BMC_HOST, "-U", BMC_USER, "-P", BMC_PASS, "chassis", "power"]

def is_chassis_on() -> bool:
    cmd = ipmi_base() + ["status"]
    res = run_cmd(cmd)
    out = (res.stdout or "").strip()
    return "on" in out.lower()

def ipmi_power_on() -> bool:
    res = run_cmd(ipmi_base() + ["on"])
    if res.returncode == 0:
        log.info("IPMI power on successful")
        return True
    else:
        log.error("IPMI power on failed: %s", res.stderr.strip())
        return False

def ipmi_power_off() -> bool:
    res = run_cmd(ipmi_base() + ["off"])
    if res.returncode == 0:
        log.info("IPMI power off successful")
        return True
    else:
        log.error("IPMI power off failed: %s", res.stderr.strip())
        return False

def player_online() -> bool:
    """Checks if there are players online on the proxy"""
    try:
        q = proxy_server.query()
        return q.players.online > 0
    except Exception:
        try:
            s = proxy_server.status()
            return getattr(s.players, "online", 0) > 0
        except Exception:
            return False

def wait_for_backend_online(timeout: int = POWER_ON_WAIT) -> bool:
    """Waits until the Blade Minecraft server is online"""
    start = time.time()
    while time.time() - start < timeout:
        try:
            backend_server.status()
            log.info("Backend (Blade) is responding to ping.")
            return True
        except Exception:
            time.sleep(3)
    log.warning("Backend not reachable after %d seconds", timeout)
    return False

def graceful_shutdown_via_rcon() -> bool:
    """Graceful shutdown via mcrcon CLI"""
    if not USE_RCON or not RCON_PASS:
        log.info("RCON disabled or password missing")
        return False

    base_cmd = [
        "mcrcon",
        "-H", RCON_HOST,
        "-P", str(RCON_PORT),
        "-p", RCON_PASS,
        "-s",    # Silent mode, no output
    ]

    try:
        # save-all
        subprocess.run(base_cmd + ["save-all"], check=True)
        log.info("save-all executed successfully")

        # stop
        subprocess.run(base_cmd + ["stop"], check=True)
        log.info("stop command sent successfully")

        return True

    except subprocess.CalledProcessError as e:
        log.error("RCON CLI shutdown failed: %s", e)
        return False

def shutdown_backend():
    """RCON stop and then Blade via IPMI off"""
    rcon_success = graceful_shutdown_via_rcon()
    
    if rcon_success:
        # Wait until Minecraft on Blade is offline
        log.info("Waiting for Minecraft server to stop...")
        start = time.time()
        while True:
            try:
                backend_server.status()
                time.sleep(3)
            except Exception:
                log.info("Backend Minecraft server is now offline.")
                break
            if time.time() - start > 15:  # timeout 15 seconds
                log.warning("Timeout waiting for Minecraft stop, powering off via IPMI.")
                break

    # Power off the Blade
    if is_chassis_on():
        ipmi_power_off()

# --- Main loop ---
def main_loop():
    idle_start: Optional[float] = None
    while True:
        players = player_online()
        chassis_on = is_chassis_on()

        if players:
            idle_start = None
            if chassis_on:
                log.debug("Players online, server already on")
            else:
                log.info("Players online, starting Blade")
                if ipmi_power_on():
                    wait_for_backend_online()
        else:
            if not chassis_on:
                idle_start = None
                log.debug("No players online, server already off")
            else:
                if idle_start is None:
                    idle_start = time.time()
                    log.info("No players online, starting grace period")
                elif time.time() - idle_start >= GRACE_PERIOD:
                    log.info("Grace period exceeded, initiating full shutdown")
                    shutdown_backend()
                    idle_start = None

        time.sleep(CHECK_INTERVAL)

if __name__ == "__main__":
    try:
        main_loop()
    except KeyboardInterrupt:
        log.info("Script terminated by user")
```

---

## Production Deployment with Systemd

For a robust production setup, all components should run as systemd services. This approach provides automatic startup on boot, proper logging, graceful shutdown handling, and easy monitoring of all system components.

### Python Script Service

Create a systemd service file for the automation script at `/etc/systemd/system/mcboot.service`:

```ini
[Unit]
Description=MCBoot Auto-Start Script
After=network.target

[Service]
User=keanufuchs
WorkingDirectory=/home/keanufuchs/mcboot
ExecStart=/home/keanufuchs/.pyenv/versions/mcboot/bin/python3 /home/keanufuchs/mcboot/main.py
Restart=always
RestartSec=5
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable mcboot.service
sudo systemctl start mcboot.service
```

### Minecraft Main Server (Blade)

Create the main server service at `/etc/systemd/system/minecraft.service`:

```ini
[Unit]
Description=Minecraft Server
After=network.target

[Service]
User=keanufuchs
WorkingDirectory=/home/keanufuchs/minecraft/main
ExecStart=/usr/bin/screen -DmS main /home/keanufuchs/minecraft/main/start.sh
ExecStop=/usr/bin/screen -S main -X quit
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable minecraft.service
sudo systemctl start minecraft.service
```

> I would highly recommend to also run the Limbo server and the Velocity proxy as systemd services as well to ensure they are always available.

---

## The Result: Smart Resource Management

This architecture creates an elegant solution to the performance vs. efficiency dilemma. Players experience seamless connectivity through the proxy-to-limbo-to-main server flow, while the system intelligently manages power consumption by starting the blade server on-demand and shutting it down during idle periods.

The beauty of this approach lies in its scalability and adaptability. Whether you're running a NUC with a blade server, a Raspberry Pi with a gaming PC, or any other combination of efficient lobby hardware paired with high-performance gaming hardware, the same principles apply.

**Key Benefits Achieved:**

**Seamless Player Experience** - No server offline messages or connection issues  
**Smart Power Management** - Hardware only consumes power when actively needed  
**Graceful Operations** - Proper server shutdowns protect world data  
**Cost Effective** - Significant reduction in electricity costs without performance compromise

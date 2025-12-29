---
title: "Cisco Catalyst Software Update Checklist"
date: 2025-11-21
layout: post.njk

---

Before performing a software update on network devices, thorough and structured preparation is worthwhile. This checklist guides you through all relevant checks – from verifying the operating mode to stack integrity and image validation. The goal is to minimize risks and make an update as predictable and trouble-free as possible.

---

## **1. Check Operating Mode & Version (Install/Bundle + Reboot History)**

To check the currently running version, boot behavior, and uptime, execute the following commands:

```bash
show version
show boot
```

From the output, you can determine whether the system is running in **Install Mode (packages.conf)** or **Bundle Mode (.bin file)**. Additionally, crash information, reload reason, and reboot history should be reviewed.

---

## **2. Backup Configuration**

First, save the running configuration and compare it with the startup configuration:

```bash
write
show startup-config
```

Optionally, an external backup via TFTP, FTP, or SCP is recommended.

---

## **3. Check Stack Status & Order (including Cabling)**

To verify stack members, their roles, and logical order, use:

```bash
show switch
```

The logical connection of stack ports is checked via:

```bash
show switch stack-ports
```

If necessary, a member's priority can be reset:

```bash
switch <member> priority <value>
```

Finally, the physical cabling should be manually verified.

---

## **4. Check System Health**

A look at the logs reveals potential warnings or errors:

```bash
show logging
```

Temperature values, fans, and power supplies are checked with:

```bash
show environment all
```

To verify flash consistency, use:

```bash
verify filesystem flash:
```

---

## **5. Check Storage Space & Image Integrity (Hash)**

Available storage space is displayed by:

```bash
dir flash:
```

To validate image files, hash values should be verified:

```bash
verify /md5 flash:<filename>.bin
verify /sha512 flash:<filename>.bin
```

---

## **6. Check Boot Variables**

Current boot entries are displayed via:

```bash
show boot
```

If necessary, they can be cleared and reset:

```bash
no boot system
boot system flash:<image>.bin
```

---

## **7. Check Startup Config**

To verify whether the startup configuration is being ignored, use the following command:

```bash
show romvar
```

It should be verified that `SWITCH_IGNORE_STARTUP_CFG=0`.

Additionally, the configuration register is checked:

```bash
show version
```

The configuration register should be `0x102`. If it differs (e.g., `0x2142` would ignore the startup config), this must be corrected.

---

## **8. Stack Auto-Upgrade / Image Distribution (optional)**

The status of automatic image distribution is checked with:

```bash
show auto-upgrade
```

If a stack member uses a different image, auto-upgrade can be enabled:

```bash
software auto-upgrade enable
```

---

## **9. Check Install-Mode Consistency**

To ensure all packages are correctly installed and rollback points exist, use the following command:

```bash
show install summary
```

---

## **10. Optional: Check USB & Spare Members**

To check a connected USB medium:

```bash
dir usbflash0:
```

For reserve or inactive stack members, for example in case of version conflicts:

```bash
show switch
```

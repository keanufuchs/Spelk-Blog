---
title: "Getting Started with Linux System Administration"
date: 2025-09-21
layout: post.njk
---

Welcome to my tech blog! 🚀

This is my first post where I'll be sharing insights about Linux system administration, network engineering with Cisco equipment, and various DevOps practices I encounter in real-world scenarios.

## What You'll Find Here

On this blog, I'll cover a variety of technical topics:

- **Linux System Administration** - Server management, shell scripting, and automation
- **Cisco Networking** - Routing, switching, CCNA/CCNP guides and troubleshooting
- **DevOps Practices** - CI/CD pipelines, containerization, and infrastructure as code
- **Security** - Best practices for system hardening and network security
- **Troubleshooting** - Real-world problem-solving scenarios

## Essential Linux Commands for Beginners

Let's start with some fundamental Linux commands every sysadmin should know:

```bash
# System information
uname -a              # System information
whoami                # Current user
id                    # User and group IDs

# File operations
ls -la                # List files with details
find /path -name "*.log"  # Find files by name
grep -r "error" /var/log  # Search in files

# Process management
ps aux                # List all processes
top                   # Real-time process viewer
kill -9 PID          # Force kill a process

# Network utilities
netstat -tulnp        # Show network connections
ss -tulnp             # Modern netstat alternative
ping -c 4 google.com  # Test connectivity
```

```python
# Python example: Simple script to monitor disk usage
import os
import shutil
total, used, free = shutil.disk_usage("/")
print("Total: %d GiB" % (total // (2**30)))
print("Used: %d GiB" % (used // (2**30)))
print("Free: %d GiB" % (free // (2**30)))
```


## Test Table
| Command               | Description                     |
|-----------------------|---------------------------------|
| `uname -a`           | Display system information      |
| `ls -la`             | List files with details         |
| `ps aux`             | List all running processes      |  


## A Visual Guide

Here's a network topology diagram showing a typical enterprise setup:

![Network Topology](/assets/images/SCR-20250921-kejr.png)

## Pro Tip

> "The best way to learn system administration is to break things in a safe environment, then figure out how to fix them." - Every experienced sysadmin

Always remember to:
1. **Document everything** - Your future self will thank you
2. **Test in dev first** - Never make changes directly in production
3. **Backup before changes** - Murphy's law is always in effect
4. **Monitor continuously** - Know when something breaks before users do

## What's Next?

In upcoming posts, I'll dive deeper into:

- Setting up a complete Linux homelab
- CCNA study guide and lab exercises  
- Docker containerization for beginners
- Ansible automation playbooks
- Network troubleshooting methodologies

Stay tuned for more technical content, and feel free to reach out with questions or suggestions for future topics!

---

*Follow me on [GitHub](https://github.com/keanu) for code examples and configurations mentioned in these posts.*

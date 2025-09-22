---
title: "BIOS Recovery on a Supermicro X11SSW-F"
date: 2025-09-21
layout: post.njk
---

I recently got my hands on a **Supermicro X11SSW-F motherboard**, which had been sitting around unused after my employer no longer needed it. I decided to put it back into service — but as it turned out, that wasn’t as straightforward as expected.

This post documents my experience with BIOS recovery on this board, in case someone else runs into the same issues.

---

## Initial Situation

When I first powered up the server, it booted fine — but there was **no operating system installed**. That wasn’t surprising; it would have been odd if any disk image was still there.

The bigger problem: **IPMI was not reachable**.

> **IPMI (Intelligent Platform Management Interface)** is a remote management system built into server motherboards. It allows administrators to monitor, control, and even power-cycle a server over the network, independent of the installed OS. Think of it as a server’s remote “lifeline.”

Unfortunately, in my case, **no IPMI traffic showed up in Wireshark**, and the management interface did not respond at all.

So, I went into the BIOS. That’s when I hit the real blocker: **a BIOS password was set.**

---

## The BIOS Image

Supermicro provides BIOS images on their website:

👉 [Supermicro Download Center – X11SSW-F BIOS](https://www.supermicro.com/en/support/resources/downloadcenter/firmware/MBD-X11SSW-F/BIOS)

Downloading was no issue. The package was named:

```
X11SSW-F_3.5_AS4.11_SUM2.14.0.zip
```

Inside were several archives and tools:

* `BIOS_X11SSWF-089B_20250115_3.5_STD.zip`
* `SMT_X11SSWF_411_REDFISH.zip`
* `sum_2.14.0_BSD_x86_64_20240215.tar.gz`
* `sum_2.14.0_Linux_x86_64_20240215.tar.gz`
* `sum_2.14.0_Win_x86_64_20240215.zip`
* `X11SSW-F_Software_Package_Readme.txt`

The actual BIOS binary is hidden inside the first archive:

```
BIOS_X11SSWF-089B_20250115_3.5_STD.zip  
 └── BIOS_X11SSWF-089B_20250115_3.5_STD.bin
```

At first, I wasn’t sure which file was required for recovery, but it turned out that **this `.bin` file is the one**.

> **💡 Note about "binary files":** When people in forums and documentation talk about a "binary file", they usually mean a file with a `.bin` extension.


---

## The Jumper Confusion

Many forum posts and unofficial guides mention the **BIOS recovery jumper (JBR1)**.
The common advice is to move it from pins **1–2** to **2–3** before booting with a recovery file.

👉 In my case, **this step was not necessary**.
The recovery process worked without touching the jumper at all.

That said, it seems to be a widespread recommendation, so it might apply to other Supermicro boards or certain firmware versions.

---

## The Crucial Discovery: File Naming

Most guides mentioned copying a “binary file” to a **FAT32-formatted USB stick**, but none agreed on the correct filename. I saw recommendations like:

* `super.bin`
* `SUPER.BIN`

But the correct answer (confirmed by a forum post from someone who contacted Supermicro support):

```
SUPER.ROM
```

Yes, the name must be **all caps** and exactly that.

---

## The Working Procedure

Here’s what finally worked for me:

1. Format a USB stick as **FAT32**.

2. Extract `BIOS_X11SSWF-089B_20250115_3.5_STD.bin`.

3. Rename it to: `SUPER.ROM`

4. Copy it to the **root directory** of the USB stick.

5. Insert the USB stick into the server.

6. Boot the system (no jumper change needed).

This time, the BIOS recovery kicked in. The update process ran, and after completion:

![BIOS Recovery Mode Flash Update Screen](/assets/images/2025-09-22-bios-recovery-supermicro/flash-update.png)

When the recovery process starts, you'll see a screen like this showing "WARNING! BIOS Recovery Mode has been detected" with options to proceed with the flash update.

* The BIOS password was cleared (reset to defaults).
* IPMI was functional again.
* I could finally configure the server. 🎉

---

## Conclusion

If you’re stuck with a **password-protected BIOS** on a Supermicro X11SSW-F, recovery is possible with the right steps.
The **most critical detail** is renaming the file correctly to **SUPER.ROM** (all caps).

A lot of guides mention setting the **JBR1 jumper to 2–3**, but in my case it was **not required at all**. The recovery worked fine without touching any jumpers.

This small detail cost me hours of trial and error — hopefully, this write-up saves someone else the headache.

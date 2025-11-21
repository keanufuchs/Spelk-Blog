---

title: "Cisco Catalyst Software Update Checkliste"
date: 2025-11-21
layout: post.njk

---

Bevor ein Software-Update auf Netzwerkgeräten durchgeführt wird, lohnt sich eine saubere und strukturierte Vorbereitung. Diese Checkliste führt dich durch alle relevanten Prüfungen – von der Kontrolle des Betriebsmodus über die Stack-Integrität bis hin zur Image-Validierung. Ziel ist, Risiken zu minimieren und ein Update so planbar und störungsfrei wie möglich zu machen.

---

## **1. Betriebsmodus & Version prüfen (Install/Bund­le + Neustart-Historie)**

Zur Kontrolle der aktuell laufenden Version, des Boot-Verhaltens und der Uptime werden folgende Befehle ausgeführt:

```bash
show version
show boot
```

Über die Ausgabe erkennst du, ob das System im **Install Mode (packages.conf)** oder im **Bundle Mode (.bin-File)** läuft. Zusätzlich sollten Crash-Informationen, Reload-Reason und die Neustarthistorie geprüft werden.

---

## **2. Konfiguration sichern**

Zunächst wird die laufende Konfiguration gespeichert und mit der Startkonfiguration abgeglichen:

```bash
write
show startup-config
```

Optional empfiehlt sich ein externes Backup per TFTP, FTP oder SCP.

---

## **3. Stack-Status & Reihenfolge prüfen (inkl. Verkabelung)**

Zur Überprüfung der Stack-Mitglieder, deren Rollen und der logischen Reihenfolge dient:

```bash
show switch
```

Die logische Verbindung der Stack-Ports wird kontrolliert über:

```bash
show switch stack-ports
```

Falls notwendig, kann die Priorität eines Members neu gesetzt werden:

```bash
switch <member> priority <value>
```

Abschließend sollte die physische Verkabelung manuell geprüft werden.

---

## **4. Systemgesundheit prüfen**

Ein Blick in die Logs zeigt potenzielle Warnungen oder Fehler:

```bash
show logging
```

Temperaturwerte, Lüfter und Netzteile werden geprüft mit:

```bash
show environment all
```

Zur Kontrolle der Flash-Konsistenz empfiehlt sich:

```bash
verify filesystem flash:
```

---

## **5. Speicherplatz & Image-Integrität (Hash) prüfen**

Der verfügbare Speicherplatz wird angezeigt durch:

```bash
dir flash:
```

Zur Validierung der Image-Dateien sollten Hashwerte überprüft werden:

```bash
verify /md5 flash:<filename>.bin
verify /sha512 flash:<filename>.bin
```

---

## **6. Boot-Variable prüfen**

Die aktuellen Boot-Einträge werden angezeigt über:

```bash
show boot
```

Falls erforderlich, können sie bereinigt und neu gesetzt werden:

```bash
no boot system
boot system flash:<image>.bin
```

---

## **7. Stack Auto-Upgrade / Image-Verteilung (optional)**

Der Status der automatischen Image-Verteilung wird kontrolliert mit:

```bash
show auto-upgrade
```

Wenn ein Stack-Member ein abweichendes Image nutzt, kann Auto-Upgrade aktiviert werden:

```bash
software auto-upgrade enable
```

---

## **8. Install-Mode Konsistenz prüfen**

Damit alle Pakete korrekt installiert sind und Rollback-Punkte existieren, dient folgender Befehl:

```bash
show install summary
```

---

## **9. Optional: USB & Spare-Member prüfen**

Zum Prüfen eines angeschlossenen USB-Mediums:

```bash
dir usbflash0:
```

Für Reserve- oder inaktive Stack-Mitglieder, etwa bei Versionskonflikten:

```bash
show switch
```

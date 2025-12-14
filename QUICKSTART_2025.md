# Quick Start Guide - CWO 2025 Gallery

## 🚀 Rychlý start

### 1️⃣ Instalace Python závislostí

Dvojklik na: `install_dependencies.bat`

NEBO manuálně:
```bash
pip install Pillow pillow-heif
```

### 2️⃣ Zpracování fotek

**Ujistěte se, že fotky jsou ve složce:**
```
C:\Users\malch\Downloads\CWO 2025_ALL
```

**Spusťte zpracování:**
- Dvojklik na: `run_gallery_processing.bat`
- NEBO: `python process_gallery_2025.py`

### 3️⃣ Spuštění webu

```bash
npm start
```

Galerie bude dostupná na stránce v sekci "Fotogalerie 2025"

---

## 📋 Kontrolní seznam

- [ ] Python závislosti nainstalovány (`pip install Pillow pillow-heif`)
- [ ] Fotky jsou v `C:\Users\malch\Downloads\CWO 2025_ALL`
- [ ] Spuštěn `process_gallery_2025.py`
- [ ] Zkontrolována složka `public/assets/gallery/2025/`
- [ ] Zkontrolovány JSON soubory v `src/components/PhotoGallery2025/`
- [ ] Web spuštěn pomocí `npm start`
- [ ] Galerie funguje v prohlížeči

---

## 🔍 Co skript dělá

1. ✅ Čte EXIF metadata (datum, čas, fotograf)
2. ✅ Rozděluje fotky podle **dne** (sobota/neděle)
3. ✅ Rozděluje fotky podle **fotografa** (z EXIF Artist)
4. ✅ Rozděluje fotky podle **kategorie** (podle času a harmonogramu)
5. ✅ Resize na **fullsize** (max 4MP, nezvětšuje)
6. ✅ Resize na **thumbnail** (max 720px long edge)
7. ✅ Generuje JSON soubory pro každou kombinaci

---

## 📊 Harmonogram (pro referenci)

### Sobota 29.11.2025
- **09:00** - 45, 49, 55, 71 B (F)
- **11:00** - 55, 61, 67, 73 (M)
- **13:30** - 59 (F)
- **16:00** - 64 (F)
- **18:00** - 81 B, 89 B, 96 B (M)

### Neděle 30.11.2025
- **09:00** - 81 A (M)
- **11:30** - 71 A (F)
- **13:30** - 89 A + 96 A (M)
- **16:00** - 76, 81, 87, +87 (F)
- **18:30** - 102, 109, +109 (M)

---

## ❓ Řešení problémů

### Skript nefunguje
```bash
# Zkontrolujte Python verzi
python --version

# Mělo by být Python 3.8+
```

### Fotky nejsou ve správné kategorii
- Zkontrolujte EXIF datum/čas: `exiftool photo.jpg`
- Ujistěte se, že datum je 29.11.2025 nebo 30.11.2025

### Chybí jméno fotografa
- Skript použije EXIF Artist pole
- Pokud chybí, použije prefix z názvu souboru
- Můžete EXIF upravit pomocí: `exiftool -Artist="Jan Novak" *.jpg`

### Web nezobrazuje fotky
1. Zkontrolujte konzoli prohlížeče (F12)
2. Ujistěte se, že JSON soubory jsou načteny
3. Zkontrolujte, že cesty k obrázkům jsou správné

---

## 📁 Struktura výstupu

```
public/assets/gallery/2025/
└── sobota/
    └── Jan_Novak/
        └── 45_49_55_71B_F/
            ├── fullsize/
            │   └── IMG_001.jpg (4MP)
            └── thumbnail/
                └── IMG_001.jpg (720px)

src/components/PhotoGallery2025/
├── photos_sobota_Jan_Novak_45_49_55_71B_F.json
└── manifest.json
```

---

Detailní dokumentace v: [GALLERY_2025_README.md](GALLERY_2025_README.md)

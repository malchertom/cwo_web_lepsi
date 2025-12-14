# CWO 2025 Photo Gallery Processing

## 📋 Přehled

Tento systém zpracovává fotografie z CWO 2025 a organizuje je podle dne, fotografa a kategorie soutěže.

## 🚀 Jak to funguje

### 1. Příprava

**Nainstalujte Python závislosti:**
```bash
pip install Pillow pillow-heif
```

### 2. Spuštění zpracování

Ujistěte se, že máte fotky v: `C:\Users\malch\Downloads\CWO 2025_ALL`

Spusťte skript:
```bash
python process_gallery_2025.py
```

### 3. Co skript dělá

1. **Načítá EXIF metadata** - datum, čas pořízení, jméno fotografa (Artist field)
2. **Třídí podle dne** - sobota 29.11.2025 vs neděle 30.11.2025
3. **Třídí podle fotografa** - extrahuje z EXIF Artist nebo z názvu souboru
4. **Třídí podle kategorie** - podle času pořízení a harmonogramu:
   
   **Sobota 29.11.2025:**
   - 9:00 - 45, 49, 55, 71 B (F)
   - 11:00 - 55, 61, 67, 73 (M)
   - 13:30 - 59 (F)
   - 16:00 - 64 (F)
   - 18:00 - 81 B, 89 B, 96 B (M)
   
   **Neděle 30.11.2025:**
   - 9:00 - 81 A (M)
   - 11:30 - 71 A (F)
   - 13:30 - 89 A + 96 A (M)
   - 16:00 - 76, 81, 87, +87 (F)
   - 18:30 - 102, 109, +109 (M)

5. **Resize obrázků:**
   - **Fullsize**: max 4MP (nezvětšuje pokud je menší)
   - **Thumbnail**: max 720px long edge

6. **Generuje JSON soubory** pro každou kombinaci den/fotograf/kategorie

### 4. Výstupní struktura

```
public/assets/gallery/2025/
├── sobota/
│   ├── Fotograf_1/
│   │   ├── 45_49_55_71B_F/
│   │   │   ├── fullsize/
│   │   │   │   ├── IMG_001.jpg
│   │   │   │   └── ...
│   │   │   └── thumbnail/
│   │   │       ├── IMG_001.jpg
│   │   │       └── ...
│   │   ├── 55_61_67_73_M/
│   │   └── ...
│   └── Fotograf_2/
│       └── ...
└── nedele/
    ├── Fotograf_1/
    └── Fotograf_2/

src/components/PhotoGallery2025/
├── PhotoGallery2025.tsx
├── PhotoGallery2025.css
├── types.ts
├── manifest.json
├── photos_sobota_Fotograf1_45_49_55_71B_F.json
├── photos_sobota_Fotograf1_55_61_67_73_M.json
└── ...
```

## 🎨 Frontend Komponenty

### PhotoGallery2025

Nová React komponenta s:
- **3-level tabs**: Den → Fotograf → Kategorie
- **Dynamické načítání**: JSON soubory se načítají on-demand
- **Konzistentní design**: Využívá existující MasonryGallery komponentu
- **Responsive**: Funguje na všech zařízeních
- **i18n podpora**: České a anglické texty

### Integrace

Komponenta je již integrována v `App.tsx` mezi Categories a starší PhotoGallery (2024).

## 📝 Poznámky

### Identifikace fotografa

Skript hledá jméno fotografa v tomto pořadí:
1. EXIF `Artist` pole
2. EXIF `Copyright` pole
3. Prefix z názvu souboru (např. `MT_001.jpg` → `Fotograf_MT`)

### Kategorizace podle času

Fotka je zařazena do kategorie podle času pořízení:
- Pokud je čas mezi začátkem kategorie a začátkem další kategorie → patří do této kategorie
- Poslední kategorie dne má buffer 3 hodiny
- Pokud je fotka pořízena před začátkem první kategorie → přiřazena k první kategorii

### Formáty obrázků

Podporované formáty:
- JPEG (.jpg, .jpeg)
- PNG (.png)
- HEIC/HEIF (.heic, .heif)

Všechny výstupní obrázky jsou uloženy jako JPEG s kvalitou 85%.

## 🔧 Řešení problémů

### Skript nenašel fotografie
- Zkontrolujte cestu: `C:\Users\malch\Downloads\CWO 2025_ALL`
- Ujistěte se, že složka obsahuje obrázky s podporovanými příponami

### Fotky nemají EXIF datum
- Skript přeskočí fotky bez data pořízení
- Zkontrolujte EXIF data pomocí: `exiftool photo.jpg`

### Chybí jméno fotografa
- Pokud EXIF neobsahuje Artist, použije se prefix z názvu souboru
- Fallback: `Neznamy_fotograf`

### Web nezobrazuje fotky
1. Zkontrolujte, že JSON soubory jsou v `src/components/PhotoGallery2025/`
2. Zkontrolujte, že obrázky jsou v `public/assets/gallery/2025/`
3. Spusťte `npm start` znovu

## 📊 Očekávaný výstup

Po spuštění skriptu uvidíte:
```
============================================================
CWO 2025 Photo Gallery Processing
============================================================

📂 Scanning directory: C:\Users\malch\Downloads\CWO 2025_ALL
   Found 500 photos

📊 Processing photos...

 Processing: IMG_001.jpg
  → Day: sobota, Photographer: Jan_Novak, Category: 45_49_55_71B_F
  ✓ Resized: IMG_001.jpg (2048x1536)
  ✓ Resized: IMG_001.jpg (720x540)

...

📝 Generating JSON files...
  ✓ photos_sobota_Jan_Novak_45_49_55_71B_F.json (45 photos)
  ...
  ✓ manifest.json

============================================================
✅ Processing Complete!
============================================================
Total photos processed: 495
Photos skipped: 5

Organization summary:

SOBOTA:
  Jan_Novak: 245 photos
    - 45, 49, 55, 71 B (F): 45 photos
    - 55, 61, 67, 73 (M): 50 photos
    ...
  Petr_Dvorak: 100 photos
    ...

NEDELE:
  Jan_Novak: 120 photos
    ...
  Petr_Dvorak: 30 photos
    ...

============================================================
```

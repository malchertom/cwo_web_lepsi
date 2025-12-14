"""
CWO 2025 Photo Gallery Processing Script
=========================================
This script processes photos from CWO 2025 event:
- Reads EXIF metadata (date, time, photographer/artist)
- Organizes by day (Saturday/Sunday), photographer, and category
- Resizes to fullsize (max 4MP) and thumbnail (max 720px long edge)
- Generates JSON files for gallery components

Usage:
    python process_gallery_2025.py

Requirements:
    pip install Pillow pillow-heif
"""

import os
import json
import shutil
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Tuple, Optional
from PIL import Image
from PIL.ExifTags import TAGS
import pillow_heif
from tqdm import tqdm
from multiprocessing import Pool, cpu_count

# Register HEIF opener
pillow_heif.register_heif_opener()

# Configuration
SOURCE_DIR = r"C:\Users\malch\Downloads\CWO 2025_ALL"
OUTPUT_BASE = r"public\assets\gallery\2025"
FULLSIZE_MAX_PIXELS = 4_000_000  # 4MP
THUMBNAIL_LONG_EDGE = 720

# Filter photographers - pouze zpracovat fotky od vybraných fotografů
# None = zpracovat všechny fotografie
# Příklad: ['Tomas_Malcher'] = pouze fotky od Tomáše Malchera
# Příklad: ['Michal_Stepanek', 'Tomas_Malcher'] = pouze tyto dva fotografy
PHOTOGRAPHERS_TO_PROCESS = ['Tomas_Malcher']  # None = všichni, nebo list např. ['Tomas_Malcher']

# Schedule definition - 2-hour time slots
SCHEDULE = {
    "sobota": {
        "date": datetime(2025, 11, 29),
        "label": "Sobota 29.11.2025"
    },
    "nedele": {
        "date": datetime(2025, 11, 30),
        "label": "Neděle 30.11.2025"
    }
}

# Time slots: 2-hour intervals from 7:00 to 20:00+
TIME_SLOTS = [
    {"start_hour": 7, "end_hour": 9, "label": "07:00-09:00"},
    {"start_hour": 9, "end_hour": 11, "label": "09:00-11:00"},
    {"start_hour": 11, "end_hour": 13, "label": "11:00-13:00"},
    {"start_hour": 13, "end_hour": 15, "label": "13:00-15:00"},
    {"start_hour": 15, "end_hour": 17, "label": "15:00-17:00"},
    {"start_hour": 17, "end_hour": 19, "label": "17:00-19:00"},
    {"start_hour": 19, "end_hour": 21, "label": "19:00-21:00"},
    {"start_hour": 21, "end_hour": 23, "label": "21:00-23:00"},
]


def get_exif_data(image_path: str) -> Dict:
    """Extract EXIF data from image."""
    try:
        image = Image.open(image_path)
        exif_data = {}
        
        if hasattr(image, '_getexif') and image._getexif() is not None:
            exif = image._getexif()
            for tag_id, value in exif.items():
                tag = TAGS.get(tag_id, tag_id)
                exif_data[tag] = value
        
        return exif_data
    except Exception as e:
        print(f"Warning: Could not read EXIF from {image_path}: {e}")
        return {}


def get_photo_datetime(exif_data: Dict) -> Optional[datetime]:
    """Extract datetime from EXIF data."""
    date_fields = ['DateTimeOriginal', 'DateTime', 'DateTimeDigitized']
    
    for field in date_fields:
        if field in exif_data:
            try:
                date_str = exif_data[field]
                return datetime.strptime(date_str, '%Y:%m:%d %H:%M:%S')
            except Exception as e:
                print(f"Warning: Could not parse date {date_str}: {e}")
    
    return None


def get_photographer(exif_data: Dict, filename: str) -> str:
    """Extract photographer name from EXIF or filename."""
    # Try EXIF Artist field
    if 'Artist' in exif_data and exif_data['Artist']:
        return exif_data['Artist'].strip()
    
    # Try Copyright field
    if 'Copyright' in exif_data and exif_data['Copyright']:
        return exif_data['Copyright'].strip()
    
    # Fallback: use filename prefix (e.g., "MT_" or "JD_")
    if '_' in filename:
        prefix = filename.split('_')[0]
        return f"Fotograf_{prefix}"
    
    return "Neznamy_fotograf"


def categorize_by_time(photo_time: datetime, day_key: str) -> str:
    """
    Determine 2-hour time slot based on photo time.
    Returns category name like "07-09", "09-11", etc.
    """
    for slot in TIME_SLOTS:
        if slot["start_hour"] <= photo_time.hour < slot["end_hour"]:
            return f"{slot['start_hour']:02d}-{slot['end_hour']:02d}"
    
    # If after 23:00, assign to last slot
    if photo_time.hour >= 23:
        return "21-23"
    
    # Default: shouldn't happen, but return first slot
    return "07-09"


def resize_image(input_path: str, output_path: str, max_pixels: Optional[int] = None, 
                 max_long_edge: Optional[int] = None, quality: int = 85):
    """
    Resize image based on max pixels or max long edge.
    
    Args:
        input_path: Source image path
        output_path: Destination image path
        max_pixels: Maximum total pixels (e.g., 4000000 for 4MP)
        max_long_edge: Maximum long edge in pixels (e.g., 720)
        quality: JPEG quality (1-100)
    """
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if needed (handles HEIC, PNG with transparency, etc.)
            if img.mode in ('RGBA', 'LA', 'P'):
                rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                rgb_img.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                img = rgb_img
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            width, height = img.size
            
            # Calculate new dimensions
            if max_pixels:
                current_pixels = width * height
                if current_pixels <= max_pixels:
                    # Don't upscale
                    new_width, new_height = width, height
                else:
                    # Calculate scaling factor
                    scale = (max_pixels / current_pixels) ** 0.5
                    new_width = int(width * scale)
                    new_height = int(height * scale)
            
            elif max_long_edge:
                long_edge = max(width, height)
                if long_edge <= max_long_edge:
                    new_width, new_height = width, height
                else:
                    scale = max_long_edge / long_edge
                    new_width = int(width * scale)
                    new_height = int(height * scale)
            
            else:
                new_width, new_height = width, height
            
            # Resize if needed
            if (new_width, new_height) != (width, height):
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Ensure output directory exists
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            # Save
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            return True
            
    except Exception as e:
        print(f"✗ Error resizing {input_path}: {e}")
        return False


def process_resize_task(args: Tuple[str, str, Optional[int], Optional[int]]) -> bool:
    """Helper function for multiprocessing resize tasks."""
    input_path, output_path, max_pixels, max_long_edge = args
    return resize_image(input_path, output_path, max_pixels, max_long_edge)


def process_photos():
    """Main processing function."""
    print("=" * 60)
    print("CWO 2025 Photo Gallery Processing")
    print("=" * 60)
    
    if not os.path.exists(SOURCE_DIR):
        print(f"❌ Error: Source directory not found: {SOURCE_DIR}")
        return
    
    # Collect all image files
    image_extensions = {'.jpg', '.jpeg', '.png', '.heic', '.heif'}
    all_photos = []
    
    print(f"\n📂 Scanning directory: {SOURCE_DIR}")
    for root, dirs, files in os.walk(SOURCE_DIR):
        for file in files:
            if Path(file).suffix.lower() in image_extensions:
                all_photos.append(os.path.join(root, file))
    
    print(f"   Found {len(all_photos)} photos")
    
    if not all_photos:
        print("❌ No photos found!")
        return
    
    # Organize photos
    organized = {
        "sobota": {},
        "nedele": {}
    }
    
    # List to collect resize tasks for parallel processing
    resize_tasks = []
    photo_info = {}  # Store photo info keyed by fullsize path
    
    print("\n📊 Collecting photo data and preparing resize tasks...")
    processed_count = 0
    skipped_count = 0
    michal_stepanek_counter = {}  # Counter for each day/category for Michal_Stepanek
    
    for photo_path in tqdm(all_photos, desc="Analyzing photos", unit="photo"):
        filename = os.path.basename(photo_path)
        
        # Get EXIF data
        exif_data = get_exif_data(photo_path)
        photo_datetime = get_photo_datetime(exif_data)
        
        if not photo_datetime:
            skipped_count += 1
            continue
        
        # Determine day
        day = None
        for day_key, day_info in SCHEDULE.items():
            if photo_datetime.date() == day_info["date"].date():
                day = day_key
                break
        
        if not day:
            skipped_count += 1
            continue
        
        # Get photographer
        photographer = get_photographer(exif_data, filename)
        photographer = photographer.replace(' ', '_').replace('/', '_')
        
        # Filter by photographer if configured
        if PHOTOGRAPHERS_TO_PROCESS is not None:
            # Normalize photographer name variants
            photographer_normalized = photographer.replace('Michal_Štěpánek', 'Michal_Stepanek')
            photographer_normalized = photographer_normalized.replace('Tomáš_Malcher', 'Tomas_Malcher')
            
            # Check if photographer is in the allowed list
            if photographer_normalized not in PHOTOGRAPHERS_TO_PROCESS:
                skipped_count += 1
                continue
        
        # Get category (2-hour time slot)
        category = categorize_by_time(photo_datetime, day)
        
        # For Michal_Stepanek, skip every other photo
        if photographer == 'Michal_Stepanek' or photographer == 'Michal_Štěpánek':
            photographer = 'Michal_Stepanek'  # Normalize name
            
            # Create unique key for this day/category combination
            stepanek_key = f"{day}_{category}"
            
            # Initialize counter if needed
            if stepanek_key not in michal_stepanek_counter:
                michal_stepanek_counter[stepanek_key] = 0
            
            # Increment counter
            michal_stepanek_counter[stepanek_key] += 1
            
            # Skip odd-numbered photos (keep only even: 2nd, 4th, 6th, etc.)
            if michal_stepanek_counter[stepanek_key] % 2 == 1:
                skipped_count += 1
                continue
        
        # Initialize nested structure
        if photographer not in organized[day]:
            organized[day][photographer] = {}
        if category not in organized[day][photographer]:
            organized[day][photographer][category] = []
        
        # Create output paths
        base_path = os.path.join(OUTPUT_BASE, day, photographer, category)
        fullsize_path = os.path.join(base_path, "fullsize", filename)
        thumbnail_path = os.path.join(base_path, "thumbnail", filename)
        
        # Change extension to .jpg if needed
        fullsize_path = str(Path(fullsize_path).with_suffix('.jpg'))
        thumbnail_path = str(Path(thumbnail_path).with_suffix('.jpg'))
        
        # Add resize tasks
        resize_tasks.append((photo_path, fullsize_path, FULLSIZE_MAX_PIXELS, None))
        resize_tasks.append((photo_path, thumbnail_path, None, THUMBNAIL_LONG_EDGE))
        
        # Store photo info for later
        relative_fullsize = f"./assets/gallery/2025/{day}/{photographer}/{category}/fullsize/{Path(fullsize_path).name}"
        relative_thumbnail = f"./assets/gallery/2025/{day}/{photographer}/{category}/thumbnail/{Path(thumbnail_path).name}"
        
        photo_info[fullsize_path] = {
            "day": day,
            "photographer": photographer,
            "category": category,
            "src": relative_fullsize,
            "thumbnail": relative_thumbnail,
            "alt": Path(filename).stem.replace('_', ' ').replace('-', ' '),
            "datetime": photo_datetime.isoformat()
        }
        
        processed_count += 1
    
    # Process resizes in parallel
    print(f"\n🖼️  Resizing {len(resize_tasks)} images (fullsize + thumbnail)...")
    num_processes = min(cpu_count(), 8)  # Use up to 8 cores
    
    with Pool(num_processes) as pool:
        results = list(tqdm(
            pool.imap_unordered(process_resize_task, resize_tasks),
            total=len(resize_tasks),
            desc="Resizing images",
            unit="image"
        ))
    
    # Build JSON structure with stored photo info
    print("\n📝 Building gallery structure...")
    for fullsize_path, info in photo_info.items():
        day = info["day"]
        photographer = info["photographer"]
        category = info["category"]
        
        organized[day][photographer][category].append({
            "src": info["src"],
            "thumbnail": info["thumbnail"],
            "alt": info["alt"],
            "datetime": info["datetime"]
        })
        
        processed_count += 1
    
    # Generate JSON files
    print("\n\n📝 Generating JSON files...")
    
    for day in organized:
        for photographer in organized[day]:
            for category in organized[day][photographer]:
                photos = organized[day][photographer][category]
                
                # Sort by datetime
                photos.sort(key=lambda x: x['datetime'])
                
                # Remove datetime from output (was only for sorting)
                for photo in photos:
                    del photo['datetime']
                
                # Save JSON file
                json_filename = f"photos_{day}_{photographer}_{category}.json"
                json_path = os.path.join("src", "components", "PhotoGallery2025", json_filename)
                os.makedirs(os.path.dirname(json_path), exist_ok=True)
                
                with open(json_path, 'w', encoding='utf-8') as f:
                    json.dump(photos, f, indent=2, ensure_ascii=False)
                
                print(f"  ✓ {json_filename} ({len(photos)} photos)")
    
    # Generate manifest file
    manifest = {
        "days": {},
        "schedule": {}
    }
    
    for day in organized:
        manifest["days"][day] = {}
        manifest["schedule"][day] = {
            "date": SCHEDULE[day]["date"].strftime("%d.%m.%Y"),
            "label": SCHEDULE[day]["label"],
            "timeSlots": TIME_SLOTS
        }
        
        for photographer in organized[day]:
            manifest["days"][day][photographer] = list(organized[day][photographer].keys())
    
    manifest_path = os.path.join("src", "components", "PhotoGallery2025", "manifest.json")
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    
    print(f"\n  ✓ manifest.json")
    
    # Summary
    print("\n" + "=" * 60)
    print("✅ Processing Complete!")
    print("=" * 60)
    print(f"Total photos processed: {processed_count}")
    print(f"Photos skipped: {skipped_count}")
    print(f"\nOrganization summary:")
    for day in organized:
        print(f"\n{day.upper()} ({SCHEDULE[day]['label']}):")
        for photographer in organized[day]:
            total = sum(len(photos) for photos in organized[day][photographer].values())
            print(f"  {photographer}: {total} photos")
            for timeslot in sorted(organized[day][photographer].keys()):
                photos_count = len(organized[day][photographer][timeslot])
                print(f"    - {timeslot}: {photos_count} photos")
    
    print("\n" + "=" * 60)


if __name__ == "__main__":
    process_photos()

@echo off
echo ============================================
echo CWO 2025 Gallery - Python Dependencies Setup
echo ============================================
echo.
echo Installing required Python packages...
echo - Pillow (image processing)
echo - pillow-heif (HEIC/HEIF support)
echo - tqdm (progress bars)
echo.

pip install Pillow pillow-heif tqdm

echo.
echo ============================================
echo Installation complete!
echo ============================================
echo.
echo You can now run: python process_gallery_2025.py
echo.
pause

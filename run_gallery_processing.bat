@echo off
echo ============================================
echo CWO 2025 Photo Gallery Processing
echo ============================================
echo.
echo This will process photos from:
echo C:\Users\malch\Downloads\CWO 2025_ALL
echo.
echo Output will be saved to:
echo - public\assets\gallery\2025\
echo - src\components\PhotoGallery2025\
echo.
pause
echo.
echo Starting processing...
echo.

python process_gallery_2025.py

echo.
echo ============================================
echo Processing finished!
echo ============================================
echo.
echo Next steps:
echo 1. Check the output in public\assets\gallery\2025\
echo 2. Check JSON files in src\components\PhotoGallery2025\
echo 3. Run 'npm start' to view the gallery
echo.
pause

import os
import json

def generate_photo_json(folder_path: str, output_file: str):
    """
    Scans the specified folder for 'fullsize' and 'thumbnail' subfolders, extracts image pairs,
    and outputs a JSON file with the structure required for the MasonryGallery component.

    :param folder_path: Path to the root folder containing 'fullsize' and 'thumbnail' subfolders.
    :param output_file: Path to the output JSON file.
    """
    fullsize_folder = os.path.join(folder_path, "fullsize")
    thumbnail_folder = os.path.join(folder_path, "thumbnail")

    # Ensure required folders exist
    if not os.path.exists(fullsize_folder) or not os.path.exists(thumbnail_folder):
        raise FileNotFoundError("Both 'fullsize' and 'thumbnail' folders must exist in the specified path.")

    photos = []

    # Scan for image files in the folders
    fullsize_images = {os.path.splitext(f)[0]: f for f in os.listdir(fullsize_folder) if f.lower().endswith((".jpg", ".jpeg", ".png", ".gif"))}
    thumbnail_images = {os.path.splitext(f)[0]: f for f in os.listdir(thumbnail_folder) if f.lower().endswith((".jpg", ".jpeg", ".png", ".gif"))}

    # Match fullsize images with thumbnails
    for key, fullsize_file in fullsize_images.items():
        if key in thumbnail_images:
            photos.append({
                "src": os.path.join("./assets/gallery/nedele/fullsize", fullsize_file),
                "thumbnail": os.path.join("./assets/gallery/nedele/thumbnail", thumbnail_images[key]),
                "alt": key.replace("_", " ").capitalize()  # Generate alt text from filename
            })

    # Write the JSON file
    with open(output_file, "w") as json_file:
        json.dump(photos, json_file, indent=4)

    print(f"JSON file has been successfully created at {output_file}.")

# Example usage
if __name__ == "__main__":
    generate_photo_json("D:/CWO/cwo_web_lepsi/public/assets/gallery/nedele", "photos.json")

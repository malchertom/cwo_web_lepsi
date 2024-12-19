import React, { useState } from 'react';
import './MasonryGallery.css';

type Photo = {
  src: string;
  alt: string;
};

type MasonryGalleryProps = {
  photos: Photo[];
};

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ photos }) => {
  const [enlargedPhoto, setEnlargedPhoto] = useState<Photo | null>(null);

  const handleImageClick = (photo: Photo) => {
    setEnlargedPhoto(photo);
  };

  const closeEnlargedPhoto = () => {
    setEnlargedPhoto(null);
  };

  return (
    <div>
      <div className="masonry-gallery">
        {photos.map((photo, index) => (
          <div className="masonry-item" key={index}>
            <img 
              src={photo.src} 
              alt={photo.alt} 
              className="masonry-image" 
              onClick={() => handleImageClick(photo)}
            />
          </div>
        ))}
      </div>

      {enlargedPhoto && (
        <div className="overlay" onClick={closeEnlargedPhoto}>
          <div className="enlarged-container">
            <img src={enlargedPhoto.src} alt={enlargedPhoto.alt} className="enlarged-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MasonryGallery;
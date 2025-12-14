import React, { useState, useEffect } from 'react';
import './MasonryGallery.css';
import ArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CloseIcon from '@mui/icons-material/Close';


import Masonry from "react-responsive-masonry";


type Photo = {
  src: string; // Full image source
  thumbnail: string; // Thumbnail image source
  alt: string; // Alt text for both
};

type MasonryGalleryProps = {
  toggleScrollLock?: (locked: boolean) => void;
  photos: Photo[];
};


const MasonryGallery: React.FC<MasonryGalleryProps> = ({ photos, toggleScrollLock = () => {} }) => {
    const [enlargedPhotoIndex, setEnlargedPhotoIndex] = useState<number | null>(null);

    const handleImageClick = (index: number) => {
        setEnlargedPhotoIndex(index);
        toggleScrollLock(true); // Lock scroll
    };

    const closeEnlargedPhoto = () => {
        setEnlargedPhotoIndex(null);
        toggleScrollLock(false); // Unlock scroll
    };

    const showNextPhoto = () => {
        if (enlargedPhotoIndex !== null) {
        setEnlargedPhotoIndex((enlargedPhotoIndex + 1) % photos.length);
        }
    };

    const showPreviousPhoto = () => {
        if (enlargedPhotoIndex !== null) {
        setEnlargedPhotoIndex((enlargedPhotoIndex - 1 + photos.length) % photos.length);
        }
    };

    const normalize = (p?: string) => {
      if (!p) return '';
      const base = process.env.PUBLIC_URL || '';
      const cleaned = p.replace(/^\.\//, '/');
      return cleaned.startsWith('/') ? base + cleaned : cleaned;
    };

    const [columns, setColumns] = useState(3);

    useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        if (width <= 760) setColumns(2);
        else if (width <= 1024) setColumns(2);
        else if (width <= 1900) setColumns(3);
        else setColumns(4);
      };
  
      handleResize(); // Run on mount
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    

    return (
      <div className="MasonryGallery">
        <div className="masonry-gallery" id="galleryDiv">
          <Masonry columnsCount={columns} gutter="8px">
            {photos.map((photo, index) => {
              const thumbSrc = normalize(photo.thumbnail);
              return (
                <img
                  src={thumbSrc}
                  alt={photo.alt}
                  className="masonry-image"
                  key={index}
                  style={{ width: '100%', display: 'block' }}
                  onClick={() => handleImageClick(index)}
                />
              );
            })}
          </Masonry>
        </div>

        {enlargedPhotoIndex !== null && (
          <div className="overlay">
            <button className="close-button" onClick={closeEnlargedPhoto}><CloseIcon /></button>
            <button className="arrow-button left" onClick={showPreviousPhoto}><ArrowLeftIcon /></button>
            <div className="enlarged-container">
              <div className='closebutton-m-container'>
                <button className="close-button-m" onClick={closeEnlargedPhoto}><CloseIcon /></button>
              </div>
              <img
                src={normalize(photos[enlargedPhotoIndex].src)}
                alt={photos[enlargedPhotoIndex].alt}
                className="enlarged-image"
              />
            </div>
            <button className="arrow-button right" onClick={showNextPhoto}><ArrowRightIcon /></button>
          </div>
        )}
      </div>
    );
};

export default MasonryGallery;
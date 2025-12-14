import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Masonry from "react-responsive-masonry";
import ArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import './MasonryGallery.css';

type Photo = {
  src: string;
  thumbnail: string;
  alt: string;
};

type MasonryGalleryProps = {
  toggleScrollLock?: (locked: boolean) => void;
  photos: Photo[];
};

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ photos, toggleScrollLock = () => {} }) => {
  const [enlargedPhotoIndex, setEnlargedPhotoIndex] = useState<number | null>(null);
  const [columns, setColumns] = useState(3);

  // Responsive columns logic
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 600) setColumns(1);
      else if (width <= 900) setColumns(2);
      else if (width <= 1400) setColumns(3);
      else setColumns(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageClick = (index: number) => {
    setEnlargedPhotoIndex(index);
    toggleScrollLock(true);
    // Zníž navbar pod overlay a zamkni scroll
    document.body.classList.add('overlay-open');
    document.body.style.overflow = 'hidden';
  };

  const closeEnlargedPhoto = () => {
    setEnlargedPhotoIndex(null);
    toggleScrollLock(false);
    // Vrať navbar na původní úroveň a odemkni scroll
    document.body.classList.remove('overlay-open');
    document.body.style.overflow = 'auto';
  };

  const showNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (enlargedPhotoIndex !== null) {
      setEnlargedPhotoIndex((enlargedPhotoIndex + 1) % photos.length);
    }
  };

  const showPreviousPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (enlargedPhotoIndex !== null) {
      setEnlargedPhotoIndex((enlargedPhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (enlargedPhotoIndex === null) return;
      if (e.key === 'ArrowRight') showNextPhoto();
      if (e.key === 'ArrowLeft') showPreviousPhoto();
      if (e.key === 'Escape') closeEnlargedPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enlargedPhotoIndex]);

  // Path helper to fix ./assets paths from JSON
  const getImagePath = (path: string) => {
    if (!path) return '';
    // Remove leading ./ if present to make it absolute relative to domain root
    const cleanPath = path.startsWith('./') ? path.substring(1) : path;
    // If using CRA with a subpath, prepend PUBLIC_URL
    const publicUrl = process.env.PUBLIC_URL || '';
    return cleanPath.startsWith('/') ? publicUrl + cleanPath : cleanPath;
  };

  return (
    <div className="MasonryGallery">
      <Masonry columnsCount={columns} gutter="10px">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={getImagePath(photo.thumbnail)}
              alt={photo.alt}
              className="masonry-image"
              style={{ width: "100%", display: "block", cursor: "pointer" }}
              onClick={() => handleImageClick(index)}
              loading="lazy"
            />
          ))}
        </Masonry>

      {enlargedPhotoIndex !== null && createPortal(
        (
          <div className="overlay" onClick={closeEnlargedPhoto}>
            <button className="close-button" onClick={closeEnlargedPhoto}>
              <CloseIcon />
            </button>
            
            <button className="arrow-button left" onClick={showPreviousPhoto}>
              <ArrowLeftIcon />
            </button>

            <div className="enlarged-container" onClick={(e) => e.stopPropagation()}>
              <div className='closebutton-m-container'>
                <button className="close-button-m" onClick={closeEnlargedPhoto}><CloseIcon /></button>
              </div>
              <img
                src={getImagePath(photos[enlargedPhotoIndex].src)}
                alt={photos[enlargedPhotoIndex].alt}
                className="enlarged-image"
              />
            </div>

            <button className="arrow-button right" onClick={showNextPhoto}>
              <ArrowRightIcon />
            </button>
          </div>
        ),
        document.body
      )}
    </div>
  );
};

export default MasonryGallery;

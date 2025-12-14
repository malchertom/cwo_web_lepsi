import { useState, useEffect, useMemo } from 'react';
import './PhotoGallery2025.css';
import MasonryGallery from '../MasonryGallery/MasonryGallery';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import manifestData from './manifest.json';
import type { Manifest, Photo } from './types';
import photoDataSo2024 from '../PhotoGallery/photosSo.json';
import photoDataNe2024 from '../PhotoGallery/photosNe.json';

const manifest = manifestData as Manifest;

// Mapping jmen fotografů bez diakritiky na jména s diakritikou
const photographerNames: Record<string, string> = {
  'Michal_Stepanek': 'Michal Štěpánek',
  'Tomas_Malcher': 'Tomáš Malcher',
};

function PhotoGallery2025() {
  const { t } = useTranslation();

  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [selectedDay, setSelectedDay] = useState<string>('sobota');
  const [selectedPhotographer, setSelectedPhotographer] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Get available photographers for selected day
  const availablePhotographers = useMemo(() => {
    if (!manifest.days[selectedDay]) return [];
    return Object.keys(manifest.days[selectedDay]);
  }, [selectedDay]);

  // Get available categories for selected day and photographer
  const availableCategories = useMemo(() => {
    if (!manifest.days[selectedDay] || !selectedPhotographer) return [];
    return manifest.days[selectedDay][selectedPhotographer] || [];
  }, [selectedDay, selectedPhotographer]);

  // Auto-select first photographer when day changes
  useEffect(() => {
    if (availablePhotographers.length > 0) {
      setSelectedPhotographer(availablePhotographers[0]);
    } else {
      setSelectedPhotographer('');
    }
  }, [availablePhotographers]);

  // Auto-select first category when photographer changes
  useEffect(() => {
    if (availableCategories.length > 0) {
      setSelectedCategory(availableCategories[0]);
    } else {
      setSelectedCategory('');
    }
  }, [availableCategories]);

  // Load photos when selection changes
  useEffect(() => {
    if (selectedYear === '2024') {
      // Pro rok 2024 načti statická data podle dne
      const photoData = selectedDay === 'sobota' ? photoDataSo2024 : photoDataNe2024;
      setPhotos(photoData as Photo[]);
      setLoading(false);
      return;
    }

    // Pro rok 2025 načti dynamicky podle fotografa a kategorie
    if (!selectedDay || !selectedPhotographer || !selectedCategory) {
      setPhotos([]);
      return;
    }

    const loadPhotos = async () => {
      setLoading(true);
      try {
        const jsonFileName = `photos_${selectedDay}_${selectedPhotographer}_${selectedCategory}.json`;
        const module = await import(`./${jsonFileName}`);
        setPhotos(module.default || []);
      } catch (error) {
        console.error('Error loading photos:', error);
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, [selectedYear, selectedDay, selectedPhotographer, selectedCategory]);

  // Get category label (time slot)
  const getCategoryLabel = (categoryName: string): string => {
    const daySchedule = manifest.schedule[selectedDay];
    if (!daySchedule) return categoryName;
    
    const timeSlot = daySchedule.timeSlots.find(t => `${t.start_hour.toString().padStart(2, '0')}-${t.end_hour.toString().padStart(2, '0')}` === categoryName);
    return timeSlot ? timeSlot.label : categoryName;
  };

  // Get photographer display name
  const getPhotographerName = (photographer: string): string => {
    // Nejdřív se podívej do mapy s diakritikou
    if (photographerNames[photographer]) {
      return photographerNames[photographer];
    }
    // Fallback na původní logiku
    return photographer
      .replace(/_/g, ' ')
      .replace('Fotograf ', '')
      .replace('fotograf ', '');
  };

  const galleryContent = (
    <motion.div
      key={`${selectedYear}-${selectedDay}-${selectedPhotographer}-${selectedCategory}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="categories-definition"
    >
      {loading ? (
        <div className="loading-message">
          {t('loading') || 'Načítání...'}
        </div>
      ) : photos.length > 0 ? (
        <div className="gallery-wrap">
          <MasonryGallery photos={photos} />
        </div>
      ) : (
        <div className="no-photos-message">
          {t('noPhotos') || 'Žádné fotky k dispozici'}
        </div>
      )}
    </motion.div>
  );

  return (
    <section className="photogallery2025" id="photogallery2025">
      <div className="photogallery2025-header">
        <p className="headline">{t('foto')}</p>
      </div>

      <div className="gallery-controls">
        {/* Year selection */}
        <div className="gallery-select-tabs year-tabs">
          <ul>
            <li
              onClick={() => setSelectedYear('2024')}
              className={selectedYear === '2024' ? 'active' : ''}
            >
              2024
            </li>
            <li
              onClick={() => setSelectedYear('2025')}
              className={selectedYear === '2025' ? 'active' : ''}
            >
              2025
            </li>
          </ul>
        </div>

        {/* Day selection */}
        <div className="gallery-select-tabs day-tabs">
          <ul>
            <li
              onClick={() => setSelectedDay('sobota')}
              className={selectedDay === 'sobota' ? 'active' : ''}
            >
              {t('sobota')} - {selectedYear === '2024' ? '9.12.' : '29.11.'}
            </li>
            <li
              onClick={() => setSelectedDay('nedele')}
              className={selectedDay === 'nedele' ? 'active' : ''}
            >
              {t('nedele')} - {selectedYear === '2024' ? '10.12.' : '30.11.'}
            </li>
          </ul>
        </div>

        {/* Photographer selection - only for 2025 */}
        {selectedYear === '2025' && availablePhotographers.length > 0 && (
          <div className="gallery-select-tabs photographer-tabs">
            <ul>
              {availablePhotographers.map((photographer) => (
                <li
                  key={photographer}
                  onClick={() => setSelectedPhotographer(photographer)}
                  className={selectedPhotographer === photographer ? 'active' : ''}
                >
                  {getPhotographerName(photographer)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Category selection - only for 2025 */}
        {selectedYear === '2025' && availableCategories.length > 0 && (
          <div className="gallery-select-tabs category-tabs">
            <ul>
              {availableCategories.map((timeSlot) => (
                <li
                  key={timeSlot}
                  onClick={() => setSelectedCategory(timeSlot)}
                  className={selectedCategory === timeSlot ? 'active' : ''}
                >
                  {getCategoryLabel(timeSlot)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Gallery info - only for 2025 */}
        {selectedYear === '2025' && selectedPhotographer && selectedCategory && (
          <div className="gallery-info">
            <p>
              <span className="photographer-name">
                {getPhotographerName(selectedPhotographer)}
              </span>
              {' - '}
              <span className="category-label">
                {getCategoryLabel(selectedCategory)}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="categories-content">
        <AnimatePresence mode="wait">
          {galleryContent}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default PhotoGallery2025;

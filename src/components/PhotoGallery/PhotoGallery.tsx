/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import './PhotoGallery.css';
import MasonryGallery from '../MasonryGallery/MasonryGallery_zPortfolia';
import { AnimatePresence } from 'framer-motion';
import { motion } from "framer-motion"
import photoDataSo from './photosSo.json';
import photoDataNe from './photosNe.json';
import { useTranslation } from 'react-i18next';
import type { i18n as I18nType } from 'i18next';



function PhotoGallery() {

              const { t, i18n } = useTranslation() as {
                t: (key: string) => string;
                i18n: I18nType;
              };
        const [selected, setSelected] = useState('sobota');
    
        const handleClick = (str:string) => {
            setSelected(str);
        }

        const sobotaGallery = (
            <motion.div
                key="modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="categories-definition">
                    <div className='gallery-wrap'>
                        <MasonryGallery photos={photoDataSo} />
                    </div>

                </motion.div>
        )
        const nedeleGallery = (
            <motion.div
                key="a"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="categories-definition">
                    <div className='gallery-wrap'>
                        <MasonryGallery photos={photoDataNe} />
                    </div>

                </motion.div>
        )

    return(    
        <section className='photogallery' id='photogallery'>
            <div className='photogallery-header'>
                <p className='headline'>{t('foto')}2024</p>  
            </div>

            <div className='gallery-select'>
                    <ul>
                        <li onClick={()=>handleClick('sobota')}
                            className={selected === 'sobota'? 'active' : ''}>
                                {t('sobota')} - 21.12.
                        </li>
                        <li onClick={()=>handleClick('nedele')}
                            className={selected === 'nedele'? 'active' : ''}>
                                {t('nedele')} - 22.12.
                        </li>
                    </ul>
                </div>
                <div className='categories-content'>
                    <AnimatePresence mode='wait'>
                        {selected === 'sobota' && sobotaGallery}
                        {selected === 'nedele' && nedeleGallery}
                    </AnimatePresence>
                </div>
        </section>  
    );
}

export default PhotoGallery;


import { useState } from 'react';
import './PhotoGallery.css';
import MasonryGallery from '../MasonryGallery/MasonryGallery';
import { AnimatePresence } from 'framer-motion';
import { motion } from "framer-motion"
import photoDataSo from './photosSo.json';
import photoDataNe from './photosNe.json';



function PhotoGallery() {
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
                <p className='headline'>Fotogalerie</p>  
            </div>

            <div className='gallery-select'>
                    <ul>
                        <li onClick={()=>handleClick('sobota')}
                            className={selected === 'sobota'? 'active' : ''}>
                                Sobota - 21.12.
                        </li>
                        <li onClick={()=>handleClick('nedele')}
                            className={selected === 'nedele'? 'active' : ''}>
                                Neděle - 22.12.
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


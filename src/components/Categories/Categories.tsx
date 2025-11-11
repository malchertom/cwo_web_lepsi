/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import './Categories.css'
import { SoloWomen, SoloMen, TeamOpen} from './CategoriesDefinition';
import { AnimatePresence } from 'framer-motion';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useTranslation } from 'react-i18next';
import type { i18n as I18nType } from 'i18next';


function Categories() {

          const { t, i18n } = useTranslation() as {
            t: (key: string) => string;
            i18n: I18nType;
          };

    const [selected, setSelected] = useState('teamOpen');

    const handleClick = (str:string) => {
        setSelected(str);
    }
    return(
        <section className='categories' id='categories'>
            <p className='headline'>{t('categories')}</p>
            <div className='categories-inner'>
                <div className='categories-select'>
                    <ul>
                        <li onClick={()=>handleClick('women')}
                            className={selected === 'women'? 'active' : ''}>
                                {t('indiv_W')}
                        </li>
                        <li onClick={()=>handleClick('men')}
                            className={selected === 'men'? 'active' : ''}>
                            {t('indiv_M')}
                        </li>
                        <li onClick={()=>handleClick('teamOpen')}
                            className={selected === 'teamOpen'? 'active' : ''}>
                            {t('team')}
                        </li>
                        {/*
                        <li onClick={()=>handleClick('teamOpenDead')}
                            className={selected === 'teamOpenDead'? 'active' : ''}>
                            CWO Team OPEN (+1 deadlift)
                        </li>
                        */}        
                    </ul>
                </div>
                <div className='categories-content'>
                    <AnimatePresence mode='wait'>
                        {selected === 'women' && <SoloWomen />}
                        {selected === 'men' && <SoloMen />}
                        {selected === 'teamOpen' && <TeamOpen />}
                    </AnimatePresence>
                </div>
            </div>

        <div className="Prav">
            <p className="pravidla-download">
                <a href="assets\pdfs\Technická a soutěžní pravidla a předpisy ČSV - 2019.pdf" target="_blank">
                    <FileDownloadOutlinedIcon /> <span>{t("rules")}</span>
                </a>
            </p>
            {/*
            <p className="pravidla-download">
                <a href="assets\pdfs\Pravidla silového trojboj - 2024.pdf" target="_blank">
                    <FileDownloadOutlinedIcon /> <span>Pravidla a soutěžní řád ČSST</span>
                </a>
            </p>
            */} 
        </div>
        </section>
    );
}

export default Categories;
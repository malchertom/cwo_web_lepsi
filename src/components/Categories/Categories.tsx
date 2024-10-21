import { useState } from 'react';
import './Categories.css'
import { soloWomen, soloMen, teamOpen, teamOpenDead } from './CategoriesDefinition';
import { AnimatePresence } from 'framer-motion';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

function Categories() {
    const [selected, setSelected] = useState('teamOpen');

    const handleClick = (str:string) => {
        setSelected(str);
    }
    return(
        <section className='categories' id='categories'>
            <p className='headline'>Soutěžní kategorie</p>
            <div className='categories-inner'>
                <div className='categories-select'>
                    <ul>
                        <li onClick={()=>handleClick('women')}
                            className={selected === 'women'? 'active' : ''}>
                                Jednotlivci - ŽENY
                        </li>
                        <li onClick={()=>handleClick('men')}
                            className={selected === 'men'? 'active' : ''}>
                            Jednotlivci - MUŽI
                        </li>
                        <li onClick={()=>handleClick('teamOpen')}
                            className={selected === 'teamOpen'? 'active' : ''}>
                            Team Open
                        </li>
                        <li onClick={()=>handleClick('teamOpenDead')}
                            className={selected === 'teamOpenDead'? 'active' : ''}>
                            Team Open - DeadWeight
                        </li>
                    </ul>
                </div>
                <div className='categories-content'>
                    <AnimatePresence mode='wait'>
                        {selected === 'women' && soloWomen}
                        {selected === 'men' && soloMen}
                        {selected === 'teamOpen' && teamOpen}
                        {selected === 'teamOpenDead' && teamOpenDead}
                    </AnimatePresence>
                </div>
            </div>

        <div className="Prav">
            <p className="pravidla-download">
                <a href="assets\pdfs\Technická a soutěžní pravidla a předpisy ČSV - 2019.pdf" target="_blank">
                    <FileDownloadOutlinedIcon /> <span>Pravidla a soutěžní řád ČSV</span>
                </a>
            </p>
            <p className="pravidla-download">
                <a href="assets\pdfs\Pravidla silového trojboj - 2024.pdf" target="_blank">
                    <FileDownloadOutlinedIcon /> <span>Pravidla a soutěžní řád ČSST</span>
                </a>
            </p>
        </div>
        </section>
    );
}

export default Categories;
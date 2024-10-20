import { useState } from 'react';
import './Categories.css'
import { soloWomen, soloMen, teamOpen, teamOpenDead } from './CategoriesDefinition';
import { AnimatePresence } from 'framer-motion';

function Categories() {
    const [selected, setSelected] = useState('teamOpen');

    const handleClick = (str:string) => {
        setSelected(str);
    }
    return(
        <section className='categories'>
            <p className='headline'>Kategorie</p>
            <div className='categories-inner'>
                <div className='categories-select'>
                    <ul>
                        <li onClick={()=>handleClick('women')}
                            className={selected === 'women'? 'active' : ''}>
                                Jednotlivci - ženy
                        </li>
                        <li onClick={()=>handleClick('men')}
                            className={selected === 'men'? 'active' : ''}>
                            Jednotlivci - muži
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
        </section>
    );
}

export default Categories;
import list from './Fotky.json'
import Gallery from "./Gallery";
import './Fotky.css'

import { useEffect, useState } from "react";


function Fotky() {
    const [portfolioPage] = useState('Vse')
    const [ImageList, setImageList] = useState(list)

    useEffect(() => {
            setImageList({"CWO": list["CWO"]})
    },[portfolioPage])
  return (
    <section className="Fotky" id='gallery'>
            <h2 className='headline'>Galerie CWO 2023</h2>
      <div className='Gallery-wrap'>
        <Gallery listObr={ImageList} />
      </div>
    </section>
  );
}

export default Fotky;
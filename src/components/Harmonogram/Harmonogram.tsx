import './Harmonogram.css';
import MasonryGallery from '../MasonryGallery/MasonryGallery';


function Harmonogram() {
    const photoData = [
        { src: './assets/startovka/harmonogram.png', alt: 'Photo 1' },
        // Add more photo objects
      ];
    return(    
        <section className='harmonogram' id='harmonogram'>
            <div className='harmonogram-header'>
                <p className='headline'>Harmonogram</p>  
            </div>
            <MasonryGallery photos={photoData} />
        </section>  
    );
}

export default Harmonogram;
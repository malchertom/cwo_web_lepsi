import './Startovky.css';
import MasonryGallery from '../MasonryGallery/MasonryGallery';



function Startovky() {
    const photoData = [
        { src: './assets/startovka/z1.png', alt: 'Photo 1' },
        { src: './assets/startovka/z2.png', alt: 'Photo 2' },
        { src: './assets/startovka/z3.png', alt: 'Photo 3' },
        { src: './assets/startovka/z4.png', alt: 'Photo 3' },
        { src: './assets/startovka/z5.png', alt: 'Photo 3' },
      
        { src: './assets/startovka/m1.png', alt: 'Photo 3' },
        { src: './assets/startovka/m2.png', alt: 'Photo 3' },
        { src: './assets/startovka/m3.png', alt: 'Photo 3' },
        { src: './assets/startovka/m4.png', alt: 'Photo 3' },
        { src: './assets/startovka/m5.png', alt: 'Photo 3' },
      
        { src: './assets/startovka/team1.png', alt: 'Photo 3' },
        { src: './assets/startovka/team2.png', alt: 'Photo 3' },
        { src: './assets/startovka/team3.png', alt: 'Photo 3' },
        
        { src: './assets/startovka/deadlift.png', alt: 'Photo 3' },
        { src: './assets/startovka/deadlift1.png', alt: 'Photo 3' },
        // Add more photo objects
      ];
    return(    
        <section className='startlist' id='startlist'>
            <div className='startlist-header'>
                <p className='headline'>Startovní listina</p>  
            </div>
            <MasonryGallery photos={photoData} />
        </section>  
    );
}

export default Startovky;
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import './Banner.css'

function Banner() {
    return(
        <section className='banner' id='banner'>
            <img src='/assets/imgs/banner.jpg' alt='cwo_banner' className='banner-img'/>    
            <div className='banner-content'>
                <div className='banner-text'>
                    <img src='/assets/imgs/headline.png' alt='cwo_headline' className='headline'/> 
                </div>

                <FlipClockCountdown 
                    className="flip-clock"
                    to={new Date("2025/11/29")} 
                    labels={['DNY', 'HODINY', 'MINUTY', 'SEKUNDY']}
                />

                <button>
                    <a href="https://is.muni.cz/obchod/fakulta/fsps/CWO_2025/" target="_blank" rel="noopener noreferrer">Registrace</a>
                </button>
            </div>
        </section>
    );
}

export default Banner;
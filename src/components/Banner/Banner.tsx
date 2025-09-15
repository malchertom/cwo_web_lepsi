import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import './Banner.css'
import { useTranslation } from 'react-i18next';
import type { i18n as I18nType } from 'i18next';

function Banner() {

          const { t, i18n } = useTranslation() as {
            t: (key: string) => string;
            i18n: I18nType;
          };

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
                labels={[t('clock_D'), t('clock_H'), t('clock_M'), t('clock_S')]}
                />

                <button>
                    <a href="https://is.muni.cz/obchod/fakulta/fsps/CWO_2025/" target="_blank" rel="noopener noreferrer">{t('reg')}</a>
                </button>
            </div>
        </section>
    );
}

export default Banner;
import './About.css'
import YoutubeEmbed from './YoutubeEmbed';
import { useTranslation } from 'react-i18next';
import type { i18n as I18nType } from 'i18next';


function About() {

      const { t, i18n } = useTranslation() as {
        t: (key: string) => string;
        i18n: I18nType;
      };

    return(        
        <section className='about' id='about'>
            <div className='about-heading'>
                <p className='headline'>{t('coToJe')}</p>



            </div>
            <div className='about-text'>
                <p>{t('coToJe_text')}</p>
            </div>
                <YoutubeEmbed />
        </section>
    );
}

export default About;
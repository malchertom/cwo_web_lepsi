import './Footer.css'
import IgHandle from './IgHandle';
import EmailHandle from './EmailHandle';
import { useTranslation } from 'react-i18next';
import type { i18n as I18nType } from 'i18next';

function Footer() {

          const { t } = useTranslation() as {
            t: (key: string) => string;
            i18n: I18nType;
          };

    return(
        <footer className='footer'>
            <div className='person-info'>
                <div className='name-function'>
                    <p className='name'>Mgr. Tereza Králová Ph.D.</p>
                    <p className='function'>{t("terka")}</p>
                </div>
                <IgHandle igHandle={'tekihammer'} />
                <EmailHandle email={'teki@email.cz'} />
            </div>

            <div className='person-info'>
                <div className='name-function'>
                    <p className='name'>Mgr. Martin Kutý</p>
                    <p className='function'>{t("martin")}</p>
                </div>
                <IgHandle igHandle={'coach_kuty_therapist'} />
                <EmailHandle email={'kuty.martin@seznam.cz'} />
            </div>
            
            <div className='person-info'>
                <div className='name-function'>
                    <p className='name'>Ing. Tomáš Malcher</p>
                    <p className='function'>{t("tom")}</p>
                </div>
                <IgHandle igHandle={'tommalcher.photo'} />
                <EmailHandle email={'malchertomm@gmail.com'} />
            </div>
        </footer>
    );
}

export default Footer; 
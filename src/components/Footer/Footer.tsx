import './Footer.css'
import IgHandle from './IgHandle';
import EmailHandle from './EmailHandle';

function Footer() {
    return(
        <footer className='footer'>
            <div className='person-info'>
                <div className='name-function'>
                    <p className='name'>Mgr. Tereza Králová Ph.D.</p>
                    <p className='function'>Technická a výkonná ředitelka soutěže</p>
                </div>
                <IgHandle igHandle={'tekihammer'} />
                <EmailHandle email={'teki@email.cz'} />
            </div>

            <div className='person-info'>
                <div className='name-function'>
                    <p className='name'>Mgr. Martin Kutý</p>
                    <p className='function'>Marketingový ředitel soutěže</p>
                </div>
                <IgHandle igHandle={'coach_kuty_therapist'} />
                <EmailHandle email={'kuty.martin@seznam.cz'} />
            </div>
            
            <div className='person-info'>
                <div className='name-function'>
                    <p className='name'>Bc. Tomáš Malcher</p>
                    <p className='function'>Content & Design manager</p>
                </div>
                <IgHandle igHandle={'tommalcher'} />
                <EmailHandle email={'malchertom@gmail.com'} />
            </div>
        </footer>
    );
}

export default Footer; 
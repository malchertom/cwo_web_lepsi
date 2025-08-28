import './About.css'
import YoutubeEmbed from './YoutubeEmbed';


function About() {
    return(        
        <section className='about' id='about'>
            <div className='about-heading'>
                <p className='headline'>Co je to CWO?</p>



            </div>
            <div className='about-text'>
                <p>Czech Weightlifting Open je v základu vzpěračskou soutěží národního až mezinárodního charakteru, již tradičně odehrávající se v Brně. Jedná se tedy o klasické klání jednotlivců z řad žen i mužů rozdělených do standartních hmotnostních kategorií dle pravidel IWF a ČSV. Specialitou CWO je také kategorie TEAM, kde každý tým je složen ze 4 členů (muži, ženy, kombinace). Vítáni jsou jednotlivci i týmy z řad začátečníků, pokročilých i zkušených závodníků nebo příznivci silových sportů všech věkových skupin.</p>
            </div>
                <YoutubeEmbed />
        </section>
    );
}

export default About;
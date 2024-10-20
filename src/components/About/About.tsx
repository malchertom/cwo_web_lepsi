import './About.css'

function About() {
    return(        
        <section className='about'>
            <div className='about-heading'>
                <p className='headline'>Co je to CWO?</p>
            </div>
            <div className='about-text'>
                <p>Czech Weightlifting Open je v základu vzpěračskou soutěží národního až mezinárodního charakteru, již tradičně odehrávající se v Brně. Jedná se tedy o klasické klání jednotlivců z řad žen i mužů rozdělených do standartních hmotnostních kategorií dle pravidel IWF a ČSV. Specialitou CWO je také kategorie TEAM, kde každý tým je složen ze 4 členů (muži, ženy, kombinace). V roce 2024 se ke klasickým kategoriím jednotlivců a kategorii TEAM přidává kategorie 4+1 TEAM-DEAD WEIGHT, která kombinuje klasický vzpěračský dvojboj s nejtěžším výkonem v mrtvém tahu jednoho člena každého týmu, případně doplňujícího siláka z řad silových sportů. Vítáni jsou jednotlivci i týmy z řad začátečníků, pokročilých i zkušených závodníků nebo příznivci silových sportů všech věkových skupin.</p>
            </div>
        </section>
    );
}

export default About;
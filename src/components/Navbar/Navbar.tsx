import { useEffect, useState } from 'react';
import './Navbar.css'

function Navbar() {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        const sections = document.querySelectorAll("section");
    
        const options = {
          root: null,
          threshold: 0.6,
        };
    
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        }, options);
    
        sections.forEach((section) => {
          observer.observe(section);
        });
    
        return () => {
          sections.forEach((section) => observer.unobserve(section));
        };
    }, []);   
    
    const handleScroll = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, sectionId: string) => {
        e.preventDefault();
      
        const section = document.querySelector<HTMLElement>(sectionId);
        if (!section) return;
      
        section.scrollIntoView({
          behavior: "smooth", 
          block: "center"
        });
    };

    return(
        <nav>
            <div className='navbar'>
                <ul>
                    <li
                        className={activeSection === "banner" ? "active" : ""}
                        onClick={(e) => handleScroll(e, "#banner")}
                    >
                        Domů
                    </li>
                    <li
                        className={activeSection === "about" ? "active" : ""}
                        onClick={(e) => handleScroll(e, "#about")}
                    >
                        Co je to CWO?
                    </li>
                    <li
                        className={activeSection === "categories" ? "active" : ""}
                        onClick={(e) => handleScroll(e, "#categories")}
                    >
                        Soutěžní kategorie
                    </li>
                    <li
                        className={activeSection === "placetime" ? "active" : ""}
                        onClick={(e) => handleScroll(e, "#placetime")}
                    >
                        Kdy a kde? 
                    </li>
                    <li
                        className={activeSection === "timeline" ? "active" : ""}
                        onClick={(e) => handleScroll(e, "#timeline")}
                    >
                        Timeline
                    </li>
                    <li
                        className={activeSection === "gallery" ? "active" : ""}
                        onClick={(e) => handleScroll(e, "#gallery")}
                    >
                        Galerie
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
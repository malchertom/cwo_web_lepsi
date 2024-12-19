import { useEffect, useState } from 'react';
import './Navbar.css'
import { Squash as Hamburger } from 'hamburger-react'


function Navbar() {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [isOpen, setOpen] = useState(false)

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

        if(isOpen) {
            setOpen(false);
        }
      
        const section = document.querySelector<HTMLElement>(sectionId);
        if (!section) return;
      
        section.scrollIntoView({
          behavior: "smooth", 
          block: "center"
        });
    };

    return(
        <nav className={isOpen ? 'nav-mobile':''}>
            <div className='hamburger-menu'>
                <Hamburger toggled={isOpen} toggle={setOpen} size={20}/>
                {isOpen && 
                    <div className='mobile-navbar'>
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
                                className={activeSection === "harmonogram" ? "active" : ""}
                                onClick={(e) => handleScroll(e, "#harmonogram")}
                            >
                                Harmonogram
                            </li>
                            <li
                                className={activeSection === "startlist" ? "active" : ""}
                                onClick={(e) => handleScroll(e, "#startlist")}
                            >
                                Startovní listina
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
                        </ul>
                    </div>
                }
            </div>
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
                        className={activeSection === "harmonogram" ? "active" : ""}
                        onClick={(e) => handleScroll(e, "#harmonogram")}
                    >
                        Harmonogram
                    </li>
                    <li
                        className={activeSection === "startlist" ? "active" : ""}
                        onClick={(e) => handleScroll(e, "#startlist")}
                    >
                        Startovní listina
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
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
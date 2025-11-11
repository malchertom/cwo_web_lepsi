import { useEffect, useState } from 'react';
import './Navbar.css'
import { Squash as Hamburger } from 'hamburger-react'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import type { i18n as I18nType } from 'i18next';


function Navbar() {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation() as {
            t: (key: string) => string;
            i18n: I18nType;
          };

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
                        <LanguageSwitcher />
                        <ul>
                            <li
                                className={activeSection === "banner" ? "active" : ""}
                                onClick={(e) => handleScroll(e, "#banner")}
                            >
                                {t("domu")}
                            </li>
                            <li
                                className={activeSection === "about" ? "active" : ""}
                                onClick={(e) => handleScroll(e, "#about")}
                            >
                                {t("coToJe")}
                            </li>
                            <li
                                className={activeSection === "categories" ? "active" : ""}
                                onClick={(e) => handleScroll(e, "#categories")}
                            >
                                {t("categories")}
                            </li>
                            <li
                                className={activeSection === "photogallery" ? "active" : ""}
                                onClick={(e) => handleScroll(e, "#photogallery")}
                            >
                                {t("foto")}
                            </li>
                            <li
                                className={activeSection === "placetime" ? "active" : ""}
                                onClick={(e) => handleScroll(e, "#placetime")}
                            >
                                {t("kdyKde")} 
                            </li>
                            <li
                                className={activeSection === "timeline" ? "active" : ""}
                                onClick={(e) => handleScroll(e, "#timeline")}
                            >
                                {t("timeline")}
                            </li>
                        </ul>
                    </div>
                }
            </div>
            <div className='navbar'>
                <LanguageSwitcher />
                <ul>
                    <li
                        className={activeSection === "banner" ? "active" : ""}
                        onClick={(e) => handleScroll(e, "#banner")}
                    >
                        {t("domu")}
                    </li>
                    <li
                        className={activeSection === "about" ? "active" : ""}
                        onClick={(e) => handleScroll(e, "#about")}
                    >
                        {t("coToJe")}
                    </li>
                    <li
                        className={activeSection === "categories" ? "active" : ""}
                        onClick={(e) => handleScroll(e, "#categories")}
                    >
                        {t("categories")}
                    </li>
                    <li
                        className={activeSection === "photogallery" ? "active" : ""}
                        onClick={(e) => handleScroll(e, "#photogallery")}
                    >
                        {t("foto")}
                    </li>
                    <li
                        className={activeSection === "placetime" ? "active" : ""}
                        onClick={(e) => handleScroll(e, "#placetime")}
                    >
                        {t("kdyKde")} 
                    </li>
                    <li
                        className={activeSection === "timeline" ? "active" : ""}
                        onClick={(e) => handleScroll(e, "#timeline")}
                    >
                        {t("timeline")}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
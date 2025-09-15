import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

interface Language {
  code: string;
  name: string;
  flag: string; // URL or imported image
}

const languages: Language[] = [
  { code: 'cs', name: 'Čeština', flag: '/flags/cz.svg' },
  { code: 'en', name: 'English', flag: '/flags/gb.svg' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className="language-switcher">
      {languages.map((lang) => (
        <img
          key={lang.code}
          src={lang.flag}
          alt={lang.name}
          className={`flag ${i18n.language === lang.code ? 'active' : ''}`}
          onClick={() => i18n.changeLanguage(lang.code)}
        />
      ))}
    </div>
  );
};

export default LanguageSwitcher;

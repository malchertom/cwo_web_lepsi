// CategoriesDefinition.tsx
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import type { i18n as I18nType } from 'i18next';

export const SoloWomen: React.FC = () => {
            const { t, i18n } = useTranslation() as {
              t: (key: string) => string;
              i18n: I18nType;
            };
  return (
    <motion.div
      key="women"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="categories-definition"
    >
      <p>{t('indiv_W_text_1')}</p>
      <ol>
        <li>48 kg</li>
        <li>53 kg</li>
        <li>58 kg</li>
        <li>63 kg</li>
        <li>69 kg</li>
        <li>77 kg</li>
        <li>86 kg</li>
        <li>+ 86 kg</li>
      </ol>
      <p>{t('indiv_W_text_2')}</p>
      <p>{t('indiv_W_text_3')}</p>
      <p>{t('indiv_W_text_4')}</p>
    </motion.div>
  );
};

export const SoloMen: React.FC = () => {
              const { t, i18n } = useTranslation() as {
              t: (key: string) => string;
              i18n: I18nType;
            };
  return (
    <motion.div
      key="men"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="categories-definition"
    >
      <p>{t('indiv_M_text_1')}</p>
      <ol>
        <li>60 kg</li>
        <li>65 kg</li>
        <li>71 kg</li>
        <li>79 kg</li>
        <li>88 kg</li>
        <li>94 kg</li>
        <li>110 kg</li>
        <li>+ 110 kg</li>
      </ol>
      <p>{t('indiv_M_text_2')}</p>
      <p>{t('indiv_M_text_3')}</p>
      <p>{t('indiv_M_text_4')}</p>
    </motion.div>
  );
};

export const TeamOpen: React.FC = () => {
              const { t, i18n } = useTranslation() as {
              t: (key: string) => string;
              i18n: I18nType;
            };
  return (
    <motion.div
      key="teamOpen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="categories-definition"
    >
      <p>{t('teamOpen_text_1')}</p>
      <ul>
        <li>4 {t('women')}</li>
        <li>3 {t('women')}</li>
        <li>3 {t('women')} + 1 {t('man')}</li>
        <li>2 {t('women')} + 2 {t('men')}</li>
        <li>1 {t('woman')} + 3 {t('men')}</li>
        <li>3 {t('men')}</li>
        <li>4 {t('men')}</li>
      </ul>
      <p>{t('teamOpen_text_2')}</p>
    </motion.div>
  );
};


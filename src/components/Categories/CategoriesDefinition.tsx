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
        <li>45 kg</li>
        <li>49 kg</li>
        <li>55 kg</li>
        <li>59 kg</li>
        <li>64 kg</li>
        <li>71 kg</li>
        <li>76 kg</li>
        <li>81 kg</li>
        <li>87 kg</li>
        <li>+87 kg</li>
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
        <li>55 kg</li>
        <li>61 kg</li>
        <li>67 kg</li>
        <li>73 kg</li>
        <li>81 kg</li>
        <li>89 kg</li>
        <li>96 kg</li>
        <li>102 kg</li>
        <li>109 kg</li>
        <li>+ 109 kg</li>
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


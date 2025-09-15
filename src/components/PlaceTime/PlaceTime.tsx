import './PlaceTime.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import MapComponent from './Map';
import { useTranslation } from 'react-i18next';
import type { i18n as I18nType } from 'i18next';

function PlaceTime() {
  // Proper typing for t and i18n
  const { t, i18n } = useTranslation() as {
    t: (key: string) => string;
    i18n: I18nType;
  };

  return (
    <section className="placetime" id="placetime">
      <div className="placetime-info">
        <p className="headline">{t('kdyKde')}</p>
        <div className="info-div">
          <div className="info">
            <CalendarMonthIcon />
            <p>29. - 30. 11. 2025</p>
          </div>

          <div className="info">
            <PlaceIcon />
            <div>
              <p>{t('kde1')}, MU Brno</p>
              <p>Kamenice 753/5, 625 00 Brno-Bohunice</p>
            </div>
          </div>
        </div>
      </div>

      <div className="placetime-map">
        <MapComponent />
      </div>
    </section>
  );
}

export default PlaceTime;

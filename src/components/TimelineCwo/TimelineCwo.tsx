import './TimelineCwo.css';
import Timeline from '@mui/lab/Timeline';
import TimelineCwoItem from './TimelineCwoItem';
import { useTranslation } from 'react-i18next';
import type { i18n as I18nType } from 'i18next';

function TimelineCwo() {
  const { t, i18n } = useTranslation() as {
    t: (key: string) => string;
    i18n: I18nType;
  };

  return (
    <section className="timeline" id="timeline">
      <p className='headline'>{t('timeline')}</p>
      <div className='timeline-tree'>
        <Timeline>
          <TimelineCwoItem 
            leftItem={t('timeline_round1_dates')} 
            rightItem={t('timeline_round1_text')} 
          />
          <TimelineCwoItem 
            leftItem={t('timeline_round2_dates')} 
            rightItem={t('timeline_round2_text')} 
          />
          <TimelineCwoItem 
            leftItem={t('timeline_round3_dates')} 
            rightItem={t('timeline_round3_text')} 
          />
          <TimelineCwoItem 
            leftItem={t('timeline_event_dates')} 
            rightItem={t('timeline_event_text')} 
            isLast 
          />
        </Timeline>
      </div>
    </section>
  );
}

export default TimelineCwo;

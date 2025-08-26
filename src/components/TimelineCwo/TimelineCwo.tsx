import './TimelineCwo.css'
import Timeline from '@mui/lab/Timeline';
import TimelineCwoItem from './TimelineCwoItem';

function TimelineCwo() {
    return(
        <section className="timeline" id='timeline'>
            <p className='headline'>Timeline</p>
            <div className='timeline-tree'>
            <Timeline>
                <TimelineCwoItem leftItem={'01.10.2025 - 15.10.2025'} rightItem={'1. kolo registrace: Jednotlivec 999 Kč, Tým 3 225 Kč'} />
                <TimelineCwoItem leftItem={'16.10.2025 - 31.10.2025'} rightItem={'2. kolo registrace: Jednotlivec 1 399 Kč, Tým 4 325 Kč'} />
                <TimelineCwoItem leftItem={'1.11.2025 - 16.11.2025'} rightItem={'3. kolo registrace: Jednotlivec 1 799 Kč, Tým 5 425 Kč'} />
                <TimelineCwoItem leftItem={'29.11.2025 - 30.11.2025'} rightItem={'Termín konání soutěže'} isLast/>
            </Timeline>
            </div>
        </section>
    );
}

export default TimelineCwo;
import './TimelineCwo.css'
import Timeline from '@mui/lab/Timeline';
import TimelineCwoItem from './TimelineCwoItem';

function TimelineCwo() {
    return(
        <section className="timeline">
            <p className='headline'>Timeline</p>
            <div className='timeline-tree'>
            <Timeline>
                <TimelineCwoItem leftItem={'01.11.2024 - 10.11.2024'} rightItem={'1. kolo registrace: Jednotlivec 699 Kč, Tým 2 024 Kč'} />
                <TimelineCwoItem leftItem={'11.11.2024 - 24.11.2024'} rightItem={'2. kolo registrace: Jednotlivec 899 Kč, Tým 2 424 Kč'} />
                <TimelineCwoItem leftItem={'25.11.2024 - 08.12.2024'} rightItem={'3. kolo registrace: Jednotlivec 1 099 Kč, Tým 2 824 Kč'} />
                <TimelineCwoItem leftItem={'09.12.2024 - 15.12.2024'} rightItem={'3. kolo registrace: Jednotlivec 1 299 Kč, Tým 3 224 Kč'} />
                <TimelineCwoItem leftItem={'21.12.2024 - 22.12.2024'} rightItem={'Termín konání soutěže'} isLast/>
            </Timeline>
            </div>
        </section>
    );
}

export default TimelineCwo;
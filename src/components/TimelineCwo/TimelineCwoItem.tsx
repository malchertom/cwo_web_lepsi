import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

interface Props {
    leftItem: string;
    rightItem: string;
    isLast?: boolean;
}

function TimelineCwoItem({leftItem, rightItem, isLast}: Props) {
    
    const handleDate = () => {
        let today = new Date();
        let x = leftItem.split(' ');

        let dateParts:any = x[0].split(".");

        var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

        if(dateObject < today) {
            return true;
        } else {
            return false;
        }
    }

    const isRed = () => {
        let x = leftItem.split(' ');

        let dateParts:any = x[0].split(".");
        let dateParts2:any = x[2].split(".");

        let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        let dateObject2 = new Date(+dateParts2[2], dateParts2[1] - 1, +dateParts2[0]);
        let deadline = new Date('12.09.2024');
        let deadline2 = new Date('12.15.2024');
        

        if((new Date() >= deadline) && (dateObject >= deadline) && (dateObject2 >= deadline2)) {
            return true;
        }

        return false;
    }
    
    return(
        <TimelineItem>
            <TimelineOppositeContent className={`timeline-right ${isRed() ? 'redColor' : ''}`}>{leftItem}</TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot sx={ isRed() ? { backgroundColor: 'red'} : handleDate() ? { backgroundColor: '#00c2ff'} : {}}/>
                {!isLast && <TimelineConnector sx={ handleDate() ? { backgroundColor: '#00c2ff'} : {}}/>}
            </TimelineSeparator>
            <TimelineContent className={`timeline-right ${isRed() ? 'redColor' : ''}`}>{rightItem}</TimelineContent>
        </TimelineItem>
    );
}

export default TimelineCwoItem;
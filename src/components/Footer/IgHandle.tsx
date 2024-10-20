import InstagramIcon from '@mui/icons-material/Instagram';

interface Props {
    igHandle: string;
}


function IgHandle({igHandle}:Props) {
    
    const handleClick = () => {
        window.open('https://www.instagram.com/' + igHandle, "_blank")
    }
    return(
        <div className='ig-handle' onClick={handleClick}>
            <InstagramIcon />
            <p>{igHandle}</p>
        </div>
    );
}

export default IgHandle;
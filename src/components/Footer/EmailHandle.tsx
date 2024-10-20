import EmailIcon from '@mui/icons-material/Email';

interface Props {
    email: string;
}

function EmailHandle({email}:Props) {
    
    return(
        <div className='email-handle'>
            <EmailIcon />
            <p>{email}</p>
        </div>
    );
}

export default EmailHandle;
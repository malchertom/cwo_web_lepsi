import './Propozice.css'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

function Propozice() {
    return(
        <section className="propozice" id='propozice'>
            <p className='headline'>Propozice</p>
            <div className='space'></div>

            <p className="pravidla-download">
                <a href="assets\pdfs\AM ČR vzpírání 2024 propozice.pdf" target="_blank">
                    <FileDownloadOutlinedIcon /> <span>Propozice AMČR 2024</span>
                </a>
            </p>
        </section>
    );
}

export default Propozice;
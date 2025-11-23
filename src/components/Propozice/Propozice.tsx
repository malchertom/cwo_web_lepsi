import './Propozice.css'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

function Propozice() {
    return(
        <section className="propozice" id='propozice'>
            <p className='headline'>Dokumenty</p>
            <div className='space'></div>

            <p className="pravidla-download">
                <a href="assets\pdfs\AM ČR vzpírání 2025 propozice.pdf" target="_blank">
                    <FileDownloadOutlinedIcon /> <span>Propozice AMČR 2025</span>
                </a>
            </p>
            <p className="pravidla-download">
                <a href="assets\pdfs\CWO2025-zeny.pdf" target="_blank">
                    <FileDownloadOutlinedIcon /> <span>Startovní listina - ŽENY</span>
                </a>
            </p>
            <p className="pravidla-download">
                <a href="assets\pdfs\CWO2025-muzi.pdf" target="_blank">
                    <FileDownloadOutlinedIcon /> <span>Startovní listina - MUŽI</span>
                </a>
            </p>
            <p className="pravidla-download">
                <a href="assets\pdfs\CWO2025-harmonogram.pdf" target="_blank">
                    <FileDownloadOutlinedIcon /> <span>Harmonogram</span>
                </a>
            </p>
        </section>
    );
}

export default Propozice;
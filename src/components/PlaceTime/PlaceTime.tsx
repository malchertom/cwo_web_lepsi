import './PlaceTime.css'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import MapComponent from './Map';

function PlaceTime() {
    return(
        <section className="placetime">
            <div className='placetime-info'>
                <p className='headline'>Kdy a kde?</p>
                <div className='info-div'>
                    <div className='info'>
                        <CalendarMonthIcon />
                        <p>20. - 22.12.2024</p>
                    </div>

                    <div className='info'>
                        <PlaceIcon />
                        <div>
                            <p>Fakulta sportovních studií, MU Brno</p>
                            <p>Kamenice 753/5, 625 00 Brno-Bohunice</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className='placetime-map'>
               <MapComponent />
            </div>
        </section>
    );
}

export default PlaceTime;
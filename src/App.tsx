import './App.css';
import About from './components/About/About';
import Banner from './components/Banner/Banner';
import Categories from './components/Categories/Categories';
import Footer from './components/Footer/Footer';
import Startovky from './components/Startovky/Startovky';
import Navbar from './components/Navbar/Navbar';
import PlaceTime from './components/PlaceTime/PlaceTime';
import Propozice from './components/Propozice/Propozice';
import Timeline from './components/TimelineCwo/TimelineCwo';
import WebBy from './components/WebBy/WebBy';
import Harmonogram from './components/Harmonogram/Harmonogram';




function App() {
  return (
    <div className='cwo'>
      <Navbar />
      <Banner />
      <About />
      <Categories />
      <Harmonogram />
      <Startovky />
      <PlaceTime />
      <Timeline />
      <Propozice />
      <Footer />
      <WebBy />
      
    </div>
  );
}

export default App;

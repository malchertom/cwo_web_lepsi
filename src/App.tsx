import './App.css';
import About from './components/About/About';
import Banner from './components/Banner/Banner';
import Categories from './components/Categories/Categories';
import Footer from './components/Footer/Footer';
import Gallery from './components/Gallery/Gallery';
import PlaceTime from './components/PlaceTime/PlaceTime';
import Timeline from './components/TimelineCwo/TimelineCwo';

function App() {
  return (
    <div className='cwo'>
      <Banner />
      <About />
      <Categories />
      <PlaceTime />
      <Timeline />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;

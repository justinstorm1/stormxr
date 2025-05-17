import './HomePage.css';
import Navbar from '../Navbar';
import Header from './Header';
import About from './About';
import Focuses from './Focuses';
import Founder from './Founder';
import CallToAction from './CallToAction';
import Contact from './Contact';

export default function HomePage() {
    return (
        <main id='homePage'>
            <Navbar filled={true} />
            <Header />
            <About />
            <Focuses />
            <Founder />
            <CallToAction />
            <Contact />
        </main>
    )
}
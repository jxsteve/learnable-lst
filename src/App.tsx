import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import Footer from './components/Footer/Footer';
import AddToBasketNotification from './components/AddToBasketNotification/AddToBasketNotification';
import './styles/global.css';

export default function App() {
  return (
    <>
      <Navbar />
      <LandingPage />
      <Footer />
      <AddToBasketNotification />
    </>
  );
}

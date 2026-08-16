import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import CartPage from './pages/CartPage/CartPage';
import Footer from './components/Footer/Footer';
import AddToBasketNotification from './components/AddToBasketNotification/AddToBasketNotification';
import ScrollManager from './components/ScrollManager/ScrollManager';
import './styles/global.css';

export default function App() {
  return (
    <>
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* Unknown paths fall back to the landing page */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
      <Footer />
      <AddToBasketNotification />
    </>
  );
}

import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CollectionPage from './pages/CollectionPage';
import BestSellersPage from './pages/BestSellersPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmation';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';

export default function App() {
  return (
    <div className="page-wrap">
      <Nav />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/best-sellers" element={<BestSellersPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmed" element={<OrderConfirmation />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Checkout from './pages/Checkout/Checkout';
import Workspace from './pages/Workspace/Workspace';
import OrderHistory from './pages/Orders/OrderHistory';
import SellerDashboard from './pages/Seller/SellerDashboard';
import Admin from './pages/Admin/Admin';
import AuthPage from './pages/Auth/AuthPage';
import Cart from './components/Cart';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="bg-linear-to-b from-pink-50 via-rose-50/30 to-white flex flex-col min-h-screen text-rose-900">
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/workspace" element={<Workspace />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/seller" element={<SellerDashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

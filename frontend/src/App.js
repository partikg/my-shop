import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import About from './pages/About';
import Investor from './pages/Investor';
import Product from './pages/Product/page';
import { Cart } from './pages/Cart';
import Profile from './components/Profile';
import Register from './components/Register';
import My_orders from './pages/My_orders';
import OrderDetail from './pages/OrderDetail';
import Dashboard from './pages/Admin/Dashboard';
import Products from './pages/Admin/Products';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/about" element={<About />} />
        <Route path="/investor" element={<Investor />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-orders" element={<My_orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/product" element={<Products />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;

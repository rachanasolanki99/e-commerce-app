import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import AdminDashboard from './Admin/AdminDashboard';
import Login from './Admin/Login';
import Navbar from './Components/Navbar';
import { CartProvider } from './Context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
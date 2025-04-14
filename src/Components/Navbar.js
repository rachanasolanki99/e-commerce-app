import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/">Home</Link>
        <Link to="/admin" style={{ marginLeft: '20px' }}>Admin</Link>
      </div>
      <div>
        <Link to="/cart">Cart ({itemCount})</Link>
      </div>
    </nav>
  );
};

export default Navbar;
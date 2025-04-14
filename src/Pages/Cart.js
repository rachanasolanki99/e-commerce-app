import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>No items in cart.</p> : (
        <div>
          {cart.map(item => (
            <div key={item.id} style={{ borderBottom: '1px solid #ddd', marginBottom: '10px' }}>
              <h4>{item.name}</h4>
              <p>Price: ${item.price}</p>
              <input type="number" value={item.quantity} min="1"
                onChange={e => updateQuantity(item.id, parseInt(e.target.value))} />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;

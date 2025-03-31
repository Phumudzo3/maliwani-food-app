import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../components/styles/cart.css'; 

function Cart() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const deliveryCost = 20; // Flat delivery cost in ZAR

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedCart.length > 0) {
      setCart(savedCart);
    } else if (state && state.cart) {
      setCart(state.cart);
    }
  }, [state]);
  
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  if (!cart || cart.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  const handleRemoveItem = (orderIndex) => {
    const updatedCart = cart.filter((_, i) => i !== orderIndex);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleEditItem = (orderIndex, itemIndex) => {
    const itemToEdit = cart[orderIndex].items[itemIndex];
    navigate('/edit-item', { state: { item: itemToEdit, index: itemIndex, cart: cart } });
  };

  const handleProceedToPayment = () => {
    const totalPrice = cart.reduce((total, order) => {
      return total + order.items.reduce((sum, item) => sum + item.totalPrice, 0);
    }, 0) + deliveryCost;

    localStorage.setItem("orderTotal", JSON.stringify(totalPrice));
    localStorage.setItem("orderDetails", JSON.stringify(cart));

    navigate('/orders');
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.map((order, orderIndex) => (
        <div key={orderIndex} className="order-container">
          <h2>Order {orderIndex + 1}</h2>
          {order.items.map((item, itemIndex) => (
            <div key={itemIndex} className="cart-item">
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>Options: {item.options.join(', ')}</p>
                <p>Base Price: {item.basePrice} ZAR</p>
                <p>Toppings Price: {item.toppingsPrice} ZAR</p>
                <p>VAT (15%): {item.vat.toFixed(2)} ZAR</p>
                <p>Total Price: {item.totalPrice.toFixed(2)} ZAR</p>
              </div>
              <div className="buttons">
                <button className="cart-btn remove-btn" onClick={() => handleRemoveItem(orderIndex)}>Remove</button>
                <button className="cart-btn edit-btn" onClick={() => handleEditItem(orderIndex, itemIndex)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Proceed to Payment Button */}
      <div className="place-order-container">
        <button className="place-order-btn" onClick={handleProceedToPayment}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Cart;

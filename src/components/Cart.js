import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../components/styles/cart.css'; 

function Cart() {
  const { state } = useLocation(); // Get the cart data from location state
  const navigate = useNavigate();
  const [cart, setCart] = useState([]); // Initialize cart as an empty array

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedCart.length > 0) {
      setCart(savedCart);
    } else if (state && state.cart) {
      setCart(state.cart);
    }
  }, [state]);
  

  // Update cart in localStorage whenever the cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
    }
  }, [cart]);

  if (!cart || cart.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  const handleRemoveItem = (orderIndex) => {
    const updatedCart = cart.filter((_, i) => i !== orderIndex);
    setCart(updatedCart); // Update the cart state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
  };
  

  // Navigate to EditItem page with the selected item
  const handleEditItem = (orderIndex, itemIndex) => {
    const itemToEdit = cart[orderIndex].items[itemIndex];
    navigate('/edit-item', { state: { item: itemToEdit, index: itemIndex, cart: cart } });
  };

  // Handle placing a new order (append to existing orders)
  const handlePlaceOrder = (newOrder) => {
    const updatedCart = [...cart, newOrder]; // Add new order to cart
    setCart(updatedCart); // Update the cart
    navigate('/order-confirmation', { state: { cart: updatedCart } }); // Navigate to order confirmation
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart && cart.length > 0 && cart.map((order, orderIndex) => (
        <div key={orderIndex} className="order-container">
          <h2>Order {orderIndex + 1}</h2>
          {order.items && order.items.length > 0 && order.items.map((item, itemIndex) => {
            const { name, options, basePrice, toppingsPrice, vat, totalPrice } = item;
            return (
              <div key={itemIndex} className="cart-item">
                <div className="cart-info">
                  <h3>{name}</h3>
                  <p>Options: {options.join(', ')}</p>
                  <p>Base Price: {basePrice} ZAR</p>
                  <p>Toppings Price: {toppingsPrice} ZAR</p>
                  <p>VAT (15%): {vat.toFixed(2)} ZAR</p>
                  <p>Total Price: {totalPrice.toFixed(2)} ZAR</p>
                </div>
                <div className="buttons">
                  <button className="cart-btn remove-btn" onClick={() => handleRemoveItem(orderIndex, itemIndex)}>Remove</button>
                  <button className="cart-btn edit-btn" onClick={() => handleEditItem(orderIndex, itemIndex)}>Edit</button>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Place New Order Button */}
      <div className="place-order-container">
        <button className="place-order-btn" onClick={() => handlePlaceOrder({ items: [] })}>Place New Order</button>
      </div>
    </div>
  );
}

export default Cart;

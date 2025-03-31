import React, { useEffect, useState } from "react";

function Orders() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const storedTotal = JSON.parse(localStorage.getItem("orderTotal")) || 0;
    const storedOrderDetails = JSON.parse(localStorage.getItem("orderDetails")) || [];
    
    setTotalPrice(storedTotal);
    setOrderDetails(storedOrderDetails);
  }, []);

  const handleCheckout = async () => {
    window.location.href = "https://buy.stripe.com/test_8wM9BXdGSfEeb6gaEE"; // Replace with actual checkout URL
  };

  return (
    <div className="payment-container">
      <h2>Complete Your Payment</h2>
      <p>Total Amount: {parseFloat(totalPrice).toFixed(2)} ZAR</p>

      {/* Display Order Details */}
      <div className="order-details">
        <h3>Your Order Details</h3>
        {orderDetails.length > 0 ? (
          orderDetails.map((order, orderIndex) => (
            <div key={orderIndex} className="order-summary">
              <h4>Order {orderIndex + 1}</h4>
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="order-item">
                  <p><strong>{item.name}</strong></p>
                  <p>Options: {item.options.join(", ")}</p>
                  <p>Base Price: {item.basePrice} ZAR</p>
                  <p>Toppings Price: {item.toppingsPrice} ZAR</p>
                  <p>VAT (15%): {item.vat.toFixed(2)} ZAR</p>
                  <p>Total Price: {item.totalPrice.toFixed(2)} ZAR</p>
                </div>
              ))}
              <hr />
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>

      {/* Payment Button */}
      <button onClick={handleCheckout}>Pay Now</button>
    </div>
  );
}

export default Orders;

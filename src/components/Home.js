import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../components/styles/home.css'; 

function Home() {
  const navigate = useNavigate(); 

  const foodItems = [
    {
      name: "Pizza",
      description: "Delicious cheese and tomato pizza with your choice of toppings.",
      image: "https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=k60TjxKIOIxJpd4F4yLMVjsniB4W1BpEV4Mi_nb4uJU=",
      price: 150.00, // Price of the base food item
      place: "Vendahood Pizza ",
      options: [
        { name: "Grilled", price: 20.0 },
        { name: "Fried", price: 25.0 },
        { name: "Vegetarian", price: 15.0 },
        { name: "Pepperoni", price: 30.0 }
      ]
    },
    {
      name: "Burger",
      description: "Juicy beef burger with fresh lettuce, tomato, and cheese.",
      image: "https://media.istockphoto.com/id/1309352410/photo/cheeseburger-with-tomato-and-lettuce-on-wooden-board.jpg?s=612x612&w=0&k=20&c=lfsA0dHDMQdam2M1yvva0_RXfjAyp4gyLtx4YUJmXgg=",
      price: 100.00,
      place: "Khosi Vho-Burger",
      options: [
        { name: "Cheese", price: 10.0 },
        { name: "Bacon", price: 15.0 },
        { name: "Lettuce", price: 5.0 },
        { name: "Pickles", price: 7.0 }
      ]
    },
    {
      name: "Sushi",
      description: "Fresh sushi with a variety of fillings like tuna, salmon, and avocado.",
      image: "https://www.allrecipes.com/thmb/XT7-9MROYJZvNyQR4J40HGOVDmQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/19511smoked-salmon-sushi-rollfabeveryday4x3-159a22b4d3ac49fe9a146db94b53c930.jpg",
      price: 180.00,
      place: "Ha Vho-Sushi" ,
      options: [
        { name: "Tuna", price: 20.0 },
        { name: "Salmon", price: 25.0 },
        { name: "Avocado", price: 15.0 },
        { name: "Cucumber", price: 10.0 }
      ]
    },
    {
      name: "Pasta",
      description: "Creamy pasta with your choice of sauce, like Alfredo or Marinara.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs2paowiODEqEOJ082fLEWgrlBjvBlGd2GrQ&s",
      price: 130.00,
      place: "Pasta Place",
      options: [
        { name: "Alfredo", price: 20.0 },
        { name: "Marinara", price: 15.0 },
        { name: "Pesto", price: 18.0 },
        { name: "Creamy Garlic", price: 22.0 }
      ]
    },
  ];




  const [selectedFood, setSelectedFood] = useState(null); 
  const [selectedOptions, setSelectedOptions] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [deliveryMethod, setDeliveryMethod] = useState('collection'); 
  
  const DELIVERY_FEE = 30.0; // Fixed delivery fee
  
  const handleFoodClick = (food) => {
    setSelectedFood(food);
  };

  const handleOptionChange = (option) => {
    setSelectedOptions((prevState) => {
      if (prevState.includes(option.name)) {
        return prevState.filter((item) => item !== option.name); 
      }
      return [...prevState, option.name]; 
    });
  };

  const handleSubmitOrder = () => {
    if (!selectedFood) {
      alert("Please select a food item first.");
      return;
    }
  
    const basePrice = selectedFood.price;
    const toppingsPrice = selectedOptions.reduce((total, option) => {
      const selectedOption = selectedFood.options.find((o) => o.name === option);
      return total + (selectedOption ? selectedOption.price : 0);
    }, 0);
  
    const vat = (basePrice + toppingsPrice) * 0.15;
    const deliveryCharge = deliveryMethod === 'delivery' ? DELIVERY_FEE : 0;
    const totalPrice = basePrice + toppingsPrice + vat + deliveryCharge;
  
    const newOrder = {
      items: [
        {
          name: selectedFood.name,
          options: selectedOptions,
          basePrice,
          toppingsPrice,
          vat,
          deliveryCharge,
          totalPrice,
          deliveryMethod,
        }
      ]
    };
  
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, newOrder];
  
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/cart', { state: { cart: updatedCart } });
  };

  return (
    <div className="home-container">
      <h1>Welcome to Our Food Menu</h1>
      <input
        type="text"
        placeholder="Search by restaurant..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} 
        className="search-bar"
      />
      <div className="food-menu">
        {foodItems.filter(food => food.place.toLowerCase().includes(searchQuery.toLowerCase())).map((food, index) => (
          <div key={index} className="food-item" onClick={() => handleFoodClick(food)}>
            <img src={food.image} alt={food.name} />
            <div className="food-info">
              <h3>{food.name}</h3>
              <p>{food.description}</p>
              <p>Price: {food.price} ZAR</p>
              <p>Place: {food.place}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedFood && (
        <div className="food-options-modal">
          <button className="close-btn" onClick={() => setSelectedFood(null)}>X</button>
          <h3>Customize Your {selectedFood.name}</h3>
          <div className="options-container">
            {selectedFood.options.map((option, index) => (
              <div key={index} className="option-item">
                <input
                  type="checkbox"
                  id={option.name}
                  checked={selectedOptions.includes(option.name)}
                  onChange={() => handleOptionChange(option)}
                />
                <label htmlFor={option.name}>{option.name} (+{option.price} ZAR)</label>
              </div>
            ))}
          </div>
          <div className="delivery-method">
            <label>
              <input
                type="radio"
                value="collection"
                checked={deliveryMethod === 'collection'}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              Collection (Free)
            </label>
            <label>
              <input
                type="radio"
                value="delivery"
                checked={deliveryMethod === 'delivery'}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              Delivery (+{DELIVERY_FEE} ZAR)
            </label>
          </div>
          <button className="submit-order" onClick={handleSubmitOrder}>Submit Order</button>
        </div>
      )}
    </div>
  );
}

export default Home;

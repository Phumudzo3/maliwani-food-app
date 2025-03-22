// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import StoreModal from "./StoreModal";
// import "./styles/home.css"; // Import styles

// const Home = () => {
//   const [stores, setStores] = useState([]);
//   const [filteredStores, setFilteredStores] = useState([]);
//   const [selectedStore, setSelectedStore] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");  // Search query state
//   const [radius, setRadius] = useState(""); // Radius state

//   useEffect(() => {
//     const fetchStores = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem("authToken");

//         if (!token) {
//           throw new Error("Authentication token is missing.");
//         }

//         const response = await axios.get(
//           "https://backend-food-app-pz8p.onrender.com/api/store/getAllStores",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log("API Response:", response.data);

//         if (response.data && Array.isArray(response.data)) {
//           setStores(response.data);
//           setFilteredStores(response.data); // Initially show all stores
//         } else {
//           throw new Error("Unexpected API response");
//         }
//       } catch (error) {
//         console.error("Error fetching stores:", error.message);
//         setError(error.response?.data?.message || error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStores();
//   }, []);

//   // Function to filter stores based on search query and radius
//   const filterStores = () => {
//     let filtered = stores;

//     if (searchQuery) {
//       filtered = filtered.filter(store =>
//         store.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by name
//       );
//     }

//     if (radius) {
//       // Assuming stores have a location with coordinates (latitude, longitude)
//       filtered = filtered.filter(store => {
//         const storeLocation = store.location.coordinates;
//         const distance = calculateDistance(storeLocation); // Calculate distance from user's location
//         return distance <= radius;
//       });
//     }

//     setFilteredStores(filtered);
//   };

//   // Function to calculate distance between two coordinates (latitude, longitude)
//   const calculateDistance = (storeLocation) => {
//     // This example assumes the user's location is a static point (e.g., some fixed latitude/longitude)
//     const userLocation = { lat: 40.7128, lng: -74.0060 }; // Replace with real user location

//     const toRad = (value) => (value * Math.PI) / 180;
//     const R = 6371; // Radius of the Earth in kilometers
//     const dLat = toRad(storeLocation[1] - userLocation.lat);
//     const dLon = toRad(storeLocation[0] - userLocation.lng);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(toRad(userLocation.lat)) *
//         Math.cos(toRad(storeLocation[1])) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c; // Distance in kilometers

//     return distance;
//   };

//   // Handle search query input change
//   const handleSearchQueryChange = (e) => {
//     setSearchQuery(e.target.value);
//     filterStores();
//   };

//   // Handle radius input change
//   const handleRadiusChange = (e) => {
//     setRadius(e.target.value);
//     filterStores();
//   };

//   return (
//     <div className="home-container">
//       {loading && <p>Loading stores...</p>}
//       {error && <p className="error-message">{error}</p>}

//       {/* Search bar and radius input */}
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search stores by name..."
//           value={searchQuery}
//           onChange={handleSearchQueryChange}
//           className="search-bar"
//         />
//         <input
//           type="number"
//           placeholder="Radius (km)"
//           value={radius}
//           onChange={handleRadiusChange}
//           className="radius-input"
//         />
//       </div>

//       {/* Store cards */}
//       <div className="store-cards-container">
//         {filteredStores.map((store) => (
//           <div
//             key={store._id}
//             className="store-card"
//             onClick={() => setSelectedStore(store)}
//           >
//             <img
//               src={store.image || "/default-store.jpg"}
//               alt={store.name}
//               className="store-image"
//             />
//             <div className="store-info">
//               <h3>{store.name}</h3>
//               <p>
//                 {typeof store.location === "object"
//                   ? `Lat: ${store.location.coordinates[1]}, Lng: ${store.location.coordinates[0]}`
//                   : store.location}
//               </p>
//               <button className="view-store-btn">View Details</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedStore && (
//         <StoreModal store={selectedStore} onClose={() => setSelectedStore(null)} />
//       )}
//     </div>
//   );
// };

// export default Home;
// /* home.css */

// /* Container for the whole homepage */
// .home-container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     padding: 20px;
//   }
  
//   /* Styling the error message */
//   .error-message {
//     color: red;
//     font-size: 1.2rem;
//     margin: 10px;
//   }
  
//   /* Flex container for store cards */
//   .store-cards-container {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//     gap: 20px; /* Spacing between the cards */
//   }
  
//   /* Styling individual store card */
//   .store-card {
//     width: 250px; /* Card width */
//     background-color: #fff;
//     border-radius: 8px;
//     overflow: hidden;
//     box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//     cursor: pointer;
//     transition: transform 0.2s ease-in-out;
//   }
  
//   /* Hover effect for card */
//   .store-card:hover {
//     transform: translateY(-5px); /* Slight lift effect */
//   }
  
//   /* Image within the card */
//   .store-image {
//     width: 100%;
//     height: 150px;
//     object-fit: cover; /* Ensures image doesn't stretch */
//     border-bottom: 2px solid #ddd; /* Light border under image */
//   }
  
//   /* Store info within the card */
//   .store-info {
//     padding: 15px;
//   }
  
//   .store-info h3 {
//     font-size: 1.2rem;
//     margin-bottom: 10px;
//     font-weight: bold;
//   }
  
//   .store-info p {
//     font-size: 0.9rem;
//     color: #555;
//     margin-bottom: 10px;
//   }
  
//   /* Button to view details */
//   .view-store-btn {
//     padding: 8px 16px;
//     background-color: #007bff;
//     color: #fff;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     font-size: 0.9rem;
//     transition: background-color 0.3s ease;
//   }
  
//   /* Button hover effect */
//   .view-store-btn:hover {
//     background-color: #0056b3;
//   }
  
//   /* Search bar and radius input styling */
//   .search-container {
//     display: flex;
//     gap: 10px;
//     margin-bottom: 20px;
//   }
  
//   .search-bar,
//   .radius-input {
//     padding: 8px 15px;
//     font-size: 1rem;
//     border: 1px solid #ddd;
//     border-radius: 5px;
//   }
  
//   .search-bar {
//     width: 200px;
//   }
  
//   .radius-input {
//     width: 100px;
//   }
  
//   @media (max-width: 768px) {
//     .store-card {
//       width: 100%;
//       max-width: 300px; /* For mobile screens, make the cards more prominent */
//     }
//   }
  
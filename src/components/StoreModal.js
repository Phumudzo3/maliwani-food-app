import React from "react";
import "./styles/modal.css"; // Ensure you have this file

const StoreModal = ({ store, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <img src={store.image} alt={store.name} className="store-image" />
        <h2>{store.name}</h2>
        <p>{store.description}</p>
        <p><strong>Location:</strong> {store.location}</p>
        <p><strong>Contact:</strong> {store.phone}</p>
      </div>
    </div>
  );
};

export default StoreModal;

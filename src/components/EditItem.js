import React, { useState } from 'react'; // Removed useEffect
import { useLocation, useNavigate } from 'react-router-dom';

function EditItem() {
  const { state } = useLocation(); // Get the item and its index from the location state
  const navigate = useNavigate();
  const { item, index } = state || {};

  const [editedItem, setEditedItem] = useState(item);

  // Logic to update the cart when saving changes
  const handleSave = () => {
    // Update the cart by replacing the old item with the edited one
    const updatedCart = [...state.cart];
    updatedCart[index] = editedItem; // Replace the old item with the new one
    
    // Navigate back to the cart with the updated cart
    navigate('/cart', { state: { cart: updatedCart } });
  };

  if (!item) {
    return <h2>No item to edit</h2>;
  }

  return (
    <div className="edit-item-container">
      <h1>Edit Item</h1>
      <div>
        <label>Item Name:</label>
        <input
          type="text"
          value={editedItem.name}
          onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
        />
      </div>
      <div>
        <label>Options:</label>
        <input
          type="text"
          value={editedItem.options.join(', ')}
          onChange={(e) => setEditedItem({ ...editedItem, options: e.target.value.split(', ') })}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={editedItem.price}
          onChange={(e) => setEditedItem({ ...editedItem, price: Number(e.target.value) })}
        />
      </div>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
}

export default EditItem;

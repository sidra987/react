import React, { useState } from 'react';
import './App.css';

// Simulating a database with an initial set of items
let initialItems = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Michael Johnson' }
];

function App() {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [editName, setEditName] = useState('');

  // Create Item
  const handleCreate = () => {
    if (newItem) {
      const newId = items.length ? items[items.length - 1].id + 1 : 1;
      setItems([...items, { id: newId, name: newItem }]);
      setNewItem('');
    }
  };

  // Delete Item
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Start Editing Item
  const handleEdit = (item) => {
    setEditItem(item);
    setEditName(item.name);
  };

  // Update Item
  const handleUpdate = () => {
    setItems(items.map(item => 
      item.id === editItem.id ? { ...item, name: editName } : item
    ));
    setEditItem(null);
    setEditName('');
  };

  return (
    <div className="App">
      <h1>CRUD Operations in React</h1>

      {/* Create Item */}
      <div>
        <input 
          type="text" 
          value={newItem} 
          onChange={(e) => setNewItem(e.target.value)} 
          placeholder="Enter name"
        />
        <button onClick={handleCreate}>Add Item</button>
      </div>

      {/* Edit Item */}
      {editItem && (
        <div>
          <input 
            type="text" 
            value={editName} 
            onChange={(e) => setEditName(e.target.value)} 
          />
          <button onClick={handleUpdate}>Update Item</button>
        </div>
      )}

      {/* Display List of Items */}
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} 
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

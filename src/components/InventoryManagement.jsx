import React, { useState } from 'react';

function InventoryManagement() {
  // State to manage inventory items
  const [items, setItems] = useState([
    { id: 1, name: 'Tiramisu', quantity: 10, price: 5.0 },
    { id: 2, name: 'Panettone', quantity: 5, price: 8.0 },
  ]);

  // Add new item handler
  const addItem = () => {
    const newItem = { id: Date.now(), name: 'New Item', quantity: 0, price: 0.0 };
    setItems([...items, newItem]);
  };

  // Delete item handler
  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Edit item handler (for simplicity, we allow inline editing in this example)
  const editItem = (id, field, value) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4">
        <h1 className="text-2xl font-bold text-center text-orange-500 mb-6">
          Dolce Sostegno - Inventory Management
        </h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-orange-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => editItem(item.id, 'name', e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => editItem(item.id, 'quantity', e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => editItem(item.id, 'price', parseFloat(e.target.value))}
                    className="w-full border border-gray-300 rounded px-2 py-1"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center mt-6">
          <button
            onClick={addItem}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Add New Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryManagement;

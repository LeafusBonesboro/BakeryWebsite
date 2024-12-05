import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  // State for the cart
  const [cart, setCart] = useState([]);

  // List of items available to order
  const items = [
    { id: 1, name: 'Tiramisu', price: 5.0 },
    { id: 2, name: 'Panettone', price: 8.0 },
    { id: 3, name: 'Cannoli', price: 3.5 },
    { id: 4, name: 'Amaretti', price: 2.5 },
  ];

  // Add item to the cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // Remove item from the cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  // React Router's navigation hook
  const navigate = useNavigate();

  // Navigate to checkout page
  const handleCheckout = () => {
    console.log('Navigating to Checkout with:', { cart, totalPrice });
    navigate('/checkout', { state: { cart, totalPrice } });
  };

  return (
    <div className="bg-[#faf5f0] min-h-screen flex flex-col">
      {/* Orders Header */}
      <header className="bg-[#d8a47f] p-4">
        <h1 className="text-white text-center text-2xl font-bold">Place Your Order</h1>
      </header>

      {/* Items List */}
      <section className="flex flex-wrap justify-center gap-8 p-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-4 w-64 text-center hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-[#a86541] mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(item)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </section>

      {/* Cart Section */}
      <section className="bg-white p-8 shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="text-lg">{item.name}</span>
                <span className="text-gray-600">${item.price.toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="text-right mt-4">
          <h3 className="text-xl font-bold">
            Total: <span className="text-blue-500">${totalPrice.toFixed(2)}</span>
          </h3>
          {cart.length > 0 && (
            <button
              onClick={handleCheckout}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Checkout
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrdersPage;

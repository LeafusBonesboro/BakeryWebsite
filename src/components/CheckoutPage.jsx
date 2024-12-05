import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutPage = ({ setCart }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve cart and totalPrice from location.state
  const { cart = [], totalPrice = 0 } = location.state || {};

  // State for customer details
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    address: '',
  });

  // State for payment method and details
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [paymentDetails, setPaymentDetails] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // State for validation errors and order submission
  const [errors, setErrors] = useState({});
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Handle input changes for customer details
  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  // Handle input changes for payment details
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};

    if (!customerDetails.name) newErrors.name = 'Name is required';
    if (!customerDetails.email) newErrors.email = 'Email is required';
    if (!customerDetails.address) newErrors.address = 'Address is required';

    if (paymentMethod === 'credit') {
      if (!paymentDetails.cardholderName) newErrors.cardholderName = 'Cardholder Name is required';
      if (!paymentDetails.cardNumber) newErrors.cardNumber = 'Card Number is required';
      if (!paymentDetails.expiryDate) newErrors.expiryDate = 'Expiry Date is required';
      if (!paymentDetails.cvv) newErrors.cvv = 'CVV is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle order submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log('Order Submitted:', {
      customerDetails,
      cart,
      paymentMethod,
      paymentDetails: paymentMethod === 'credit' ? paymentDetails : null,
    });

    setOrderSubmitted(true);
    setCart([]); // Clear the cart after submission
  };

  // Redirect if no cart data is available
  if (!cart.length) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-xl font-bold">Your cart is empty!</h1>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate('/orders')}
        >
          Return to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#faf5f0] min-h-screen flex flex-col">
      <header className="bg-[#d8a47f] p-4">
        <h1 className="text-white text-center text-2xl font-bold">Checkout</h1>
      </header>

      <main className="container mx-auto p-6">
        {orderSubmitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-500 mb-4">Thank you for your order!</h2>
            <p className="text-gray-700">Your order has been placed successfully.</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => navigate('/orders')}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Summary */}
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-2">
                  <span className="text-lg">{item.name}</span>
                  <span className="text-gray-600">${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <h3 className="text-right mt-4 text-xl font-bold">
              Total: <span className="text-blue-500">${totalPrice.toFixed(2)}</span>
            </h3>

            {/* Customer Details */}
            <h2 className="text-xl font-bold mt-8 mb-4">Customer Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-bold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={customerDetails.name}
                  onChange={handleCustomerChange}
                  className={`w-full border px-4 py-2 rounded ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={customerDetails.email}
                  onChange={handleCustomerChange}
                  className={`w-full border px-4 py-2 rounded ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-2">Address</label>
                <textarea
                  name="address"
                  value={customerDetails.address}
                  onChange={handleCustomerChange}
                  className={`w-full border px-4 py-2 rounded ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>

              {/* Payment Options */}
              <h2 className="text-xl font-bold mt-8 mb-4">Payment Options</h2>
              <div className="space-y-2">
                <label className="block font-bold text-gray-700">Payment Method</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="credit"
                      checked={paymentMethod === 'credit'}
                      onChange={handlePaymentMethodChange}
                    />
                    <span>Credit Card</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="mobile"
                      checked={paymentMethod === 'mobile'}
                      onChange={handlePaymentMethodChange}
                    />
                    <span>Mobile Pay</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={handlePaymentMethodChange}
                    />
                    <span>Cash</span>
                  </label>
                </div>
              </div>

              {paymentMethod === 'credit' && (
                <>
                  <div>
                    <label className="block font-bold text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={paymentDetails.cardholderName}
                      onChange={handlePaymentChange}
                      className={`w-full border px-4 py-2 rounded ${
                        errors.cardholderName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.cardholderName && (
                      <p className="text-red-500 text-sm">{errors.cardholderName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentDetails.cardNumber}
                      onChange={handlePaymentChange}
                      className={`w-full border px-4 py-2 rounded ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                  </div>
                  <div className="flex space-x-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-2">Expiry Date (MM/YY)</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentDetails.expiryDate}
                        onChange={handlePaymentChange}
                        className={`w-full border px-4 py-2 rounded ${
                          errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500 text-sm">{errors.expiryDate}</p>
                      )}
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={handlePaymentChange}
                        className={`w-full border px-4 py-2 rounded ${
                          errors.cvv ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                  Pay Now
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                  onClick={() => setCart([])}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                  onClick={() => navigate('/orders')}
                >
                  Keep Ordering
                </button>
              </div>
            </form>
          </>
        )}
      </main>
    </div>
  );
};

export default CheckoutPage;

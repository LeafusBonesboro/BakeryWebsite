import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import OrdersPage from './components/OrdersPage';
import InventoryManagement from './components/InventoryManagement';
import CheckoutPage from './components/CheckoutPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/inventory" element={<InventoryManagement />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

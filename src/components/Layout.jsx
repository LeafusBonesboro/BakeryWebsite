import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="bg-[#faf5f0] min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <header className="bg-[#d8a47f] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Dolce Sostegno</h1>
          <nav className="flex space-x-6">
            <Link to="/" className="text-white hover:underline">
              Home
            </Link>
            <Link to="/orders" className="text-white hover:underline">
              Orders
            </Link>
            <Link to="/inventory" className="text-white hover:underline">
              Inventory
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-[#6b4f3d] text-white text-center py-4">
        <p>&copy; 2024 Dolce Sostegno | Crafted with ❤️ in Italy</p>
      </footer>
    </div>
  );
};

export default Layout;

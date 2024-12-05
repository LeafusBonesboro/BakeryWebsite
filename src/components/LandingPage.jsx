import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-[#faf5f0] min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#fdf3e7] py-16 text-center">
        <h2 className="text-4xl font-bold text-[#a86541] mb-4">Authentic Italian Pastries</h2>
        <p className="text-gray-600 text-lg">
          Savor the taste of tradition and quality, crafted with love and care.
        </p>
      </section>

      {/* Cards Section */}
      <section className="flex flex-wrap justify-center gap-8 p-8 bg-[#faf5f0]">
        {[
          { name: 'Tiramisu', description: 'A classic Italian dessert made with mascarpone and espresso-soaked ladyfingers.' },
          { name: 'Panettone', description: 'A sweet and fluffy bread filled with candied fruits and raisins.' },
          { name: 'Cannoli', description: 'Crunchy pastry shells filled with sweet ricotta cheese.' },
          { name: 'Amaretti', description: 'Soft almond cookies with a delicate flavor and texture.' },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 w-64 text-center hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-[#a86541] mb-2">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </section>

      {/* Footer is already handled in Layout */}
    </div>
  );
};

export default LandingPage;

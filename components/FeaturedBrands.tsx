import React from 'react';

const brands = ['TechNova', 'Orion', 'CyberPower', 'PixelArt'];

const FeaturedBrands: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 bg-slate-800">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold text-white tracking-tight mb-8">
          Shop By Top Brands
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {brands.map((brand) => (
            <div key={brand} className="flex justify-center items-center p-4">
              <span className="text-2xl font-semibold text-slate-400 transition-colors hover:text-white cursor-pointer">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBrands;
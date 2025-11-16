import React from 'react';

interface FilterControlsProps {
  brands: string[];
  onBrandChange: (brand: string) => void;
  onPriceChange: (priceRange: string) => void;
  onSortChange: (sortOrder: string) => void;
  onAddProductClick: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ brands, onBrandChange, onPriceChange, onSortChange, onAddProductClick }) => {
  return (
    <div className="py-6 px-4 bg-slate-800/60 backdrop-blur-sm rounded-lg mb-8 flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4 border border-slate-700">
        <div className="w-full sm:w-auto flex-grow">
            <label htmlFor="brand-filter" className="block text-sm font-medium text-slate-300 mb-1">
                Lọc theo hãng
            </label>
            <select
                id="brand-filter"
                name="brand-filter"
                onChange={(e) => onBrandChange(e.target.value)}
                className="w-full bg-slate-700/80 border border-slate-600 rounded-md text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
            >
                {brands.map(brand => (
                    <option key={brand} value={brand}>{brand === 'all' ? 'Tất cả các hãng' : brand}</option>
                ))}
            </select>
        </div>
        
        <div className="w-full sm:w-auto flex-grow">
            <label htmlFor="price-filter" className="block text-sm font-medium text-slate-300 mb-1">
                Lọc theo giá
            </label>
            <select
                id="price-filter"
                name="price-filter"
                onChange={(e) => onPriceChange(e.target.value)}
                className="w-full bg-slate-700/80 border border-slate-600 rounded-md text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
            >
                <option value="all">Tất cả mức giá</option>
                <option value="lt20">Dưới 20.000.000₫</option>
                <option value="20-40">20.000.000₫ - 40.000.000₫</option>
                <option value="gt40">Trên 40.000.000₫</option>
            </select>
        </div>
        
        <div className="w-full sm:w-auto flex-grow">
            <label htmlFor="sort-order" className="block text-sm font-medium text-slate-300 mb-1">
                Sắp xếp theo
            </label>
            <select
                id="sort-order"
                name="sort-order"
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full bg-slate-700/80 border border-slate-600 rounded-md text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
            >
                <option value="featured">Mặc định</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="name-asc">Tên: A-Z</option>
            </select>
        </div>
        
        <div className="w-full sm:w-auto flex-shrink-0 self-end">
            <button
                onClick={onAddProductClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 border border-transparent rounded-md text-sm font-medium text-white hover:shadow-lg hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-all transform hover:scale-105"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Thêm sản phẩm
            </button>
        </div>
    </div>
  );
};

export default FilterControls;
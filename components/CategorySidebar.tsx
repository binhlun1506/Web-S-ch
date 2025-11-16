import React from 'react';

interface CategorySidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700 h-full">
      <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-600 pb-2">Danh mục sản phẩm</h3>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => onSelectCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all transform origin-left ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-md'
                  : 'text-slate-300 hover:bg-slate-700/80 hover:text-white hover:scale-105'
              }`}
            >
              {category === 'all' ? 'Tất cả sản phẩm' : category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
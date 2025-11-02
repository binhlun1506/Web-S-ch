import React from 'react';

interface CategorySidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 h-full">
      <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-600 pb-2">Danh mục sản phẩm</h3>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => onSelectCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
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

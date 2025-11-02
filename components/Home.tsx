import React, { useState, useMemo, useRef } from 'react';
import { Product } from '../types';
import Hero from './Hero';
import FeaturedBrands from './FeaturedBrands';
import ProductList from './ProductList';
import FilterControls from './FilterControls';
import CategorySidebar from './CategorySidebar';
import PromoBanners from './PromoBanners';

interface HomeProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ products, onSelectProduct }) => {
  const productSectionRef = useRef<HTMLDivElement>(null);

  const [brandFilter, setBrandFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('featured');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const availableBrands = useMemo(() => ['all', ...Array.from(new Set(products.map(p => p.brand)))], [products]);
  const availableCategories = useMemo(() => ['all', ...Array.from(new Set(mockProducts.map(p => p.category)))], []);

  const filteredAndSortedProducts = useMemo(() => {
    let processedProducts = [...products];

    // Lọc theo danh mục
    if (categoryFilter !== 'all') {
      processedProducts = processedProducts.filter(p => p.category === categoryFilter);
    }

    // Lọc theo hãng
    if (brandFilter !== 'all') {
      processedProducts = processedProducts.filter(p => p.brand === brandFilter);
    }

    // Lọc theo giá
    if (priceFilter === 'lt20') {
      processedProducts = processedProducts.filter(p => p.price < 20000000);
    } else if (priceFilter === '20-40') {
      processedProducts = processedProducts.filter(p => p.price >= 20000000 && p.price <= 40000000);
    } else if (priceFilter === 'gt40') {
      processedProducts = processedProducts.filter(p => p.price > 40000000);
    }
    
    // Sắp xếp
    switch (sortOrder) {
      case 'price-asc':
        processedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        processedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        processedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        break;
    }
    
    return processedProducts;
  }, [products, brandFilter, priceFilter, sortOrder, categoryFilter]);


  const handleShopNowClick = () => {
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Cột trái: Danh mục */}
        <aside className="lg:col-span-1">
            <CategorySidebar 
              categories={availableCategories}
              selectedCategory={categoryFilter}
              onSelectCategory={setCategoryFilter}
            />
        </aside>

        {/* Cột phải: Nội dung chính */}
        <div className="lg:col-span-3">
            <Hero onShopNowClick={handleShopNowClick} />
            <PromoBanners />
        </div>
      </div>
      
      {/* Phần sản phẩm */}
      <div className="mt-12">
        <FilterControls
            brands={availableBrands}
            onBrandChange={setBrandFilter}
            onPriceChange={setPriceFilter}
            onSortChange={setSortOrder}
        />
        <ProductList 
          ref={productSectionRef}
          products={filteredAndSortedProducts} 
          onSelectProduct={onSelectProduct} 
        />
      </div>

      <FeaturedBrands />
    </div>
  );
};

// Cần thêm mockProducts ở đây để availableCategories có thể truy cập
import { mockProducts } from '../data/products';

export default Home;

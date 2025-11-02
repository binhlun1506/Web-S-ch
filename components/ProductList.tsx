import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const ProductList = React.forwardRef<HTMLDivElement, ProductListProps>(
  ({ products, onSelectProduct }, ref) => {
  return (
    <div ref={ref} className="pt-16 sm:pt-24 pb-16">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-12 text-center">Sản phẩm nổi bật</h2>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-xl text-slate-400">Không tìm thấy sản phẩm nào phù hợp.</p>
          <p className="mt-1 text-sm text-slate-500">Vui lòng thử thay đổi bộ lọc của bạn.</p>
        </div>
      )}
    </div>
  );
});

export default ProductList;

import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }

  return (
    <div 
        onClick={() => onSelectProduct(product)}
        className="group relative cursor-pointer bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-cyan-500/30 hover:scale-105"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-slate-700 lg:aspect-none group-hover:opacity-80 lg:h-80 transition-opacity">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-slate-400">{product.brand}</p>
        </div>
        <p className="text-xl font-bold text-cyan-400 mt-4">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
};

export default ProductCard;

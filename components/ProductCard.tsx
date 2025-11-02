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
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-slate-700 group-hover:opacity-80 transition-opacity">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="p-3">
        <h3 className="text-base font-semibold text-white truncate" title={product.name}>
          <span aria-hidden="true" className="absolute inset-0" />
          {product.name}
        </h3>
        <p className="text-lg font-bold text-cyan-400 mt-1">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
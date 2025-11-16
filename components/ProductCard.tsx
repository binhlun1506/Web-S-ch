import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct, onAddToCart, onQuickView }) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }
    
    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Ngăn không cho sự kiện click lan ra thẻ cha (tránh mở trang chi tiết)
        onAddToCart(product);
    };

    const handleQuickViewClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onQuickView(product);
    };
    
    const handleCardKeyDown = (e: React.KeyboardEvent) => {
      // Allow keyboard activation of the card itself, but not if the event target is a button inside it
      if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onSelectProduct(product);
      }
    };

    const productId = `product-${product.id}`;

  return (
    <div 
        onClick={() => onSelectProduct(product)}
        onKeyDown={handleCardKeyDown}
        tabIndex={0}
        role="group"
        aria-labelledby={`${productId}-name`}
        className="group relative cursor-pointer bg-slate-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-700/80 transition-all duration-300 hover:border-cyan-400 hover:-translate-y-2 flex flex-col shadow-lg hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-500"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-slate-700/50">
        <img
          src={product.imageUrl}
          alt={`Hình ảnh của ${product.name}`}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-slate-400 mb-1">{product.brand}</p>
        <h3 id={`${productId}-name`} className="text-base font-semibold text-white h-12 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]" title={product.name}>
          <span aria-hidden="true" className="absolute inset-0" />
          {product.name}
        </h3>
         <div className="mt-2">
            <span className="inline-block bg-slate-700/80 rounded-full px-3 py-1 text-xs font-semibold text-cyan-300">
                {product.category}
            </span>
        </div>
        <div className="mt-auto pt-4 flex justify-between items-center">
            <p className="text-lg font-bold text-cyan-400">{formatPrice(product.price)}</p>
            <div className="flex items-center gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100">
                 <button
                    onClick={handleQuickViewClick}
                    aria-label={`Xem nhanh sản phẩm ${product.name}`}
                    title="Xem nhanh"
                    className="p-2 rounded-full bg-slate-700/80 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all transform hover:scale-110"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                </button>
                <button
                    onClick={handleAddToCartClick}
                    aria-label={`Thêm sản phẩm ${product.name} vào giỏ hàng`}
                    title="Thêm vào giỏ hàng"
                    className="p-2 rounded-full bg-slate-700/80 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all transform hover:scale-110"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
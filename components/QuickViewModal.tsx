import React from 'react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose(); // Đóng modal sau khi thêm vào giỏ hàng
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 bg-opacity-80 transition-opacity animate-fade-in"
      onClick={onClose}
      aria-labelledby="quick-view-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-slate-800/80 backdrop-blur-lg border border-slate-700 rounded-lg shadow-xl w-full max-w-4xl m-4 max-h-[90vh] flex flex-col md:flex-row animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition-transform transform hover:scale-110"
          onClick={onClose}
        >
          <span className="sr-only">Đóng</span>
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="w-full md:w-1/2 flex-shrink-0">
             <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
        </div>

        {/* Product info */}
        <div className="p-8 flex flex-col overflow-y-auto w-full md:w-1/2">
            <h1 id="quick-view-title" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{product.name}</h1>
            <p className="text-md text-slate-400 mt-1">{product.brand}</p>

            <div className="mt-4">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-cyan-400 font-bold">{formatPrice(product.price)}</p>
            </div>
            
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-slate-300 space-y-4">
                <p>{product.description}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-2">Thông số kỹ thuật</h3>
              <ul className="text-sm text-slate-300 space-y-2 border border-slate-700/80 rounded-lg p-4 bg-slate-900/40">
                  <li className="flex justify-between gap-4"><span className="font-medium text-slate-400">CPU</span><span className="text-right">{product.specs.cpu}</span></li>
                  <li className="flex justify-between gap-4"><span className="font-medium text-slate-400">GPU</span><span className="text-right">{product.specs.gpu}</span></li>
                  <li className="flex justify-between gap-4"><span className="font-medium text-slate-400">RAM</span><span className="text-right">{product.specs.ram}</span></li>
                  <li className="flex justify-between gap-4"><span className="font-medium text-slate-400">Ổ cứng</span><span className="text-right">{product.specs.storage}</span></li>
                  <li className="flex justify-between gap-4"><span className="font-medium text-slate-400">Màn hình</span><span className="text-right">{product.specs.display}</span></li>
              </ul>
            </div>

            <div className="mt-auto pt-8">
              <button
                onClick={handleAddToCart}
                type="button"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:shadow-lg hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-all transform hover:scale-105"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;

import React from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBack }) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }
    
  return (
    <div className="animate-fade-in">
        <button 
            onClick={onBack} 
            className="mb-8 inline-flex items-center font-semibold text-cyan-400 hover:text-cyan-300 transition-all transform hover:scale-105"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại danh sách
        </button>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
        {/* Image gallery */}
        <div className="rounded-lg overflow-hidden bg-slate-800/50 shadow-2xl border border-slate-700">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-center object-cover" />
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">{product.name}</h1>
          <p className="text-lg text-slate-400 mt-1">{product.brand}</p>

          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-4xl text-cyan-400 font-bold">{formatPrice(product.price)}</p>
          </div>
          
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-slate-300 space-y-6">
              <p>{product.description}</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">Thông số kỹ thuật</h3>
            <ul className="divide-y divide-slate-700/80 text-slate-300 border border-slate-700/80 rounded-lg p-4 bg-slate-800/40">
                <li className="py-3 flex justify-between"><span className="font-medium text-slate-400">CPU</span><span>{product.specs.cpu}</span></li>
                <li className="py-3 flex justify-between"><span className="font-medium text-slate-400">GPU</span><span>{product.specs.gpu}</span></li>
                <li className="py-3 flex justify-between"><span className="font-medium text-slate-400">RAM</span><span>{product.specs.ram}</span></li>
                <li className="py-3 flex justify-between"><span className="font-medium text-slate-400">Ổ cứng</span><span>{product.specs.storage}</span></li>
                <li className="py-3 flex justify-between"><span className="font-medium text-slate-400">Màn hình</span><span>{product.specs.display}</span></li>
            </ul>
          </div>

          <div className="mt-10">
            <button
              onClick={() => onAddToCart(product)}
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:shadow-lg hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all transform hover:scale-105"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
import React, { useState, FormEvent } from 'react';
import { Product } from '../types';

type NewProductData = Omit<Product, 'id'>;

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (productData: NewProductData) => void;
}

const initialProductState: NewProductData = {
  name: '',
  brand: '',
  price: 0,
  description: '',
  imageUrl: '',
  category: '',
  specs: {
    cpu: '',
    ram: '',
    storage: '',
    display: '',
    gpu: '',
  },
};

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAddProduct }) => {
  const [productData, setProductData] = useState<NewProductData>(initialProductState);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      specs: {
        ...prev.specs,
        [name]: value,
      },
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const price = value === '' ? 0 : parseInt(value, 10);
    if (!isNaN(price)) {
        setProductData(prev => ({ ...prev, price }));
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError('');

    if (!productData.name || !productData.brand || productData.price <= 0 || !productData.category || !productData.imageUrl) {
      setError('Vui lòng điền đầy đủ các trường thông tin bắt buộc.');
      return;
    }

    onAddProduct(productData);
    setProductData(initialProductState);
  };
  
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 bg-opacity-75 transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative bg-slate-800/80 backdrop-blur-lg border border-slate-700 rounded-lg shadow-xl p-8 w-full max-w-2xl m-4 transform transition-all max-h-[90vh] overflow-y-auto animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Thêm sản phẩm mới</h2>
          <button type="button" className="-m-2 p-2 text-slate-400 hover:text-white transition-transform transform hover:scale-110" onClick={onClose}>
            <span className="sr-only">Đóng</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">Tên sản phẩm</label>
              <input id="name" name="name" type="text" required value={productData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-slate-700/80 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-slate-300">Hãng sản xuất</label>
              <input id="brand" name="brand" type="text" required value={productData.brand} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-slate-700/80 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-slate-300">Giá (VND)</label>
              <input id="price" name="price" type="number" required value={productData.price === 0 ? '' : productData.price} onChange={handlePriceChange} className="mt-1 block w-full px-3 py-2 bg-slate-700/80 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-300">Danh mục</label>
              <input id="category" name="category" type="text" required value={productData.category} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-slate-700/80 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-300">URL Hình ảnh</label>
            <input id="imageUrl" name="imageUrl" type="text" required value={productData.imageUrl} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-slate-700/80 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-300">Mô tả</label>
            <textarea id="description" name="description" rows={3} value={productData.description} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-slate-700/80 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"></textarea>
          </div>
          
          <fieldset className="border border-slate-600 p-4 rounded-md">
            <legend className="text-lg font-semibold text-white px-2">Thông số kỹ thuật</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label htmlFor="cpu" className="block text-sm font-medium text-slate-300">CPU</label>
                  <input id="cpu" name="cpu" type="text" value={productData.specs.cpu} onChange={handleSpecChange} className="mt-1 block w-full px-3 py-2 bg-slate-700/80 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-cyan-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="gpu" className="block text-sm font-medium text-slate-300">GPU</label>
                  <input id="gpu" name="gpu" type="text" value={productData.specs.gpu} onChange={handleSpecChange} className="mt-1 block w-full px-3 py-2 bg-slate-700/80 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-cyan-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="ram" className="block text-sm font-medium text-slate-300">RAM</label>
                  <input id="ram" name="ram" type="text" value={productData.specs.ram} onChange={handleSpecChange} className="mt-1 block w-full px-3 py-2 bg-slate-700/80 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-cyan-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="storage" className="block text-sm font-medium text-slate-300">Ổ cứng</label>
                  <input id="storage" name="storage" type="text" value={productData.specs.storage} onChange={handleSpecChange} className="mt-1 block w-full px-3 py-2 bg-slate-700/80 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-cyan-500 sm:text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="display" className="block text-sm font-medium text-slate-300">Màn hình</label>
                  <input id="display" name="display" type="text" value={productData.specs.display} onChange={handleSpecChange} className="mt-1 block w-full px-3 py-2 bg-slate-700/80 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-cyan-500 sm:text-sm" />
                </div>
            </div>
          </fieldset>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 border border-slate-600 rounded-md shadow-sm text-sm font-medium text-slate-300 bg-transparent hover:bg-slate-700 focus:outline-none transition-transform transform hover:scale-105">
              Hủy
            </button>
            <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-all transform hover:scale-105">
              Thêm sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
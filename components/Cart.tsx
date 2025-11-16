
import React, { Fragment } from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, items, onClose, onUpdateQuantity, onRemoveItem }) => {

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };
  
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert(`Tổng thanh toán: ${formatPrice(totalPrice)}\nCảm ơn bạn đã mua hàng! (Đây là tính năng giả lập)`);
    onClose();
  }

  return (
    <div
      className={`fixed inset-0 overflow-hidden z-50 transition-opacity ${
        isOpen ? 'ease-out duration-500 opacity-100' : 'ease-in duration-300 opacity-0 pointer-events-none'
      }`}
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-slate-900 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div
            className={`pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex h-full flex-col overflow-y-scroll bg-slate-800/80 backdrop-blur-lg shadow-2xl border-l border-slate-700">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-white" id="slide-over-title">
                    Giỏ hàng
                  </h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button type="button" className="-m-2 p-2 text-slate-400 hover:text-white transition-transform transform hover:scale-110" onClick={onClose}>
                      <span className="sr-only">Close panel</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    {items.length === 0 ? (
                        <div className="text-center py-16">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p className="mt-4 text-xl text-slate-400">Giỏ hàng của bạn đang trống.</p>
                        </div>
                    ) : (
                    <ul role="list" className="-my-6 divide-y divide-slate-700">
                      {items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-slate-700">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-white">
                                <h3>{item.name}</h3>
                                <p className="ml-4">{formatPrice(item.price)}</p>
                              </div>
                              <p className="mt-1 text-sm text-slate-400">{item.brand}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex items-center">
                                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border border-slate-600 rounded-l text-slate-300 hover:bg-slate-700 transition-transform transform hover:scale-110">-</button>
                                <p className="w-12 text-center border-t border-b border-slate-600 text-slate-300 py-1">{item.quantity}</p>
                                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border border-slate-600 rounded-r text-slate-300 hover:bg-slate-700 transition-transform transform hover:scale-110">+</button>
                              </div>
                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={() => onRemoveItem(item.id)}
                                  className="font-medium text-cyan-500 hover:text-cyan-400 transition-transform transform hover:scale-105"
                                >
                                  Xóa
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    )}
                  </div>
                </div>
              </div>

              {items.length > 0 && (
              <div className="border-t border-slate-700 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-white">
                  <p>Tổng cộng</p>
                  <p>{formatPrice(totalPrice)}</p>
                </div>
                <p className="mt-0.5 text-sm text-slate-400">Phí vận chuyển sẽ được tính khi thanh toán.</p>
                <div className="mt-6">
                  <button
                    onClick={handleCheckout}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-base font-medium text-white shadow-lg hover:shadow-cyan-500/40 transition-all transform hover:scale-105"
                  >
                    Thanh toán
                  </button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-slate-400">
                  <p>
                    hoặc{' '}
                    <button
                      type="button"
                      className="font-medium text-cyan-500 hover:text-cyan-400 transition-transform transform hover:scale-105"
                      onClick={onClose}
                    >
                      Tiếp tục mua sắm<span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
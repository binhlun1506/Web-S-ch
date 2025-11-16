import React, {useState} from 'react';
import { User } from '../types';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
  currentUser: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onSearchChange: (searchTerm: string) => void;
}

const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick, onHomeClick, currentUser, onLoginClick, onLogout, onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      onSearchChange(e.target.value);
  }

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearchChange('');
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-900/70 backdrop-blur-md shadow-lg z-50 border-b border-slate-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div 
            className="flex items-center space-x-2 cursor-pointer flex-shrink-0"
            onClick={() => { onHomeClick(); onSearchChange(''); setSearchTerm(''); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <h1 className="text-2xl font-bold text-white tracking-tight hidden sm:block">
              <span className="text-gradient">TechGalaxy</span>
            </h1>
          </div>
          
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <SearchIcon />
              </div>
              <input 
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full bg-slate-800/50 border border-slate-700 rounded-md text-white px-3 py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
              />
              {searchTerm && (
                <button 
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white cursor-pointer"
                  aria-label="Clear search"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="items-center space-x-4 hidden md:flex">
                <span className="text-sm text-slate-300">Xin chào, {currentUser.email}</span>
                <button 
                  onClick={onLogout}
                  className="px-3 py-1.5 text-sm font-medium text-white bg-slate-700 rounded-md hover:bg-slate-600 transition-all transform hover:scale-105"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="items-center space-x-2 p-2 rounded-full text-slate-300 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all transform hover:scale-105 hidden md:flex"
              >
                <UserIcon />
                <span className="text-sm font-medium">Đăng nhập</span>
              </button>
            )}
            
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full text-slate-300 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all transform hover:scale-105"
            >
              <span className="sr-only">View shopping cart</span>
              <ShoppingCartIcon />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
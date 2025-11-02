import React, { useState, useMemo } from 'react';
import { Product, CartItem, User } from './types';
import { mockProducts } from './data/products';
import Header from './components/Header';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

export default function App() {
  const [products] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (productToAdd: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity: 1 }];
    });
    setIsCartOpen(true);
  };
  
  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleLogin = (email: string) => {
    setCurrentUser({ email });
    setIsAuthModalOpen(false);
  };

  const handleSignup = (email: string) => {
    setCurrentUser({ email });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);


  return (
    <div className="min-h-screen bg-slate-900 font-sans flex flex-col">
      <Header 
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={handleBackToList}
        currentUser={currentUser}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onSearchChange={setSearchTerm}
      />
      <main className="flex-grow pt-16">
        {selectedProduct ? (
          <div className="container mx-auto px-4 py-8">
            <ProductDetail
              product={selectedProduct}
              onAddToCart={handleAddToCart}
              onBack={handleBackToList}
            />
          </div>
        ) : (
          <Home
            products={filteredProducts}
            onSelectProduct={handleSelectProduct}
          />
        )}
      </main>
      <Footer />
      <Cart
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
      />
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>
  );
}
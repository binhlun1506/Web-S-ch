import React, { useState, useMemo } from 'react';
import { Product, CartItem, User } from './types';
import { mockProducts } from './data/products';
import Header from './components/Header';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import AddProductModal from './components/AddProductModal';
import QuickViewModal from './components/QuickViewModal';

export default function App() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

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
  
  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
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
  
  const handleAddNewProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      ...newProductData
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
    setIsAddProductModalOpen(false);
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
            onAddProductClick={() => setIsAddProductModalOpen(true)}
            onAddToCart={handleAddToCart}
            onQuickView={handleOpenQuickView}
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
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onAddProduct={handleAddNewProduct}
      />
      <QuickViewModal
        product={quickViewProduct}
        onClose={handleCloseQuickView}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
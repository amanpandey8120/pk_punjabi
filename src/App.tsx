import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { FloatingCartPill } from './components/FloatingCartPill';
import { LocationSelectorModal } from './components/LocationSelectorModal';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { DishDetailPage } from './pages/DishDetailPage';
import { CartPage } from './pages/CartPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AccountPage } from './pages/AccountPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary">
      <ScrollToTop />

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <LocationSelectorModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />

      {/* Fixed Sticky Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/dish/:dishId" element={<DishDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrderTrackingPage />} />
          <Route path="/tracking" element={<OrderTrackingPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Floating Cart Pill */}
      <FloatingCartPill />

      {/* Comprehensive Desktop & Tablet Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation */}
      <BottomNav />
    </div>
  );
};


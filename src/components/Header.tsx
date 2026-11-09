import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { restaurantConfig } from '../config/restaurantConfig';

interface HeaderProps {
  onOpenSearch?: () => void;
  onOpenLocation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenLocation }) => {
  const { totalItemCount } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  const primaryAddress =
    user.savedAddresses.find((a) => a.isPrimary) || user.savedAddresses[0];

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Royal Menu' },
    { path: '/about', label: 'Our Heritage' },
    { path: '/contact', label: 'Banquets & Contact' },
    { path: '/orders', label: 'Track Order' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(72,18,28,0.04)] border-b border-[#EADBC8]/40 pt-safe transition-all">
      <div className="h-16 max-w-7xl mx-auto px-gutter-mobile md:px-6 flex items-center justify-between gap-space-sm">
        {/* Left: Brand Logo & Location */}
        <div className="flex items-center gap-space-sm min-w-0 flex-1">
          <Link to="/" className="shrink-0 flex items-center gap-2 group">
            <img
              alt="PK Punjabi Brand Logo"
              className="h-8 md:h-10 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0rcKBpsRwvNf_Vxmp7aV9XEj-bs0M4UJc4ohbPJIInvlLMDFtWh70R8qtA8SP7HJw8EMyf8y1VKjN8N8d8Xe3kWpeueNJBGJu9kwFcBt2CUyzJe6rVKKzE67ND-uO8CfIPVkzDI-LiCo0gfATd1l_-jWHnzMJRS6VY7MrX2blMbMmYF8yfag_eTKJDAIsVKLsRgMebK-EAOOhWWxi1JI51xffPGv3_bfFJZ_QS3CI"
            />
          </Link>

          <button
            onClick={onOpenLocation}
            className="flex items-center gap-space-xs text-left min-w-0 py-space-xs px-space-sm rounded-lg hover:bg-surface-container/80 transition-colors"
            type="button"
            title="Change Delivery Location"
          >
            <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">
              location_on
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider truncate">
                Delivering to
              </span>
              <span className="font-label-md text-label-md text-primary font-bold truncate flex items-center gap-0.5">
                {primaryAddress ? `${primaryAddress.area}, ${primaryAddress.city}` : 'Sector 17, Chandigarh'}
                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim shrink-0">
                  arrow_drop_down
                </span>
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`font-label-md text-label-md tracking-wide transition-all ${
                  isActive
                    ? 'text-primary-container font-bold border-b-2 border-primary-container pb-1'
                    : 'text-on-surface-variant hover:text-primary-container font-medium'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Search, Cart Icon (Desktop/Tablet), Profile */}
        <div className="flex items-center gap-space-xs shrink-0">
          <button
            onClick={onOpenSearch}
            aria-label="Search royal delicacies"
            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary-container hover:bg-surface-container/60 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* Desktop Cart Shortcut */}
          <Link
            to="/cart"
            aria-label="View Royal Basket"
            className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary-container hover:bg-surface-container/60 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {totalItemCount > 0 && (
              <span className="absolute top-1 right-1 bg-primary-container text-on-primary font-label-sm text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">
                {totalItemCount}
              </span>
            )}
          </Link>

          {/* User Profile */}
          <Link
            to="/account"
            aria-label="Customer Account Sanctuary"
            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-tertiary-fixed-dim"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-tertiary-fixed-dim/60"
              src={user.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuATp0cjgAZcj2IAqM7emeeFAMSCoeLzhWWZCiL0n4GWwk7jabdQ_QC7Szh2Kn_mGCOseDl01vmMe-jjBx3lrVdD8Ghoc0L8zmGKTFIjV-efylQO56CjCAvj2q01yLSzkq1ECTMtf0igXvsrx9Rm0KfAaUSBLxEewOstM-MAcWh0ZLHHamlU9RcHUOiEPVkuK2ovaleVviTPRV2QGDkthM_IJOqWFVnsz1lstazm2Oem'}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};


import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const BottomNav: React.FC = () => {
  const { totalItemCount } = useCart();

  const navItems = [
    { to: '/', label: 'Home', icon: 'home' },
    { to: '/menu', label: 'Menu', icon: 'restaurant_menu' },
    { to: '/orders', label: 'Orders', icon: 'receipt_long' },
    {
      to: '/cart',
      label: 'Cart',
      icon: 'shopping_bag',
      badge: totalItemCount > 0 ? totalItemCount : undefined,
    },
    { to: '/account', label: 'Account', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-surface/95 backdrop-blur-xl border-t border-[#EADBC8]/40 shadow-[0_-4px_20px_rgba(72,18,28,0.06)] md:hidden">
      <div className="flex justify-around items-center h-20 px-space-xs max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 min-w-[56px] h-14 transition-colors ${
                isActive
                  ? 'text-primary-container font-bold relative after:content-[""] after:absolute after:bottom-1 after:w-1.5 after:h-1.5 after:bg-tertiary-fixed-dim after:rounded-full'
                  : 'text-on-surface-variant hover:text-primary-container font-medium'
              }`
            }
          >
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">
                {item.icon}
              </span>
              {item.badge !== undefined && (
                <span className="absolute -top-1 -right-3 bg-primary-container text-on-primary font-label-sm text-[10px] min-w-[18px] h-[18px] px-1 rounded-full ring-1 ring-surface shadow-sm flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="font-label-md text-label-md">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};


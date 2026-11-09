import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const FloatingCartPill: React.FC = () => {
  const { totalItemCount, grandTotal } = useCart();
  const location = useLocation();

  // Don't show if cart is empty or already on /cart or /tracking
  if (totalItemCount === 0 || location.pathname === '/cart') {
    return null;
  }

  return (
    <div className="fixed bottom-24 md:bottom-8 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <Link
        to="/cart"
        className="pointer-events-auto max-w-md w-full h-14 bg-primary-container text-on-primary rounded-full px-4 shadow-[0_16px_40px_-6px_rgba(72,18,28,0.3)] border border-[#D9A441] flex items-center justify-between gap-3 active:scale-[0.98] transition-all hover:bg-primary group animate-bounce-subtle"
      >
        {/* Left: Badge */}
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-[#D9A441] text-[#362400] font-bold text-xs flex items-center justify-center shadow-inner">
            {totalItemCount}
          </span>
          <div className="flex flex-col text-left">
            <span className="font-label-sm text-[11px] text-tertiary-fixed tracking-wider uppercase font-semibold">
              Royal Basket
            </span>
            <span className="font-label-md text-sm font-bold text-white leading-tight">
              View Royal Basket
            </span>
          </div>
        </div>

        {/* Right: Price + Arrow */}
        <div className="flex items-center gap-2 font-bold text-sm text-white">
          <span className="text-tertiary-fixed-dim text-base">₹{Math.round(grandTotal)}</span>
          <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </div>
      </Link>
    </div>
  );
};


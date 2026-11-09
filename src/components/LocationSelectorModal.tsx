import React from 'react';
import { useAuth } from '../context/AuthContext';
import { restaurantConfig } from '../config/restaurantConfig';

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({ isOpen, onClose }) => {
  const { user, setPrimaryAddress } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-surface rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-[#EADBC8]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-[24px]">location_on</span>
            <h3 className="font-headline-md text-lg font-bold text-on-surface">Select Delivery Address</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Saved Addresses */}
        <div className="flex flex-col gap-2.5">
          <span className="font-label-sm text-xs font-bold uppercase text-on-surface-variant tracking-wider">
            Your Saved Royal Addresses
          </span>
          {user.savedAddresses.map((addr) => (
            <div
              key={addr.id}
              onClick={() => {
                setPrimaryAddress(addr.id);
                onClose();
              }}
              className={`p-3 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                addr.isPrimary
                  ? 'border-primary-container bg-surface-container-lowest ring-1 ring-primary-container'
                  : 'border-[#EADBC8] bg-surface-container-low hover:bg-surface-container'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 text-primary-container mt-0.5">
                <span className="material-symbols-outlined text-[18px]">
                  {addr.label === 'Home' ? 'home' : addr.label === 'Work' ? 'apartment' : 'pin_drop'}
                </span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-on-surface">{addr.label}</span>
                  {addr.isPrimary && (
                    <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed px-1.5 py-0.5 rounded font-bold uppercase">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant truncate">{addr.addressLine}</p>
                <span className="text-[11px] text-primary-container font-medium">{addr.area}, {addr.city}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Outlet Dining Info */}
        <div className="mt-2 pt-3 border-t border-[#EADBC8] flex flex-col gap-2">
          <span className="font-label-sm text-xs font-bold uppercase text-on-surface-variant tracking-wider">
            Fulfilling Royal Kitchen
          </span>
          <div className="p-3 rounded-xl bg-surface-container-low border border-[#EADBC8] flex items-center gap-3">
            <span className="material-symbols-outlined text-primary-container text-[20px]">storefront</span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-on-surface">Sector 17 Flagship Handi Rasoi</span>
              <span className="text-[11px] text-on-surface-variant">Estimated delivery in 25–35 mins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


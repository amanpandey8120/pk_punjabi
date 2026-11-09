import React, { useState } from 'react';
import { Dish, SelectedAddon, PortionOption } from '../types';
import { DietaryBadge } from './DietaryBadge';
import { useCart } from '../context/CartContext';

interface DishCustomizerModalProps {
  dish: Dish | null;
  onClose: () => void;
}

export const DishCustomizerModal: React.FC<DishCustomizerModalProps> = ({ dish, onClose }) => {
  const { addToCart } = useCart();

  if (!dish) return null;

  const defaultPortion = dish.portionOptions?.[0] || {
    name: 'Standard Portion',
    price: dish.price,
  };

  const [selectedPortion, setSelectedPortion] = useState<PortionOption>(defaultPortion);
  const [selectedSpice, setSelectedSpice] = useState<string>('Medium Royal');
  const [selectedAddons, setSelectedAddons] = useState<SelectedAddon[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const toggleAddon = (addon: { id: string; name: string; price: number }) => {
    setSelectedAddons((prev) => {
      const exists = prev.find((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      }
      return [...prev, addon];
    });
  };

  const addonsTotal = selectedAddons.reduce((acc, a) => acc + a.price, 0);
  const unitPrice = selectedPortion.price + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    addToCart({
      dishId: dish.id,
      name: dish.name,
      dietary: dish.dietary,
      unitPrice: selectedPortion.price,
      quantity,
      portionName: `${selectedPortion.name} • ${selectedSpice}`,
      spiceLevel: selectedSpice,
      selectedAddons,
      specialInstructions: notes,
      image: dish.image,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div
        className="w-full max-w-lg bg-surface rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom duration-200"
        role="dialog"
      >
        {/* Header */}
        <div className="p-4 border-b border-[#EADBC8] flex items-center justify-between bg-surface-container-low shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <DietaryBadge type={dish.dietary} />
            <div className="flex flex-col min-w-0">
              <h2 className="font-headline-md text-lg text-on-surface font-bold truncate">
                {dish.name}
              </h2>
              <span className="text-xs text-on-surface-variant">Customize your royal portion</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 overflow-y-auto flex flex-col gap-5 text-sm">
          {/* Portion Selection */}
          {dish.portionOptions && dish.portionOptions.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-title-md font-bold text-on-surface">Choose Portion</span>
                <span className="text-xs text-primary-container font-semibold uppercase">Required</span>
              </div>
              <div className="flex flex-col gap-2">
                {dish.portionOptions.map((portion) => (
                  <label
                    key={portion.name}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedPortion.name === portion.name
                        ? 'border-primary-container bg-surface-container-lowest ring-1 ring-primary-container'
                        : 'border-[#EADBC8] bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="portion"
                        checked={selectedPortion.name === portion.name}
                        onChange={() => setSelectedPortion(portion)}
                        className="text-primary-container accent-primary-container"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-on-surface">{portion.name}</span>
                        {portion.description && (
                          <span className="text-xs text-on-surface-variant">{portion.description}</span>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-primary-container">₹{portion.price}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Spice Customization */}
          <div>
            <span className="font-title-md font-bold text-on-surface block mb-2">Spice Level</span>
            <div className="grid grid-cols-3 gap-2">
              {['Mild Royal', 'Medium Royal', 'Authentic Punjabi Spicy'].map((spice) => (
                <button
                  key={spice}
                  type="button"
                  onClick={() => setSelectedSpice(spice)}
                  className={`p-2.5 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center text-center gap-1 transition-all ${
                    selectedSpice === spice
                      ? 'border-primary-container bg-primary-container text-on-primary'
                      : 'border-[#EADBC8] bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    local_fire_department
                  </span>
                  <span>{spice}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons Section */}
          {dish.addonOptions && dish.addonOptions.length > 0 && (
            <div>
              <span className="font-title-md font-bold text-on-surface block mb-2">
                Royal Accompaniments & Add-ons
              </span>
              <div className="flex flex-col gap-2">
                {dish.addonOptions.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-tertiary-fixed-dim bg-surface-container-lowest ring-1 ring-tertiary-fixed-dim'
                          : 'border-[#EADBC8] bg-surface-container-low hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddon(addon)}
                          className="text-primary-container accent-primary-container rounded"
                        />
                        <span className="font-medium text-on-surface">{addon.name}</span>
                      </div>
                      <span className="font-semibold text-primary-container">
                        {addon.price > 0 ? `+₹${addon.price}` : 'FREE'}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cooking Instructions */}
          <div>
            <label className="font-title-md font-bold text-on-surface block mb-1">
              Cooking Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Less oil, extra makhan on side, no green chillies..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-11 px-3 bg-surface-container-lowest border border-[#EADBC8] rounded-lg text-sm focus:outline-none focus:border-primary-container"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#EADBC8] bg-surface-container-low flex items-center justify-between gap-3 shrink-0">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-surface-container-lowest border border-[#EADBC8] rounded-xl p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-primary-container hover:bg-surface-container font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span className="w-8 text-center font-bold text-on-surface">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-primary-container hover:bg-surface-container font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 h-12 bg-primary-container hover:bg-primary text-on-primary rounded-xl font-bold flex items-center justify-between px-5 shadow-lg active:scale-98 transition-all"
          >
            <span>Add to Royal Basket</span>
            <span className="font-bold text-tertiary-fixed-dim">₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};


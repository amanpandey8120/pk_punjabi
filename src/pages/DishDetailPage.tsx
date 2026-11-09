import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MENU_ITEMS } from '../data/menuData';
import { DietaryBadge } from '../components/DietaryBadge';
import { useCart } from '../context/CartContext';
import { PortionOption, SelectedAddon } from '../types';

export const DishDetailPage: React.FC = () => {
  const { dishId } = useParams<{ dishId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Find dish or default to Dal Makhani
  const dish = MENU_ITEMS.find((d) => d.id === dishId) || MENU_ITEMS[0];

  const defaultPortion = dish.portionOptions?.[0] || {
    name: 'Standard Royal Portion',
    price: dish.price,
    description: 'Freshly prepared in traditional brass deg',
  };

  const [selectedPortion, setSelectedPortion] = useState<PortionOption>(defaultPortion);
  const [selectedSpice, setSelectedSpice] = useState<string>('Medium Royal');
  const [selectedAddons, setSelectedAddons] = useState<SelectedAddon[]>([]);
  const [instructions, setInstructions] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  const toggleAddon = (addon: { id: string; name: string; price: number }) => {
    setSelectedAddons((prev) => {
      const exists = prev.find((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      }
      return [...prev, addon];
    });
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = selectedPortion.price + addonsTotal;
  const grandTotal = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      dishId: dish.id,
      name: dish.name,
      dietary: dish.dietary,
      unitPrice: selectedPortion.price,
      quantity,
      portionName: `${selectedPortion.name} • ${selectedSpice}`,
      spiceLevel: selectedSpice,
      selectedAddons,
      specialInstructions: instructions,
      image: dish.image,
    });
    // Navigate to cart
    navigate('/cart');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: dish.name,
        text: `Order ${dish.name} from PK Punjabi!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const pairedDishes = MENU_ITEMS.filter((d) => d.id !== dish.id).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-surface pb-32 md:pb-24">
      {/* Top Header Row */}
      <div className="sticky top-16 z-30 bg-surface/90 backdrop-blur-md border-b border-[#EADBC8] px-gutter-mobile md:px-8 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm font-bold text-primary-container hover:underline"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span>Back</span>
          </button>

          <span className="font-headline-md text-base font-bold text-on-surface truncate px-2">
            {dish.name}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary-container transition-colors"
              title="Share Delicacy"
            >
              <span className="material-symbols-outlined text-[18px]">
                {shareCopied ? 'check' : 'share'}
              </span>
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center transition-colors ${
                isFavorite ? 'text-error' : 'text-on-surface-variant hover:text-error'
              }`}
              title="Save to Favorites"
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-gutter-mobile md:px-8 pt-4 w-full flex flex-col gap-6">
        {/* Hero Food Photography Banner */}
        <div className="relative aspect-[16/10] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-[#EADBC8] shadow-lg bg-surface-container-high group">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
            <div className="flex flex-wrap gap-2 mb-2">
              {dish.tags?.map((t) => (
                <span
                  key={t}
                  className="bg-black/60 backdrop-blur-md border border-white/20 text-[#D9A441] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold">
              {dish.name}
            </h1>
          </div>
        </div>

        {/* Dish Title & Meta Info */}
        <div className="bg-surface-container-lowest rounded-xl border border-[#EADBC8] p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <DietaryBadge type={dish.dietary} showText />
                <span className="text-xs text-on-surface-variant">• {dish.category}</span>
                {dish.prepTime && (
                  <span className="text-xs text-on-surface-variant">• {dish.prepTime}</span>
                )}
              </div>
              <h2 className="font-headline-md text-xl md:text-2xl font-bold text-on-surface">
                {dish.name}
              </h2>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-headline-md text-2xl font-bold text-primary-container">
                ₹{selectedPortion.price}
              </span>
              <span className="text-xs text-on-surface-variant font-medium">Base Price</span>
            </div>
          </div>

          <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
            {dish.description}
          </p>

          <div className="flex items-center gap-4 pt-2 border-t border-[#EADBC8]/40 text-xs text-on-surface-variant">
            <div className="flex items-center gap-1 font-bold text-on-surface">
              <span className="material-symbols-outlined text-tertiary-fixed-dim text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span>{dish.rating} / 5.0</span>
              <span className="font-normal text-on-surface-variant">({dish.reviewCount} Patron Reviews)</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary-container">verified</span>
              <span>Desi Ghee Handi Promise</span>
            </div>
          </div>
        </div>

        {/* Portion Size Selection */}
        {dish.portionOptions && dish.portionOptions.length > 0 && (
          <div className="bg-surface-container-lowest rounded-xl border border-[#EADBC8] p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-title-md text-base font-bold text-on-surface">Select Portion Size</h3>
              <span className="text-xs text-primary-container font-bold uppercase">Required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dish.portionOptions.map((portion) => {
                const isSelected = selectedPortion.name === portion.name;
                return (
                  <label
                    key={portion.name}
                    className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary-container bg-surface-container-lowest ring-2 ring-primary-container/30'
                        : 'border-[#EADBC8] bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="dish-portion"
                        checked={isSelected}
                        onChange={() => setSelectedPortion(portion)}
                        className="mt-0.5 text-primary-container accent-primary-container"
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-on-surface">{portion.name}</span>
                        {portion.description && (
                          <span className="text-xs text-on-surface-variant mt-0.5">
                            {portion.description}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-sm text-primary-container">₹{portion.price}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Spice Level Preference */}
        <div className="bg-surface-container-lowest rounded-xl border border-[#EADBC8] p-5 shadow-sm flex flex-col gap-3">
          <h3 className="font-title-md text-base font-bold text-on-surface">Spice Customization</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Mild Royal', subtitle: 'Gentle aromatic spice' },
              { label: 'Medium Royal', subtitle: 'Chef recommendation' },
              { label: 'Authentic Punjabi Spicy', subtitle: 'Deghi mirch heat' },
            ].map((spice) => {
              const isSelected = selectedSpice === spice.label;
              return (
                <button
                  key={spice.label}
                  type="button"
                  onClick={() => setSelectedSpice(spice.label)}
                  className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1 transition-all ${
                    isSelected
                      ? 'border-primary-container bg-primary-container text-on-primary ring-2 ring-tertiary-fixed-dim/40'
                      : 'border-[#EADBC8] bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
                  <span className="font-bold text-xs">{spice.label}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-on-surface-variant'}`}>
                    {spice.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Royal Accompaniments & Add-ons */}
        {dish.addonOptions && dish.addonOptions.length > 0 && (
          <div className="bg-surface-container-lowest rounded-xl border border-[#EADBC8] p-5 shadow-sm flex flex-col gap-3">
            <h3 className="font-title-md text-base font-bold text-on-surface">
              Royal Accompaniments &amp; Add-ons
            </h3>
            <div className="flex flex-col gap-2.5">
              {dish.addonOptions.map((addon) => {
                const isChecked = selectedAddons.some((a) => a.id === addon.id);
                return (
                  <label
                    key={addon.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
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
                      <span className="font-medium text-sm text-on-surface">{addon.name}</span>
                    </div>
                    <span className="font-bold text-sm text-primary-container">
                      {addon.price > 0 ? `+₹${addon.price}` : 'FREE'}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Cooking Notes Input */}
        <div className="bg-surface-container-lowest rounded-xl border border-[#EADBC8] p-5 shadow-sm flex flex-col gap-2">
          <label className="font-title-md text-sm font-bold text-on-surface">
            Special Cooking Instructions
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Please send extra pickled sirka onions, less butter on top..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full p-3 bg-surface-container-low border border-[#EADBC8] rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary-container"
          />
        </div>

        {/* Frequently Paired With */}
        <div className="flex flex-col gap-3 pt-2">
          <h3 className="font-headline-md text-lg font-bold text-on-surface">
            Frequently Paired Delicacies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {pairedDishes.map((paired) => (
              <Link
                key={paired.id}
                to={`/dish/${paired.id}`}
                className="bg-surface-container-lowest rounded-xl border border-[#EADBC8] p-3 flex items-center gap-3 hover:border-tertiary-fixed-dim transition-all group"
              >
                <img
                  src={paired.image}
                  alt={paired.name}
                  className="w-14 h-14 rounded-lg object-cover shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-xs text-on-surface group-hover:text-primary-container truncate">
                    {paired.name}
                  </span>
                  <span className="text-xs text-primary-container font-bold">₹{paired.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-[#EADBC8] p-4 shadow-[0_-8px_30px_rgba(72,18,28,0.1)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-surface-container-low border border-[#EADBC8] rounded-xl p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-primary-container hover:bg-surface-container font-bold transition-all active:scale-90"
              aria-label="Decrease quantity"
            >
              <span className="material-symbols-outlined text-[20px]">remove</span>
            </button>
            <span className="w-10 text-center font-bold text-base text-on-surface">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-primary-container hover:bg-surface-container font-bold transition-all active:scale-90"
              aria-label="Increase quantity"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>

          {/* Add to Basket CTA */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 h-12 md:h-14 bg-primary-container hover:bg-primary text-on-primary rounded-xl font-bold flex items-center justify-between px-6 shadow-xl active:scale-98 transition-all"
          >
            <div className="flex flex-col text-left">
              <span className="text-xs text-white/80 font-normal">Add {quantity} to Royal Basket</span>
              <span className="text-sm font-bold text-white">Proceed to Order</span>
            </div>
            <span className="font-headline-sm text-lg md:text-xl font-bold text-tertiary-fixed-dim">
              ₹{grandTotal}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { Link } from 'react-router-dom';
import { Dish } from '../types';
import { DietaryBadge } from './DietaryBadge';
import { useCart } from '../context/CartContext';

interface FoodCardProps {
  dish: Dish;
  onCustomize?: (dish: Dish) => void;
  layout?: 'grid' | 'horizontal';
}

export const FoodCard: React.FC<FoodCardProps> = ({ dish, onCustomize, layout = 'grid' }) => {
  const { cartItems, updateQuantity, addToCart } = useCart();

  // Find if this dish is in cart (any portion)
  const cartItem = cartItems.find((ci) => ci.dishId === dish.id);
  const qty = cartItem ? cartItem.quantity : 0;

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dish.portionOptions && dish.portionOptions.length > 1 && onCustomize) {
      onCustomize(dish);
    } else {
      addToCart({
        dishId: dish.id,
        name: dish.name,
        dietary: dish.dietary,
        unitPrice: dish.price,
        quantity: 1,
        portionName: dish.portionOptions?.[0]?.name,
        image: dish.image,
      });
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.cartItemId, 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.cartItemId, -1);
    }
  };

  return (
    <div
      className={`group bg-surface-container-lowest rounded-xl border border-[#EADBC8] shadow-[0_4px_16px_-2px_rgba(72,18,28,0.04)] hover:shadow-[0_12px_28px_-4px_rgba(72,18,28,0.08)] hover:border-tertiary-fixed-dim/70 transition-all duration-300 flex flex-col overflow-hidden ${
        layout === 'horizontal' ? 'sm:flex-row' : ''
      }`}
    >
      {/* Dish Image Container */}
      <Link
        to={`/dish/${dish.id}`}
        className={`relative overflow-hidden shrink-0 block bg-surface-container-high ${
          layout === 'horizontal' ? 'w-full sm:w-48 h-48 sm:h-auto' : 'aspect-[4/3] w-full'
        }`}
      >
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          {dish.isBestseller && (
            <span className="font-label-sm text-[10px] bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow-sm">
              Chef's Bestseller
            </span>
          )}
          {dish.tags?.[0] && !dish.isBestseller && (
            <span className="font-label-sm text-[10px] bg-surface-container-lowest/90 text-primary-container px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow-sm">
              {dish.tags[0]}
            </span>
          )}
        </div>

        {dish.prepTime && (
          <div className="absolute bottom-2 right-2 bg-surface/90 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-semibold text-on-surface-variant shadow-sm">
            <span className="material-symbols-outlined text-[13px] text-tertiary-fixed-dim">schedule</span>
            {dish.prepTime}
          </div>
        )}
      </Link>

      {/* Content Container */}
      <div className="p-4 flex flex-col justify-between flex-1 gap-2.5">
        <div>
          {/* Header Row: Dietary & Spice */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <DietaryBadge type={dish.dietary} showText />
              {dish.spiceLevel > 0 && (
                <div
                  className="flex items-center text-primary-container"
                  title={`Spice Level: ${dish.spiceLevel}/3`}
                >
                  {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[14px]">
                      local_fire_department
                    </span>
                  ))}
                </div>
              )}
            </div>

            {dish.rating > 0 && (
              <div className="flex items-center gap-1 bg-surface-container-low px-1.5 py-0.5 rounded text-[11px] font-bold text-on-surface">
                <span className="material-symbols-outlined text-[13px] text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span>{dish.rating.toFixed(1)}</span>
                <span className="text-on-surface-variant text-[10px]">({dish.reviewCount})</span>
              </div>
            )}
          </div>

          {/* Dish Name */}
          <Link to={`/dish/${dish.id}`} className="block">
            <h3 className="font-headline-md text-title-md text-on-surface group-hover:text-primary-container font-semibold transition-colors line-clamp-1">
              {dish.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">
            {dish.description}
          </p>
        </div>

        {/* Footer: Price & Add / Stepper CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-[#EADBC8]/40 mt-auto">
          <div className="flex flex-col">
            <span className="font-title-lg text-title-lg font-bold text-primary-container">
              ₹{dish.price}
            </span>
            {dish.portionOptions && dish.portionOptions.length > 1 && (
              <span className="text-[11px] text-on-surface-variant font-medium">Customizable</span>
            )}
          </div>

          {qty > 0 ? (
            <div className="flex items-center bg-surface-container-low border border-[#EADBC8] rounded-lg p-0.5 shadow-sm">
              <button
                onClick={handleDecrement}
                className="w-7 h-7 flex items-center justify-center rounded text-primary-container hover:bg-surface-container active:scale-90 font-bold transition-transform"
                type="button"
                aria-label="Decrease quantity"
              >
                <span className="material-symbols-outlined text-[16px]">remove</span>
              </button>
              <span className="font-label-md text-sm text-on-surface font-bold w-7 text-center">
                {qty}
              </span>
              <button
                onClick={handleIncrement}
                className="w-7 h-7 flex items-center justify-center rounded text-primary-container hover:bg-surface-container active:scale-90 font-bold transition-transform"
                type="button"
                aria-label="Increase quantity"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddClick}
              className="px-4 py-1.5 rounded-lg bg-surface-container-low border border-[#741C28]/30 hover:bg-primary-container hover:text-on-primary text-primary-container font-label-md text-xs font-bold uppercase tracking-wider active:scale-95 transition-all shadow-sm flex items-center gap-1"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


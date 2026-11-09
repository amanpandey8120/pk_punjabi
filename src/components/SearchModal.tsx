import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/menuData';
import { Dish } from '../types';
import { DietaryBadge } from './DietaryBadge';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomize?: (dish: Dish) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onCustomize }) => {
  const [query, setQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const filtered = MENU_ITEMS.filter((dish) => {
    const matchesQuery =
      dish.name.toLowerCase().includes(query.toLowerCase()) ||
      dish.category.toLowerCase().includes(query.toLowerCase()) ||
      dish.description.toLowerCase().includes(query.toLowerCase()) ||
      (dish.tags || []).some((t) => t.toLowerCase().includes(query.toLowerCase()));

    const matchesDiet =
      dietaryFilter === 'all' || dish.dietary === dietaryFilter;

    return matchesQuery && matchesDiet;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-16 sm:pt-20">
      <div className="w-full max-w-2xl bg-surface rounded-2xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#EADBC8] bg-surface-container-low flex items-center gap-3">
          <span className="material-symbols-outlined text-primary-container text-[24px]">search</span>
          <input
            type="text"
            autoFocus
            placeholder="Search butter chicken, dal makhani, kulcha, lassi..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm md:text-base font-medium text-on-surface placeholder:text-on-surface-variant focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-on-surface-variant hover:text-on-surface text-xs uppercase font-bold"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Quick Filter Badges */}
        <div className="px-4 py-2 bg-surface-container-lowest border-b border-[#EADBC8] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs text-on-surface-variant font-semibold">Diet:</span>
          {(['all', 'veg', 'non-veg'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setDietaryFilter(filter)}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${
                dietaryFilter === filter
                  ? 'bg-primary-container text-on-primary shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {filter === 'all' ? 'All Delicacies' : filter === 'veg' ? 'Pure Veg' : 'Non-Veg'}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto flex flex-col gap-3">
          {filtered.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center justify-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-[40px] text-tertiary-fixed-dim">search_off</span>
              <p className="font-semibold text-sm">No delicacies found matching "{query}"</p>
              <p className="text-xs">Try searching for Dal Makhani, Butter Chicken, or Lassi</p>
            </div>
          ) : (
            filtered.map((dish) => (
              <div
                key={dish.id}
                className="p-3 bg-surface-container-lowest rounded-xl border border-[#EADBC8] flex items-center justify-between gap-3 hover:border-tertiary-fixed-dim transition-all"
              >
                <Link
                  to={`/dish/${dish.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 min-w-0 flex-1 group"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <DietaryBadge type={dish.dietary} />
                      <h4 className="font-headline-md text-sm font-bold text-on-surface group-hover:text-primary-container truncate">
                        {dish.name}
                      </h4>
                    </div>
                    <span className="text-xs text-on-surface-variant truncate">{dish.category}</span>
                    <span className="text-xs font-bold text-primary-container">₹{dish.price}</span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    if (dish.portionOptions && dish.portionOptions.length > 1 && onCustomize) {
                      onClose();
                      onCustomize(dish);
                    } else {
                      addToCart({
                        dishId: dish.id,
                        name: dish.name,
                        dietary: dish.dietary,
                        unitPrice: dish.price,
                        quantity: 1,
                        image: dish.image,
                      });
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary text-xs font-bold uppercase transition-all shrink-0"
                >
                  + Add
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};


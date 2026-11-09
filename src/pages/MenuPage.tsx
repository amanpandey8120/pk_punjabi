import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';
import { FoodCard } from '../components/FoodCard';
import { DishCustomizerModal } from '../components/DishCustomizerModal';
import { Dish } from '../types';
import { useAuth } from '../context/AuthContext';

export const MenuPage: React.FC = () => {
  const { user, toggleVegOnly } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>('All Dastarkhwan');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isVegOnly, setIsVegOnly] = useState<boolean>(user.vegOnlyMode);
  const [customizingDish, setCustomizingDish] = useState<Dish | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      const matchesCategory =
        activeCategory === 'All Dastarkhwan' || dish.category === activeCategory;

      const matchesVeg = !isVegOnly || dish.dietary === 'veg';

      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dish.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesVeg && matchesSearch;
    });
  }, [activeCategory, isVegOnly, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-surface pb-32 md:pb-20">
      {/* Menu Header & Search Bar */}
      <div className="bg-surface-container-low border-b border-[#EADBC8] py-4 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-gutter-mobile md:px-8 flex flex-col gap-3">
          {/* Top Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search Dal Makhani, Butter Chicken, Naan, Lassi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-10 bg-surface-container-lowest border border-[#EADBC8] rounded-xl text-sm font-medium text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary-container"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>

            {/* Veg Only Toggle & View Toggle */}
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              {/* Pure Veg Switch */}
              <label className="flex items-center gap-2 cursor-pointer select-none bg-surface-container-lowest px-3 py-2 rounded-xl border border-[#EADBC8]">
                <div className="w-4 h-4 rounded-[3px] border border-[#1E7E34] bg-[#1E7E34]/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#1E7E34]" />
                </div>
                <span className="text-xs font-bold text-on-surface">Pure Veg Only</span>
                <input
                  type="checkbox"
                  checked={isVegOnly}
                  onChange={(e) => {
                    setIsVegOnly(e.target.checked);
                    toggleVegOnly();
                  }}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1E7E34] relative"></div>
              </label>

              {/* Grid / List Mode */}
              <div className="hidden sm:flex items-center bg-surface-container-lowest border border-[#EADBC8] rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg ${
                    viewMode === 'grid' ? 'bg-primary-container text-white' : 'text-on-surface-variant'
                  }`}
                  title="Grid View"
                >
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg ${
                    viewMode === 'list' ? 'bg-primary-container text-white' : 'text-on-surface-variant'
                  }`}
                  title="List View"
                >
                  <span className="material-symbols-outlined text-[18px]">view_agenda</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            {MENU_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
                    isActive
                      ? 'bg-primary-container text-on-primary ring-2 ring-tertiary-fixed-dim/60'
                      : 'bg-surface-container-lowest border border-[#EADBC8] text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Dishes Showcase */}
      <div className="max-w-7xl mx-auto px-gutter-mobile md:px-8 py-6 w-full flex flex-col gap-6">
        {/* Category Header */}
        <div className="flex items-baseline justify-between border-b border-[#EADBC8]/40 pb-3">
          <div>
            <h1 className="font-headline-md text-2xl font-bold text-on-surface">
              {activeCategory}
            </h1>
            <p className="text-xs text-on-surface-variant">
              Cooked slow with authentic spices and fresh ghee
            </p>
          </div>
          <span className="text-xs font-bold text-primary-container bg-surface-container px-2.5 py-1 rounded-full">
            {filteredDishes.length} Items Available
          </span>
        </div>

        {/* Dishes Listing */}
        {filteredDishes.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <span className="material-symbols-outlined text-[48px] text-tertiary-fixed-dim">
              ramen_dining
            </span>
            <h3 className="font-headline-md text-lg font-bold text-on-surface">
              No Royal Delicacies Found
            </h3>
            <p className="text-xs text-on-surface-variant max-w-sm">
              We couldn't find any dishes matching your filters. Try clearing your search or disabling Pure Veg mode.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setIsVegOnly(false);
                setActiveCategory('All Dastarkhwan');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-primary-container text-on-primary text-xs font-bold uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'
                : 'flex flex-col gap-4'
            }
          >
            {filteredDishes.map((dish) => (
              <FoodCard
                key={dish.id}
                dish={dish}
                layout={viewMode === 'list' ? 'horizontal' : 'grid'}
                onCustomize={(d) => setCustomizingDish(d)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Customizer Modal */}
      <DishCustomizerModal
        dish={customizingDish}
        onClose={() => setCustomizingDish(null)}
      />
    </div>
  );
};


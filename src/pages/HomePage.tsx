import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';
import { FoodCard } from '../components/FoodCard';
import { DishCustomizerModal } from '../components/DishCustomizerModal';
import { Dish } from '../types';
import { restaurantConfig } from '../config/restaurantConfig';

export const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All Dastarkhwan');
  const [customizingDish, setCustomizingDish] = useState<Dish | null>(null);
  const [copiedCoupon, setCopiedCoupon] = useState<boolean>(false);

  const bestsellers = MENU_ITEMS.filter((item) => item.isBestseller);

  const displayedDishes =
    activeCategory === 'All Dastarkhwan'
      ? bestsellers
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface pb-28 md:pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pt-6 pb-12 md:py-16 border-b border-[#EADBC8]/40">
        <div className="max-w-7xl mx-auto px-gutter-mobile md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 flex flex-col gap-4 text-left">
            <div className="inline-flex items-center gap-2 bg-surface-container-high border border-tertiary-fixed-dim/40 px-3 py-1 rounded-full w-fit">
              <span className="material-symbols-outlined text-primary-container text-[18px]">verified</span>
              <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-primary-container">
                Authentic Punjabi Zaika • Since {restaurantConfig.establishedYear}
              </span>
            </div>

            <h1 className="font-headline-lg text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-on-surface leading-tight tracking-tight">
              Royal Heritage Handi Feasts &amp; <span className="text-primary-container">Clay Tandoor</span> Delicacies
            </h1>

            <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Slow-cooked over glowing charcoal embers in traditional hand-hammered brass degs.
              Indulge in authentic recipes crafted with pure desi ghee, fresh churned white makhan, and hand-ground spices.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/menu"
                className="h-12 px-6 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-lg text-sm font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center gap-2 group"
              >
                <span>Explore Royal Menu</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>

              <Link
                to="/contact"
                className="h-12 px-6 rounded-xl bg-surface-container-low hover:bg-surface-container border border-primary-container/30 text-primary-container font-label-lg text-sm font-bold active:scale-95 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">table_restaurant</span>
                <span>Reserve Royal Table</span>
              </Link>
            </div>

            {/* Heritage Credentials Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#EADBC8]/50 mt-2">
              <div className="flex flex-col">
                <span className="font-headline-md text-xl md:text-2xl font-bold text-primary-container">50+ Yrs</span>
                <span className="text-xs text-on-surface-variant">Royal Lineage</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-md text-xl md:text-2xl font-bold text-primary-container">100%</span>
                <span className="text-xs text-on-surface-variant">Pure Desi Ghee</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-md text-xl md:text-2xl font-bold text-primary-container">4.9 ★</span>
                <span className="text-xs text-on-surface-variant">10,000+ Reviews</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-md text-xl md:text-2xl font-bold text-primary-container">30 Min</span>
                <span className="text-xs text-on-surface-variant">Hot Handi Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Hero Dish Image */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border-2 border-tertiary-fixed-dim/60 shadow-2xl group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYhhSPsz_QDkoqIGK-zxiDLHDKe_3s6ib1Na9_ka5fOGjaUFPRw8NN-i65rnm4M-aKb7MiKapWtNlcg_o7pjOpWERFR00yMuKbVRmCggAZiU2mvVxVH4p78ILuC02XeSIxewd-DtilHWyV5eH8vIbCbL27Y2wN9i_YwGLm_2_76RZJ8CGqR4f7dEF9gw01sS14dpaXcXK0DAfEk8yzAaoNH18K_oLgvAzfHyysE0QG"
                alt="Royal Feast Platter - PK Punjabi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D9A441]">Signature Royal Preparation</span>
                <h3 className="font-headline-md text-xl font-bold">24-Hour Dum Dal Makhani &amp; Garlic Naan</h3>
                <p className="text-xs text-white/80 mt-1">Slow-cooked overnight in traditional brass degs with white cultured makhan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Royal Categories Section */}
      <section className="max-w-7xl mx-auto px-gutter-mobile md:px-8 py-8 w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-[24px]">restaurant</span>
            <h2 className="font-headline-md text-2xl font-bold text-on-surface">Royal Categories</h2>
          </div>
          <Link
            to="/menu"
            className="text-xs md:text-sm font-bold text-primary-container hover:underline flex items-center gap-1"
          >
            <span>Full Menu</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
        </div>

        {/* Scrollable Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-label-md text-xs md:text-sm font-semibold whitespace-nowrap transition-all shadow-sm ${
                  isActive
                    ? 'bg-primary-container text-on-primary ring-2 ring-tertiary-fixed-dim/50'
                    : 'bg-surface-container-lowest border border-[#EADBC8] text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Dishes Grid */}
      <section className="max-w-7xl mx-auto px-gutter-mobile md:px-8 py-2 w-full">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h3 className="font-headline-md text-xl md:text-2xl font-bold text-on-surface">
              {activeCategory === 'All Dastarkhwan' ? 'Bestselling Dastarkhwan' : activeCategory}
            </h3>
            <p className="text-xs text-on-surface-variant">Handcrafted by Master Tandooris and Curry Maestros</p>
          </div>
          <span className="text-xs font-semibold text-primary-container">
            {displayedDishes.length} Delicacies
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {displayedDishes.map((dish) => (
            <FoodCard
              key={dish.id}
              dish={dish}
              onCustomize={(d) => setCustomizingDish(d)}
            />
          ))}
        </div>
      </section>

      {/* Master Chef Special Highlight Banner */}
      <section className="max-w-7xl mx-auto px-gutter-mobile md:px-8 py-10 w-full">
        <div className="bg-gradient-to-r from-[#48121C] to-[#741C28] rounded-2xl p-6 sm:p-8 md:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-xl text-left z-10">
            <span className="font-label-sm text-xs font-bold uppercase tracking-widest text-[#D9A441] bg-[#523800] px-3 py-1 rounded-full w-fit">
              Master Chef's Culinary Heritage
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Slow Cooking in Clay &amp; Brass: The Royal Amritsari Technique
            </h2>
            <p className="text-sm md:text-base text-white/85 leading-relaxed">
              We never use pressurized shortcuts or synthetic colors. Our lentils are slow-simmered for 24 continuous hours over glowing coals, stirring continuously with farm-fresh churned butter.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                to="/about"
                className="h-11 px-5 rounded-xl bg-[#D9A441] hover:bg-[#c99431] text-[#362400] font-bold text-sm flex items-center gap-2 active:scale-95 transition-all"
              >
                <span>Read Our Origin Story</span>
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
              </Link>
              <Link
                to="/dish/dal-makhani"
                className="text-sm text-white underline hover:text-[#D9A441] transition-colors"
              >
                View Signature Dish Details
              </Link>
            </div>
          </div>

          <div className="relative shrink-0 w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#D9A441]/60 shadow-2xl z-10">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdxsyaLSe3dp72gOJCx_rBkfWG91CmRPNhgTQWIhCR-gzOG9WjJ8SR6J_pOzQZM-z20kORQ96SCJYk6Rkzy_CX562PYa0AdAJT73IXcWIEe6ps3V555Skpw09uogZbcaGGOVcVrAkgk60niSLd790hdxyNNmJSJ8bQL6vu3CdwCYeGcUqF79whi8Vud17z0ZvWwbQ5xyeosKM0wMTMy2-9dxXQEeeE3jPvHROBUZ23"
              alt="Master Chef PK Punjabi"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why PK Punjabi Feasts - 4 Pillars */}
      <section className="max-w-7xl mx-auto px-gutter-mobile md:px-8 py-8 w-full">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-primary-container">
            Authentic Pillars
          </span>
          <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-on-surface mt-1">
            Why PK Punjabi Feasts?
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant mt-2">
            Every dish adheres strictly to traditional Punjabi hospitality principles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: 'soup_kitchen',
              title: '24-Hour Charcoal Dum',
              desc: 'Slow-simmered in hand-hammered brass vessels over slow charcoal embers.',
            },
            {
              icon: 'local_fire_department',
              title: 'Clay Pit Tandoor',
              desc: 'Live wood & charcoal fired traditional clay ovens impart iconic smoky aroma.',
            },
            {
              icon: 'verified',
              title: '100% Shudh Desi Ghee',
              desc: 'Only churned white makhan and pure cow ghee. Never adulterated.',
            },
            {
              icon: 'spa',
              title: 'Hand-Ground Spices',
              desc: 'Whole spices sun-dried and pounded in brass mortars for vibrant aromatic oils.',
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="p-5 rounded-xl bg-surface-container-lowest border border-[#EADBC8] shadow-sm flex flex-col items-start gap-3 hover:border-tertiary-fixed-dim transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container-low border border-[#EADBC8] flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[26px]">{pillar.icon}</span>
              </div>
              <h3 className="font-headline-md text-base font-bold text-on-surface">{pillar.title}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Code Card */}
      <section className="max-w-7xl mx-auto px-gutter-mobile md:px-8 py-6 w-full">
        <div className="bg-surface-container-low border-2 border-dashed border-[#D9A441] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">redeem</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-headline-md text-lg font-bold text-on-surface">
                Save ₹150 on your Royal Order!
              </span>
              <p className="text-xs text-on-surface-variant">
                Use promo code <strong className="text-primary-container">ROYALPK</strong> on all orders above ₹500.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleCopyCode('ROYALPK')}
            className="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary hover:bg-primary font-bold text-xs uppercase tracking-wider flex items-center gap-2 active:scale-95 transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copiedCoupon ? 'check' : 'content_copy'}
            </span>
            <span>{copiedCoupon ? 'Copied to Clipboard!' : 'Copy Code: ROYALPK'}</span>
          </button>
        </div>
      </section>

      {/* Patron Testimonials */}
      <section className="max-w-7xl mx-auto px-gutter-mobile md:px-8 py-8 w-full">
        <h2 className="font-headline-md text-2xl font-bold text-on-surface text-center mb-6">
          Patron Praises
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'Simran Kaur',
              location: 'Sector 17, Chandigarh',
              comment: 'The Dal Makhani takes me straight back to my grandmother’s kitchen in Amritsar. The aroma of charcoal and white butter is unbeatable.',
              rating: 5,
            },
            {
              name: 'Gurpreet Singh',
              location: 'Phase 5, Mohali',
              comment: 'Butter Chicken has the perfect velvety balance of tomato tang and rich cashew cream without excessive sweetness. Best in the Tricity.',
              rating: 5,
            },
            {
              name: 'Amit Sharma',
              location: 'Model Town, Ludhiana',
              comment: 'The Amritsari Kulcha platter with pindi chole and the tall kulhad kesar lassi is our Sunday family ritual. Top notch packaging too!',
              rating: 5,
            },
          ].map((t) => (
            <div
              key={t.name}
              className="p-5 rounded-xl bg-surface-container-lowest border border-[#EADBC8] shadow-sm flex flex-col justify-between gap-3"
            >
              <div className="flex items-center gap-1 text-[#D9A441]">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
              </div>
              <p className="text-xs text-on-surface leading-relaxed italic">"{t.comment}"</p>
              <div className="flex flex-col border-t border-[#EADBC8]/40 pt-2">
                <span className="font-bold text-xs text-on-surface">{t.name}</span>
                <span className="text-[11px] text-on-surface-variant">{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customizer Modal */}
      <DishCustomizerModal
        dish={customizingDish}
        onClose={() => setCustomizingDish(null)}
      />
    </div>
  );
};


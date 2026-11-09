import React from 'react';
import { Link } from 'react-router-dom';
import { restaurantConfig } from '../config/restaurantConfig';

export const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-surface pb-32 md:pb-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface py-12 md:py-16 border-b border-[#EADBC8]/40 text-center">
        <div className="max-w-4xl mx-auto px-gutter-mobile md:px-8 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 bg-surface-container-high border border-tertiary-fixed-dim/40 px-3.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-primary-container text-[18px]">history_edu</span>
            <span className="font-label-sm text-xs font-bold uppercase tracking-widest text-primary-container">
              Royal Heritage Since {restaurantConfig.establishedYear}
            </span>
          </div>

          <h1 className="font-headline-lg text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface leading-tight">
            The Legend of <span className="text-primary-container">PK Punjabi</span>
          </h1>

          <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Where fifty years of slow-simmered handi culinary tradition meet royal Punjabi hospitality.
            No shortcuts, no artificial food colors—just pure clay tandoors and heirloom recipes.
          </p>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="max-w-6xl mx-auto px-gutter-mobile md:px-8 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 flex flex-col gap-4 text-left">
          <span className="font-label-sm text-xs font-bold uppercase tracking-widest text-primary-container">
            Our Origin Story
          </span>
          <h2 className="font-headline-md text-2xl sm:text-3xl font-bold text-on-surface leading-snug">
            From Charcoal Embers in 1974 to the Royal Dastarkhwan
          </h2>
          <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Founded five decades ago, PK Punjabi began with a singular promise: honor the soul of Punjabi cooking.
            In an era of commercial fast-food shortcuts, our kitchens hold steadfast to the slow art of <em>Dum Pukht</em>—breathing
            under the gentle glow of charcoal embers in copper and brass vessels.
          </p>
          <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Our iconic 24-Hour Dum Dal Makhani was born here. Prepared with whole black urad lentils harvested from Punjab farms,
            churned white makhan, and fresh sun-ripened tomatoes, it simmers uninterrupted through the night until the grain softens into velvet.
          </p>
          <div className="pt-2 flex items-center gap-6">
            <div>
              <span className="font-headline-md text-2xl font-bold text-primary-container">50+</span>
              <span className="block text-xs text-on-surface-variant">Years of Heritage</span>
            </div>
            <div className="h-8 w-px bg-[#EADBC8]"></div>
            <div>
              <span className="font-headline-md text-2xl font-bold text-primary-container">3</span>
              <span className="block text-xs text-on-surface-variant">Flagship Rasois</span>
            </div>
            <div className="h-8 w-px bg-[#EADBC8]"></div>
            <div>
              <span className="font-headline-md text-2xl font-bold text-primary-container">1.5M+</span>
              <span className="block text-xs text-on-surface-variant">Handis Served</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-tertiary-fixed-dim/40 shadow-xl group">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYhhSPsz_QDkoqIGK-zxiDLHDKe_3s6ib1Na9_ka5fOGjaUFPRw8NN-i65rnm4M-aKb7MiKapWtNlcg_o7pjOpWERFR00yMuKbVRmCggAZiU2mvVxVH4p78ILuC02XeSIxewd-DtilHWyV5eH8vIbCbL27Y2wN9i_YwGLm_2_76RZJ8CGqR4f7dEF9gw01sS14dpaXcXK0DAfEk8yzAaoNH18K_oLgvAzfHyysE0QG"
              alt="Authentic Dum Cooking"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 text-white">
              <span className="text-xs font-semibold">Slow cooking in traditional brass vessels</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Golden Pillars */}
      <section className="bg-surface-container-low py-12 border-y border-[#EADBC8]/40">
        <div className="max-w-6xl mx-auto px-gutter-mobile md:px-8 flex flex-col gap-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-primary-container">
              Culinary Integrity
            </span>
            <h2 className="font-headline-md text-2xl sm:text-3xl font-bold text-on-surface mt-1">
              The Four Golden Pillars of PK Punjabi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: 'verified',
                title: 'Shudh Desi Ghee',
                desc: 'We use 100% pure churned butter and traditional cow ghee. Zero palm oils, vanaspati or artificial shortenings.',
              },
              {
                icon: 'outdoor_grill',
                title: 'Authentic Clay Tandoors',
                desc: 'Clay ovens imported from Amritsar potters, heated with seasoned wood and charcoal for unmatched rustic smoke.',
              },
              {
                icon: 'soup_kitchen',
                title: 'Brass & Copper Degs',
                desc: 'Hand-hammered heavy metal cookware distributes heat gently, coaxing deep sweetness from onions and slow aromatics.',
              },
              {
                icon: 'psychology_alt',
                title: 'Hand-Pounded Masalas',
                desc: 'Heirloom blend of whole black cardamom, cinnamon, cloves, and mace, freshly stone-ground every dawn.',
              },
            ].map((p) => (
              <div
                key={p.title}
                className="bg-surface-container-lowest p-6 rounded-2xl border border-[#EADBC8] shadow-sm flex flex-col gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[28px]">{p.icon}</span>
                </div>
                <h3 className="font-headline-md text-base font-bold text-on-surface">{p.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Master Chef Statement */}
      <section className="max-w-6xl mx-auto px-gutter-mobile md:px-8 py-12 w-full">
        <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-10 border border-[#EADBC8] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-tertiary-fixed-dim/60 shadow-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdxsyaLSe3dp72gOJCx_rBkfWG91CmRPNhgTQWIhCR-gzOG9WjJ8SR6J_pOzQZM-z20kORQ96SCJYk6Rkzy_CX562PYa0AdAJT73IXcWIEe6ps3V555Skpw09uogZbcaGGOVcVrAkgk60niSLd790hdxyNNmJSJ8bQL6vu3CdwCYeGcUqF79whi8Vud17z0ZvWwbQ5xyeosKM0wMTMy2-9dxXQEeeE3jPvHROBUZ23"
                alt="Executive Chef"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-8 flex flex-col gap-4 text-left">
            <span className="material-symbols-outlined text-primary-container text-[40px] opacity-60">
              format_quote
            </span>
            <p className="font-headline-md text-lg sm:text-xl text-on-surface italic leading-relaxed">
              "Punjabi cuisine is not merely about rich gravies; it is about reverence for ingredients and time.
              When butter chicken was first crafted, it was about celebrating the clay tandoor. When dal makhani was simmered,
              it kept families warm across Punjab winters. At PK Punjabi, we keep that ancestral hearth burning."
            </p>
            <div className="flex flex-col border-t border-[#EADBC8]/40 pt-3">
              <span className="font-bold text-sm text-on-surface">Ustad Harbhajan Singh</span>
              <span className="text-xs text-primary-container font-semibold">Master Culinary Custodian</span>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Press Recognition */}
      <section className="max-w-6xl mx-auto px-gutter-mobile md:px-8 py-8 w-full">
        <h2 className="font-headline-md text-2xl font-bold text-on-surface text-center mb-6">
          Honors &amp; Royal Accolades
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {restaurantConfig.awards.map((award) => (
            <div
              key={award.title}
              className="p-5 rounded-2xl bg-surface-container-low border border-[#EADBC8] flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">military_tech</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xs text-on-surface">{award.title}</span>
                <span className="text-xs text-on-surface-variant">{award.organization}</span>
                <span className="text-[11px] font-bold text-primary-container mt-1">{award.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Taste */}
      <section className="max-w-4xl mx-auto px-gutter-mobile md:px-8 py-10 w-full text-center">
        <div className="bg-gradient-to-r from-[#48121C] to-[#741C28] rounded-2xl p-8 text-white shadow-xl flex flex-col items-center gap-4">
          <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold">
            Experience the Royal Punjabi Feast Today
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-lg">
            Delivered hot in sealed thermal containers preserving freshness, aroma, and ghee glaze.
          </p>
          <Link
            to="/menu"
            className="h-12 px-8 rounded-xl bg-[#D9A441] text-[#362400] font-bold text-sm flex items-center gap-2 active:scale-95 transition-all shadow-md mt-2"
          >
            <span>Explore Royal Menu</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
};


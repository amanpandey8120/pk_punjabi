import React from 'react';
import { Link } from 'react-router-dom';
import { restaurantConfig } from '../config/restaurantConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#48121C] text-[#FFF8ED] pt-12 pb-24 md:pb-12 border-t border-[#D9A441]/30">
      <div className="max-w-7xl mx-auto px-gutter-mobile md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img
                alt="PK Punjabi Logo"
                className="h-10 w-auto object-contain brightness-0 invert"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0rcKBpsRwvNf_Vxmp7aV9XEj-bs0M4UJc4ohbPJIInvlLMDFtWh70R8qtA8SP7HJw8EMyf8y1VKjN8N8d8Xe3kWpeueNJBGJu9kwFcBt2CUyzJe6rVKKzE67ND-uO8CfIPVkzDI-LiCo0gfATd1l_-jWHnzMJRS6VY7MrX2blMbMmYF8yfag_eTKJDAIsVKLsRgMebK-EAOOhWWxi1JI51xffPGv3_bfFJZ_QS3CI"
              />
            </div>
            <p className="font-body-md text-sm text-[#FFF8ED]/80 leading-relaxed">
              Celebrating five decades of authentic royal Punjabi culinary craftsmanship.
              Slow-simmered brass handi delicacies, charcoal clay tandoor roasts, and pure desi ghee hospitality.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[#D9A441] text-xs font-bold uppercase tracking-widest bg-[#523800] px-2.5 py-1 rounded">
                Est. {restaurantConfig.establishedYear}
              </span>
              <span className="text-xs text-[#FFF8ED]/70">FSSAI Lic. {restaurantConfig.fssaiNumber}</span>
            </div>
          </div>

          {/* Column 2: Royal Rasoi Locations */}
          <div className="flex flex-col gap-3">
            <h4 className="font-title-md text-title-md text-[#D9A441] font-bold border-b border-[#D9A441]/30 pb-2">
              Royal Heritage Outlets
            </h4>
            <div className="flex flex-col gap-2.5 font-body-sm text-xs text-[#FFF8ED]/85">
              {restaurantConfig.locations.map((loc) => (
                <div key={loc.id} className="flex flex-col">
                  <span className="font-bold text-[#FFF8ED]">{loc.name}</span>
                  <span className="text-[#FFF8ED]/70">{loc.address}</span>
                  <span className="text-[#D9A441] text-[11px]">{loc.timings}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="font-title-md text-title-md text-[#D9A441] font-bold border-b border-[#D9A441]/30 pb-2">
              Quick Navigations
            </h4>
            <ul className="flex flex-col gap-2 font-body-sm text-sm text-[#FFF8ED]/80">
              <li>
                <Link to="/" className="hover:text-[#D9A441] transition-colors">
                  Grand Dastarkhwan (Home)
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#D9A441] transition-colors">
                  Royal Food Menu
                </Link>
              </li>
              <li>
                <Link to="/dish/dal-makhani" className="hover:text-[#D9A441] transition-colors">
                  Signature Dal Makhani
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-[#D9A441] transition-colors">
                  Live Order Tracker
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D9A441] transition-colors">
                  Our Culinary Heritage & Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D9A441] transition-colors">
                  Table Reservations & Banquets
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-[#D9A441] transition-colors">
                  Patron Sanctuary & Rewards
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Freshness Promise */}
          <div className="flex flex-col gap-3">
            <h4 className="font-title-md text-title-md text-[#D9A441] font-bold border-b border-[#D9A441]/30 pb-2">
              Royal Concierge & Orders
            </h4>
            <div className="flex flex-col gap-2 font-body-sm text-sm text-[#FFF8ED]/85">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#D9A441]">call</span>
                <span>{restaurantConfig.contact.primaryPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#D9A441]">support_agent</span>
                <span>{restaurantConfig.contact.helplinePhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#D9A441]">mail</span>
                <span>{restaurantConfig.contact.supportEmail}</span>
              </div>
              <div className="mt-3 p-3 rounded-lg bg-[#550314]/60 border border-[#D9A441]/20">
                <span className="font-label-sm text-[#D9A441] font-bold block mb-1">
                  100% Brass & Desi Ghee Guarantee
                </span>
                <p className="text-xs text-[#FFF8ED]/70 leading-relaxed">
                  Cooked slow in hand-hammered brass degs with churned white butter. No artificial food colors.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#D9A441]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF8ED]/60">
          <p>© {new Date().getFullYear()} {restaurantConfig.legalEntity}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Royal Service</span>
            <span>•</span>
            <span>FSSAI Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};


import React, { useState } from 'react';
import { restaurantConfig } from '../config/restaurantConfig';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    outlet: restaurantConfig.locations[0].id,
    date: '',
    time: '19:30',
    guests: '4',
    occasion: 'Family Dinner',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'Do you offer Royal Catering for weddings and large family banquets?',
      a: 'Yes, PK Punjabi specializes in live outdoor clay tandoors and brass handi live buffets for weddings, corporate gatherings, and anniversaries across Punjab, Chandigarh, and Delhi NCR.',
    },
    {
      q: 'Are your packaging handis reusable and eco-friendly?',
      a: 'Absolutely. All our gravies and biryanis are delivered in premium food-grade earthenware / thermal vessels that are 100% recyclable, microwave-safe, and designed to preserve temperature.',
    },
    {
      q: 'Is all food cooked in pure desi ghee?',
      a: 'Every single curry, dal, and kulcha at PK Punjabi is prepared using 100% pure cow ghee and fresh cultured white makhan. We do not use palm oils or synthetic flavors.',
    },
    {
      q: 'What is the standard delivery radius and arrival time?',
      a: 'We deliver within a 12 km radius of each flagship rasoi outlet in Chandigarh, Mohali, and Ludhiana. Average delivery time is 25 to 35 minutes.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-surface pb-32 md:pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-surface-container-low via-surface to-surface py-10 md:py-14 border-b border-[#EADBC8]/40 text-center">
        <div className="max-w-4xl mx-auto px-gutter-mobile md:px-8 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 bg-surface-container-high border border-tertiary-fixed-dim/40 px-3 py-1 rounded-full">
            <span className="material-symbols-outlined text-primary-container text-[18px]">support_agent</span>
            <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-primary-container">
              Royal Hospitality Concierge
            </span>
          </div>

          <h1 className="font-headline-lg text-3xl sm:text-4xl font-bold text-on-surface">
            Connect With Our <span className="text-primary-container">Royal Rasoi</span>
          </h1>

          <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-xl leading-relaxed">
            Reserve a royal dastarkhwan table, inquire about large festive catering, or speak to our patron care concierge.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-gutter-mobile md:px-8 py-10 w-full flex flex-col gap-12">
        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-[#EADBC8] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">call</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-[11px] uppercase font-bold text-on-surface-variant">
                Direct Orders &amp; Hotline
              </span>
              <span className="font-headline-md text-sm sm:text-base font-bold text-on-surface">
                {restaurantConfig.contact.primaryPhone}
              </span>
              <span className="text-[11px] text-primary-container font-semibold">11 AM - 11:30 PM</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-[#EADBC8] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">mail</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-[11px] uppercase font-bold text-on-surface-variant">
                Patron Support Email
              </span>
              <span className="font-headline-md text-sm sm:text-base font-bold text-on-surface">
                {restaurantConfig.contact.supportEmail}
              </span>
              <span className="text-[11px] text-on-surface-variant">Quick 2-hour response</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-[#EADBC8] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">celebration</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-[11px] uppercase font-bold text-on-surface-variant">
                Banquets &amp; Catering
              </span>
              <span className="font-headline-md text-sm sm:text-base font-bold text-on-surface">
                {restaurantConfig.contact.cateringEmail}
              </span>
              <span className="text-[11px] text-on-surface-variant">Weddings &amp; Feasts</span>
            </div>
          </div>
        </div>

        {/* Outlets Locations & Reservation Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Outlet Locations */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h2 className="font-headline-md text-xl font-bold text-on-surface">
              Our Flagship Rasoi Outlets
            </h2>

            <div className="flex flex-col gap-3">
              {restaurantConfig.locations.map((loc) => (
                <div
                  key={loc.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    loc.isFlagship
                      ? 'border-primary-container bg-surface-container-low ring-1 ring-primary-container/20'
                      : 'border-[#EADBC8] bg-surface-container-lowest'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-headline-md text-base font-bold text-on-surface">
                      {loc.name}
                    </h3>
                    {loc.isFlagship && (
                      <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded font-bold uppercase">
                        Flagship
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-2">
                    {loc.address}
                  </p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#EADBC8]/40">
                    <span className="font-bold text-primary-container">{loc.phone}</span>
                    <span className="text-on-surface-variant font-medium">{loc.timings}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Map Mock Card */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-[#EADBC8] shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[32px] text-primary-container">
                  map
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-xs text-on-surface">Find us on Google Maps</span>
                  <span className="text-[11px] text-on-surface-variant">Navigate to Sector 17-C Chandigarh</span>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Sector+17+Chandigarh"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-primary-container/30 text-primary-container text-xs font-bold"
              >
                Directions
              </a>
            </div>
          </div>

          {/* Right: Table Reservation / Inquiry Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-[#EADBC8] shadow-md flex flex-col gap-5">
            <div>
              <h2 className="font-headline-md text-xl font-bold text-on-surface">
                Reserve Royal Table &amp; Dining Inquiry
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Experience authentic mehmaan-nawazi with reserved brass thali seating.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-3 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-[#1E7E34]/15 text-[#1E7E34] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[36px]">check_circle</span>
                </div>
                <h3 className="font-headline-md text-xl font-bold text-on-surface">
                  Royal Reservation Request Received!
                </h3>
                <p className="text-xs text-on-surface-variant max-w-sm">
                  Our Maitre d’ will confirm your booking for {formData.guests} guests on {formData.date || 'selected date'} via SMS and call to {formData.phone}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-xl bg-primary-container text-on-primary text-xs font-bold uppercase"
                >
                  Book Another Table
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-on-surface">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Sardar Amarjit Singh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="p-3 bg-surface-container-low border border-[#EADBC8] rounded-xl text-xs text-on-surface focus:outline-none focus:border-primary-container"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-on-surface">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="p-3 bg-surface-container-low border border-[#EADBC8] rounded-xl text-xs text-on-surface focus:outline-none focus:border-primary-container"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-on-surface">Select Outlet</label>
                    <select
                      value={formData.outlet}
                      onChange={(e) => setFormData({ ...formData, outlet: e.target.value })}
                      className="p-3 bg-surface-container-low border border-[#EADBC8] rounded-xl text-xs text-on-surface focus:outline-none focus:border-primary-container"
                    >
                      {restaurantConfig.locations.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-on-surface">Number of Royal Guests</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="p-3 bg-surface-container-low border border-[#EADBC8] rounded-xl text-xs text-on-surface focus:outline-none focus:border-primary-container"
                    >
                      <option value="2">2 Guests (Couple)</option>
                      <option value="4">4 Guests (Family)</option>
                      <option value="6">6 Guests (Celebration)</option>
                      <option value="10+">10+ Guests (Royal Banquet)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-on-surface">Dining Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="p-3 bg-surface-container-low border border-[#EADBC8] rounded-xl text-xs text-on-surface focus:outline-none focus:border-primary-container"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-on-surface">Preferred Time Slot</label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="p-3 bg-surface-container-low border border-[#EADBC8] rounded-xl text-xs text-on-surface focus:outline-none focus:border-primary-container"
                    >
                      <option value="12:30">12:30 PM (Lunch)</option>
                      <option value="14:00">02:00 PM (Lunch)</option>
                      <option value="19:30">07:30 PM (Dinner)</option>
                      <option value="20:30">08:30 PM (Dinner)</option>
                      <option value="21:30">09:30 PM (Late Dinner)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-on-surface">Occasion / Special Dietary Requests</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Birthday anniversary, high chair needed, pure vegetarian setup..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="p-3 bg-surface-container-low border border-[#EADBC8] rounded-xl text-xs text-on-surface focus:outline-none focus:border-primary-container"
                  />
                </div>

                <button
                  type="submit"
                  className="h-12 bg-primary-container hover:bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg active:scale-98 transition-all mt-2"
                >
                  Confirm Royal Table Reservation
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="flex flex-col gap-4">
          <h2 className="font-headline-md text-2xl font-bold text-on-surface text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto w-full flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-[#EADBC8] bg-surface-container-lowest overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left font-bold text-sm text-on-surface flex items-center justify-between gap-3 hover:bg-surface-container-low transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`material-symbols-outlined text-[20px] text-primary-container transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-on-surface-variant leading-relaxed border-t border-[#EADBC8]/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { DietaryBadge } from '../components/DietaryBadge';

export const OrderTrackingPage: React.FC = () => {
  const { activeOrder, orders } = useCart();
  const order = activeOrder || orders[0];

  // Live timer countdown simulation
  const [minutesRemaining, setMinutesRemaining] = useState(order?.estimatedArrivalMinutes || 24);
  const [currentStage, setCurrentStage] = useState(order?.currentStage || 2);
  const [contactMessage, setContactMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setMinutesRemaining((prev) => (prev > 1 ? prev - 1 : 1));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const stages = [
    {
      num: 1,
      title: 'Order Confirmed',
      desc: 'Royal Rasoi received and validated ticket',
      icon: 'check_circle',
    },
    {
      num: 2,
      title: 'Slow-Cooking in Clay Tandoor & Brass Handi',
      desc: 'Simmering over low charcoal with desi ghee',
      icon: 'soup_kitchen',
    },
    {
      num: 3,
      title: 'Sealed & Packed in Thermal Handi',
      desc: 'Insulated packaging preserves aroma & temperature',
      icon: 'takeout_dining',
    },
    {
      num: 4,
      title: 'Out for Royal Delivery',
      desc: 'Rider is en route to your doorstep',
      icon: 'two_wheeler',
    },
    {
      num: 5,
      title: 'Delivered with Royal Warmth',
      desc: 'Enjoy your authentic Punjabi feast',
      icon: 'celebration',
    },
  ];

  const handleCallRider = () => {
    setContactMessage(`Calling Rider ${order.rider?.name || 'Harpreet Singh'} (+91 98140 12345)...`);
    setTimeout(() => setContactMessage(null), 4000);
  };

  const handleSupport = () => {
    setContactMessage('Connected to PK Punjabi 24/7 Royal Concierge: +91 172 460 9999');
    setTimeout(() => setContactMessage(null), 5000);
  };

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <span className="material-symbols-outlined text-[48px] text-primary-container">receipt_long</span>
        <h2 className="font-headline-md text-xl font-bold mt-2">No Active Royal Orders</h2>
        <p className="text-xs text-on-surface-variant mt-1 mb-4">
          You haven't placed an order yet. Treat yourself to our slow-simmered dishes!
        </p>
        <Link
          to="/menu"
          className="px-6 py-2.5 rounded-xl bg-primary-container text-on-primary font-bold text-xs uppercase"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface pb-32 md:pb-20">
      {/* Top Banner */}
      <div className="bg-surface-container-low border-b border-[#EADBC8] py-4 px-gutter-mobile md:px-8">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E7E34] animate-ping"></span>
            <h1 className="font-headline-md text-lg md:text-xl font-bold text-on-surface">
              Live Royal Order Tracker
            </h1>
          </div>
          <span className="font-label-md text-xs font-bold text-primary-container bg-surface-container-high px-2.5 py-1 rounded-full">
            {order.displayId}
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full px-gutter-mobile md:px-6 pt-6 flex flex-col gap-6">
        {/* Estimated Arrival Banner Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-[#EADBC8] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center text-primary-container shrink-0">
              <span className="material-symbols-outlined text-[32px]">schedule</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Estimated Arrival
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-primary-container">
                Arriving in {minutesRemaining}–{minutesRemaining + 6} Mins
              </h2>
              <span className="text-xs text-[#1E7E34] font-semibold mt-0.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check</span>
                On Time • Live GPS &amp; Handi Status
              </span>
            </div>
          </div>

          <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
            <button
              onClick={handleSupport}
              className="flex-1 sm:flex-initial h-10 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-[#EADBC8] text-on-surface font-label-md text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
              Help
            </button>
            <button
              onClick={() => setCurrentStage((s) => (s < 5 ? s + 1 : 1))}
              className="flex-1 sm:flex-initial h-10 px-3 rounded-xl bg-surface-container-high text-on-surface text-[11px] font-semibold flex items-center justify-center"
              title="Demo toggle for testing different tracker stages"
            >
              Demo Stage ({currentStage}/5)
            </button>
          </div>
        </div>

        {contactMessage && (
          <div className="p-3 bg-surface-container-low border border-primary-container/30 text-primary-container text-xs font-semibold rounded-xl animate-in fade-in">
            {contactMessage}
          </div>
        )}

        {/* Step Timeline Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-[#EADBC8] shadow-sm flex flex-col gap-4">
          <h3 className="font-title-md text-base font-bold text-on-surface">
            Kitchen Live Progress
          </h3>

          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EADBC8]">
            {stages.map((st) => {
              const isPast = st.num < currentStage;
              const isCurrent = st.num === currentStage;
              return (
                <div key={st.num} className="relative flex items-start gap-4">
                  {/* Node Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 -ml-10 z-10 shadow-sm transition-all ${
                      isPast
                        ? 'bg-[#1E7E34] text-white ring-2 ring-white'
                        : isCurrent
                        ? 'bg-[#D9A441] text-[#362400] ring-4 ring-[#D9A441]/30 font-bold gold-pulse'
                        : 'bg-surface-container border border-[#EADBC8] text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isPast ? 'check' : st.icon}
                    </span>
                  </div>

                  {/* Stage Text */}
                  <div className="flex flex-col -mt-0.5">
                    <span
                      className={`font-title-md text-sm font-bold ${
                        isCurrent
                          ? 'text-primary-container font-extrabold'
                          : isPast
                          ? 'text-on-surface font-semibold'
                          : 'text-on-surface-variant/60 font-medium'
                      }`}
                    >
                      {st.title}
                    </span>
                    <span className="font-body-sm text-xs text-on-surface-variant">
                      {st.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Partner Profile Card */}
        {order.rider && (
          <div className="bg-surface-container-lowest rounded-2xl p-5 border border-[#EADBC8] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={order.rider.avatar}
                alt={order.rider.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-tertiary-fixed-dim/60 shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                  Royal Delivery Partner
                </span>
                <h4 className="font-headline-md text-base font-bold text-on-surface">
                  {order.rider.name}
                </h4>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-on-surface-variant">
                  <span className="flex items-center gap-0.5 font-bold text-[#D9A441]">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    {order.rider.rating}
                  </span>
                  <span>•</span>
                  <span>{order.rider.deliveriesCount}+ deliveries</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCallRider}
                className="flex-1 sm:flex-initial h-10 px-4 rounded-xl bg-primary-container text-on-primary font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                Call Rider
              </button>
              <button
                onClick={() => setContactMessage(`Messaging ${order.rider?.name}: "On my way with your hot handi!"`)}
                className="w-10 h-10 rounded-xl bg-surface-container-low border border-[#EADBC8] flex items-center justify-center text-primary-container hover:bg-surface-container transition-colors"
                type="button"
                title="Message Rider"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </button>
            </div>
          </div>
        )}

        {/* Delivery Address & Map Snippet */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 border border-[#EADBC8] shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-primary-container text-[20px]">
              pin_drop
            </span>
            <h4 className="font-title-md text-sm font-bold">Delivery Address</h4>
          </div>
          <div className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-1 text-xs">
            <span className="font-bold text-on-surface">
              {order.deliveryAddress.label} • {order.deliveryAddress.addressLine}
            </span>
            <span className="text-on-surface-variant">
              {order.deliveryAddress.area}, {order.deliveryAddress.city}
            </span>
            {order.deliveryInstructions && (
              <span className="text-[11px] text-primary-container mt-1 font-medium italic">
                Instruction: {order.deliveryInstructions}
              </span>
            )}
          </div>
        </div>

        {/* Itemized Order Recap */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 border border-[#EADBC8] shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-[#EADBC8]/40 pb-2">
            <h4 className="font-title-md text-sm font-bold text-on-surface">Order Summary</h4>
            <span className="text-xs text-on-surface-variant">{order.placedAt}</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <DietaryBadge type={item.dietary} />
                  <span className="font-medium text-on-surface truncate">
                    {item.name} × {item.quantity}
                  </span>
                </div>
                <span className="font-bold text-on-surface shrink-0">₹{item.price}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#EADBC8]/40 pt-2 flex flex-col gap-1.5 text-xs">
            <div className="flex justify-between text-on-surface-variant">
              <span>Item Total</span>
              <span>₹{order.itemTotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#1E7E34]">
                <span>Royal Discount ({order.couponCode})</span>
                <span>-₹{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-sm text-primary-container pt-1 border-t border-[#EADBC8]/30">
              <span>Total Paid</span>
              <span>₹{order.grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


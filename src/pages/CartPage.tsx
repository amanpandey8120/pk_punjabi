import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { DietaryBadge } from '../components/DietaryBadge';
import { LocationSelectorModal } from '../components/LocationSelectorModal';

export const CartPage: React.FC = () => {
  const {
    cartItems,
    updateQuantity,
    removeItem,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    leaveAtDoor,
    setLeaveAtDoor,
    noPlasticCutlery,
    setNoPlasticCutlery,
    cookingInstructions,
    setCookingInstructions,
    totalItemCount,
    itemSubtotal,
    deliveryFee,
    packagingFee,
    taxAmount,
    discountAmount,
    grandTotal,
    totalSavings,
    placeOrder,
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('ROYALPK');
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [forceEmptyPreview, setForceEmptyPreview] = useState(false);

  const primaryAddress =
    user.savedAddresses.find((a) => a.isPrimary) || user.savedAddresses[0];

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage(res.message);
    setTimeout(() => setCouponMessage(null), 3000);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const newOrder = placeOrder();
    navigate('/orders');
  };

  const isEmpty = cartItems.length === 0 || forceEmptyPreview;

  return (
    <div className="flex flex-col min-h-screen bg-surface pb-32 md:pb-20">
      {/* Location Modal */}
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      <div className="max-w-3xl mx-auto w-full px-gutter-mobile md:px-6 pt-4 flex flex-col gap-4">
        {/* Header Title Row */}
        <div className="pt-space-sm pb-space-xs flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h1 className="font-headline-md text-2xl font-bold text-on-surface">My Food Cart</h1>
            <span className="font-label-md text-xs font-bold text-on-surface-variant bg-surface-container-high px-2.5 py-0.5 rounded-full">
              {isEmpty ? '0 Delicacies' : `${totalItemCount} Delicac${totalItemCount === 1 ? 'y' : 'ies'}`}
            </span>
          </div>

          {!isEmpty && (
            <button
              onClick={clearCart}
              className="font-label-md text-xs font-semibold text-primary-container hover:opacity-80 active:scale-95 transition-all flex items-center gap-1"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
              Clear Cart
            </button>
          )}
        </div>

        {/* Empty Cart View */}
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center text-center px-gutter-mobile py-16 animate-in fade-in duration-300">
            <div className="relative w-44 h-44 mb-space-md flex items-center justify-center">
              <div className="absolute inset-0 bg-surface-container rounded-full opacity-60"></div>
              <div className="relative z-10 w-32 h-32 rounded-full overflow-hidden bg-surface-container-high flex items-center justify-center shadow-inner">
                <img
                  className="w-full h-full object-cover"
                  alt="Empty royal brass plate"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFssp4STJWSXFWwavBpGyPp6zzFK6J-7Z5wAhXPH0t5E3xH6c2LLNRwL3Ohz_HkfL1raVHsQ_bytPiW-3WLfR47E0eBFBuN_g8jbjSaaU1-jQtgmIlZHZOatTl1cqdUqx4zHf0TUfU86215PcBz-H0qcJWJe_060mk_3FOef4_yOv0kDqmaEY1MFko-IoK08JicjIuOD9mX-bMgUnjU2-9WbJ1WmBxn6ZP2ZCuUkQ-"
                />
              </div>
              <div className="absolute bottom-1 right-2 bg-primary-container text-on-primary p-2.5 rounded-full shadow-md">
                <span className="material-symbols-outlined text-[22px]">lunch_dining</span>
              </div>
            </div>

            <h2 className="font-headline-md text-2xl font-bold text-on-surface">
              Your Royal Basket is Empty
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant max-w-xs mt-2 mb-6">
              Your cart is feeling light! Add some rich creamy Butter Chicken, hot tandoori garlic naans, or fresh Kesar Lassi.
            </p>

            <Link
              to="/menu"
              className="h-12 px-6 bg-primary-container text-on-primary rounded-xl font-label-lg text-sm font-bold flex items-center gap-2 shadow hover:bg-primary active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
              Explore Royal Menu
            </Link>

            {forceEmptyPreview && (
              <button
                onClick={() => setForceEmptyPreview(false)}
                className="mt-6 text-xs text-primary-container underline"
              >
                Restore items view
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Delivery Address Quick Snippet Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md border border-[#EADBC8] shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex items-start gap-space-sm min-w-0">
                  <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center shrink-0 text-primary-container">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      home
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-title-md text-sm font-bold text-on-surface">
                        {primaryAddress.label}
                      </span>
                      <span className="font-label-sm text-[10px] bg-tertiary-fixed text-on-tertiary-fixed px-1.5 py-0.2 rounded font-bold uppercase">
                        Primary
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant truncate">
                      {primaryAddress.addressLine}, {primaryAddress.area}, {primaryAddress.city}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="shrink-0 text-primary-container font-label-md text-xs font-bold px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container active:scale-95 transition-transform"
                  type="button"
                >
                  Change
                </button>
              </div>

              {/* Delivery Timing Pill */}
              <div className="flex items-center justify-between pt-space-xs bg-surface-container-low rounded-lg px-space-sm py-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary-container text-[18px]">
                    bolt
                  </span>
                  <span className="font-label-md text-xs text-on-surface font-medium">
                    Standard Royal Delivery
                  </span>
                </div>
                <div className="flex items-center gap-1 font-label-md text-xs text-primary font-bold">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  25-35 Mins
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex flex-col gap-3">
              {cartItems.map((item) => {
                const addonsCost = (item.selectedAddons || []).reduce((s, a) => s + a.price, 0);
                const itemTotalPrice = (item.unitPrice + addonsCost) * item.quantity;

                return (
                  <div
                    key={item.cartItemId}
                    className="cart-item bg-surface-container-lowest rounded-xl p-4 border border-[#EADBC8] shadow-sm flex flex-col gap-3 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <DietaryBadge type={item.dietary} className="mt-1 shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <h3 className="font-headline-md text-base text-on-surface font-bold leading-snug">
                            {item.name}
                          </h3>
                          {item.portionName && (
                            <span className="font-body-sm text-xs text-on-surface-variant">
                              {item.portionName}
                            </span>
                          )}

                          {/* Selected Addons Badges */}
                          {item.selectedAddons && item.selectedAddons.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {item.selectedAddons.map((addon) => (
                                <span
                                  key={addon.id}
                                  className="font-label-sm text-[10px] bg-surface-container text-on-surface-variant px-1.5 py-0.5 rounded"
                                >
                                  {addon.name}
                                </span>
                              ))}
                            </div>
                          )}

                          {item.specialInstructions && (
                            <span className="text-[11px] text-on-surface-variant/80 italic mt-0.5">
                              Note: {item.specialInstructions}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Remove Item Button */}
                      <button
                        onClick={() => removeItem(item.cartItemId)}
                        aria-label="Remove item"
                        className="text-on-surface-variant hover:text-error transition-colors p-1"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-[#EADBC8]/40">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-surface-container-low rounded-lg p-0.5 border border-[#EADBC8]">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="w-7 h-7 flex items-center justify-center rounded text-primary-container hover:bg-surface-container active:scale-90 font-bold transition-transform"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <span className="font-label-lg text-sm text-on-surface font-bold w-7 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="w-7 h-7 flex items-center justify-center rounded text-primary-container hover:bg-surface-container active:scale-90 font-bold transition-transform"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>

                      {/* Price Calculation */}
                      <div className="text-right">
                        <span className="font-title-lg text-base font-bold text-primary-container">
                          ₹{itemTotalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add More Food CTA */}
            <Link
              to="/menu"
              className="w-full py-2.5 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-[#EADBC8] text-primary-container font-label-lg text-xs font-bold flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              Add More Delicacies
            </Link>

            {/* Offers & Coupons Section */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md border border-[#EADBC8] shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined text-tertiary-fixed-dim text-[20px]">
                  sell
                </span>
                <h4 className="font-title-md text-sm font-bold">Royal Offers &amp; Promo</h4>
              </div>

              {/* Coupon Applied Box */}
              {appliedCoupon ? (
                <div className="bg-surface-container-low rounded-lg p-3 flex items-center justify-between gap-2 border border-[#1E7E34]/30">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-[#1E7E34] text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-md text-xs font-bold text-on-surface tracking-wide uppercase truncate">
                        {appliedCoupon.code} Applied!
                      </span>
                      <span className="font-body-sm text-xs text-[#1E7E34] font-medium truncate">
                        {appliedCoupon.description}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="font-label-sm text-xs font-bold text-error uppercase shrink-0 px-2 py-1 rounded hover:bg-surface-container"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ENTER COUPON CODE"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="flex-1 h-11 px-3 bg-surface-container-low rounded-lg border border-[#EADBC8] font-label-md text-xs text-on-surface placeholder:text-on-surface-variant uppercase focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-tertiary-fixed-dim"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="h-11 px-4 rounded-lg bg-primary-container text-on-primary font-label-md text-xs font-bold hover:bg-primary active:scale-95 transition-all"
                    type="button"
                  >
                    Apply
                  </button>
                </div>
              )}

              {couponMessage && (
                <span className="text-xs text-primary font-semibold">{couponMessage}</span>
              )}
            </div>

            {/* Cooking & Contactless Delivery Preferences */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md border border-[#EADBC8] shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined text-tertiary-container text-[20px]">
                  room_service
                </span>
                <h4 className="font-title-md text-sm font-bold">
                  Delivery &amp; Dining Preferences
                </h4>
              </div>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={leaveAtDoor}
                  onChange={(e) => setLeaveAtDoor(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-primary-container accent-primary-container shrink-0"
                />
                <div className="flex flex-col">
                  <span className="font-label-md text-xs text-on-surface font-semibold">
                    Avoid calling, leave at door with guard
                  </span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">
                    Rider will drop food securely at reception
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={noPlasticCutlery}
                  onChange={(e) => setNoPlasticCutlery(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-primary-container accent-primary-container shrink-0"
                />
                <div className="flex flex-col">
                  <span className="font-label-md text-xs text-on-surface font-semibold">
                    Don't send plastic cutlery (Go Green 🌱)
                  </span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">
                    Thank you for helping us reduce environmental impact
                  </span>
                </div>
              </label>

              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Add cooking instructions (e.g. Less oil, extra onions)..."
                  value={cookingInstructions}
                  onChange={(e) => setCookingInstructions(e.target.value)}
                  className="w-full h-10 px-3 bg-surface-container-low border border-[#EADBC8] rounded-lg font-body-sm text-xs text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest"
                />
              </div>
            </div>

            {/* Bill Details / Price Breakdown */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md border border-[#EADBC8] shadow-sm flex flex-col gap-2.5">
              <h4 className="font-title-md text-sm font-bold text-on-surface pb-1">
                Royal Bill Details
              </h4>

              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant">Item Total</span>
                <span className="text-on-surface font-semibold">
                  ₹{itemSubtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <span>Delivery Partner Fee</span>
                  <span className="material-symbols-outlined text-[14px]">info</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-on-surface-variant line-through text-[11px]">₹40</span>
                  <span className="text-[#1E7E34] font-bold text-[11px] uppercase">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant">Packaging &amp; Safe Royal Handi</span>
                <span className="text-on-surface font-semibold">₹{packagingFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <span>Taxes &amp; Restaurant GST (5%)</span>
                  <span className="material-symbols-outlined text-[14px]">help_outline</span>
                </div>
                <span className="text-on-surface font-semibold">₹{taxAmount.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between items-center text-xs text-[#1E7E34]">
                  <div className="flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[16px]">celebration</span>
                    <span>Coupon Discount ({appliedCoupon?.code})</span>
                  </div>
                  <span className="font-bold">-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Total Divider */}
              <div className="h-0.5 bg-surface-container-high my-1"></div>

              <div className="flex justify-between items-baseline pt-1">
                <div className="flex flex-col">
                  <span className="font-title-lg text-base font-bold text-on-surface">To Pay</span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">
                    Inclusive of all taxes
                  </span>
                </div>
                <span className="font-headline-md text-xl font-bold text-primary-container">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>

              {/* Savings Pill */}
              <div className="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between text-[#1E7E34] mt-1 border border-[#1E7E34]/20">
                <span className="font-label-md text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">savings</span>
                  Total Savings on this order
                </span>
                <span className="font-label-lg text-xs font-bold">
                  ₹{totalSavings.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Chef's Freshness Guarantee Note */}
            <div className="bg-surface-container-low rounded-xl p-space-md border border-[#EADBC8] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 text-primary-container">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-xs font-bold text-on-surface">
                  PK Punjabi Freshness Promise
                </span>
                <p className="font-body-sm text-[11px] text-on-surface-variant">
                  Cooked fresh in brass handis with desi ghee. No artificial food colors or preservatives.
                </p>
              </div>
            </div>

            {/* Checkout Action Button */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleCheckout}
                className="w-full h-14 bg-primary-container hover:bg-primary text-on-primary rounded-xl font-label-lg text-sm font-bold flex items-center justify-between px-space-md shadow-lg active:scale-[0.98] transition-all"
                type="button"
              >
                <div className="flex flex-col text-left">
                  <span className="text-xs opacity-90 leading-none">
                    {totalItemCount} Item{totalItemCount === 1 ? '' : 's'}
                  </span>
                  <span className="font-headline-sm text-lg text-tertiary-fixed-dim">
                    ₹{Math.round(grandTotal)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-on-primary font-bold">
                  <span>Proceed to Checkout</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </div>
              </button>

              {/* Toggle Demo Button for UX Reviewers */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setForceEmptyPreview(true)}
                  className="text-on-surface-variant font-label-sm text-xs underline hover:text-primary transition-colors"
                  type="button"
                >
                  Toggle empty cart state preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


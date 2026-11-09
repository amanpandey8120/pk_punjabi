import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { DietaryBadge } from '../components/DietaryBadge';

export const AccountPage: React.FC = () => {
  const { user, updateUser, addAddress, setPrimaryAddress, toggleVegOnly } = useAuth();
  const { orders, addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<'profile' | 'auth'>('profile');
  const [authSubTab, setAuthSubTab] = useState<'login' | 'register'>('login');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newLabel, setNewLabel] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [newLine, setNewLine] = useState('');
  const [newArea, setNewArea] = useState('');
  const [newCity, setNewCity] = useState('Chandigarh');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Auth form states
  const [loginPhone, setLoginPhone] = useState(user.phone);
  const [loginEmail, setLoginEmail] = useState(user.email);
  const [loginName, setLoginName] = useState(user.name);

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLine.trim()) return;
    addAddress({
      label: newLabel,
      addressLine: newLine,
      area: newArea || 'Central',
      city: newCity,
      isPrimary: false,
    });
    setNewLine('');
    setNewArea('');
    setIsAddingAddress(false);
    setActionNotice('New royal address saved successfully!');
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleReorder = (orderId: string) => {
    const o = orders.find((ord) => ord.id === orderId);
    if (!o) return;
    o.items.forEach((item) => {
      addToCart({
        dishId: 'dal-makhani',
        name: item.name,
        dietary: item.dietary,
        unitPrice: Math.round(item.price / item.quantity),
        quantity: item.quantity,
        portionName: item.portion,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYhhSPsz_QDkoqIGK-zxiDLHDKe_3s6ib1Na9_ka5fOGjaUFPRw8NN-i65rnm4M-aKb7MiKapWtNlcg_o7pjOpWERFR00yMuKbVRmCggAZiU2mvVxVH4p78ILuC02XeSIxewd-DtilHWyV5eH8vIbCbL27Y2wN9i_YwGLm_2_76RZJ8CGqR4f7dEF9gw01sS14dpaXcXK0DAfEk8yzAaoNH18K_oLgvAzfHyysE0QG',
      });
    });
    setActionNotice('Items re-added to your Royal Basket!');
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface pb-32 md:pb-20">
      {/* Top Header */}
      <div className="bg-surface-container-low border-b border-[#EADBC8] py-4 px-gutter-mobile md:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-[24px]">
              account_balance
            </span>
            <h1 className="font-headline-md text-xl md:text-2xl font-bold text-on-surface">
              Patron Sanctuary
            </h1>
          </div>

          {/* Toggle between profile view and login/register view for testing */}
          <button
            id="viewToggleBtn"
            onClick={() => setActiveTab((t) => (t === 'profile' ? 'auth' : 'profile'))}
            className="text-xs font-bold text-primary-container bg-surface-container-high px-3 py-1.5 rounded-full hover:bg-surface-container border border-[#EADBC8] transition-all"
          >
            {activeTab === 'profile' ? 'Switch to Login / Register View' : 'Back to Patron Profile'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-gutter-mobile md:px-8 pt-6 flex flex-col gap-6">
        {actionNotice && (
          <div className="p-3 bg-surface-container-low border border-[#1E7E34] text-[#1E7E34] text-xs font-bold rounded-xl animate-in fade-in">
            {actionNotice}
          </div>
        )}

        {/* Tab 1: Profile View */}
        {activeTab === 'profile' ? (
          <>
            {/* User Profile Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-[#EADBC8] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-tertiary-fixed-dim/40 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-primary-container text-on-primary w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-[14px]">stars</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface">
                      {user.name}
                    </h2>
                    <span className="font-label-sm text-[10px] bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full font-bold uppercase">
                      VIP
                    </span>
                  </div>
                  <span className="text-xs font-bold text-primary-container mt-0.5">
                    {user.loyaltyTier}
                  </span>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant mt-1.5">
                    <span>{user.phone}</span>
                    <span>•</span>
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Edit Profile Quick Trigger */}
              <button
                onClick={() => {
                  const newName = prompt('Enter your name:', user.name);
                  if (newName) updateUser({ name: newName });
                }}
                className="px-4 py-2 rounded-xl bg-surface-container-low border border-[#EADBC8] text-xs font-bold text-primary-container hover:bg-surface-container transition-all"
              >
                Edit Profile
              </button>
            </div>

            {/* Royal Rewards & Loyalty Points Card */}
            <div className="bg-gradient-to-r from-[#48121C] to-[#741C28] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex flex-col gap-2 z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D9A441]">
                  PK Royal Rewards Pass
                </span>
                <h3 className="font-headline-lg text-3xl font-bold">
                  {user.royaltyPoints} <span className="text-sm font-normal text-white/80">Points</span>
                </h3>
                <p className="text-xs text-white/80 max-w-md">
                  Earn 1 Royal Point for every ₹10 spent. Redeem points for authentic Claypot Handis, Tandoori Platters, and VIP dining perks.
                </p>
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-auto z-10">
                <button
                  onClick={() => {
                    setActionNotice('Voucher code ROYALPK applied for ₹150 off!');
                    setTimeout(() => setActionNotice(null), 3000);
                  }}
                  className="h-10 px-4 rounded-xl bg-[#D9A441] text-[#362400] font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow"
                >
                  <span className="material-symbols-outlined text-[18px]">card_giftcard</span>
                  Redeem ₹150 Voucher
                </button>
                <span className="text-[11px] text-[#D9A441] text-center">
                  Tier: Maharaja Gold
                </span>
              </div>
            </div>

            {/* Recent Orders History */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-[#EADBC8] shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#EADBC8]/40 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container text-[22px]">
                    receipt_long
                  </span>
                  <h3 className="font-title-md text-base font-bold text-on-surface">
                    Recent Royal Orders
                  </h3>
                </div>
                <Link to="/orders" className="text-xs font-bold text-primary-container hover:underline">
                  Track Active
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-xl bg-surface-container-low border border-[#EADBC8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-on-surface">{order.displayId}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            order.status === 'delivered'
                              ? 'bg-[#1E7E34]/15 text-[#1E7E34]'
                              : 'bg-tertiary-fixed text-on-tertiary-fixed'
                          }`}
                        >
                          {order.status === 'delivered' ? 'Delivered' : 'Cooking in Handi'}
                        </span>
                        <span className="text-[11px] text-on-surface-variant">• {order.placedAt}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs text-on-surface">
                        {order.items.map((it, idx) => (
                          <span key={idx} className="bg-surface-container-lowest px-2 py-0.5 rounded border border-[#EADBC8]/60">
                            {it.name} × {it.quantity}
                          </span>
                        ))}
                      </div>

                      <span className="text-xs font-bold text-primary-container mt-1">
                        Total: ₹{order.grandTotal} (Paid)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {order.status !== 'delivered' && (
                        <Link
                          to="/orders"
                          className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg bg-primary-container text-on-primary text-xs font-bold text-center"
                        >
                          Track Live
                        </Link>
                      )}
                      <button
                        onClick={() => handleReorder(order.id)}
                        className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-primary-container/40 text-primary-container hover:bg-primary-container hover:text-white text-xs font-bold transition-all"
                      >
                        Reorder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Delivery Addresses */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-[#EADBC8] shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#EADBC8]/40 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container text-[22px]">
                    pin_drop
                  </span>
                  <h3 className="font-title-md text-base font-bold text-on-surface">
                    Saved Delivery Addresses
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddingAddress(!isAddingAddress)}
                  className="text-xs font-bold text-primary-container hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  {isAddingAddress ? 'Cancel' : 'Add New'}
                </button>
              </div>

              {isAddingAddress && (
                <form
                  onSubmit={handleSaveNewAddress}
                  className="p-4 bg-surface-container-low rounded-xl border border-primary-container/30 flex flex-col gap-3 animate-in fade-in"
                >
                  <span className="text-xs font-bold text-on-surface">Add New Royal Address</span>
                  <div className="flex gap-2">
                    {(['Home', 'Work', 'Other'] as const).map((lbl) => (
                      <button
                        key={lbl}
                        type="button"
                        onClick={() => setNewLabel(lbl)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          newLabel === lbl
                            ? 'bg-primary-container text-on-primary'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="House / Flat / Street address"
                    value={newLine}
                    onChange={(e) => setNewLine(e.target.value)}
                    className="p-2.5 bg-surface-container-lowest border border-[#EADBC8] rounded-lg text-xs text-on-surface focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Area / Sector (e.g. Sector 35)"
                      value={newArea}
                      onChange={(e) => setNewArea(e.target.value)}
                      className="p-2.5 bg-surface-container-lowest border border-[#EADBC8] rounded-lg text-xs text-on-surface focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="p-2.5 bg-surface-container-lowest border border-[#EADBC8] rounded-lg text-xs text-on-surface focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-9 bg-primary-container text-on-primary rounded-lg text-xs font-bold uppercase tracking-wider"
                  >
                    Save Address
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user.savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-4 rounded-xl border flex flex-col justify-between gap-3 ${
                      addr.isPrimary
                        ? 'border-primary-container bg-surface-container-low ring-1 ring-primary-container/30'
                        : 'border-[#EADBC8] bg-surface-container-lowest'
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-on-surface flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-primary-container">
                            {addr.label === 'Home' ? 'home' : addr.label === 'Work' ? 'apartment' : 'pin_drop'}
                          </span>
                          {addr.label}
                        </span>
                        {addr.isPrimary ? (
                          <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed px-1.5 py-0.5 rounded font-bold uppercase">
                            Default
                          </span>
                        ) : (
                          <button
                            onClick={() => setPrimaryAddress(addr.id)}
                            className="text-[11px] text-primary-container font-semibold hover:underline"
                          >
                            Set Default
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                        {addr.addressLine}
                      </p>
                      <span className="text-[11px] text-on-surface font-medium">
                        {addr.area}, {addr.city}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* App & Dining Preferences */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-[#EADBC8] shadow-sm flex flex-col gap-4">
              <h3 className="font-title-md text-base font-bold text-on-surface border-b border-[#EADBC8]/40 pb-3">
                Preferences &amp; Diet
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DietaryBadge type="veg" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-on-surface">Pure Vegetarian Mode</span>
                    <span className="text-[11px] text-on-surface-variant">Hide all non-vegetarian delicacies across the application</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleVegOnly}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    user.vegOnlyMode ? 'bg-[#1E7E34]' : 'bg-surface-container-high'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      user.vegOnlyMode ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Tab 2: Authentication Modal Tabs View */
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-[#EADBC8] shadow-md max-w-md mx-auto w-full flex flex-col gap-6">
            {/* Tabs */}
            <div className="flex border-b border-[#EADBC8]">
              <button
                id="tabLogin"
                onClick={() => setAuthSubTab('login')}
                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-all ${
                  authSubTab === 'login'
                    ? 'border-primary-container text-primary-container'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Sign In to Royal Account
              </button>
              <button
                id="tabRegister"
                onClick={() => setAuthSubTab('register')}
                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-all ${
                  authSubTab === 'register'
                    ? 'border-primary-container text-primary-container'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                New Patron Register
              </button>
            </div>

            {authSubTab === 'login' ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateUser({ phone: loginPhone });
                  setActiveTab('profile');
                  setActionNotice('Logged in successfully!');
                  setTimeout(() => setActionNotice(null), 3000);
                }}
                className="flex flex-col gap-4 text-xs"
              >
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-on-surface">Registered Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="p-3 bg-surface-container-low border border-[#EADBC8] rounded-xl text-sm text-on-surface focus:outline-none focus:border-primary-container"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-on-surface">Royal PIN / Password</label>
                  <input
                    type="password"
                    defaultValue="1234"
                    className="p-3 bg-surface-container-low border border-[#EADBC8] rounded-xl text-sm text-on-surface focus:outline-none focus:border-primary-container"
                  />
                </div>

                <button
                  type="submit"
                  className="h-12 bg-primary-container text-on-primary rounded-xl font-bold text-sm shadow uppercase tracking-wider mt-2"
                >
                  Verify &amp; Sign In
                </button>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateUser({ name: loginName, email: loginEmail, phone: loginPhone });
                  setActiveTab('profile');
                  setActionNotice('Welcome to PK Punjabi Family! Registered successfully.');
                  setTimeout(() => setActionNotice(null), 3000);
                }}
                className="flex flex-col gap-4 text-xs"
              >
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-on-surface">Full Name</label>
                  <input
                    type="text"
                    required
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    placeholder="Simran Kaur"
                    className="p-3 bg-surface-container-low border border-[#EADBC8] rounded-xl text-sm text-on-surface focus:outline-none focus:border-primary-container"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-on-surface">Email Address</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="simran@example.com"
                    className="p-3 bg-surface-container-low border border-[#EADBC8] rounded-xl text-sm text-on-surface focus:outline-none focus:border-primary-container"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-on-surface">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="p-3 bg-surface-container-low border border-[#EADBC8] rounded-xl text-sm text-on-surface focus:outline-none focus:border-primary-container"
                  />
                </div>

                <button
                  type="submit"
                  className="h-12 bg-primary-container text-on-primary rounded-xl font-bold text-sm shadow uppercase tracking-wider mt-2"
                >
                  Create Royal Account
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


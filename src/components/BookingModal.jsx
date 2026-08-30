import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import { X, Check, MessageCircle, Download, ArrowRight, ArrowLeft, Tag, Sparkles } from 'lucide-react';

export const BookingModal = ({
  isOpen,
  onClose,
  initialSelection,
  selectionType,
  preselectedStylist,
  showToast,
  onOpenMyBookings,
}) => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedStylist, setSelectedStylist] = useState({ id: 'any', name: 'Any Available Specialist', role: 'Expert Team' });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [clientInfo, setClientInfo] = useState({
    name: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Set min & default date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  // Handle pre-selections
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setAppliedCoupon(null);
      setCouponCode('');
      setCouponError('');

      if (selectionType === 'custom_multi' && Array.isArray(initialSelection)) {
        setSelectedServices(initialSelection);
      } else if (initialSelection) {
        if (selectionType === true) {
          // Package
          const pkg = siteConfig.packages.find((p) => p.id === initialSelection);
          if (pkg) {
            setSelectedServices([{ id: pkg.id, name: pkg.title, price: pkg.price, duration: 'Combo Session' }]);
          }
        } else {
          // Single Service
          const srv = siteConfig.services.find((s) => s.id === initialSelection);
          if (srv) setSelectedServices([srv]);
        }
      } else {
        setSelectedServices([]);
      }

      if (preselectedStylist) {
        setSelectedStylist(preselectedStylist);
      } else {
        setSelectedStylist({ id: 'any', name: 'Any Available Specialist', role: 'Expert Team' });
      }
    }
  }, [isOpen, initialSelection, selectionType, preselectedStylist]);

  if (!isOpen) return null;

  const toggleService = (srv) => {
    const exists = selectedServices.some((s) => s.id === srv.id);
    if (exists) {
      setSelectedServices(selectedServices.filter((s) => s.id !== srv.id));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const subtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);

  // Apply Coupon Logic
  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    const coupon = siteConfig.coupons.find((c) => c.code === code);
    if (!coupon) {
      setCouponError('Invalid promo code. Try "GLAM20" or "FIRSTVISIT"');
      setAppliedCoupon(null);
      return;
    }

    if (subtotal < coupon.minBill) {
      setCouponError(`Requires minimum bill of ${siteConfig.brand.currency}${coupon.minBill}`);
      setAppliedCoupon(null);
      return;
    }

    setAppliedCoupon(coupon);
    setCouponError('');
    showToast(`Promo Code '${coupon.code}' applied!`, 'success');
  };

  // Calculate discount
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percent') {
      discountAmount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
  }
  const totalPayable = Math.max(0, subtotal - discountAmount);

  // Step Validation & Navigation
  const handleNext = () => {
    if (step === 1) {
      if (selectedServices.length === 0) {
        showToast('Please select at least 1 service to proceed', 'error');
        return;
      }
    } else if (step === 3) {
      if (!selectedDate) {
        showToast('Please choose an appointment date', 'error');
        return;
      }
      if (!selectedSlot) {
        showToast('Please choose a time slot', 'error');
        return;
      }
    } else if (step === 4) {
      if (!clientInfo.name.trim()) {
        showToast('Please enter your name', 'error');
        return;
      }
      if (!clientInfo.phone.trim() || clientInfo.phone.length < 8) {
        showToast('Please enter a valid phone number', 'error');
        return;
      }
    }

    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  // Save Booking to Local Storage
  const saveBookingToStorage = () => {
    const bookingId = 'AL-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
      id: bookingId,
      createdAt: new Date().toISOString(),
      clientName: clientInfo.name,
      clientPhone: clientInfo.phone,
      date: selectedDate,
      slot: selectedSlot,
      stylist: selectedStylist.name,
      services: selectedServices.map((s) => s.name),
      amount: totalPayable,
      currency: siteConfig.brand.currency,
      status: 'Confirmed via Website',
    };

    const existing = JSON.parse(localStorage.getItem('aura_luxe_bookings') || '[]');
    existing.unshift(newBooking);
    localStorage.setItem('aura_luxe_bookings', JSON.stringify(existing));
    return newBooking;
  };

  // WhatsApp Message Generator
  const handleConfirmWhatsApp = () => {
    const saved = saveBookingToStorage();
    const serviceList = selectedServices.map((s) => `• ${s.name}`).join('\n');
    
    const message = `${siteConfig.whatsapp.messageHeader}

👤 *Client Name:* ${clientInfo.name}
📱 *Phone:* ${clientInfo.phone}
📅 *Date:* ${selectedDate}
⏰ *Time Slot:* ${selectedSlot}
✂️ *Specialist:* ${selectedStylist.name}

💅 *Services Requested:*
${serviceList}

💰 *Estimated Bill:* ${siteConfig.brand.currency}${totalPayable}${appliedCoupon ? ` (Promo '${appliedCoupon.code}': -${siteConfig.brand.currency}${discountAmount})` : ''}
${clientInfo.notes ? `📝 *Special Request:* ${clientInfo.notes}` : ''}

Please confirm my appointment slot. Thank you!`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${siteConfig.whatsapp.number}?text=${encoded}`;
    window.open(url, '_blank');
    showToast('Booking details forwarded to WhatsApp!', 'success');
    onClose();
  };

  const handleSaveDigitalPass = () => {
    const saved = saveBookingToStorage();
    showToast(`Appointment Pass #${saved.id} saved!`, 'success');
    onClose();
    onOpenMyBookings();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-obsidian-900 border border-white/10 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between sticky top-0 bg-obsidian-900 z-10">
          <div>
            <h3 className="font-heading text-lg font-normal text-white">
              {step === 1 && '1. Choose Treatments'}
              {step === 2 && '2. Select Specialist'}
              {step === 3 && '3. Pick Date & Slot'}
              {step === 4 && '4. Contact & Offers'}
              {step === 5 && '5. Review & Confirm'}
            </h3>
            <p className="text-[11px] text-gray-400 font-light">Instant WhatsApp Pass Generation</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-white/[0.02] border-b border-white/[0.05] text-[11px]">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`flex items-center gap-1.5 font-medium ${
                step === s ? 'text-gold-light' : step > s ? 'text-emerald-400' : 'text-gray-500'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  step === s
                    ? 'btn-liquid-gold text-black'
                    : step > s
                    ? 'bg-emerald-400 text-black'
                    : 'bg-white/10'
                }`}
              >
                {step > s ? '✓' : s}
              </span>
              <span className="hidden sm:inline">
                {s === 1 && 'Services'}
                {s === 2 && 'Artist'}
                {s === 3 && 'Time'}
                {s === 4 && 'Details'}
                {s === 5 && 'Pass'}
              </span>
            </div>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          
          {/* STEP 1: SERVICES */}
          {step === 1 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>Selected: <strong className="text-white">{selectedServices.length} Treatment(s)</strong></span>
                <span>Subtotal: <strong className="text-white font-accent">{siteConfig.brand.currency}{subtotal}</strong></span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {siteConfig.services.map((srv) => {
                  const isSelected = selectedServices.some((s) => s.id === srv.id);
                  return (
                    <div
                      key={srv.id}
                      onClick={() => toggleService(srv)}
                      className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gold/10 border-gold/60'
                          : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                            isSelected ? 'btn-liquid-gold border-gold text-black' : 'border-white/20'
                          }`}
                        >
                          {isSelected && <Check size={12} />}
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-white">{srv.name}</h4>
                          <p className="text-[10px] text-gray-400 font-light">⏱️ {srv.duration}</p>
                        </div>
                      </div>

                      <span className="font-accent font-bold text-xs text-gold-light">
                        {siteConfig.brand.currency}{srv.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: STYLIST */}
          {step === 2 && (
            <div className="space-y-3">
              <p className="text-xs text-gray-400 font-light">
                Choose your specialist or let our concierge assign the next available chair:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Any Specialist */}
                <div
                  onClick={() => setSelectedStylist({ id: 'any', name: 'Any Available Specialist', role: 'Expert Team' })}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    selectedStylist.id === 'any'
                      ? 'bg-gold/10 border-gold/60'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full btn-liquid-gold text-black flex items-center justify-center font-bold text-sm">
                    ✨
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-white">Any Specialist</h4>
                    <p className="text-[10px] text-gray-400 font-light">Fastest chair allocation</p>
                  </div>
                </div>

                {/* Stylist Profiles */}
                {siteConfig.stylists.map((st) => (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStylist(st)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      selectedStylist.id === st.id
                        ? 'bg-gold/10 border-gold/60'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <img src={st.image} alt={st.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                    <div>
                      <h4 className="text-xs font-medium text-white">{st.name}</h4>
                      <p className="text-[10px] text-gold font-light">{st.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Select Date:
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/10 focus:border-gold/50 rounded-xl text-white text-xs outline-none cursor-pointer"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider">
                  Select Preferred Time Slot:
                </label>

                {siteConfig.bookingSlots.map((group, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <h5 className="text-[11px] font-medium text-gold-light">{group.period}</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {group.slots.map((slot) => {
                        const isSelected = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                              isSelected
                                ? 'btn-liquid-gold font-bold text-black'
                                : 'bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 border border-white/10'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT & OFFERS */}
          {step === 4 && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    placeholder="Sayan Mukherjee"
                    className="w-full px-3.5 py-2 bg-white/[0.04] border border-white/10 focus:border-gold/50 rounded-xl text-white text-xs outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-300 mb-1">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                    placeholder="9876543210"
                    className="w-full px-3.5 py-2 bg-white/[0.04] border border-white/10 focus:border-gold/50 rounded-xl text-white text-xs outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-gray-300 mb-1">Special Notes / Requests</label>
                <textarea
                  value={clientInfo.notes}
                  onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                  placeholder="Skin sensitivities, bridal wedding dates, or styling preferences..."
                  rows={2}
                  className="w-full px-3.5 py-2 bg-white/[0.04] border border-white/10 focus:border-gold/50 rounded-xl text-white text-xs outline-none font-light"
                ></textarea>
              </div>

              {/* Promo Coupon Code */}
              <div className="pt-2 border-t border-white/[0.08]">
                <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Promo Coupon Code:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="GLAM20 or FIRSTVISIT"
                    className="flex-grow px-3.5 py-2 bg-white/[0.04] border border-white/10 focus:border-gold/50 rounded-xl text-white text-xs uppercase outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="btn-liquid-ghost px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {appliedCoupon && (
                  <div className="mt-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1.5">
                    <Tag size={12} />
                    <span>Coupon '{appliedCoupon.code}' applied!</span>
                  </div>
                )}

                {couponError && (
                  <div className="mt-1.5 text-xs text-rose-400">
                    {couponError}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: SUMMARY & PASS */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Guest:</span>
                  <strong className="text-white">{clientInfo.name} ({clientInfo.phone})</strong>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Schedule:</span>
                  <strong className="text-gold-light">{selectedDate} at {selectedSlot}</strong>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Specialist:</span>
                  <strong className="text-white">{selectedStylist.name}</strong>
                </div>

                <div className="pt-2 border-t border-white/[0.08] space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Treatments:</span>
                  {selectedServices.map((s) => (
                    <div key={s.id} className="flex justify-between text-[11px] text-gray-300">
                      <span>• {s.name}</span>
                      <span>{siteConfig.brand.currency}{s.price}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/[0.08] space-y-1 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal:</span>
                    <span>{siteConfig.brand.currency}{subtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount ({appliedCoupon.code}):</span>
                      <span>-{siteConfig.brand.currency}{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-accent font-bold text-white pt-2 border-t border-white/[0.08]">
                    <span>Estimated Total:</span>
                    <span>{siteConfig.brand.currency}{totalPayable}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleConfirmWhatsApp}
                  className="w-full py-3 rounded-full bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-whatsapp transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>Confirm via WhatsApp Fast Pass</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveDigitalPass}
                  className="w-full py-2.5 rounded-full btn-liquid-ghost text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download size={14} />
                  <span>Save Offline Digital Pass</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Controls */}
        <div className="p-4 border-t border-white/[0.08] bg-obsidian-900 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            className={`px-4 py-1.5 rounded-full btn-liquid-ghost text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
              step === 1 ? 'invisible' : 'visible'
            }`}
          >
            <ArrowLeft size={13} /> Back
          </button>

          {step < 5 && (
            <button
              type="button"
              onClick={handleNext}
              className="btn-liquid-gold px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight size={13} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

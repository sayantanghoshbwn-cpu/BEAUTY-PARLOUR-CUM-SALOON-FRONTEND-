import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Calculator, Trash2, Clock, Sparkles, Plus } from 'lucide-react';

export const PriceCalculator = ({ onOpenBooking, showToast }) => {
  const [basket, setBasket] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');

  const handleAdd = (e) => {
    const sId = e.target.value;
    if (!sId) return;
    const service = siteConfig.services.find((s) => s.id === sId);
    if (service && !basket.some((i) => i.id === service.id)) {
      setBasket([...basket, service]);
    }
    setSelectedServiceId('');
  };

  const handleRemove = (sId) => {
    setBasket(basket.filter((i) => i.id !== sId));
  };

  const totalCost = basket.reduce((acc, curr) => acc + curr.price, 0);
  const totalDuration = basket.reduce((acc, curr) => acc + (parseInt(curr.duration) || 30), 0);

  const handleBookAll = () => {
    if (basket.length === 0) {
      showToast('Please add at least 1 service to your estimate', 'error');
      return;
    }
    onOpenBooking(basket, 'custom_multi');
  };

  return (
    <section id="calculator" className="py-24 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold text-gold uppercase tracking-widest block mb-2">
            Estimator & Planner
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-3">
            Custom Session <span className="font-italic italic text-champagne-gradient">Calculator</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
            Select multiple treatments to calculate expected duration, bill subtotal, and reserve in 1 click.
          </p>
        </div>

        {/* Minimalist Calculator Box */}
        <div className="max-w-2xl mx-auto liquid-glass rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Dropdown Select */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-widest mb-2">
              Add Treatments to Session:
            </label>
            <select
              value={selectedServiceId}
              onChange={handleAdd}
              className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 focus:border-gold/50 rounded-2xl text-white text-xs outline-none cursor-pointer backdrop-blur-xl"
            >
              <option value="" className="bg-obsidian-900 text-gray-400">-- Choose a service to add to basket --</option>
              {siteConfig.services.map((s) => (
                <option key={s.id} value={s.id} className="bg-obsidian-900 text-white">
                  {s.name} - {siteConfig.brand.currency}{s.price} ({s.duration})
                </option>
              ))}
            </select>
          </div>

          {/* Basket List */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-widest mb-2">
              Selected Basket:
            </label>
            
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {basket.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-xs bg-white/[0.02] rounded-2xl border border-dashed border-white/10">
                  No treatments added yet. Choose a treatment from above.
                </div>
              ) : (
                basket.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-white/[0.03] border border-white/5 rounded-2xl text-xs"
                  >
                    <div>
                      <h4 className="font-semibold text-white">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 font-light">⏱️ {item.duration}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-accent font-bold text-gold-light">
                        {siteConfig.brand.currency}{item.price}
                      </span>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-gray-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Metrics Row */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Estimated Session:</span>
              <strong className="text-base text-white font-accent flex items-center gap-1 mt-0.5">
                <Clock size={14} className="text-gold-light" /> {totalDuration} min
              </strong>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Estimated Total:</span>
              <strong className="text-xl font-accent font-bold text-white">
                {siteConfig.brand.currency}{totalCost}
              </strong>
            </div>
          </div>

          {/* Book All Button */}
          <button
            onClick={handleBookAll}
            className="w-full btn-liquid-gold py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles size={14} />
            <span>Book Selected Session</span>
          </button>
        </div>

      </div>
    </section>
  );
};

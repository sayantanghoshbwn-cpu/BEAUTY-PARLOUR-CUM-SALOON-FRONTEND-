import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Crown, Check, ArrowUpRight } from 'lucide-react';

export const VipPackages = ({ onOpenBooking }) => {
  return (
    <section id="packages" className="py-24 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold text-gold uppercase tracking-widest block mb-2">
            Curated Bundles
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-3">
            VIP Makeover <span className="font-italic italic text-champagne-gradient">Packages</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
            All-inclusive beauty and wellness sessions with significant bundled savings.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {siteConfig.packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-500 ${
                pkg.popular
                  ? 'liquid-glass border-gold/50 shadow-2xl lg:-translate-y-2'
                  : 'liquid-glass hover:border-white/20'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 right-6 bg-gradient-to-r from-gold-light via-gold to-gold-dark text-black font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Crown size={11} /> {pkg.badge}
                </span>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-normal text-white mb-1">{pkg.title}</h3>
                  <p className="text-xs text-gray-400 font-light">{pkg.subtitle}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-6 flex-wrap">
                  <span className="font-accent font-bold text-3xl text-white">
                    {siteConfig.brand.currency}{pkg.price}
                  </span>
                  <span className="text-xs text-gray-500 line-through">
                    {siteConfig.brand.currency}{pkg.originalPrice}
                  </span>
                  <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                    {pkg.savings}
                  </span>
                </div>

                {/* Feature Checklist */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 font-light">
                      <div className="w-4 h-4 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold-light mt-0.5">
                        <Check size={10} />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book Button */}
              <button
                onClick={() => onOpenBooking(pkg.id, true)}
                className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  pkg.popular
                    ? 'btn-liquid-gold'
                    : 'btn-liquid-ghost'
                }`}
              >
                <span>Reserve Package</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

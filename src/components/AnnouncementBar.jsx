import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Sparkles, Copy, Check, Tag } from 'lucide-react';

export const AnnouncementBar = ({ onOpenBooking, showToast }) => {
  const [copied, setCopied] = useState(false);
  const { announcement } = siteConfig;
  if (!announcement?.enabled) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(announcement.couponCode);
    setCopied(true);
    showToast(`Promo Code '${announcement.couponCode}' copied! Use at checkout for discount.`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <aside aria-label="Special Offers" className="pt-16 sm:pt-24 pb-2 px-3 sm:px-6 text-center relative z-20 flex justify-center">
      {/* Apple iOS Liquid Glass Dynamic Island Pill */}
      <div className="relative group max-w-xl w-full">
        {/* Subtle Ambient Back Glow - Disabled on mobile, ultra-soft on desktop */}
        <div className="hidden sm:block absolute -inset-0.5 bg-gold/10 rounded-full blur-sm opacity-20 group-hover:opacity-40 transition duration-500 pointer-events-none"></div>

        <div className="relative liquid-glass-pill rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 flex items-center justify-between gap-2.5 sm:gap-3 text-xs border border-white/10 hover:border-gold/30 transition-all duration-300 shadow-sm">
          
          {/* Left: Minimal iOS Tag Badge */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="w-5 h-5 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold-light">
              <Sparkles size={11} className="animate-pulse" />
            </span>
            <span className="font-bold text-[10px] sm:text-xs text-gold-light uppercase tracking-wider">
              {announcement.badge}
            </span>
          </div>

          {/* Center: Offer description */}
          <div className="text-gray-300 text-[11px] sm:text-xs font-light truncate hidden xs:block sm:block">
            {announcement.text}
          </div>

          {/* Right: iOS Interactive Copy Pill Button */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] sm:text-xs font-bold transition-all duration-300 cursor-pointer flex-shrink-0 ${
              copied
                ? 'bg-emerald-500 text-black shadow-md'
                : 'btn-liquid-gold hover:scale-105 shadow-sm'
            }`}
            title="Click to copy promo code"
            aria-label="Copy promo code"
          >
            {copied ? (
              <>
                <Check size={12} className="stroke-[3]" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <Copy size={11} />
                <span>{announcement.couponCode}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

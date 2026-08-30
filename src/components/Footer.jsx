import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { MessageCircle, Phone, Mail, ArrowUpRight } from 'lucide-react';

export const Footer = ({ onOpenBooking }) => {
  const { brand, contact, whatsapp } = siteConfig;

  return (
    <footer className="border-t border-white/[0.08] pt-20 pb-12 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="font-heading font-normal text-2xl text-white tracking-wide">
              {brand.name}
            </div>
            <div className="text-[10px] tracking-[0.25em] font-bold text-gold uppercase">
              {brand.logoBadge}
            </div>
            <p className="text-xs text-gray-400 max-w-sm font-light leading-relaxed">
              {brand.tagline}. An intimate sanctuary offering hospital-grade hygiene, certified master stylists, and instant WhatsApp booking.
            </p>
            
            {/* Socials */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-gold hover:text-black border border-white/10 flex items-center justify-center text-gray-300 transition-all"
                title="Instagram"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-gold hover:text-black border border-white/10 flex items-center justify-center text-gray-300 transition-all"
                title="Facebook"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a
                href={`https://wa.me/${whatsapp.number}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-[#25d366] hover:text-white border border-white/10 flex items-center justify-center text-gray-300 transition-all"
                title="WhatsApp"
              >
                <MessageCircle size={14} />
              </a>
              <a
                href={contact.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-rose-500 hover:text-white border border-white/10 flex items-center justify-center text-gray-300 transition-all"
                title="YouTube"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-medium text-white text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-gray-400 font-light">
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">VIP Bundles</a></li>
              <li><a href="#transformations" className="hover:text-white transition-colors">Before & After</a></li>
              <li><a href="#stylists" className="hover:text-white transition-colors">Specialists</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Price Estimator</a></li>
            </ul>
          </div>

          {/* Treatments */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-medium text-white text-xs uppercase tracking-wider">Rituals</h4>
            <ul className="space-y-2 text-gray-400 font-light">
              <li><a href="#services" className="hover:text-white transition-colors">Brazilian Keratin</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Hydra Glow Facial</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Bridal Makeover</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Hot Stone Body Spa</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Men's Grooming</a></li>
            </ul>
          </div>

          {/* Concierge */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-medium text-white text-xs uppercase tracking-wider">VIP Desk</h4>
            <div className="space-y-2 font-light">
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-gold-light" />
                <a href={contact.phoneHref} className="text-white hover:text-gold-light">
                  {contact.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-gold-light" />
                <span className="truncate">{contact.email}</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="w-full btn-liquid-gold py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Book Appointment</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 font-light">
          <div>
            © 2026 {brand.name}. Minimal Haute Couture Experience.
          </div>
          <div>
            React + Vite + Tailwind + Lenis Smooth Scroll
          </div>
        </div>
      </div>
    </footer>
  );
};

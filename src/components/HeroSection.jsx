import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Sparkles, MessageCircle, Star, ArrowUpRight } from 'lucide-react';

export const HeroSection = ({ onOpenBooking }) => {
  const { brand, whatsapp } = siteConfig;

  return (
    <section id="home" className="relative pt-4 sm:pt-8 pb-20 md:pb-32">
      {/* Radiant Golden Specular Ambient Glow (Warm, harmonious, luxury) */}
      <div className="absolute -top-20 sm:-top-24 left-1/2 -translate-x-1/2 w-[320px] xs:w-[420px] sm:w-[750px] h-[280px] xs:h-[360px] sm:h-[480px] bg-gradient-to-b from-gold/22 via-amber-500/14 to-transparent sm:from-gold/25 sm:via-amber-500/15 rounded-full blur-[60px] xs:blur-[70px] sm:blur-[110px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Narrative */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Minimal Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-gold-light text-xs font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              <span>Sanctuary of Haute Couture & Wellness</span>
            </div>

            {/* Editorial Typographic Title */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08]">
              Where Subtle <br />
              <span className="font-italic italic text-champagne-gradient font-medium">Artistry</span> Meets <br />
              Haute Rejuvenation.
            </h1>

            {/* Minimal Description */}
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Bespoke balayage couture, clinical Hydra facials, royal bridal makeovers, and tranquil Ayurvedic wellness in the heart of Kolkata.
            </p>

            {/* Clean CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="btn-liquid-gold px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles size={14} />
                <span>Reserve Session</span>
              </button>

              <a
                href={`https://wa.me/${whatsapp.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-liquid-ghost px-6 py-3.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-2"
              >
                <MessageCircle size={15} className="text-[#25d366]" />
                <span>WhatsApp Concierge</span>
                <ArrowUpRight size={14} className="text-gray-400" />
              </a>
            </div>

            {/* Subtle Metrics Strip */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/[0.08] max-w-md mx-auto lg:mx-0">
              <div>
                <div className="font-accent font-bold text-2xl text-white">
                  {brand.experienceYears}
                </div>
                <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">Years Mastery</div>
              </div>

              <div>
                <div className="font-accent font-bold text-2xl text-white">
                  {brand.happyClients}
                </div>
                <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">Clients Loved</div>
              </div>

              <div>
                <div className="font-accent font-bold text-2xl text-white flex items-center justify-center lg:justify-start gap-1">
                  <span>4.9</span>
                  <Star size={14} className="fill-gold text-gold" />
                </div>
                <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">Google Rating</div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Framing */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              {/* Subtle Golden Ambient Halo behind image */}
              <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-tr from-gold/20 via-amber-500/12 to-rose-gold/10 rounded-[2.8rem] blur-lg sm:blur-xl opacity-45 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none z-0"></div>

              {/* Glass Frame */}
              <div className="relative rounded-[2.5rem] overflow-hidden p-2 liquid-glass z-10">
                <div className="rounded-[2.1rem] overflow-hidden relative">
                  <img
                    src="assets/images/hero_salon.jpg"
                    alt="Aura Luxe Sanctuary"
                    className="w-full h-[450px] sm:h-[520px] object-cover hover:scale-105 transition-transform duration-1000"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Floating Glass Pill on Image */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl liquid-glass-pill flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Royal Bridal & Hair Studio</div>
                      <div className="text-[10px] text-gray-400">Internationally certified master team</div>
                    </div>
                    <button
                      onClick={() => onOpenBooking()}
                      className="w-8 h-8 rounded-full btn-liquid-gold flex items-center justify-center text-black"
                      title="Quick Book"
                    >
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

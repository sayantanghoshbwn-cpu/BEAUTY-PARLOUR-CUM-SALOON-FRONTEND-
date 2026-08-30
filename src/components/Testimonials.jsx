import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Star, MapPin } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold text-gold uppercase tracking-widest block mb-2">
            Verified Experiences
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-3">
            Voices of Our <span className="font-italic italic text-champagne-gradient">Guests</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
            Real stories from guests who rely on Aura Luxe for high-stakes celebrations and daily wellness.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.testimonials.map((t, idx) => (
            <div
              key={idx}
              className="liquid-glass rounded-3xl p-7 flex flex-col justify-between transition-all duration-500 hover:border-gold/30 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={13} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500">{t.date}</span>
                </div>
                <p className="text-xs text-gray-300 font-light italic leading-relaxed mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-sm font-medium text-white">{t.name}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 font-light">
                    <MapPin size={10} className="text-gold-light" />
                    <span>{t.location}</span>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-gold-light bg-gold/10 px-2 py-0.5 rounded-full">
                  {t.service}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

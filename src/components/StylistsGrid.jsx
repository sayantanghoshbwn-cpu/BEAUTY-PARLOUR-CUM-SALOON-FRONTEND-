import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Star, Trophy, ArrowUpRight } from 'lucide-react';

export const StylistsGrid = ({ onOpenBooking }) => {
  return (
    <section id="stylists" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold text-gold uppercase tracking-widest block mb-2">
            The Artisans
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-3">
            Master Stylists & <span className="font-italic italic text-champagne-gradient">Specialists</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
            Internationally certified beauty professionals committed to personalized excellence.
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.stylists.map((st) => (
            <div
              key={st.id}
              className="liquid-glass rounded-3xl overflow-hidden flex flex-col group transition-all duration-500 hover:border-gold/40 hover:-translate-y-1 text-center"
            >
              {/* Photo */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={st.image}
                  alt={st.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-white/15 text-gold-light text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center gap-1">
                  <Trophy size={11} /> {st.experience}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <h3 className="font-heading text-xl font-medium text-white mb-1">{st.name}</h3>
                  <p className="text-xs text-gold font-semibold mb-2">{st.role}</p>
                  <div className="flex items-center justify-center gap-1 text-gold-light text-xs font-bold mb-3">
                    <Star size={12} className="fill-gold text-gold" />
                    <span>{st.rating} Rating</span>
                  </div>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {st.bio}
                  </p>
                </div>

                <button
                  onClick={() => onOpenBooking(null, false, st)}
                  className="w-full py-2.5 rounded-full btn-liquid-ghost text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Book with {st.name.split(' ')[0]}</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

import React, { useState, useMemo } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Search, Clock, Star, Sparkles, Scissors, Heart, Crown, Flower2, Gem, UserCheck, ArrowUpRight } from 'lucide-react';

const iconMap = {
  Sparkles: Sparkles,
  Scissors: Scissors,
  Heart: Heart,
  Crown: Crown,
  Flower2: Flower2,
  Gem: Gem,
  UserCheck: UserCheck,
};

export const ServicesMenu = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    return siteConfig.services.filter((service) => {
      const matchCategory = activeCategory === 'all' || service.category === activeCategory;
      const matchSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold text-gold uppercase tracking-widest block mb-2">
            Curated Menu
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-3">
            Signature <span className="font-italic italic text-champagne-gradient">Treatments</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
            Handcrafted rituals designed to enhance and celebrate your natural elegance.
          </p>
        </div>

        {/* Controls: Minimal Search & Category Filter Pills */}
        <div className="flex flex-col items-center gap-5 mb-14">
          {/* Search Capsule */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatments (e.g. Keratin, Hydra Facial, Balayage)..."
              className="w-full pl-10 pr-10 py-2.5 bg-white/[0.03] border border-white/10 focus:border-gold/50 rounded-full text-white placeholder-gray-500 text-xs outline-none transition-all backdrop-blur-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="w-full overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center justify-start md:justify-center gap-2 min-w-max px-2">
              {siteConfig.categories.map((cat) => {
                const IconComponent = iconMap[cat.icon] || Sparkles;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'btn-liquid-gold font-bold shadow-md'
                        : 'bg-white/[0.03] hover:bg-white/[0.07] text-gray-300 border border-white/10 hover:border-gold/30'
                    }`}
                  >
                    <IconComponent size={13} />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 text-gray-400 liquid-glass rounded-3xl p-8 max-w-md mx-auto">
            <div className="text-3xl mb-2">🔍</div>
            <h3 className="text-sm font-bold text-white mb-1">No services found matching "{searchQuery}"</h3>
            <p className="text-xs text-gray-400">Try selecting a different category or search keyword.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="liquid-glass rounded-3xl overflow-hidden flex flex-col group transition-all duration-500 hover:border-gold/40 hover:-translate-y-1"
              >
                {/* Image Frame */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  
                  {/* Badge */}
                  <span className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md border border-white/15 text-gold-light font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {service.badge}
                  </span>

                  {/* Duration */}
                  <div className="absolute bottom-3 right-3.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-medium text-gray-300 flex items-center gap-1 border border-white/10">
                    <Clock size={11} className="text-gold-light" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-heading text-lg font-medium text-white group-hover:text-gold-light transition-colors leading-snug">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-white/[0.05] border border-white/10 px-2 py-0.5 rounded-md text-xs font-semibold text-gold-light flex-shrink-0">
                        <Star size={11} className="fill-gold text-gold" />
                        <span>{service.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Price & Book Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                    <div>
                      <div className="font-accent font-bold text-lg text-white">
                        {siteConfig.brand.currency}{service.price}
                      </div>
                      <div className="text-[10px] text-gray-500 line-through">
                        {siteConfig.brand.currency}{service.originalPrice}
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenBooking(service.id, false)}
                      className="btn-liquid-gold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      <span>Book</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

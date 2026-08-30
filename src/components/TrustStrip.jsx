import React from 'react';
import { ShieldCheck, Gem, Scissors, MessageCircle } from 'lucide-react';

export const TrustStrip = () => {
  const values = [
    {
      icon: <ShieldCheck size={20} className="text-gold-light" />,
      title: "Hospital-Grade Sanitization",
      desc: "Sterilized tools & single-use linen",
    },
    {
      icon: <Gem size={20} className="text-gold-light" />,
      title: "Global Luxury Brands",
      desc: "Kérastase, Olaplex, MAC, Huda",
    },
    {
      icon: <Scissors size={20} className="text-gold-light" />,
      title: "Master Certified Stylists",
      desc: "Internationally trained artists",
    },
    {
      icon: <MessageCircle size={20} className="text-gold-light" />,
      title: "WhatsApp Fast Pass",
      desc: "Instant booking & reminders",
    },
  ];

  return (
    <section className="py-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl liquid-glass flex items-center gap-3.5 transition-all duration-300 hover:border-gold/30"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0">
                {v.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-wide">{v.title}</h4>
                <p className="text-[11px] text-gray-400 font-light mt-0.5">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

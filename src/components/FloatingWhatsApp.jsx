import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { whatsapp, brand } = siteConfig;

  const handlePromptClick = (query) => {
    const message = encodeURIComponent(`Hi ${brand.name}, I would like to inquire about: "${query}"`);
    window.open(`https://wa.me/${whatsapp.number}?text=${message}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Concierge Popover */}
      {isOpen && (
        <div className="w-72 bg-obsidian-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="bg-[#075e54] text-white p-3.5 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-xs flex items-center gap-1">
                <span>{brand.name} VIP Desk</span>
              </h4>
              <p className="text-[10px] text-emerald-200">🟢 Typically replies instantly</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          <div className="p-3.5 space-y-2">
            <div className="text-[11px] text-gray-300 font-light leading-relaxed">
              Hello! How may we assist your appointment today?
            </div>

            <div className="space-y-1">
              {whatsapp.quickQueries.map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(query)}
                  className="w-full text-left p-2 rounded-xl bg-white/[0.03] hover:bg-[#25d366]/10 border border-white/5 hover:border-[#25d366]/40 text-[11px] text-gray-300 hover:text-[#25d366] transition-all cursor-pointer font-light"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-[#25d366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-whatsapp-glow hover:scale-105 transition-all relative cursor-pointer"
        aria-label="Open WhatsApp Concierge"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

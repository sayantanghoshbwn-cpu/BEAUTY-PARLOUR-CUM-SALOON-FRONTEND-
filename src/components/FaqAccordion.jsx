import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { ChevronDown } from 'lucide-react';

export const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[11px] font-bold text-gold uppercase tracking-widest block mb-2">
            Clarity & Policies
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-normal text-white mb-3">
            Frequently Asked <span className="font-italic italic text-champagne-gradient">Questions</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
            Transparent answers regarding trials, hygiene protocols, and cancellation guidelines.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {siteConfig.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`liquid-glass rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-gold/40' : 'hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-heading text-sm sm:text-base font-normal text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-gold-light' : 'text-gray-400'
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-gray-400 font-light leading-relaxed border-t border-white/[0.05] mt-1 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowUpRight } from 'lucide-react';

export const LocationHours = ({ onOpenBooking }) => {
  const { contact, brand, whatsapp, businessHours } = siteConfig;

  return (
    <section id="contact" className="py-24 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold text-gold uppercase tracking-widest block mb-2">
            Visit Our Lounge
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-3">
            Location & <span className="font-italic italic text-champagne-gradient">Opening Hours</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
            Drop by our serene sanctuary or reach out directly to our dedicated VIP concierge.
          </p>
        </div>

        {/* Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Info Card */}
          <div className="lg:col-span-5 liquid-glass rounded-3xl p-8 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="font-heading text-2xl font-normal text-white mb-6">
                {brand.name} Studio Lounge
              </h3>

              <div className="space-y-4 text-xs text-gray-300 font-light">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin size={17} className="text-gold-light flex-shrink-0 mt-0.5" />
                  <span>{contact.address}</span>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone size={17} className="text-gold-light flex-shrink-0 mt-0.5" />
                  <div>
                    <a href={contact.phoneHref} className="text-white hover:text-gold-light font-medium">
                      {contact.primaryPhone}
                    </a>
                    <div className="text-[10px] text-gray-500">VIP Bookings & Consultations</div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail size={17} className="text-gold-light flex-shrink-0 mt-0.5" />
                  <span>{contact.email}</span>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3 pt-2">
                  <Clock size={17} className="text-gold-light flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div><strong>Mon - Fri:</strong> {businessHours.mon_fri.display}</div>
                    <div><strong>Sat - Sun:</strong> {businessHours.saturday.display}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/[0.08]">
              <button
                onClick={() => onOpenBooking()}
                className="btn-liquid-gold py-3 px-5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 flex-1 cursor-pointer"
              >
                <span>Reserve Chair</span>
                <ArrowUpRight size={13} />
              </button>
              <a
                href={`https://wa.me/${whatsapp.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-liquid-ghost py-3 px-5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 flex-1 text-center"
              >
                <MessageCircle size={15} className="text-[#25d366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Map Frame */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden liquid-glass p-2 min-h-[350px]">
            <div className="w-full h-full rounded-[1.3rem] overflow-hidden min-h-[340px]">
              <iframe
                src={contact.googleMapsEmbed}
                title="Salon Location Map"
                className="w-full h-full min-h-[340px] border-0 grayscale hover:grayscale-0 transition-all duration-700"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

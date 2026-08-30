import React, { useState, useEffect, useRef, useCallback } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Sparkles, Menu, X, CalendarCheck } from 'lucide-react';

export const Navbar = ({ onOpenBooking, onOpenMyBookings }) => {
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [capsuleStyle, setCapsuleStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const navListRef = useRef(null);
  const linkRefs = useRef({});
  const tickingRef = useRef(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Packages', href: '#packages' },
    { label: 'Transformations', href: '#transformations' },
    { label: 'Stylists', href: '#stylists' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Studio', href: '#contact' },
  ];

  // Real-time open/closed status
  useEffect(() => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    let hours = siteConfig.businessHours.mon_fri;
    if (day === 0) hours = siteConfig.businessHours.sunday;
    else if (day === 6) hours = siteConfig.businessHours.saturday;

    setIsOpenNow(hour >= hours.open && hour < hours.close);
  }, []);

  // Update capsule position helper
  const updateCapsulePosition = useCallback((targetEl) => {
    if (targetEl && navListRef.current) {
      const listRect = navListRef.current.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      setCapsuleStyle({
        left: targetRect.left - listRect.left,
        width: targetRect.width,
        opacity: 1,
      });
    }
  }, []);

  // High-performance throttled scroll listener for 60-120fps smoothness
  useEffect(() => {
    const sectionIds = ['home', 'services', 'packages', 'transformations', 'stylists', 'calculator', 'contact'];

    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 200;
          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const el = document.getElementById(sectionIds[i]);
            if (el && el.offsetTop <= scrollPosition) {
              const currentId = `#${sectionIds[i]}`;
              setActiveSection((prev) => (prev !== currentId ? currentId : prev));
              break;
            }
          }
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync capsule with activeSection when not hovering
  useEffect(() => {
    if (!isHovering && linkRefs.current[activeSection]) {
      updateCapsulePosition(linkRefs.current[activeSection]);
    }
  }, [activeSection, isHovering, updateCapsulePosition]);

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      if (linkRefs.current[activeSection]) {
        updateCapsulePosition(linkRefs.current[activeSection]);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection, updateCapsulePosition]);

  // Hover handlers
  const handleMouseEnter = (e) => {
    setIsHovering(true);
    updateCapsulePosition(e.currentTarget);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (linkRefs.current[activeSection]) {
      updateCapsulePosition(linkRefs.current[activeSection]);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pt-3 sm:pt-4 px-3 sm:px-6 flex justify-center pointer-events-none transform-gpu">
      <nav className="pointer-events-auto liquid-glass-pill rounded-full px-3.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 max-w-5xl w-full transition-all duration-300 hover:border-gold/30">
        
        {/* Brand Monogram & Name */}
        <a href="#home" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full btn-liquid-gold flex items-center justify-center font-bold text-xs font-heading shadow-sm">
            AL
          </div>
          <span className="font-heading font-bold text-xs sm:text-sm tracking-wider text-white group-hover:text-gold-light transition-colors truncate max-w-[110px] sm:max-w-none">
            {siteConfig.brand.name}
          </span>
        </a>

        {/* Desktop Floating Links with Active & Hover Liquid Water-Drop Capsule */}
        <div
          ref={navListRef}
          onMouseLeave={handleMouseLeave}
          className="hidden md:flex items-center relative py-1 px-1"
        >
          {/* Animated Water-Drop Liquid Capsule */}
          <div
            className="absolute top-1 bottom-1 bg-gold/15 backdrop-blur-md rounded-full border border-gold/40 shadow-[0_0_12px_rgba(212,175,55,0.25)] transition-all duration-300 ease-out pointer-events-none"
            style={{
              left: `${capsuleStyle.left}px`,
              width: `${capsuleStyle.width}px`,
              opacity: capsuleStyle.opacity,
            }}
          >
            {/* Water-drop top specular highlight */}
            <div className="absolute top-0.5 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"></div>
          </div>

          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => (linkRefs.current[link.href] = el)}
                onMouseEnter={handleMouseEnter}
                className={`relative z-10 px-3 py-1 text-xs font-medium transition-colors duration-200 ${
                  isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Live Open Status Indicator */}
          <div
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-gray-300"
            title={isOpenNow ? "Salon is currently Open" : "Salon is currently Closed"}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isOpenNow ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`}></span>
            <span>{isOpenNow ? 'Open Now' : 'Closed'}</span>
          </div>

          {/* My Bookings Trigger */}
          <button
            onClick={onOpenMyBookings}
            className="p-1.5 sm:p-2 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 text-gray-300 hover:text-gold-light transition-all cursor-pointer"
            title="My Appointment Passes"
            aria-label="My Appointment Passes"
          >
            <CalendarCheck size={14} />
          </button>

          {/* Minimal Book Button */}
          <button
            onClick={() => onOpenBooking()}
            className="btn-liquid-gold px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1"
          >
            <Sparkles size={12} />
            <span>Book</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-gray-300 hover:text-white rounded-full bg-white/[0.05] border border-white/10 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Liquid Glass Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-0 bg-black/95 backdrop-blur-3xl z-50 p-6 flex flex-col justify-between md:hidden animate-in fade-in duration-200 pointer-events-auto">
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full btn-liquid-gold flex items-center justify-center font-bold text-xs font-heading">
                AL
              </div>
              <span className="font-heading font-bold text-base text-white">
                {siteConfig.brand.name}
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-white/[0.08] text-gray-300 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav List */}
          <div className="space-y-3 py-6 overflow-y-auto">
            <div className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1">
              Menu Directory
            </div>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between text-lg font-heading py-2.5 px-3 rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-gold/15 border-gold/40 text-gold-light font-semibold shadow-sm'
                      : 'border-transparent text-gray-300 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive ? (
                    <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                  ) : (
                    <span className="text-xs text-gray-500 font-sans">→</span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Bottom Actions */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-gray-400 py-1">
              <span>Salon Status:</span>
              <span className={`font-semibold ${isOpenNow ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isOpenNow ? '🟢 Open Now' : '🔴 Closed'}
              </span>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full btn-liquid-gold py-3.5 rounded-full font-bold text-xs uppercase tracking-wider"
            >
              Book An Appointment
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyBookings();
              }}
              className="w-full btn-liquid-ghost py-3 rounded-full font-semibold text-xs text-gray-300"
            >
              View My Passes
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { AnnouncementBar } from './components/AnnouncementBar';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { ServicesMenu } from './components/ServicesMenu';
import { VipPackages } from './components/VipPackages';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { PriceCalculator } from './components/PriceCalculator';
import { StylistsGrid } from './components/StylistsGrid';
import { Testimonials } from './components/Testimonials';
import { FaqAccordion } from './components/FaqAccordion';
import { LocationHours } from './components/LocationHours';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ToastNotification } from './components/ToastNotification';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [bookingSelection, setBookingSelection] = useState(null);
  const [bookingType, setBookingType] = useState(false);
  const [preselectedStylist, setPreselectedStylist] = useState(null);
  const [toast, setToast] = useState(null);

  // Initialize Ultra-Smooth High-FPS Lenis Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
  };

  const handleOpenBooking = (selection = null, isPackage = false, stylist = null) => {
    setBookingSelection(selection);
    setBookingType(isPackage);
    setPreselectedStylist(stylist);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-white selection:bg-gold/30 selection:text-white relative overflow-hidden font-sans">
      
      {/* Ultra-Lightweight Hardware-Accelerated Ambient Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transform-gpu">
        {/* Luxury Dot Matrix Grid */}
        <div className="absolute inset-0 bg-luxury-grid opacity-60"></div>

        {/* Optimized Static Radial Glow Sprites (Zero GPU filter penalty) */}
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-gradient-to-br from-gold/10 via-transparent to-transparent rounded-full blur-[90px]"></div>
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-gradient-to-bl from-amber-500/10 via-transparent to-transparent rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-gold/10 via-transparent to-transparent rounded-full blur-[90px]"></div>
        
        {/* Decorative Geometric Luxury Rings */}
        <svg className="absolute top-20 right-5 w-80 h-80 opacity-[0.03] text-gold pointer-events-none" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>

        <svg className="absolute top-[55%] left-8 w-72 h-72 opacity-[0.03] text-gold pointer-events-none" viewBox="0 0 200 200" fill="none">
          <rect x="20" y="20" width="160" height="160" rx="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 6" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Liquid Glass Pill Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
      />

      {/* Main Page Content */}
      <main className="relative">
        <AnnouncementBar
          onOpenBooking={() => handleOpenBooking()}
          showToast={showToast}
        />

        <HeroSection onOpenBooking={() => handleOpenBooking()} />

        <TrustStrip />

        <ServicesMenu onOpenBooking={(id, isPkg) => handleOpenBooking(id, isPkg)} />

        <VipPackages onOpenBooking={(id, isPkg) => handleOpenBooking(id, isPkg)} />

        <BeforeAfterSlider onOpenBooking={(id) => handleOpenBooking(id, false)} />

        <PriceCalculator
          onOpenBooking={(basket, type) => handleOpenBooking(basket, type)}
          showToast={showToast}
        />

        <StylistsGrid onOpenBooking={(id, isPkg, st) => handleOpenBooking(id, isPkg, st)} />

        <Testimonials />

        <FaqAccordion />

        <LocationHours onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Minimal Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialSelection={bookingSelection}
        selectionType={bookingType}
        preselectedStylist={preselectedStylist}
        showToast={showToast}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
      />

      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
        showToast={showToast}
      />

      {/* Floating Minimalist WhatsApp Concierge */}
      <FloatingWhatsApp />

      {/* Toast Alert */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;

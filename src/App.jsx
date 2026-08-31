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
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Luxury Dot Matrix Grid */}
        <div className="absolute inset-0 bg-luxury-grid opacity-75"></div>

        {/* Responsive Radial Glow Sprites */}
        {/* 1. Top Header / Hero Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-[-80px] sm:-top-28 w-[350px] xs:w-[450px] sm:w-[700px] h-[350px] sm:h-[650px] bg-gradient-to-b sm:bg-gradient-to-br from-gold/35 via-amber-500/20 to-transparent rounded-full blur-[60px] sm:blur-[100px]"></div>

        {/* 2. Middle-Right Services/VIP Glow */}
        <div className="absolute top-[32%] -right-10 sm:-right-24 w-[300px] xs:w-[380px] sm:w-[650px] h-[340px] sm:h-[650px] bg-gradient-to-bl from-amber-500/30 via-gold/20 to-transparent rounded-full blur-[60px] sm:blur-[110px]"></div>

        {/* 3. Middle-Left Calculator/Transformations Glow */}
        <div className="absolute top-[58%] -left-10 sm:-left-24 w-[280px] xs:w-[360px] sm:w-[600px] h-[320px] sm:h-[600px] bg-gradient-to-tr from-gold/30 via-rose-gold/20 to-transparent rounded-full blur-[60px] sm:blur-[100px]"></div>

        {/* 4. Bottom Footer Glow */}
        <div className="absolute bottom-10 right-0 sm:right-10 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] bg-gradient-to-tl from-gold/25 via-amber-500/15 to-transparent rounded-full blur-[60px] sm:blur-[100px]"></div>
        
        {/* Decorative Geometric Luxury Rings */}
        <svg className="absolute top-16 right-2 sm:top-20 sm:right-8 w-44 h-44 sm:w-80 sm:h-80 opacity-[0.05] text-gold pointer-events-none" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>

        <svg className="absolute top-[55%] left-2 sm:left-8 w-40 h-40 sm:w-72 sm:h-72 opacity-[0.05] text-gold pointer-events-none" viewBox="0 0 200 200" fill="none">
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
      <main className="relative z-10">
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

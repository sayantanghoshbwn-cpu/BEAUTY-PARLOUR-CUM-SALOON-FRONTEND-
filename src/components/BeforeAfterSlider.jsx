import React, { useState, useRef, useEffect, useCallback } from 'react';
import { siteConfig } from '../config/siteConfig';
import { MoveHorizontal, ArrowUpRight } from 'lucide-react';

export const BeforeAfterSlider = ({ onOpenBooking }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const item = siteConfig.transformations[0];

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percent = (x / rect.width) * 100;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e) => {
      if (!isDragging || !e.touches[0]) return;
      handleMove(e.touches[0].clientX);
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handleMove]);

  return (
    <section id="transformations" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold text-gold uppercase tracking-widest block mb-2">
            Visible Transformations
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-3">
            Real Client <span className="font-italic italic text-champagne-gradient">Outcomes</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
            Drag the interactive slider to experience how our Brazilian Keratin revitalizes texture into glass-like shine.
          </p>
        </div>

        {/* Minimalist Slider Container */}
        <div className="max-w-4xl mx-auto liquid-glass rounded-3xl p-4 sm:p-6 shadow-2xl">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="relative h-80 sm:h-[480px] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10"
          >
            {/* After Image */}
            <img
              src={item.afterImg}
              alt="After treatment"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-gold-light border border-white/10 z-10">
              After: Silky Glass Hair ✨
            </span>

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={item.beforeImg}
                alt="Before treatment"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
              />
              <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-gray-300 border border-white/10 z-10">
                Before: Frizzy & Dry
              </span>
            </div>

            {/* Drag Handle */}
            <div
              className="absolute inset-y-0 w-0.5 bg-white shadow-2xl pointer-events-none"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full btn-liquid-gold border border-white flex items-center justify-center text-black shadow-lg">
                <MoveHorizontal size={15} />
              </div>
            </div>
          </div>

          {/* Bottom Meta & Action */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div>
              <h4 className="font-heading text-lg font-medium text-white">{item.title}</h4>
              <p className="text-xs text-gray-400 font-light">{item.description} • {item.duration}</p>
            </div>
            <button
              onClick={() => onOpenBooking('h1', false)}
              className="btn-liquid-gold px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <span>Book Transformation</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

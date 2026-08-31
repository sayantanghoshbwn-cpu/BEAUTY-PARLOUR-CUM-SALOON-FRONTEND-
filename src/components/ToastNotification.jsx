import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, X } from 'lucide-react';

export const ToastNotification = ({ toast, onClose, duration = 3500 }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!toast) {
      setIsExiting(false);
      return;
    }

    setIsExiting(false);

    // Auto-dismiss timer
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (onClose) onClose();
      }, 300); // Wait for fade-out transition
    }, duration);

    return () => clearTimeout(timer);
  }, [toast?.id, toast?.message, duration, onClose]);

  if (!toast) return null;

  const handleManualClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 200);
  };

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div
      className={`fixed top-5 right-5 sm:top-6 sm:right-6 z-50 transition-all duration-300 transform ${
        isExiting
          ? 'opacity-0 translate-y-[-12px] scale-95'
          : 'opacity-100 translate-y-0 scale-100'
      }`}
    >
      <div
        className={`px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl shadow-2xl border flex items-center gap-3 text-xs sm:text-sm font-medium backdrop-blur-2xl relative overflow-hidden max-w-sm sm:max-w-md ${
          isSuccess
            ? 'bg-[#062013]/95 border-emerald-500/40 text-emerald-100 shadow-[0_10px_30px_rgba(16,185,129,0.2)]'
            : isError
            ? 'bg-[#220c11]/95 border-rose-500/40 text-rose-100 shadow-[0_10px_30px_rgba(244,63,94,0.2)]'
            : 'bg-[#14120c]/95 border-gold/40 text-gold-light shadow-[0_10px_30px_rgba(212,175,55,0.2)]'
        }`}
      >
        {/* Leading Status Icon */}
        <div className="flex-shrink-0">
          {isSuccess && <CheckCircle2 size={18} className="text-emerald-400" />}
          {isError && <AlertCircle size={18} className="text-rose-400" />}
          {!isSuccess && !isError && <Sparkles size={18} className="text-gold" />}
        </div>

        {/* Message Text */}
        <span className="flex-grow leading-snug">{toast.message}</span>

        {/* Close Button */}
        <button
          onClick={handleManualClose}
          className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0 cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X size={14} />
        </button>

        {/* Animated Countdown Progress Line */}
        <div
          className={`absolute bottom-0 left-0 h-[2px] w-full ${
            isSuccess
              ? 'bg-emerald-400/60'
              : isError
              ? 'bg-rose-400/60'
              : 'bg-gold/60'
          }`}
          style={{
            animation: `shrinkWidth ${duration}ms linear forwards`,
          }}
        />
      </div>

      <style>{`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default ToastNotification;

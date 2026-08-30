import React from 'react';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const ToastNotification = ({ toast }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-5 duration-300 pointer-events-none">
      <div
        className={`px-5 py-3 rounded-2xl shadow-2xl border flex items-center gap-2.5 text-xs sm:text-sm font-semibold backdrop-blur-xl ${
          isSuccess
            ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
            : isError
            ? 'bg-rose-950/90 border-rose-500/50 text-rose-200'
            : 'bg-dark-surface/90 border-gold/50 text-gold-light'
        }`}
      >
        {isSuccess && <CheckCircle2 size={18} className="text-emerald-400" />}
        {isError && <AlertCircle size={18} className="text-rose-400" />}
        {!isSuccess && !isError && <Sparkles size={18} className="text-gold" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

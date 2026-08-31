import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import { X, Calendar, Clock, Scissors, User, Trash2, ArrowUpRight, Download, Printer } from 'lucide-react';
import { downloadAppointmentPassPdf, printAppointmentPass } from '../utils/pdfGenerator';

export const MyBookingsModal = ({ isOpen, onClose, onOpenBooking, showToast }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const stored = JSON.parse(localStorage.getItem('aura_luxe_bookings') || '[]');
      setBookings(stored);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCancel = (idx) => {
    if (window.confirm('Are you sure you want to cancel this appointment pass?')) {
      const updated = [...bookings];
      updated.splice(idx, 1);
      setBookings(updated);
      localStorage.setItem('aura_luxe_bookings', JSON.stringify(updated));
      showToast('Appointment pass cancelled successfully', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4">
      <div className="bg-obsidian-900 border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between sticky top-0 bg-obsidian-900 z-10">
          <div>
            <h3 className="font-heading text-lg font-normal text-white">Appointment Passes</h3>
            <p className="text-[11px] text-gray-400 font-light">Official reservation history</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 max-h-[65vh] overflow-y-auto space-y-3">
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="text-3xl">🎫</div>
              <h4 className="text-sm font-medium text-white">No Appointment Passes Found</h4>
              <p className="text-xs text-gray-400 max-w-xs mx-auto font-light">
                Your booked appointments and digital passes will be stored here for easy reference.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="btn-liquid-gold px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1 mt-2 cursor-pointer"
              >
                <span>Book Appointment</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          ) : (
            bookings.map((b, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-gold-light">
                    PASS #{b.id}
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    {b.status}
                  </span>
                </div>

                <h4 className="font-heading text-sm font-medium text-white">
                  {b.services.join(', ')}
                </h4>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 font-light">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} className="text-gold-light" />
                    <span>{b.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-gold-light" />
                    <span>{b.slot}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Scissors size={12} className="text-gold-light" />
                    <span>{b.stylist}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={12} className="text-gold-light" />
                    <span>{b.clientName}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-2">
                  <div className="font-accent font-bold text-sm text-white">
                    Total: {b.currency}{b.amount}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={async () => {
                        showToast('Generating official PDF pass...', 'info');
                        await downloadAppointmentPassPdf(b);
                        showToast(`Official PDF Pass #${b.id} downloaded!`, 'success');
                      }}
                      className="text-xs text-gold-light hover:text-gold font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      title="Download Official PDF Pass"
                    >
                      <Download size={12} /> Download PDF
                    </button>
                    <button
                      onClick={() => {
                        printAppointmentPass(b);
                      }}
                      className="text-xs text-gray-300 hover:text-white font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      title="Print Appointment Pass"
                    >
                      <Printer size={12} /> Print
                    </button>
                    <button
                      onClick={() => handleCancel(idx)}
                      className="text-xs text-gray-400 hover:text-rose-400 font-light flex items-center gap-1 transition-colors cursor-pointer"
                      title="Cancel Pass"
                    >
                      <Trash2 size={12} /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

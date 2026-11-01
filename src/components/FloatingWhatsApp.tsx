import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const officialNumber = '923333368420';
  const defaultMessage = encodeURIComponent(
    'Hello SJ Collections, I am visiting your official website and would like assistance with your luxury collection.'
  );
  const waUrl = `https://wa.me/${officialNumber}?text=${defaultMessage}`;

  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* Concierge Tooltip Banner */}
      {showTooltip && (
        <div className="mb-3 max-w-xs bg-[#1A1A1A] text-[#F9F8F4] p-4 rounded-lg shadow-xl border border-[#2C2C2C] relative transition-all animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-[#8A8882] hover:text-white p-1"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="text-[11px] font-semibold tracking-wider uppercase text-[#8A8882]">SJ Concierge</p>
          <p className="text-xs text-[#E8E5DE] mt-1 leading-relaxed">
            Need styling guidance, bespoke sizing, or assistance with your Cash on Delivery order?
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F9F8F4] bg-[#2C2C2C] px-3 py-1.5 rounded hover:bg-[#3C3C3C] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group flex items-center gap-2.5 bg-[#1A1A1A] text-[#F9F8F4] px-4 py-3 rounded-full shadow-2xl border border-[#3C3C3C] hover:bg-black transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2"
        aria-label="Contact SJ Collections on WhatsApp (+92 333 3368420)"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <MessageCircle className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
        <span className="text-xs font-medium tracking-wider uppercase hidden sm:inline-block">
          WhatsApp Concierge
        </span>
      </a>
    </aside>
  );
};

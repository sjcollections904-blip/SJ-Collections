import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onNavigateCatalog: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigateHome, onNavigateCatalog }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-[#EFECE4] flex items-center justify-center mx-auto text-[#1A1A1A]">
        <Compass className="w-8 h-8 stroke-[1.2]" />
      </div>
      <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8A8882] block">
        Error 404
      </span>
      <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#1A1A1A]">
        Page Not Located
      </h1>
      <p className="text-sm text-[#8A8882] max-w-md mx-auto leading-relaxed">
        The requested editorial page or creation could not be found. Please return to our curated collections or visit the homepage.
      </p>

      <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
        <button
          onClick={onNavigateHome}
          className="px-6 py-3 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-black transition-colors"
        >
          Return to Homepage
        </button>
        <button
          onClick={onNavigateCatalog}
          className="px-6 py-3 bg-white border border-[#D8D4CC] text-[#1A1A1A] text-xs font-semibold uppercase tracking-[0.16em] hover:border-[#1A1A1A] transition-colors"
        >
          Explore Collections
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Truck, RefreshCw, MessageSquare, Download } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#F9F8F4] pt-16 pb-12 border-t border-[#2A2A2A]">
      {/* Brand Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 border-b border-[#2C2C2C]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-start gap-4">
            <Truck className="w-5 h-5 text-[#8A8882] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold tracking-wide uppercase text-[#F9F8F4]">Nationwide Delivery</h4>
              <p className="text-xs text-[#8A8882] mt-1 leading-relaxed">
                Complimentary tracked dispatch on orders above PKR 10,000 across all cities of Pakistan.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ShieldCheck className="w-5 h-5 text-[#8A8882] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold tracking-wide uppercase text-[#F9F8F4]">Cash on Delivery (COD)</h4>
              <p className="text-xs text-[#8A8882] mt-1 leading-relaxed">
                Pay with cash at your doorstep upon parcel arrival. Zero payment risk, absolute peace of mind.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <RefreshCw className="w-5 h-5 text-[#8A8882] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold tracking-wide uppercase text-[#F9F8F4]">7-Day Size Exchange</h4>
              <p className="text-xs text-[#8A8882] mt-1 leading-relaxed">
                Seamless size and fitting exchange support directly through our dedicated WhatsApp concierge.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MessageSquare className="w-5 h-5 text-[#8A8882] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold tracking-wide uppercase text-[#F9F8F4]">Personal Concierge</h4>
              <p className="text-xs text-[#8A8882] mt-1 leading-relaxed">
                Direct styling, custom sizing, and order assistance via WhatsApp +92 333 3368420.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-12">
          
          {/* Brand & Monogram */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-[#F9F8F4] p-3 inline-block rounded-sm">
              <img src="/sj-logo.svg" alt="SJ Collections" className="h-10 w-auto" />
            </div>
            <p className="text-xs text-[#8A8882] leading-relaxed max-w-sm">
              SJ Collections is a luxury Pakistani fashion house committed to bespoke craftsmanship, enduring tailoring, full-grain leather goods, and refined artisanal silhouettes for discerning patrons.
            </p>
            <div className="pt-2 text-xs text-[#8A8882] space-y-1">
              <p>
                <strong className="text-[#F9F8F4] font-medium">Official WhatsApp:</strong>{' '}
                <a
                  href="https://wa.me/923333368420"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline underline-offset-4"
                >
                  +92 333 3368420
                </a>
              </p>
              <p>
                <strong className="text-[#F9F8F4] font-medium">Email:</strong>{' '}
                <a href="mailto:sjcollections904@gmail.com" className="hover:text-white underline underline-offset-4">
                  sjcollections904@gmail.com
                </a>
              </p>
              <p>
                <strong className="text-[#F9F8F4] font-medium">Headquarters:</strong> Gulberg III, Lahore, Pakistan
              </p>
            </div>
          </div>

          {/* Collections */}
          <div className="md:col-span-2 space-y-4">
            <h5 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F9F8F4]">Collections</h5>
            <ul className="space-y-2.5 text-xs text-[#8A8882]">
              <li>
                <button
                  onClick={() => onNavigate('catalog', { category: 'mens-clothing' })}
                  className="hover:text-white transition-colors"
                >
                  Men's Clothing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', { category: 'womens-clothing' })}
                  className="hover:text-white transition-colors"
                >
                  Women's Clothing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', { category: 'mens-footwear' })}
                  className="hover:text-white transition-colors"
                >
                  Men's Footwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', { category: 'womens-footwear' })}
                  className="hover:text-white transition-colors"
                >
                  Women's Footwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', { category: 'wallets' })}
                  className="hover:text-white transition-colors"
                >
                  Leather Wallets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', { category: 'bags' })}
                  className="hover:text-white transition-colors"
                >
                  Bags & Leather
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', { category: 'accessories' })}
                  className="hover:text-white transition-colors"
                >
                  Fashion Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Client Services */}
          <div className="md:col-span-2 space-y-4">
            <h5 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F9F8F4]">Client Services</h5>
            <ul className="space-y-2.5 text-xs text-[#8A8882]">
              <li>
                <button onClick={() => onNavigate('shipping-policy')} className="hover:text-white transition-colors">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('returns-policy')} className="hover:text-white transition-colors">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  Order Assistance & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact Atelier
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  The SJ Heritage
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2 space-y-4">
            <h5 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F9F8F4]">Legal & Privacy</h5>
            <ul className="space-y-2.5 text-xs text-[#8A8882]">
              <li>
                <button onClick={() => onNavigate('privacy-policy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <span className="text-[#666]">Cash on Delivery Only</span>
              </li>
              <li>
                <span className="text-[#666]">Prices in PKR (₨)</span>
              </li>
              <li className="pt-2">
                <a
                  href="/sj-collections-shopify-theme.zip"
                  download="sj-collections-shopify-theme.zip"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 text-[#C4A47C]"
                  title="Download ready-to-upload Shopify OS 2.0 Theme"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Shopify Theme (.zip)</span>
                </a>
              </li>
              <li>
                <a
                  href="/sj-collections-project.zip"
                  download="sj-collections-project.zip"
                  className="hover:text-[#8A8882] transition-colors inline-flex items-center gap-1.5 text-[#666]"
                  title="Download complete project archive"
                >
                  <Download className="w-3 h-3" />
                  <span>Full Project Archive (.zip)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Atelier Gazette */}
          <div className="md:col-span-2 space-y-4">
            <h5 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F9F8F4]">Atelier Gazette</h5>
            <p className="text-xs text-[#8A8882] leading-relaxed">
              Subscribe to receive private preview invitations and seasonal lookbooks.
            </p>
            {isSubscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#E8E5DE] bg-[#242426] p-3 rounded-xs border border-[#3A3A3C]">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you. You are on our private register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#242426] border border-[#3A3A3C] text-[#F9F8F4] placeholder-[#8A8882] text-xs px-3 py-2.5 focus:outline-none focus:border-[#F9F8F4] transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-[#F9F8F4] text-[#1A1A1A] text-xs font-semibold tracking-[0.14em] uppercase py-2.5 hover:bg-[#E8E5DE] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#2C2C2C] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A8882] gap-4">
        <p>© 2026 SJ Collections. All Rights Reserved. Crafted for Pakistan.</p>
        <div className="flex items-center gap-6">
          <span>Exclusive Single-Vendor Luxury House</span>
          <span aria-hidden="true">·</span>
          <span>Payment: Cash on Delivery</span>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Phone, ShieldCheck, Truck, RefreshCw, Send, Check } from 'lucide-react';

interface StaticPageProps {
  pageType: 'about' | 'contact' | 'shipping-policy' | 'returns-policy' | 'faq' | 'privacy-policy' | 'terms';
  onNavigateToCatalog: () => void;
}

export const StaticPages: React.FC<StaticPageProps> = ({ pageType, onNavigateToCatalog }) => {
  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const waAtelierUrl = `https://wa.me/923333368420?text=${encodeURIComponent(
    'Hello SJ Collections Atelier, I am reaching out through your official website contact page.'
  )}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 w-full min-w-0">
      {/* 1. ABOUT US */}
      {pageType === 'about' && (
        <div className="space-y-10">
          <div className="text-center space-y-3 pb-8 border-b border-[#E8E5DE]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8A8882]">
              The Atelier Heritage
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#1A1A1A]">
              About SJ Collections
            </h1>
            <p className="text-sm text-[#8A8882] max-w-xl mx-auto font-light">
              Elevating Pakistani textile artistry, bespoke menswear, womenswear couture, and artisanal leather cordwaining.
            </p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-6 text-sm text-[#444] leading-relaxed">
            <h2 className="font-serif-luxury text-2xl text-[#1A1A1A]">A Symphony of Heritage and Precision</h2>
            <p>
              Born in Lahore, Pakistan, <strong>SJ Collections</strong> was conceived as a testament to the timeless heritage of subcontinental tailoring and European structural refinement. In an era dominated by transient fashion, our atelier stands firmly for deliberate craftsmanship, enduring silhouettes, and uncompromising material integrity.
            </p>
            <p>
              Every garment in our collection is conceived through rigorous prototyping. Our men’s tailored waistcoats and prince coats feature bespoke canvases, hand-finished pick stitching, and genuine horn and metal crest buttons. Our women’s pret and formal ensembles honor centuries of generational zardozi, delicate mukaish, and resham threadwork, hand-executed on pure Katan raw silks and silk organzas.
            </p>

            <div className="my-8 p-8 bg-[#EFECE4] border border-[#E8E5DE] space-y-3 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A8882]">
                Our Philosophy
              </span>
              <p className="font-serif-luxury text-2xl text-[#1A1A1A] italic">
                "Luxury is not loudness; it is the silent mastery of material, proportion, and generational touch."
              </p>
            </div>

            <h2 className="font-serif-luxury text-2xl text-[#1A1A1A]">Handcrafted Leather Goods & Cordwaining</h2>
            <p>
              Beyond ceremonial attire, SJ Collections houses a master leather studio. Drawing inspiration from vintage luggage and classical bench-made footwear, each pair of shoes and structured handbag is crafted from full-grain French and Italian calfskins. Finished with traditional edge burnishing and solid brass hardware, our leather goods develop a rich patina that deepens with every journey.
            </p>

            <h2 className="font-serif-luxury text-2xl text-[#1A1A1A]">The Patron Experience in Pakistan</h2>
            <p>
              We believe luxury should be seamless and trustworthy. Serving patrons across Pakistan, all orders are dispatched via tracked courier services with <strong>Cash on Delivery (COD)</strong>, allowing you to examine the pristine craftsmanship in the comfort of your home before making payment.
            </p>
          </div>

          <div className="pt-8 border-t border-[#E8E5DE] flex justify-center">
            <button
              onClick={onNavigateToCatalog}
              className="px-8 py-3.5 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-black transition-colors"
            >
              Explore the Collections
            </button>
          </div>
        </div>
      )}

      {/* 2. CONTACT US */}
      {pageType === 'contact' && (
        <div className="space-y-12">
          <div className="text-center space-y-3 pb-8 border-b border-[#E8E5DE]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8A8882]">
              Client Services & Atelier Inquiries
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#1A1A1A]">
              Contact SJ Collections
            </h1>
            <p className="text-sm text-[#8A8882] max-w-xl mx-auto font-light">
              Our concierge is at your service for bespoke sizing, product queries, and order support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Contact Details */}
            <div className="md:col-span-5 space-y-6">
              <div className="bg-white p-6 border border-[#E8E5DE] space-y-4">
                <h3 className="font-serif-luxury text-xl text-[#1A1A1A]">Direct Channels</h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1A1A1A] block">Official WhatsApp Concierge</strong>
                      <a
                        href={waAtelierUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-800 font-semibold hover:underline mt-0.5 block"
                      >
                        +92 333 3368420
                      </a>
                      <p className="text-[#8A8882] mt-0.5">Instant assistance: 10:00 AM – 9:00 PM PKT</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#1A1A1A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1A1A1A] block">Email Inquiries</strong>
                      <a
                        href="mailto:sjcollections904@gmail.com"
                        className="text-[#1A1A1A] font-semibold hover:underline mt-0.5 block"
                      >
                        sjcollections904@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#1A1A1A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1A1A1A] block">Atelier & Headquarters</strong>
                      <p className="text-[#555] mt-0.5">
                        Gulberg III, Main Boulevard, Lahore, Pakistan
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Card */}
              <div className="bg-[#1A1A1A] text-[#F9F8F4] p-6 space-y-3">
                <h4 className="font-serif-luxury text-lg text-[#F9F8F4]">Prefer Instant Chat?</h4>
                <p className="text-xs text-[#8A8882] leading-relaxed">
                  Connect with our bespoke stylist directly on WhatsApp to ask about sizes, custom tailoring, or dispatch status.
                </p>
                <a
                  href={waAtelierUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F9F8F4] text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider hover:bg-white"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="md:col-span-7 bg-white p-6 sm:p-8 border border-[#E8E5DE]">
              <h3 className="font-serif-luxury text-xl text-[#1A1A1A] mb-4">Send an Atelier Message</h3>

              {contactSubmitted ? (
                <div className="p-8 text-center space-y-3 bg-[#F9F8F4] border border-[#E8E5DE]">
                  <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-serif-luxury text-xl text-[#1A1A1A]">Message Received</h4>
                  <p className="text-xs text-[#555] max-w-sm mx-auto">
                    Thank you, {contactName}. A member of our concierge team will respond via email or WhatsApp shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Bilal Ahmed"
                      className="w-full p-2.5 bg-[#F9F8F4] border border-[#D8D4CC] text-xs focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="you@domain.pk"
                        className="w-full p-2.5 bg-[#F9F8F4] border border-[#D8D4CC] text-xs focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Mobile Phone
                      </label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="0300 1234567"
                        className="w-full p-2.5 bg-[#F9F8F4] border border-[#D8D4CC] text-xs focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Inquiry / Fitting Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Share details regarding piece availability, sizing questions, or custom order requests..."
                      className="w-full p-2.5 bg-[#F9F8F4] border border-[#D8D4CC] text-xs focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-black transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. SHIPPING & COD POLICY */}
      {pageType === 'shipping-policy' && (
        <div className="space-y-8 text-sm text-[#444] leading-relaxed">
          <div className="text-center space-y-3 pb-8 border-b border-[#E8E5DE]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8A8882]">
              Domestic Logistics
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#1A1A1A]">
              Shipping & COD Policy
            </h1>
            <p className="text-sm text-[#8A8882] max-w-xl mx-auto">
              Transparent, reliable, and secure Cash on Delivery delivery across Pakistan.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-serif-luxury text-2xl text-[#1A1A1A]">1. Domestic Delivery Across Pakistan</h3>
            <p>
              SJ Collections ships to all major cities, towns, and regions in Pakistan including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar, Quetta, Sialkot, Multan, Gujranwala, Hyderabad, Abbottabad, and Azad Jammu & Kashmir.
            </p>

            <h3 className="font-serif-luxury text-2xl text-[#1A1A1A]">2. Delivery Rates & Free Shipping Threshold</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Complimentary Express Delivery:</strong> Orders exceeding <strong>PKR 10,000</strong> qualify for free nationwide express delivery.
              </li>
              <li>
                <strong>Standard Delivery Fee:</strong> For orders under PKR 10,000, a nominal flat courier fee of <strong>PKR 350</strong> is applied.
              </li>
            </ul>

            <h3 className="font-serif-luxury text-2xl text-[#1A1A1A]">3. Cash on Delivery (COD) Rules</h3>
            <p>
              To ensure safety and patron confidence, Cash on Delivery is our official payment method. You pay cash directly to the courier delivery agent when your parcel is handed over. We do not require any online credit card or bank credentials.
            </p>
            <p>
              Prior to delivery, our partner courier riders (Trax / TCS Courier) will call your mobile number to confirm your availability.
            </p>

            <h3 className="font-serif-luxury text-2xl text-[#1A1A1A]">4. Delivery Timeframes</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Lahore & Islamabad: 2–3 business days</li>
              <li>Karachi & Major Punjab Cities: 3–4 business days</li>
              <li>Other Cities & Remote Regions: 4–6 business days</li>
            </ul>
          </div>
        </div>
      )}

      {/* 4. RETURNS & EXCHANGE */}
      {pageType === 'returns-policy' && (
        <div className="space-y-8 text-sm text-[#444] leading-relaxed">
          <div className="text-center space-y-3 pb-8 border-b border-[#E8E5DE]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8A8882]">
              Patron Satisfaction Guarantee
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#1A1A1A]">
              Returns & Exchange Policy
            </h1>
            <p className="text-sm text-[#8A8882] max-w-xl mx-auto">
              Our 7-day seamless size and fitting exchange protocol.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-serif-luxury text-2xl text-[#1A1A1A]">7-Day Size & Fitting Exchange</h3>
            <p>
              If a garment or pair of footwear does not fit with absolute perfection, we gladly offer size exchanges within <strong>7 days</strong> of delivery receipt.
            </p>
            <h3 className="font-serif-luxury text-2xl text-[#1A1A1A]">Exchange Conditions</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Item must be unused, unwashed, and in its pristine original condition.</li>
              <li>All original SJ Collections tags, dust covers, and presentation boxes must accompany the item.</li>
              <li>Footwear must only be tried on clean, carpeted surfaces to prevent sole scuffing.</li>
            </ul>
            <h3 className="font-serif-luxury text-2xl text-[#1A1A1A]">How to Initiate an Exchange</h3>
            <p>
              Simply message our official WhatsApp concierge at <strong>+92 333 3368420</strong> with your Order ID and the desired size. Our team will arrange reverse courier pickup or exchange dispatch smoothly.
            </p>
          </div>
        </div>
      )}

      {/* 5. FAQS */}
      {pageType === 'faq' && (
        <div className="space-y-8">
          <div className="text-center space-y-3 pb-8 border-b border-[#E8E5DE]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8A8882]">
              Assistance & Guidance
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#1A1A1A]">
              Frequently Asked Questions
            </h1>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {[
              {
                q: 'What payment methods do you accept?',
                a: 'SJ Collections exclusively operates on Cash on Delivery (COD). Patrons pay the courier driver in cash at their doorstep upon physical receipt of the package.'
              },
              {
                q: 'How do I know my size for waistcoats and prince coats?',
                a: 'Our sizing follows standard British suit chest measurements (38 for Small, 40 for Medium, 42 for Large, 44 for X-Large). You can consult our Size & Fitting Guide on any product detail page or message our atelier on WhatsApp for custom measurement advice.'
              },
              {
                q: 'Can I inspect my package before paying cash?',
                a: 'Standard courier guidelines in Pakistan require receiving and paying for the sealed parcel first, after which you can inspect it in your home. If there is any size or fit discrepancy, our 7-day exchange policy guarantees an immediate swap.'
              },
              {
                q: 'How can I track my shipment?',
                a: 'Once your order is confirmed, you will receive a unique tracking ID (e.g. TRX-PK-XXXXXX). You can track this in your account dashboard or verify it anytime via WhatsApp +92 333 3368420.'
              },
              {
                q: 'Do you offer bespoke or custom tailoring?',
                a: 'Yes, for formal weddings and bespoke orders, our master tailors can accommodate custom collar dimensions, lengths, and custom colorways. Contact us on WhatsApp for bespoke consultations.'
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 border border-[#E8E5DE] space-y-2">
                <h3 className="font-serif-luxury text-lg text-[#1A1A1A] font-medium">{faq.q}</h3>
                <p className="text-xs text-[#555] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. PRIVACY POLICY */}
      {pageType === 'privacy-policy' && (
        <div className="space-y-8 text-sm text-[#444] leading-relaxed">
          <div className="text-center space-y-3 pb-8 border-b border-[#E8E5DE]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8A8882]">
              Confidentiality
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#1A1A1A]">
              Privacy Policy
            </h1>
          </div>
          <div className="space-y-4">
            <p>
              SJ Collections respects patron confidentiality. We collect personal details strictly necessary for fulfilling Cash on Delivery orders and courier communications within Pakistan (Name, Phone Number, Delivery Address, and Email).
            </p>
            <p>
              We never sell, rent, or lease patron information to third-party advertising networks. Your contact information is solely shared with licensed Pakistani logistics partners for delivery fulfillment.
            </p>
          </div>
        </div>
      )}

      {/* 7. TERMS & CONDITIONS */}
      {pageType === 'terms' && (
        <div className="space-y-8 text-sm text-[#444] leading-relaxed">
          <div className="text-center space-y-3 pb-8 border-b border-[#E8E5DE]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8A8882]">
              Atelier Regulations
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#1A1A1A]">
              Terms & Conditions
            </h1>
          </div>
          <div className="space-y-4">
            <p>
              By accessing the SJ Collections website and placing an order, patrons agree to provide accurate delivery coordinates and contact telephone numbers in Pakistan.
            </p>
            <p>
              All prices are listed in Pakistani Rupees (PKR) and include applicable domestic taxes. As an exclusive luxury brand, creations are subject to variant availability.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

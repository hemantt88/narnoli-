import React, { useState } from 'react';
import { Award, Gem, ShieldCheck, Truck, RefreshCw, Mail, Phone, MapPin, Clock, ArrowRight, Check } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/brandConfig';

interface FooterProps {
  onNavigate: (page: string, categoryFilter?: string, collectionFilter?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#211D1A] text-[#FAF7F2] pt-16 pb-12 border-t border-[#332D28]">
      {/* Brand Trust Badges Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#362F29]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {BRAND_CONFIG.trustPillars.map((pillar, idx) => (
            <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-[#2F2924] border border-[#4A4036] flex items-center justify-center text-[#D8C29D] mb-3">
                {idx === 0 && <Award className="w-5 h-5 stroke-[1.25]" />}
                {idx === 1 && <Gem className="w-5 h-5 stroke-[1.25]" />}
                {idx === 2 && <ShieldCheck className="w-5 h-5 stroke-[1.25]" />}
                {idx === 3 && <Truck className="w-5 h-5 stroke-[1.25]" />}
                {idx === 4 && <RefreshCw className="w-5 h-5 stroke-[1.25]" />}
              </div>
              <h4 className="font-serif text-sm tracking-wider text-[#FAF7F2] uppercase font-normal">
                {pillar.title}
              </h4>
              <p className="text-xs text-[#A89C8F] mt-1 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-xl sm:text-2xl tracking-[0.16em] uppercase block text-[#FAF7F2]">
              {BRAND_CONFIG.name}
            </span>
            <span className="text-xs tracking-[0.25em] text-[#C4A777] uppercase block font-sans">
              THE ART OF TIMELESS JEWELLERY
            </span>
            <p className="text-xs sm:text-sm text-[#B8ACA0] leading-relaxed max-w-sm pt-1">
              {BRAND_CONFIG.description}
            </p>
            <div className="pt-2 space-y-2 text-xs text-[#D8CEBF]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C4A777] shrink-0 mt-0.5" />
                <span className="leading-relaxed">114. Lalarpura Road, Gandhi Path Rd, Vivek V, Jaipur, Rajasthan 302021</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C4A777] shrink-0" />
                <span>
                  Private Concierge:{' '}
                  <a
                    href="tel:+917733992677"
                    className="hover:text-[#FAF7F2] transition-colors font-medium text-[#FAF7F2]"
                  >
                    077339 92677
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C4A777] shrink-0" />
                <span>{BRAND_CONFIG.email}</span>
              </div>
              <div className="pt-2">
                <a
                  href="tel:+917733992677"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#C4A777] text-[#1C1917] hover:bg-[#D4B98B] rounded-[10px] text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 fill-current" />
                  <span>CALL NOW</span>
                </a>
              </div>
            </div>
          </div>

          {/* Jewellery Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium tracking-[0.2em] text-[#C4A777] uppercase">
              Jewellery
            </h4>
            <ul className="space-y-2 text-xs text-[#B8ACA0]">
              <li>
                <button
                  onClick={() => onNavigate('shop', 'rajputi')}
                  className="hover:text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  Traditional Rajputi Aad
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'kundan')}
                  className="hover:text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  Imperial Kundan Polki
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'diamond')}
                  className="hover:text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  Certified Solitaires
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'gold')}
                  className="hover:text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  22K Hallmarked Gold
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'silverware')}
                  className="hover:text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  Sterling Silverware Heirlooms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  Curated Collections
                </button>
              </li>
            </ul>
          </div>

          {/* Salons & Concierge */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium tracking-[0.2em] text-[#C4A777] uppercase">
              Private Salons
            </h4>
            <ul className="space-y-3 text-xs text-[#B8ACA0]">
              {BRAND_CONFIG.showrooms.map((room, idx) => (
                <li key={idx} className="border-b border-[#2E2823] pb-2 last:border-none">
                  <div className="font-serif text-sm text-[#FAF7F2] font-medium">{room.city}</div>
                  <div className="text-[11px] text-[#A69A8E]">{room.address}</div>
                  <div className="text-[10px] text-[#C4A777] mt-0.5">{room.timing}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Salon Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium tracking-[0.2em] text-[#C4A777] uppercase">
              The Narnoli Gazette
            </h4>
            <p className="text-xs text-[#B8ACA0] leading-relaxed">
              Receive private invitations to confidential high jewellery previews, royal trunk shows, and bespoke trousseau consultations.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-[#171412] border border-[#3E362F] text-xs text-[#FAF7F2] pl-3.5 pr-12 py-2.5 rounded-[12px] focus:outline-none focus:border-[#C4A777] placeholder:text-[#6E6357] shadow-inner"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to gazette"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#C4A777] text-[#1C1917] hover:bg-[#D4B98B] transition-colors text-xs font-medium flex items-center justify-center cursor-pointer rounded-[9px]"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#A8C78B]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Thank you. Your salon invitation is recorded.</span>
                </div>
              )}
            </form>
            <div className="pt-2 text-[11px] text-[#8C7E71]">
              Private & confidential. We respect your discretion.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#332D28] text-xs text-[#8C7E71] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} {BRAND_CONFIG.name}. All Rights Reserved. Jaipur, India.
        </div>
        <div className="flex items-center gap-6 text-[11px] tracking-wider uppercase">
          <button
            onClick={() => onNavigate('about')}
            className="hover:text-[#FAF7F2] transition-colors cursor-pointer"
          >
            Heritage & Craft
          </button>
          <span>·</span>
          <button
            onClick={() => onNavigate('contact')}
            className="hover:text-[#FAF7F2] transition-colors cursor-pointer"
          >
            Book Appointment
          </button>
          <span>·</span>
          <span>100% BIS Hallmarked 916 & 750</span>
        </div>
      </div>
    </footer>
  );
};

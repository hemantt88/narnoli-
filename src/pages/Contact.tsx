import React, { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, Clock, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { BRAND_CONFIG } from '../data/brandConfig';

export const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    salon: 'Jaipur (Flagship Atelier)',
    inquiryType: 'Bridal Trousseau Consultation',
    preferredDate: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 pb-24 space-y-16">
      {/* Page Title */}
      <div className="text-center">
        <SectionHeading
          kicker="Private Client Concierge"
          title="Connect with Our Salons"
          description="Whether commissioning a bespoke royal Rajputi ornament or scheduling an exclusive bridal viewing, our private client directors are at your service."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Booking & Inquiry Form */}
        <div className="lg:col-span-7 bg-[#FAF7F2] p-6 sm:p-8 border border-[#E5DDD0]/80 rounded-[22px] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)]">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <CheckCircle2 className="w-12 h-12 text-[#A6854F] mx-auto stroke-[1.5]" />
              <h3 className="font-serif text-2xl text-[#1C1917]">
                Appointment Request Received
              </h3>
              <p className="text-xs sm:text-sm text-[#665B4F] max-w-md mx-auto leading-relaxed">
                Thank you, {form.name}. Our Head of Private Client Services for the {form.salon} will contact you within 24 hours to confirm your private salon appointment.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSubmitted(false)}
                className="mt-4"
              >
                Send Another Inquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif text-xl text-[#1C1917] pb-2 border-b border-[#EFE8DC]">
                Book a Private Bridal Consultation
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#6E6357] mb-1 font-medium">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gayatri Rathore"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F5EFE6] border border-[#D5C7B4] rounded-[12px] text-xs text-[#1C1917] focus:outline-none focus:border-[#A6854F] focus:ring-1 focus:ring-[#A6854F]/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#6E6357] mb-1 font-medium">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98290 12345"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F5EFE6] border border-[#D5C7B4] rounded-[12px] text-xs text-[#1C1917] focus:outline-none focus:border-[#A6854F] focus:ring-1 focus:ring-[#A6854F]/30 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#6E6357] mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@luxury.in"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F5EFE6] border border-[#D5C7B4] rounded-[12px] text-xs text-[#1C1917] focus:outline-none focus:border-[#A6854F] focus:ring-1 focus:ring-[#A6854F]/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#6E6357] mb-1 font-medium">
                    Preferred Salon Location
                  </label>
                  <select
                    value={form.salon}
                    onChange={(e) => setForm({ ...form, salon: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F5EFE6] border border-[#D5C7B4] rounded-[12px] text-xs text-[#1C1917] focus:outline-none focus:border-[#A6854F] cursor-pointer transition-all"
                  >
                    <option value="Jaipur (Flagship Atelier)">Jaipur (114. Lalarpura Road, Gandhi Path Rd)</option>
                    <option value="New Delhi Private Salon">New Delhi Private Salon (South Extension)</option>
                    <option value="Mumbai Bridal Atelier">Mumbai Bridal Atelier (Bandra West)</option>
                    <option value="Virtual Video Viewing">Virtual High-Definition Video Viewing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#6E6357] mb-1 font-medium">
                    Nature of Inquiry
                  </label>
                  <select
                    value={form.inquiryType}
                    onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F5EFE6] border border-[#D5C7B4] rounded-[12px] text-xs text-[#1C1917] focus:outline-none focus:border-[#A6854F] cursor-pointer transition-all"
                  >
                    <option value="Bridal Trousseau Consultation">Royal Bridal Trousseau Consultation</option>
                    <option value="Custom Rajputi Aad Commission">Custom Rajputi Aad / Timaniya Commission</option>
                    <option value="Solitaire Engagement Ring">GIA Certified Solitaire Consultation</option>
                    <option value="Imperial Kundan Polki Choker">Imperial Kundan Polki Choker Viewing</option>
                    <option value="Heirloom Silverware Service">Royal Sterling Silverware Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#6E6357] mb-1 font-medium">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={form.preferredDate}
                    onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F5EFE6] border border-[#D5C7B4] rounded-[12px] text-xs text-[#1C1917] focus:outline-none focus:border-[#A6854F] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#6E6357] mb-1 font-medium">
                  Bespoke Notes / Preferences
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details regarding your wedding date, heirloom redesign ideas, or specific gemstone requirements..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F5EFE6] border border-[#D5C7B4] rounded-[12px] text-xs text-[#1C1917] focus:outline-none focus:border-[#A6854F] focus:ring-1 focus:ring-[#A6854F]/30 transition-all"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="md"
                  isLoading={isSubmitting}
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Request Private Salon Appointment
                </Button>
              </div>

              <div className="text-center text-[11px] text-[#7A6E60]">
                All appointments are confidential and subject to private salon availability.
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Business Contact & Location Card */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Atelier & Contact Details Card */}
          <div className="bg-[#FAF7F2] p-6 sm:p-8 border border-[#E5DDD0] rounded-[22px] space-y-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] tracking-[0.25em] text-[#9E896F] uppercase font-sans font-medium">
                  Jaipur Flagship Atelier
                </span>
                <span className="text-[10px] tracking-widest uppercase bg-[#C4A777]/20 text-[#69532E] px-2.5 py-1 rounded-[6px] font-medium">
                  Primary Salon
                </span>
              </div>
              <h3 className="font-serif text-2xl text-[#1C1917] font-normal tracking-tight">
                Narnoli Gems & Jewellers
              </h3>
              <p className="text-xs text-[#7A6E60] mt-1">
                Generational karigari, royal bridal trousseaus & fine hallmarked jewellery.
              </p>
            </div>

            {/* Location Section - Complete Address with Location Icon Only */}
            <div className="pt-4 border-t border-[#EFE8DC] space-y-2">
              <div className="text-[11px] uppercase tracking-wider text-[#8C7A65] font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#A6854F] shrink-0" />
                <span>Atelier Location</span>
              </div>
              <p className="text-xs sm:text-sm text-[#1C1917] leading-relaxed pl-5 font-normal">
                114. Lalarpura Road, Gandhi Path Rd, Vivek V, Jaipur, Rajasthan 302021
              </p>
            </div>

            {/* Phone Section - Phone Icon + Clickable 077339 92677 */}
            <div className="pt-4 border-t border-[#EFE8DC] space-y-2">
              <div className="text-[11px] uppercase tracking-wider text-[#8C7A65] font-medium flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#A6854F] shrink-0" />
                <span>Direct Contact Phone</span>
              </div>
              <div className="pl-5">
                <a
                  href="tel:+917733992677"
                  className="font-serif text-lg sm:text-xl text-[#1C1917] hover:text-[#A6854F] transition-colors font-medium inline-block tracking-wide"
                  title="Click to call 077339 92677"
                >
                  077339 92677
                </a>
                <span className="text-[11px] text-[#7A6E60] block mt-0.5">
                  Available Mon – Sat: 10:30 AM – 8:00 PM IST
                </span>
              </div>
            </div>

            {/* Premium CALL NOW Button */}
            <div className="pt-2">
              <a
                href="tel:+917733992677"
                className="group relative inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 bg-[#C4A777] text-[#1C1917] hover:bg-[#D4B98B] active:bg-[#B39363] text-xs font-semibold tracking-[0.16em] uppercase rounded-[12px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden text-center"
                aria-label="Call Narnoli Gems & Jewellers at 077339 92677"
              >
                <Phone className="w-4 h-4 fill-current stroke-[1.5] transition-transform duration-200 group-hover:scale-110" />
                <span>CALL NOW</span>
              </a>
            </div>
          </div>

          {/* Salon Hours & Private Salon Assistance Card */}
          <div className="bg-[#F5EFE6] p-6 border border-[#E5DDD0] rounded-[20px] space-y-3.5 shadow-2xs">
            <h4 className="font-serif text-base text-[#1C1917] font-medium">
              Private Client Assistance
            </h4>
            <div className="space-y-2 text-xs text-[#54483B]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#A6854F] shrink-0" />
                <span>Mon – Sat: 10:30 AM – 8:00 PM IST</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#A6854F] shrink-0" />
                <a
                  href="mailto:concierge@narnolijewellers.com"
                  className="hover:text-[#1C1917] transition-colors"
                >
                  concierge@narnolijewellers.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A6854F] shrink-0" />
                <span>Confidential viewing sessions by appointment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

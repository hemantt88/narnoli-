import React from 'react';
import { Award, Gem, ShieldCheck, Clock, Sparkles, MapPin, Phone } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { BRAND_CONFIG, IMAGES } from '../data/brandConfig';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { Button } from '../components/common/Button';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="pb-24 space-y-16 sm:space-y-24">
      {/* Hero Header */}
      <section className="bg-[#F5EFE6] border-b border-[#E5DDD0] py-16 lg:py-24 text-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-medium tracking-[0.25em] text-[#9E896F] uppercase block">
            Jaipur Royal Lineage Since 1978
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1917] font-normal leading-tight">
            The Art of Timeless Rajputana Jewellery
          </h1>
          <p className="text-sm sm:text-base text-[#6E6357] leading-relaxed max-w-2xl mx-auto font-light">
            For nearly five decades, Narnoli Gems & Jewellers has preserved the endangered courtly jewellery arts of Rajasthan, crafting heirlooms for noble weddings, royal families, and connoisseurs of genuine Indian high jewellery.
          </p>
        </div>
      </section>

      {/* Origin Story Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#9E896F] block">
              Chapter 1: The Founding
            </span>
            <h2 className="font-serif text-3xl text-[#1C1917]">
              Born in the Heart of the Pink City
            </h2>
            <p className="text-sm text-[#54483B] leading-relaxed">
              In 1978, amidst the historic gem-cutting lanes of Jaipur, the Narnoli atelier opened its doors with a dedicated pledge: to never compromise on the purity of gold, the ethical origin of gemstones, or the patience required for genuine Rajasthani Jadau and Gulabi Meenakari.
            </p>
            <p className="text-sm text-[#54483B] leading-relaxed">
              While mass machinery transformed the industry, Narnoli maintained an enclave of hereditary karigars whose fathers and grandfathers crafted ornaments for the erstwhile princely estates of Mewar, Marwar, and Dhundhar.
            </p>
            <div className="pt-2 border-l-2 border-[#C4A777] pl-4 italic text-sm text-[#736759] font-serif">
              "A true jewel is not an ornament of vanity; it is an enduring covenant of trust passed from one generation’s embrace to the next."
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-[22px] overflow-hidden border border-[#E5DDD0]/80 shadow-md">
              <ImageWithFallback
                src={IMAGES.kundanChoker}
                alt="Narnoli Heritage Kundan Polki Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Pillars */}
      <section className="bg-[#FAF7F2] py-16 border-y border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Our Pillars of Purity"
            title="The Narnoli Hallmark Standard"
            description="Every ornament leaving our atelier adheres to stringent governmental and gemological certifications."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 sm:p-7 bg-[#F5EFE6] border border-[#E5DDD0] rounded-[20px] space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <Award className="w-8 h-8 text-[#A6854F] stroke-[1.25]" />
              <h3 className="font-serif text-xl text-[#1C1917]">
                100% BIS Hallmarked (916 & 750)
              </h3>
              <p className="text-xs text-[#665B4F] leading-relaxed">
                Laser-stamped with Bureau of Indian Standards (BIS) Hallmarked Unique Identification (HUID). Every milligram of gold is guaranteed and verifiable via the national assay portal.
              </p>
            </div>

            <div className="p-6 sm:p-7 bg-[#F5EFE6] border border-[#E5DDD0] rounded-[20px] space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <Gem className="w-8 h-8 text-[#A6854F] stroke-[1.25]" />
              <h3 className="font-serif text-xl text-[#1C1917]">
                Natural Syndicate Polki & GIA Solitaires
              </h3>
              <p className="text-xs text-[#665B4F] leading-relaxed">
                We strictly curate conflict-free natural diamonds, sourced under the Kimberley Process. Solitaires are individually accompanied by GIA and IGI laboratory dossiers.
              </p>
            </div>

            <div className="p-6 sm:p-7 bg-[#F5EFE6] border border-[#E5DDD0] rounded-[20px] space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <ShieldCheck className="w-8 h-8 text-[#A6854F] stroke-[1.25]" />
              <h3 className="font-serif text-xl text-[#1C1917]">
                Lifetime Buyback & Transparent Valuation
              </h3>
              <p className="text-xs text-[#665B4F] leading-relaxed">
                Full transparency with zero hidden deduction clauses. Enjoy guaranteed gold value exchange across any of our heritage salons for a lifetime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Salons Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Visit Our Boutiques"
          title="Private Salons & Ateliers"
          description="Immerse in the sensory elegance of our heritage salons in Jaipur, New Delhi, and Mumbai."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRAND_CONFIG.showrooms.map((room, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#FAF7F2] border border-[#E5DDD0] rounded-[20px] space-y-3 hover:border-[#D5C7B4] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg font-semibold text-[#1C1917]">
                  {room.city}
                </span>
                {room.isFlagship && (
                  <span className="text-[10px] tracking-widest uppercase bg-[#C4A777]/25 text-[#69532E] px-2.5 py-1 rounded-[6px] font-medium">
                    Flagship Atelier
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6E6357] leading-relaxed">
                {room.address}
              </p>
              <div className="pt-2 border-t border-[#EFE8DC] text-xs text-[#54483B] space-y-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#A6854F]" />
                  <span>{room.phone}</span>
                </div>
                <div className="text-[11px] text-[#8C7A65]">
                  {room.timing}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigate('contact')}
          >
            Request Private Bridal Concierge Appointment
          </Button>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { ArrowRight, Award, Gem, ShieldCheck, Sparkles, ChevronRight, Phone } from 'lucide-react';
import { BRAND_CONFIG, CATEGORIES, COLLECTIONS, IMAGES } from '../data/brandConfig';
import { Product } from '../types';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { CategoryCard } from '../components/product/CategoryCard';
import { ProductCard } from '../components/product/ProductCard';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface HomeProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onNavigate: (page: string, categoryFilter?: string, collectionFilter?: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({
  products,
  onSelectProduct,
  onQuickView,
  onNavigate,
  wishlistIds,
  onToggleWishlist,
}) => {
  const featuredPieces = products.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Campaign Showcase */}
      <section className="relative min-h-[540px] lg:min-h-[640px] flex items-center bg-[#F3EDE2] overflow-hidden border-b border-[#E5DDD0]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={IMAGES.hero}
            alt="Narnoli Gems & Jewellers Royal High Jewellery Campaign"
            className="w-full h-full object-cover object-center"
          />
          {/* Measured luxury scrim adhering to Section 1.F */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#171412]/85 via-[#171412]/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-[#FAF7F2]">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#24201D]/80 backdrop-blur-md border border-[#C4A777]/40 text-[#D8C29D] text-[11px] font-medium tracking-[0.25em] uppercase rounded-[10px] shadow-xs">
              <Gem className="w-3.5 h-3.5 text-[#C4A777]" />
              <span>Jaipur Royal Heritage · Est. 1978</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-[#FAF7F2] tracking-wide [text-wrap:balance]">
              The Art of <br />
              <span className="italic font-light text-[#E8DFC8]">Timeless Jewellery</span>
            </h1>

            <p className="text-sm sm:text-base text-[#D5CAC0] max-w-lg leading-relaxed font-light">
              Crafting noble Rajputana Aads, imperial uncut Kundan Polki chokers, and certified solitaires for royal weddings and generational heirlooms.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="gold"
                size="lg"
                onClick={() => onNavigate('shop', 'rajputi')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Rajputi Ornaments
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('shop', 'kundan')}
                className="text-[#FAF7F2] border-[#E8DFC8]/60 hover:bg-[#FAF7F2] hover:text-[#1C1917]"
              >
                Imperial Kundan Collection
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Reassurance / Trust Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] border border-[#E5DDD0]/80 rounded-[22px] p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Award className="w-6 h-6 text-[#A6854F] mb-2 stroke-[1.5]" />
              <span className="font-serif text-sm font-semibold text-[#1C1917]">
                100% BIS Hallmarked
              </span>
              <span className="text-[11px] text-[#7A6E60] mt-0.5">
                Laser stamped 916 & 750 purity
              </span>
            </div>

            <div className="flex flex-col items-center">
              <Gem className="w-6 h-6 text-[#A6854F] mb-2 stroke-[1.5]" />
              <span className="font-serif text-sm font-semibold text-[#1C1917]">
                IGI / GIA Certified
              </span>
              <span className="text-[11px] text-[#7A6E60] mt-0.5">
                Triple excellent natural diamonds
              </span>
            </div>

            <div className="flex flex-col items-center">
              <ShieldCheck className="w-6 h-6 text-[#A6854F] mb-2 stroke-[1.5]" />
              <span className="font-serif text-sm font-semibold text-[#1C1917]">
                Generational Karigari
              </span>
              <span className="text-[11px] text-[#7A6E60] mt-0.5">
                Handmade in our Jaipur atelier
              </span>
            </div>

            <div className="flex flex-col items-center">
              <Sparkles className="w-6 h-6 text-[#A6854F] mb-2 stroke-[1.5]" />
              <span className="font-serif text-sm font-semibold text-[#1C1917]">
                Lifetime Buyback
              </span>
              <span className="text-[11px] text-[#7A6E60] mt-0.5">
                Transparent gold value appraisal
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Curated Discipilines"
          title="The Royal Jewellery Houses"
          description="Explore our specialized ateliers spanning Rajputana antiquities, syndicate Kundan Polki, brilliant diamonds, and royal silverware."
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onSelect={(slug) => onNavigate('shop', slug)}
            />
          ))}
        </div>
      </section>

      {/* 4. High Jewellery Highlights (Product Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <SectionHeading
            align="left"
            kicker="Signature Heirlooms"
            title="Masterpiece Creations"
            description="Handcrafted pieces currently presented in our royal Jaipur flagship salon."
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('shop')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            View Entire Catalogue
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPieces.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onQuickView={onQuickView}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* 5. Editorial Craftsmanship Split Section */}
      <section className="bg-[#F5EFE6] border-y border-[#E5DDD0] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Image */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] rounded-[22px] overflow-hidden border border-[#D5C7B4]/80 shadow-md">
                <ImageWithFallback
                  src={IMAGES.rajputiAad}
                  alt="Jaipur Royal Meenakari and Polki Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block w-52 p-4.5 bg-[#FAF7F2] border border-[#D5C7B4] shadow-[0_12px_32px_rgba(0,0,0,0.08)] rounded-[16px]">
                <span className="text-[10px] tracking-widest uppercase text-[#8C7A65] block font-medium">
                  Jaipur Guild
                </span>
                <span className="font-serif text-sm font-semibold text-[#1C1917] block mt-1">
                  Reverse Gulabi Meenakari
                </span>
                <span className="text-[11px] text-[#7A6E60]">
                  Hand-painted enamel fired at 800°C.
                </span>
              </div>
            </div>

            {/* Right Story Text */}
            <div className="lg:col-span-6 lg:pl-6 space-y-6">
              <span className="text-[11px] font-medium tracking-[0.25em] text-[#9E896F] uppercase block">
                The Heritage of Rajputana
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal leading-snug">
                Where Four Generations of Karigars Immortalize Rajput Grandeur
              </h2>
              <p className="text-sm text-[#5E5244] leading-relaxed">
                Founded in 1978 in the royal city of Jaipur, Narnoli Gems & Jewellers was built on a singular devotion: preserving the courtly jewellery techniques of Rajasthan. Each piece—from our iconic Rajputi Aads to regal Basra pearl strings—requires hundreds of hours of patient hand-chiseling, delicate wire filigree, and master Jadau setting.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border-l-2 border-[#C4A777] pl-3">
                  <span className="font-serif text-2xl text-[#1C1917] font-semibold block">
                    100%
                  </span>
                  <span className="text-xs text-[#7A6E60]">
                    Pure 916 22K Hallmarked Gold with Laser HUID
                  </span>
                </div>
                <div className="border-l-2 border-[#C4A777] pl-3">
                  <span className="font-serif text-2xl text-[#1C1917] font-semibold block">
                    48+ Yrs
                  </span>
                  <span className="text-xs text-[#7A6E60]">
                    Devotion to Noble Indian High Jewellery
                  </span>
                </div>
              </div>
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onNavigate('about')}
                  rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                >
                  Discover The Narnoli Heritage
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Signature Collections Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Curated Chapters"
          title="Signature Bridal & Heirloom Collections"
          description="Immerse in bespoke design narratives conceptualized for royal ceremonies, weddings, and generational milestones."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {COLLECTIONS.slice(0, 2).map((col) => (
            <div
              key={col.id}
              onClick={() => onNavigate('collections', undefined, col.id)}
              className="group bg-[#FAF7F2] border border-[#E5DDD0]/80 rounded-[22px] overflow-hidden hover:border-[#D5C7B4] transition-all duration-300 ease-out cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#ECE4D8]">
                <ImageWithFallback
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-xs px-3 py-1 text-[10px] tracking-widest uppercase font-medium text-[#1C1917] border border-[#E5DDD0] rounded-[8px] shadow-xs">
                  {col.badge}
                </div>
              </div>

              <div className="p-6">
                <span className="text-[11px] font-medium tracking-[0.2em] text-[#9E896F] uppercase block mb-1">
                  {col.subtitle}
                </span>
                <h3 className="font-serif text-2xl text-[#1C1917] font-medium group-hover:text-[#A6854F] transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#665B4F] mt-2 line-clamp-2 leading-relaxed">
                  {col.description}
                </p>
                <div className="mt-4 pt-3 border-t border-[#EFE8DC] flex items-center justify-between text-xs text-[#A6854F] font-medium">
                  <span>Explore {col.itemCount} Curated Pieces</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Private Salon Concierge Appointment Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#24201D] text-[#FAF7F2] rounded-[24px] p-8 sm:p-12 border border-[#3E362F] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-[10px] tracking-[0.25em] text-[#C4A777] uppercase font-sans font-medium block">
              Bespoke Bridal Salon
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2]">
              Schedule a Private Viewing with Our Master Goldsmiths
            </h2>
            <p className="text-xs sm:text-sm text-[#B8ACA0] leading-relaxed font-light">
              Experience the exclusivity of private salon consultations in Jaipur, New Delhi, or Mumbai. Select custom gem varieties, curate complete bridal trousseaus, or commission family heirlooms.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button
              variant="gold"
              size="md"
              onClick={() => onNavigate('contact')}
            >
              Book Salon Appointment
            </Button>
            <a
              href="tel:+917733992677"
              className="inline-flex items-center justify-center font-medium tracking-wider uppercase text-xs px-6 py-3 border border-[#4A4036] text-[#FAF7F2] hover:bg-[#332B25] transition-colors rounded-xl shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 mr-2 text-[#C4A777]" />
              CALL NOW
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

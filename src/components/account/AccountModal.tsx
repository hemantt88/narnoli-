import React from 'react';
import { User, Award, Calendar, ShieldCheck, Phone } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { BRAND_CONFIG } from '../../data/brandConfig';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onBookAppointment,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title="Private Client Salon"
      subtitle="Narnoli Heritage Membership"
    >
      <div className="space-y-6">
        {/* User Card */}
        <div className="bg-[#F5EFE6] border border-[#E5DDD0] p-4 sm:p-5 rounded-[16px] flex items-center gap-4 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-[#E8DFC8] border border-[#D5C7B4] flex items-center justify-center text-[#735E3F] shrink-0 shadow-2xs">
            <User className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-serif text-base font-semibold text-[#1C1917]">
                Privileged Patron
              </h4>
              <span className="text-[9px] tracking-widest uppercase bg-[#C4A777]/30 text-[#6B542E] px-2 py-0.5 rounded-[6px] font-medium">
                VIP
              </span>
            </div>
            <p className="text-xs text-[#736759] mt-0.5">
              Patron ID: NJ-PATRON-7890 · Preferred Salon: Jaipur Flagship
            </p>
          </div>
        </div>

        {/* Benefits & Access */}
        <div className="space-y-2.5 text-xs text-[#54483B]">
          <div className="flex items-center gap-3 p-3 bg-[#FAF7F2] border border-[#E5DDD0]/80 rounded-[12px] shadow-2xs">
            <Award className="w-4 h-4 text-[#A6854F] shrink-0" />
            <div>
              <span className="font-medium text-[#1C1917] block">Complimentary Valuation & Buyback</span>
              <span className="text-[11px] text-[#7A6E60]">Guaranteed 100% gold rate exchange on all Narnoli pieces.</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#FAF7F2] border border-[#E5DDD0]/80 rounded-[12px] shadow-2xs">
            <Calendar className="w-4 h-4 text-[#A6854F] shrink-0" />
            <div>
              <span className="font-medium text-[#1C1917] block">Bespoke Bridal Salon Appointment</span>
              <span className="text-[11px] text-[#7A6E60]">Direct 1-on-1 consultation with our master goldsmiths.</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#FAF7F2] border border-[#E5DDD0]/80 rounded-[12px] shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#A6854F] shrink-0" />
            <div>
              <span className="font-medium text-[#1C1917] block">Digital Certificate Vault</span>
              <span className="text-[11px] text-[#7A6E60]">GIA, IGI and BIS HUID authentication records permanently stored.</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              onClose();
              onBookAppointment();
            }}
          >
            Request Private Salon Consultation
          </Button>

          <div className="text-center pt-1">
            <span className="text-xs text-[#7A6E60]">
              Need immediate assistance? Call Concierge at{' '}
              <a
                href={`tel:${BRAND_CONFIG.phone}`}
                className="text-[#1C1917] font-medium underline"
              >
                {BRAND_CONFIG.phone}
              </a>
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

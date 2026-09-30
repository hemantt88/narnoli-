import React, { useState } from 'react';
import { ShieldCheck, Truck, CheckCircle2, Lock, ArrowRight, Award } from 'lucide-react';
import { CartItem } from '../../types';
import { formatINR } from '../../utils/formatters';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Jaipur',
    pincode: '',
    paymentMethod: 'cod', // 'cod' | 'upi' | 'card'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<{
    orderId: string;
    total: number;
  } | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `NJ-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderConfirmed({
        orderId: generatedId,
        total: subtotal,
      });
      onOrderSuccess();
    }, 900);
  };

  const handleFinish = () => {
    setOrderConfirmed(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={orderConfirmed ? handleFinish : onClose}
      maxWidth="2xl"
      title={orderConfirmed ? undefined : 'Secure Luxury Checkout'}
      subtitle={orderConfirmed ? undefined : 'Armored Vault Courier & BIS Hallmarked'}
    >
      {orderConfirmed ? (
        <div className="py-6 text-center space-y-5 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border-2 border-[#A6854F] text-[#A6854F] mx-auto flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-9 h-9 stroke-[1.5]" />
          </div>

          <div>
            <span className="text-[11px] font-medium tracking-[0.25em] text-[#9E896F] uppercase block mb-1">
              Order Confirmed
            </span>
            <h2 className="font-serif text-3xl text-[#1C1917]">
              Order #{orderConfirmed.orderId} Confirmed
            </h2>
            <p className="text-sm text-[#665B4F] max-w-md mx-auto mt-2 leading-relaxed">
              Thank you for choosing Narnoli. Your heirloom order has been registered with our private concierge desk.
            </p>
          </div>

          <div className="bg-[#F5EFE6] border border-[#E5DDD0] rounded-[16px] p-5 max-w-md mx-auto text-left text-xs space-y-2.5 shadow-2xs">
            <div className="flex justify-between border-b border-[#E0D5C3] pb-2">
              <span className="text-[#7A6E60]">Total Amount:</span>
              <span className="font-semibold text-[#1C1917] tabular-nums font-sans">
                {formatINR(orderConfirmed.total)}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#E0D5C3] pb-2">
              <span className="text-[#7A6E60]">Delivery Address:</span>
              <span className="text-[#1C1917] font-medium text-right max-w-xs truncate">
                {form.address}, {form.city} - {form.pincode}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A6E60]">Transit Protocol:</span>
              <span className="text-[#A6854F] font-medium">Armored Insured Courier</span>
            </div>
          </div>

          <div className="text-xs text-[#7A6E60]">
            A formal digital invoice with BIS laser hallmark verification has been dispatched to {form.email || 'your contact details'}.
          </div>

          <Button variant="primary" size="md" onClick={handleFinish}>
            Return to Boutique
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Summary Recap */}
          <div className="bg-[#F5EFE6] p-4 sm:p-5 rounded-[16px] border border-[#E5DDD0] shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#6E6357] mb-2 pb-2 border-b border-[#E0D5C3]">
              <span>Items in bag ({items.reduce((acc, i) => acc + i.quantity, 0)})</span>
              <span className="text-[#A6854F] font-medium">Free Armored Shipping</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-base text-[#1C1917]">Payable Total:</span>
              <span className="font-sans text-xl font-bold text-[#1C1917] tabular-nums">
                {formatINR(subtotal)}
              </span>
            </div>
          </div>

          {/* Customer & Delivery Form */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-[#8C7A65]">
              1. Customer Verification & Delivery Address
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#6E6357] mb-1 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gayatri Rathore"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C7B4] rounded-[12px] text-xs text-[#1C1917] focus:outline-none focus:border-[#A6854F] focus:ring-1 focus:ring-[#A6854F]/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#6E6357] mb-1 font-medium">
                  Phone Number (For Courier OTP) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98290 12345"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C7B4] rounded-[12px] text-xs text-[#1C1917] focus:outline-none focus:border-[#A6854F] focus:ring-1 focus:ring-[#A6854F]/30 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C7B4] rounded-[12px] text-xs text-[#1C1917] focus:outline-none focus:border-[#A6854F] focus:ring-1 focus:ring-[#A6854F]/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#6E6357] mb-1 font-medium">
                  City / State *
                </label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C7B4] rounded-[12px] text-xs text-[#1C1917] focus:outline-none focus:border-[#A6854F] focus:ring-1 focus:ring-[#A6854F]/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#6E6357] mb-1 font-medium">
                Street Address / Residence Name *
              </label>
              <textarea
                rows={2}
                required
                placeholder="House/Bungalow number, Street, Landmark"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C7B4] rounded-[12px] text-xs text-[#1C1917] focus:outline-none focus:border-[#A6854F] focus:ring-1 focus:ring-[#A6854F]/30 transition-all"
              />
            </div>

            <div className="w-full sm:w-1/2">
              <label className="block text-[11px] uppercase tracking-wider text-[#6E6357] mb-1 font-medium">
                PIN Code *
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="302001"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C7B4] rounded-[12px] text-xs text-[#1C1917] focus:outline-none focus:border-[#A6854F] focus:ring-1 focus:ring-[#A6854F]/30 transition-all"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-2 border-t border-[#EFE8DC]">
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-[#8C7A65]">
              2. Payment & Verification
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <label
                className={`flex flex-col p-3.5 rounded-[14px] border cursor-pointer transition-all duration-200 ${
                  form.paymentMethod === 'cod'
                    ? 'border-[#1C1917] bg-[#F5EFE6] shadow-xs'
                    : 'border-[#DED4C5] bg-[#FAF7F2] hover:border-[#A6854F]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={form.paymentMethod === 'cod'}
                    onChange={() => setForm({ ...form, paymentMethod: 'cod' })}
                    className="accent-[#1C1917]"
                  />
                  <span className="text-xs font-medium text-[#1C1917]">
                    Insured COD
                  </span>
                </div>
                <span className="text-[10px] text-[#7A6E60] mt-1 pl-5">
                  Verification on delivery
                </span>
              </label>

              <label
                className={`flex flex-col p-3.5 rounded-[14px] border cursor-pointer transition-all duration-200 ${
                  form.paymentMethod === 'upi'
                    ? 'border-[#1C1917] bg-[#F5EFE6] shadow-xs'
                    : 'border-[#DED4C5] bg-[#FAF7F2] hover:border-[#A6854F]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={form.paymentMethod === 'upi'}
                    onChange={() => setForm({ ...form, paymentMethod: 'upi' })}
                    className="accent-[#1C1917]"
                  />
                  <span className="text-xs font-medium text-[#1C1917]">
                    UPI / NetBanking
                  </span>
                </div>
                <span className="text-[10px] text-[#7A6E60] mt-1 pl-5">
                  Instant secure bank transfer
                </span>
              </label>

              <label
                className={`flex flex-col p-3.5 rounded-[14px] border cursor-pointer transition-all duration-200 ${
                  form.paymentMethod === 'card'
                    ? 'border-[#1C1917] bg-[#F5EFE6] shadow-xs'
                    : 'border-[#DED4C5] bg-[#FAF7F2] hover:border-[#A6854F]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={form.paymentMethod === 'card'}
                    onChange={() => setForm({ ...form, paymentMethod: 'card' })}
                    className="accent-[#1C1917]"
                  />
                  <span className="text-xs font-medium text-[#1C1917]">
                    Credit / Debit Card
                  </span>
                </div>
                <span className="text-[10px] text-[#7A6E60] mt-1 pl-5">
                  Encrypted 256-bit gateway
                </span>
              </label>
            </div>
          </div>

          {/* Trust reassurance */}
          <div className="flex items-center justify-between text-[11px] text-[#7A6E60] bg-[#F5EFE6]/70 p-3 rounded-[12px] border border-[#E5DDD0]">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#A6854F]" />
              <span>Armored Transit Security Escort</span>
            </div>
            <span>·</span>
            <span>Tamper-Proof Holographic Seal</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Confirm & Dispatch Heirloom Order ({formatINR(subtotal)})
          </Button>
        </form>
      )}
    </Modal>
  );
};

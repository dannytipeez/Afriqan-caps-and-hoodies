'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/lib/api';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, tax, total, orderNote, clearCart } = useCart();

  const [email, setEmail] = useState('alex.morgan@email.com');
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Morgan');
  const [address, setAddress] = useState('128 Sunset Avenue');
  const [apartment, setApartment] = useState('Apartment 4B');
  const [city, setCity] = useState('Los Angeles');
  const [state, setState] = useState('California');
  const [zipCode, setZipCode] = useState('90026');
  const [phone, setPhone] = useState('+1 (213) 555-0142');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [expiry, setExpiry] = useState('09 / 28');
  const [cvc, setCvc] = useState('•••');
  const [cardName, setCardName] = useState('Alex Morgan');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedShippingCost = shippingMethod === 'standard' ? shipping : 12.0;
  const currentTotal = Number((subtotal + selectedShippingCost + tax).toFixed(2));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      email,
      first_name: firstName,
      last_name: lastName,
      address,
      apartment,
      city,
      state,
      zip_code: zipCode,
      country: 'United States',
      phone,
      shipping_method: shippingMethod,
      shipping_cost: selectedShippingCost,
      subtotal,
      tax,
      total: currentTotal,
      payment_method: 'credit_card',
      card_last_four: '4242',
      order_note: orderNote,
      items: items.map((it) => ({
        product_id: it.productId,
        product_name: it.name,
        color: it.color,
        size: it.size,
        price: it.price,
        quantity: it.quantity,
        image_url: it.image,
      })),
    };

    try {
      const order = await createOrder(payload);
      clearCart();
      router.push(`/order-confirmed?order_number=${order.order_number}`);
    } catch (err) {
      console.error('Order creation error:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#EBEBE8]">
        <div>
          <Link href="/bag" className="text-xs text-neutral-500 hover:text-black">
            ← Back to bag
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 mt-2">
            Make it yours.
          </h1>
        </div>
        <div className="text-xs font-mono tracking-wider text-neutral-400 uppercase">
          Bag / Checkout / Confirmation
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form: Checkout Sections (7 cols) */}
        <div className="lg:col-span-7 space-y-10">
          {/* Express Checkout */}
          <div className="space-y-3 pb-6 border-b border-[#EBEBE8]">
            <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-400 text-center block">
              EXPRESS CHECKOUT
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="py-3 px-4 bg-black text-white text-xs font-bold rounded-xs flex items-center justify-center gap-1.5 hover:bg-neutral-800 transition-colors"
              >
                Apple Pay
              </button>
              <button
                type="button"
                className="py-3 px-4 bg-[#FFC439] text-[#003087] text-xs font-bold rounded-xs flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                PayPal
              </button>
            </div>
            <div className="text-center text-[11px] text-neutral-400 font-mono pt-1">
              or continue with card below
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* 01 / Contact */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  01 / Contact
                </h2>
                <span className="text-xs text-neutral-500">
                  Have an account? <Link href="/account" className="underline text-black font-semibold">Log in</Link>
                </span>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black"
                />
                <p className="text-[11px] text-neutral-400 mt-1">
                  Your receipt and shipping updates will go here.
                </p>
              </div>
              <label className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded-xs text-black" />
                <span>Email me about new drops and offers</span>
              </label>
            </div>

            {/* 02 / Delivery */}
            <div className="space-y-4 pt-6 border-t border-[#EBEBE8]">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                02 / Delivery
              </h2>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Country / region
                </label>
                <select className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black font-medium">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>South Africa</option>
                  <option>Kenya</option>
                  <option>Nigeria</option>
                  <option>Ghana</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">First name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">Last name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Apartment, suite, etc. (optional)
                </label>
                <input
                  type="text"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black font-medium"
                  >
                    <option>California</option>
                    <option>New York</option>
                    <option>Texas</option>
                    <option>Florida</option>
                    <option>Washington</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">ZIP code</label>
                  <input
                    type="text"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Phone (optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black"
                />
                <p className="text-[11px] text-neutral-400 mt-1">
                  Only used if our delivery partner needs to reach you.
                </p>
              </div>

              {/* Shipping Method Options */}
              <div className="pt-4 space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Shipping method
                </span>
                <div
                  onClick={() => setShippingMethod('standard')}
                  className={`p-3.5 border rounded-xs flex items-center justify-between cursor-pointer transition-colors ${
                    shippingMethod === 'standard' ? 'border-black bg-white ring-1 ring-black' : 'border-[#D5D5CF]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-neutral-900">Standard shipping</div>
                    <div className="text-[11px] text-neutral-500">3–5 business days · Arrives Oct 19–21</div>
                  </div>
                  <span className="text-xs font-bold text-neutral-900">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div
                  onClick={() => setShippingMethod('express')}
                  className={`p-3.5 border rounded-xs flex items-center justify-between cursor-pointer transition-colors ${
                    shippingMethod === 'express' ? 'border-black bg-white ring-1 ring-black' : 'border-[#D5D5CF]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-neutral-900">Express shipping</div>
                    <div className="text-[11px] text-neutral-500">1–2 business days · Arrives Oct 15–16</div>
                  </div>
                  <span className="text-xs font-bold text-neutral-900">$12.00</span>
                </div>
              </div>
            </div>

            {/* 03 / Payment */}
            <div className="space-y-4 pt-6 border-t border-[#EBEBE8]">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                  03 / Payment <Lock size={13} />
                </h2>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                  <span>VISA</span>
                  <span>Mastercard</span>
                  <span>AMEX</span>
                </div>
              </div>
              <p className="text-[11px] text-neutral-400">All transactions are secure and encrypted.</p>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Card number</label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">Expiration date</label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM / YY"
                    className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">Security code</label>
                  <input
                    type="text"
                    required
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="CVC"
                    className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Name on card</label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black"
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded-xs text-black" />
                  <span>Billing address is the same as shipping address</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer">
                  <input type="checkbox" className="rounded-xs text-black" />
                  <span>Save my information for next time</span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 bg-[#D2DB6B] hover:bg-[#C2CB5E] text-black font-bold text-xs uppercase tracking-wider py-4 rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.99] disabled:opacity-50"
              >
                <Lock size={14} />
                <span>{isSubmitting ? 'Processing order...' : `Pay $${currentTotal.toFixed(2)}`}</span>
              </button>

              <p className="text-[11px] text-neutral-400 text-center pt-2">
                By placing your order, you agree to our Terms of Service and Privacy Policy. You can return unworn items within 30 days of delivery.
              </p>
            </div>
          </form>
        </div>

        {/* Right Sticky Order Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F8F8F5] border border-[#EBEBE8] p-6 rounded-xs space-y-5 sticky top-24">
            <div className="flex items-center justify-between border-b border-[#EBEBE8] pb-3">
              <h2 className="text-base font-bold text-neutral-900">Your order</h2>
              <span className="text-xs text-neutral-500">{items.length} items</span>
            </div>

            {/* Items review */}
            <div className="divide-y divide-[#EBEBE8]">
              {items.map((it) => (
                <div key={it.id} className="py-3 flex gap-3 items-center">
                  <div className="relative w-14 h-16 bg-[#ECECE9] rounded-xs overflow-hidden shrink-0">
                    <Image src={it.image} alt={it.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xs font-bold text-neutral-900">{it.name}</h3>
                    <p className="text-[11px] text-neutral-500">
                      {it.color} / Size {it.size}
                    </p>
                    <p className="text-[11px] text-neutral-500">Quantity: {it.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-neutral-900">
                    ${(it.price * it.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price lines */}
            <div className="border-t border-[#EBEBE8] pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal ({items.length} items)</span>
                <span className="font-semibold text-neutral-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Standard shipping</span>
                <span className="font-semibold text-neutral-900">
                  {selectedShippingCost === 0 ? 'Free' : `$${selectedShippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Estimated tax</span>
                <span className="font-semibold text-neutral-900">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-[#EBEBE8] pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-neutral-900">Total · USD</span>
                <span className="text-xl font-extrabold text-neutral-900">
                  ${currentTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Arrival estimate */}
            <div className="pt-2 border-t border-[#EBEBE8] space-y-2 text-xs text-neutral-600">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-black">Estimated arrival:</span>
                <span>Oct 19–21</span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Standard shipping. Your order ships in 1–2 business days.
              </p>
              <p className="text-[11px] text-neutral-500 pt-1">
                30 days to find your favorite. Easy returns on unworn essentials. No stress.
              </p>
              <div className="pt-2 text-[11px] text-neutral-400">
                Need a hand? hello@afriqan.studio
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Smartphone, Banknote, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { createOrder, triggerSafaricomExpress, checkMpesaStatus } from '@/lib/api';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, total, orderNote, clearCart } = useCart();

  // Contact & Delivery State in Kenya
  const [email, setEmail] = useState('alex.mwangi@gmail.com');
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Mwangi');
  const [phone, setPhone] = useState('0712345678');
  const [address, setAddress] = useState('128 Sunset Avenue');
  const [apartment, setApartment] = useState('Apartment 4B');
  const [city, setCity] = useState('Nairobi');
  const [county, setCounty] = useState('Nairobi County');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  // Payment State: 'mpesa_till' | 'mpesa_express' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState<'mpesa_till' | 'mpesa_express' | 'cod'>('mpesa_till');
  const [mpesaReceipt, setMpesaReceipt] = useState('');
  const [stkPhoneNumber, setStkPhoneNumber] = useState('0712345678');
  const [stkStatus, setStkStatus] = useState<{
    status: 'idle' | 'sending' | 'prompt_sent' | 'paid' | 'error';
    message: string;
    checkoutId?: string;
  }>({
    status: 'idle',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedShippingCost = shippingMethod === 'standard' ? shipping : 450.0;
  const currentTotal = Number((subtotal + selectedShippingCost).toFixed(2));

  // Auto-polling for M-Pesa STK push completion
  React.useEffect(() => {
    if (stkStatus.status !== 'prompt_sent' || !stkStatus.checkoutId) return;

    let attempts = 0;
    const maxAttempts = 12; // 12 * 3s = 36s timeout
    const interval = setInterval(async () => {
      attempts += 1;
      try {
        const res = await checkMpesaStatus(stkStatus.checkoutId!);
        if (res.status === 'COMPLETED' && res.mpesa_receipt) {
          setMpesaReceipt(res.mpesa_receipt);
          setStkStatus({
            status: 'paid',
            message: `M-Pesa payment received! Receipt: ${res.mpesa_receipt}`,
          });
          clearInterval(interval);
        } else if (res.status === 'FAILED') {
          setStkStatus({
            status: 'error',
            message: res.result_desc || 'Payment was cancelled or timed out on your phone.',
          });
          clearInterval(interval);
        } else if (attempts >= maxAttempts) {
          setStkStatus({
            status: 'prompt_sent',
            message: 'Waiting period completed. If you already entered your PIN, you can enter the confirmation code manually.',
          });
          clearInterval(interval);
        }
      } catch (e) {
        console.warn('Status poll attempt failed', e);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [stkStatus.status, stkStatus.checkoutId]);

  const handleSafaricomSTKPush = async () => {
    if (!stkPhoneNumber) {
      alert('Please enter your Safaricom phone number for M-Pesa STK push.');
      return;
    }
    setStkStatus({ status: 'sending', message: 'Initiating Safaricom Express STK push...' });
    try {
      const orderRef = `AF-${Math.floor(10000 + Math.random() * 90000)}`;
      const res = await triggerSafaricomExpress({
        phone: stkPhoneNumber,
        amount: Math.round(currentTotal),
        order_number: orderRef,
      });
      setStkStatus({
        status: 'prompt_sent',
        message: res.CustomerMessage || 'STK Push sent to your phone! Enter your M-Pesa PIN.',
        checkoutId: res.CheckoutRequestID,
      });
    } catch (err: any) {
      setStkStatus({
        status: 'error',
        message: 'Could not send STK push. You can pay via Buy Goods Till 4466556 below.',
      });
    }
  };

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
      state: county,
      zip_code: '00100',
      country: 'Kenya',
      phone,
      shipping_method: shippingMethod,
      shipping_cost: selectedShippingCost,
      subtotal,
      tax: 0.0,
      total: currentTotal,
      payment_method: paymentMethod,
      mpesa_receipt: mpesaReceipt,
      order_note: orderNote,
      items: items.map((it) => ({
        product_id: it.productId,
        product_name: it.name,
        color: it.color,
        size: it.size,
        price: it.price,
        quantity: it.quantity,
        image_url: it.image,
        has_custom_print: it.hasCustomPrint || false,
        custom_print_text: it.customPrintText || '',
        custom_print_placement: it.customPrintPlacement || '',
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
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#EBEBE8] dark:border-[#27282B]">
        <div>
          <Link href="/bag" className="text-xs text-neutral-500 hover:text-black dark:hover:text-white">
            ← Back to bag
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 mt-2">
            Make it yours.
          </h1>
        </div>
        <div className="text-xs font-mono tracking-wider text-neutral-400 uppercase">
          Bag / Checkout / Confirmation
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form: Clean 3-Step Checkout (7 cols) */}
        <div className="lg:col-span-7 space-y-10">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* 01 / Contact */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                  01 / Contact
                </h2>
                <span className="text-xs text-neutral-500">
                  Have an account? <Link href="/account" className="underline text-black dark:text-white font-semibold">Log in</Link>
                </span>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-3 border border-[#D5D5CF] dark:border-[#27282B] rounded-xs bg-white dark:bg-[#161718] focus:outline-none focus:border-black dark:focus:border-white"
                />
                <p className="text-[11px] text-neutral-400 mt-1">
                  Your receipt and shipping updates will go here.
                </p>
              </div>
              <label className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded-xs text-black" />
                <span>Email me about new drops and offers</span>
              </label>
            </div>

            {/* 02 / Delivery */}
            <div className="space-y-4 pt-6 border-t border-[#EBEBE8] dark:border-[#27282B]">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                02 / Delivery
              </h2>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Country / region
                </label>
                <select className="w-full text-xs p-3 border border-[#D5D5CF] dark:border-[#27282B] rounded-xs bg-white dark:bg-[#161718] focus:outline-none focus:border-black dark:focus:border-white font-medium">
                  <option>Kenya</option>
                  <option>Uganda</option>
                  <option>Tanzania</option>
                  <option>Rwanda</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">First name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full text-xs p-3 border border-[#D5D5CF] dark:border-[#27282B] rounded-xs bg-white dark:bg-[#161718] focus:outline-none focus:border-black dark:focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">Last name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full text-xs p-3 border border-[#D5D5CF] dark:border-[#27282B] rounded-xs bg-white dark:bg-[#161718] focus:outline-none focus:border-black dark:focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 128 Sunset Avenue / Wood Avenue, Kilimani"
                  className="w-full text-xs p-3 border border-[#D5D5CF] dark:border-[#27282B] rounded-xs bg-white dark:bg-[#161718] focus:outline-none focus:border-black dark:focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Apartment, suite, etc. (optional)
                </label>
                <input
                  type="text"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  className="w-full text-xs p-3 border border-[#D5D5CF] dark:border-[#27282B] rounded-xs bg-white dark:bg-[#161718] focus:outline-none focus:border-black dark:focus:border-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs p-3 border border-[#D5D5CF] dark:border-[#27282B] rounded-xs bg-white dark:bg-[#161718] focus:outline-none focus:border-black dark:focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">County / State</label>
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full text-xs p-3 border border-[#D5D5CF] dark:border-[#27282B] rounded-xs bg-white dark:bg-[#161718] focus:outline-none focus:border-black dark:focus:border-white font-medium"
                  >
                    <option>Nairobi County</option>
                    <option>Kiambu County</option>
                    <option>Mombasa County</option>
                    <option>Nakuru County</option>
                    <option>Kisumu County</option>
                    <option>Machakos County</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">Phone (optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-3 border border-[#D5D5CF] dark:border-[#27282B] rounded-xs bg-white dark:bg-[#161718] focus:outline-none focus:border-black dark:focus:border-white font-mono"
                />
                <p className="text-[11px] text-neutral-400 mt-1">
                  Only used if our delivery partner needs to reach you.
                </p>
              </div>

              {/* Shipping method */}
              <div className="pt-4 space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                  Shipping method
                </span>
                <div
                  onClick={() => setShippingMethod('standard')}
                  className={`p-3.5 border rounded-xs flex items-center justify-between cursor-pointer transition-colors ${
                    shippingMethod === 'standard'
                      ? 'border-black dark:border-white bg-white dark:bg-[#161718] ring-1 ring-black dark:ring-white'
                      : 'border-[#D5D5CF] dark:border-[#27282B]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">Standard shipping</div>
                    <div className="text-[11px] text-neutral-500">3–5 business days · Arrives in 1–2 days</div>
                  </div>
                  <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                    {shipping === 0 ? 'Free' : `KES ${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div
                  onClick={() => setShippingMethod('express')}
                  className={`p-3.5 border rounded-xs flex items-center justify-between cursor-pointer transition-colors ${
                    shippingMethod === 'express'
                      ? 'border-black dark:border-white bg-white dark:bg-[#161718] ring-1 ring-black dark:ring-white'
                      : 'border-[#D5D5CF] dark:border-[#27282B]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">Express delivery</div>
                    <div className="text-[11px] text-neutral-500">Same-day rider dispatch</div>
                  </div>
                  <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">KES 450.00</span>
                </div>
              </div>
            </div>

            {/* 03 / Payment: Clean M-Pesa Till & COD */}
            <div className="space-y-6 pt-6 border-t border-[#EBEBE8] dark:border-[#27282B]">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                  03 / Payment <Lock size={13} />
                </h2>
                <div className="text-xs text-neutral-400 font-mono">
                  All transactions are secure and encrypted.
                </div>
              </div>

              {/* Clean Payment Selector */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mpesa_till')}
                  className={`py-3 px-3 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'mpesa_till'
                      ? 'border-[#7C3AED] bg-[#7C3AED] text-white shadow-sm'
                      : 'border-[#E9E5F5] dark:border-[#2A2344] bg-white dark:bg-[#161718] text-[#0F0E17] dark:text-[#FAF8FF]'
                  }`}
                >
                  Buy Goods Till
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mpesa_express')}
                  className={`py-3 px-3 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'mpesa_express'
                      ? 'border-[#7C3AED] bg-[#7C3AED] text-white shadow-sm'
                      : 'border-[#E9E5F5] dark:border-[#2A2344] bg-white dark:bg-[#161718] text-[#0F0E17] dark:text-[#FAF8FF]'
                  }`}
                >
                  Safaricom STK
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`py-3 px-3 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-[#7C3AED] bg-[#7C3AED] text-white shadow-sm'
                      : 'border-[#E9E5F5] dark:border-[#2A2344] bg-white dark:bg-[#161718] text-[#0F0E17] dark:text-[#FAF8FF]'
                  }`}
                >
                  Cash on Delivery
                </button>
              </div>

              {/* Till 4466556 View */}
              {paymentMethod === 'mpesa_till' && (
                <div className="p-5 bg-white dark:bg-[#141124] border border-[#E9E5F5] dark:border-[#2A2344] rounded-2xl space-y-4 shadow-xs">
                  <div className="relative w-full aspect-[2.3/1] max-w-md mx-auto overflow-hidden rounded-xl border border-purple-200 dark:border-purple-900/60 shadow-sm">
                    <Image
                      src="/lipa-na-mpesa-till.png"
                      alt="Lipa Na M-Pesa Buy Goods Till Number 4466556"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  <div className="text-xs text-[#5B586E] dark:text-[#B6B0D1] space-y-1.5 bg-purple-50/50 dark:bg-purple-950/30 p-3 rounded-xl border border-purple-100 dark:border-purple-900/40">
                    <p>1. Go to M-Pesa → Buy Goods and Services</p>
                    <p>2. Enter Till Number: <strong className="font-mono text-purple-900 dark:text-purple-200 text-sm">4466556</strong> (AFRIQAN TEES AND CAPS HUB)</p>
                    <p>3. Enter Amount: <strong className="text-purple-900 dark:text-purple-200 font-mono text-sm">KES {currentTotal.toLocaleString()}</strong></p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F0E17] dark:text-[#FAF8FF] mb-1">
                      M-Pesa confirmation code (from Safaricom SMS):
                    </label>
                    <input
                      type="text"
                      value={mpesaReceipt}
                      onChange={(e) => setMpesaReceipt(e.target.value.toUpperCase())}
                      placeholder="e.g. NL48291072 or SGK8291KL0"
                      className="w-full text-xs p-3.5 border border-[#E9E5F5] dark:border-[#2A2344] rounded-xl bg-white dark:bg-[#161718] uppercase font-mono font-black text-purple-900 dark:text-purple-200 tracking-wider focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    />
                  </div>
                </div>
              )}

              {/* Safaricom Express STK */}
              {paymentMethod === 'mpesa_express' && (
                <div className="p-5 bg-white dark:bg-[#141124] border border-[#E9E5F5] dark:border-[#2A2344] rounded-2xl space-y-4 shadow-xs">
                  <p className="text-xs text-[#5B586E] dark:text-[#B6B0D1]">
                    Enter your Safaricom number to trigger an instant M-Pesa PIN prompt for <strong className="text-purple-900 dark:text-purple-200">KES {currentTotal.toLocaleString()}</strong>:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={stkPhoneNumber}
                      onChange={(e) => setStkPhoneNumber(e.target.value)}
                      placeholder="0712345678"
                      className="flex-grow text-xs p-3.5 border border-[#E9E5F5] dark:border-[#2A2344] rounded-xl bg-white dark:bg-[#161718] font-mono font-bold text-[#0F0E17] dark:text-[#FAF8FF] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    />
                    <button
                      type="button"
                      onClick={handleSafaricomSTKPush}
                      disabled={stkStatus.status === 'sending'}
                      className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold px-5 py-3 rounded-xl uppercase tracking-wider transition-all cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      {stkStatus.status === 'sending' ? 'Sending...' : 'Send STK'}
                    </button>
                  </div>

                  {/* Dynamic Status Feedback */}
                  {stkStatus.status === 'prompt_sent' && (
                    <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 flex items-center gap-2.5">
                      <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin shrink-0" />
                      <span>{stkStatus.message}</span>
                    </div>
                  )}

                  {stkStatus.status === 'paid' && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                      <span className="font-semibold">{stkStatus.message}</span>
                    </div>
                  )}

                  {stkStatus.status === 'error' && (
                    <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-900 dark:text-red-200 flex items-center gap-2.5">
                      <AlertCircle size={16} className="text-red-600 shrink-0" />
                      <span>{stkStatus.message}</span>
                    </div>
                  )}
                </div>
              )}

              {/* COD */}
              {paymentMethod === 'cod' && (
                <div className="p-4 bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 rounded-xl text-xs text-[#5B586E] dark:text-[#B6B0D1]">
                  Pay cash or via rider M-Pesa upon doorstep parcel delivery in Nairobi or across Kenya.
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.99] disabled:opacity-50"
              >
                <Lock size={14} />
                <span>
                  {isSubmitting
                    ? 'Processing Order...'
                    : paymentMethod === 'cod'
                    ? `Confirm Order (Pay KES ${currentTotal.toLocaleString()} on Delivery)`
                    : `Confirm & Pay KES ${currentTotal.toLocaleString()}`}
                </span>
              </button>

              <p className="text-[11px] text-neutral-400 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy. You can return unworn items within 30 days of delivery.
              </p>
            </div>
          </form>
        </div>

        {/* Right Sticky Order Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F8F8F5] dark:bg-[#161718] border border-[#EBEBE8] dark:border-[#27282B] p-6 rounded-xs space-y-5 sticky top-24">
            <div className="flex items-center justify-between border-b border-[#EBEBE8] dark:border-[#27282B] pb-3">
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">Your order</h2>
              <span className="text-xs text-neutral-500">{items.length} items</span>
            </div>

            {/* Items review */}
            <div className="divide-y divide-[#EBEBE8] dark:divide-[#27282B]">
              {items.map((it) => {
                const itemUnitTotal = it.price + (it.hasCustomPrint ? it.customPrintFee || 500 : 0);
                return (
                  <div key={it.id} className="py-3 flex gap-3 items-center">
                    <div className="relative w-14 h-16 bg-[#ECECE9] dark:bg-[#1E1F21] rounded-xs overflow-hidden shrink-0">
                      <Image src={it.image} alt={it.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{it.name}</h3>
                      <p className="text-[11px] text-neutral-500">
                        {it.color} / Size {it.size}
                      </p>
                      <p className="text-[11px] text-neutral-500">Quantity: {it.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                      KES {(itemUnitTotal * it.quantity).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Price lines */}
            <div className="border-t border-[#EBEBE8] dark:border-[#27282B] pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <span>Subtotal ({items.length} items)</span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <span>Standard shipping</span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {selectedShippingCost === 0 ? 'Free' : `KES ${selectedShippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-[#EBEBE8] dark:border-[#27282B] pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Total · KES</span>
                <span className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100">
                  KES {currentTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Arrival estimate */}
            <div className="pt-2 border-t border-[#EBEBE8] dark:border-[#27282B] space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-black dark:text-white">Estimated arrival:</span>
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

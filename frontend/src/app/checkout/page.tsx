'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Smartphone, Banknote, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { createOrder, triggerSafaricomExpress } from '@/lib/api';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, total, orderNote, clearCart } = useCart();

  // Contact & Delivery State in Kenya
  const [email, setEmail] = useState('alex.mwangi@gmail.com');
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Mwangi');
  const [phone, setPhone] = useState('0712345678');
  const [address, setAddress] = useState('Wood Avenue, Kilimani');
  const [apartment, setApartment] = useState('Silver Crest Court, Flat 4B');
  const [city, setCity] = useState('Nairobi');
  const [county, setCounty] = useState('Nairobi County');
  const [deliveryArea, setDeliveryArea] = useState('Nairobi Metro');

  // Payment State: 'mpesa_till' | 'mpesa_express' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState<'mpesa_till' | 'mpesa_express' | 'cod'>('mpesa_till');
  const [mpesaReceipt, setMpesaReceipt] = useState('');
  const [stkPhoneNumber, setStkPhoneNumber] = useState('0712345678');
  const [stkStatus, setStkStatus] = useState<{ status: 'idle' | 'sending' | 'prompt_sent' | 'error'; message: string }>({
    status: 'idle',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const kenyaCounties = [
    'Nairobi County',
    'Kiambu County',
    'Mombasa County',
    'Nakuru County',
    'Kisumu County',
    'Uasin Gishu (Eldoret)',
    'Machakos County',
    'Kajiado County',
    'Kilifi County',
    'Meru County',
  ];

  const handleSafaricomSTKPush = async () => {
    if (!stkPhoneNumber) {
      alert('Please enter your Safaricom phone number for M-Pesa STK push.');
      return;
    }
    setStkStatus({ status: 'sending', message: 'Initiating Safaricom Express STK push...' });
    try {
      const res = await triggerSafaricomExpress({
        phone: stkPhoneNumber,
        amount: Math.round(total),
        order_number: `AF-${Math.floor(10000 + Math.random() * 90000)}`,
      });
      setStkStatus({
        status: 'prompt_sent',
        message: res.CustomerMessage || 'STK Push sent to your Safaricom line! Enter your M-Pesa PIN on your phone.',
      });
    } catch (err: any) {
      setStkStatus({
        status: 'error',
        message: 'Could not send STK push. You can also pay manually using Buy Goods Till 4466556 below.',
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
      shipping_method: deliveryArea,
      shipping_cost: shipping,
      subtotal,
      tax: 0.0,
      total,
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
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* 01 / Contact */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  01 / Contact Details
                </h2>
                <span className="text-xs text-neutral-500">
                  Have an account? <Link href="/account" className="underline text-black font-semibold">Log in</Link>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    M-Pesa / WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0712345678"
                    className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black font-mono"
                  />
                </div>
              </div>
              <p className="text-[11px] text-neutral-400">
                Your order updates and rider dispatch confirmation will be sent to this phone and email.
              </p>
            </div>

            {/* 02 / Delivery in Kenya */}
            <div className="space-y-4 pt-6 border-t border-[#EBEBE8]">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                02 / Delivery Location (Kenya)
              </h2>

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
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Street Address / Estate / Landmark
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Wood Avenue, Kilimani or Westlands Roundabout"
                  className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Apartment, House / Office Number, Building Name
                </label>
                <input
                  type="text"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  placeholder="e.g. Silver Crest Court, Flat 4B"
                  className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">Town / City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">County</label>
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black font-medium"
                  >
                    {kenyaCounties.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Delivery method selector */}
              <div className="pt-4 space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Delivery Method
                </span>
                <div
                  onClick={() => setDeliveryArea('Nairobi Metro')}
                  className={`p-3.5 border rounded-xs flex items-center justify-between cursor-pointer transition-colors ${
                    deliveryArea === 'Nairobi Metro' ? 'border-black bg-white ring-1 ring-black' : 'border-[#D5D5CF]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-neutral-900">Nairobi &amp; Environs Express Rider</div>
                    <div className="text-[11px] text-neutral-500">Same-day / Next-day doorstep delivery</div>
                  </div>
                  <span className="text-xs font-bold text-neutral-900">
                    {shipping === 0 ? 'Free (Orders > KES 5,000)' : 'KES 300'}
                  </span>
                </div>

                <div
                  onClick={() => setDeliveryArea('Upcountry Kenya')}
                  className={`p-3.5 border rounded-xs flex items-center justify-between cursor-pointer transition-colors ${
                    deliveryArea === 'Upcountry Kenya' ? 'border-black bg-white ring-1 ring-black' : 'border-[#D5D5CF]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-neutral-900">Countrywide Courier (Wells Fargo / G4S)</div>
                    <div className="text-[11px] text-neutral-500">1–2 business days to major towns across Kenya</div>
                  </div>
                  <span className="text-xs font-bold text-neutral-900">
                    {shipping === 0 ? 'Free (Orders > KES 5,000)' : 'KES 300'}
                  </span>
                </div>
              </div>
            </div>

            {/* 03 / Payment Section (Strictly Safaricom M-Pesa & Cash on Delivery) */}
            <div className="space-y-6 pt-6 border-t border-[#EBEBE8]">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                  03 / Payment Options <Lock size={13} />
                </h2>
                <div className="text-xs font-semibold text-[#008000] flex items-center gap-1">
                  <span>Lipa na M-Pesa &amp; COD Only</span>
                </div>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mpesa_till')}
                  className={`p-3.5 border rounded-xs text-left cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'mpesa_till'
                      ? 'border-[#008000] bg-[#F2FBF4] ring-1 ring-[#008000]'
                      : 'border-[#D5D5CF] bg-white hover:border-black'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-neutral-900">Buy Goods Till</span>
                    <Smartphone size={16} className="text-[#008000]" />
                  </div>
                  <p className="text-[11px] text-[#008000] font-bold mt-2">
                    Till No: 4466556
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('mpesa_express')}
                  className={`p-3.5 border rounded-xs text-left cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'mpesa_express'
                      ? 'border-[#008000] bg-[#F2FBF4] ring-1 ring-[#008000]'
                      : 'border-[#D5D5CF] bg-white hover:border-black'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-neutral-900">Safaricom Express</span>
                    <Smartphone size={16} className="text-[#008000]" />
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-2">
                    Instant STK Push to Phone
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 border rounded-xs text-left cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'cod'
                      ? 'border-black bg-[#F8F8F5] ring-1 ring-black'
                      : 'border-[#D5D5CF] bg-white hover:border-black'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-neutral-900">Cash on Delivery</span>
                    <Banknote size={16} className="text-neutral-700" />
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-2">
                    Pay rider upon delivery
                  </p>
                </button>
              </div>

              {/* METHOD 1: LIPA NA M-PESA BUY GOODS TILL WITH EMBEDDED BANNER */}
              {paymentMethod === 'mpesa_till' && (
                <div className="p-5 bg-white border border-[#008000]/30 rounded-xs space-y-4">
                  {/* Embedded User Till Banner */}
                  <div className="relative w-full aspect-[2/1] sm:aspect-[2.3/1] max-w-lg mx-auto overflow-hidden rounded-xs border border-neutral-200 shadow-xs">
                    <Image
                      src="/lipa-na-mpesa-till.png"
                      alt="Lipa Na M-Pesa Buy Goods Till Number 4466556 - Afriqan Tees and Caps Hub"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  <div className="space-y-2 text-xs text-neutral-700 bg-[#F4FDF6] p-4 rounded-xs border border-[#D0F0D8]">
                    <div className="font-bold text-neutral-900">How to pay via M-Pesa:</div>
                    <ol className="list-decimal list-inside space-y-1 text-[11px] text-neutral-600">
                      <li>Go to M-PESA menu on your phone</li>
                      <li>Select <strong>Lipa na M-PESA</strong> → <strong>Buy Goods and Services</strong></li>
                      <li>Enter Till Number: <strong className="font-mono text-sm text-[#008000]">4466556</strong> (AFRIQAN TEES AND CAPS HUB)</li>
                      <li>Enter Amount: <strong className="font-mono text-sm text-black">KES {total.toLocaleString()}</strong></li>
                      <li>Enter your M-PESA PIN and press OK</li>
                    </ol>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-900 mb-1">
                      Enter M-Pesa Confirmation Code (e.g. SGK8291KL0):
                    </label>
                    <input
                      type="text"
                      value={mpesaReceipt}
                      onChange={(e) => setMpesaReceipt(e.target.value.toUpperCase())}
                      placeholder="e.g. SGK8291KL0"
                      className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black uppercase font-mono font-bold"
                    />
                    <p className="text-[11px] text-neutral-400 mt-1">
                      Optional: You can also place the order first and provide the code to our dispatch team via SMS or WhatsApp.
                    </p>
                  </div>
                </div>
              )}

              {/* METHOD 2: SAFARICOM EXPRESS (STK PUSH) */}
              {paymentMethod === 'mpesa_express' && (
                <div className="p-5 bg-white border border-[#008000]/30 rounded-xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                    <Smartphone size={16} className="text-[#008000]" />
                    <span>Safaricom M-Pesa Express (STK Push)</span>
                  </div>
                  <p className="text-xs text-neutral-600">
                    Enter your Safaricom phone number below. We will send a prompt directly to your phone screen to enter your M-Pesa PIN for <strong>KES {total.toLocaleString()}</strong>.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={stkPhoneNumber}
                      onChange={(e) => setStkPhoneNumber(e.target.value)}
                      placeholder="e.g. 0712345678"
                      className="flex-grow text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black font-mono font-semibold"
                    />
                    <button
                      type="button"
                      onClick={handleSafaricomSTKPush}
                      disabled={stkStatus.status === 'sending'}
                      className="bg-[#008000] hover:bg-[#006E00] text-white text-xs font-bold px-5 py-3 rounded-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
                    >
                      {stkStatus.status === 'sending' ? 'Sending...' : 'Send STK Push'}
                    </button>
                  </div>

                  {stkStatus.message && (
                    <div className={`p-3 rounded-xs text-xs flex items-start gap-2 ${
                      stkStatus.status === 'prompt_sent'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {stkStatus.status === 'prompt_sent' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                      <span>{stkStatus.message}</span>
                    </div>
                  )}
                </div>
              )}

              {/* METHOD 3: CASH ON DELIVERY */}
              {paymentMethod === 'cod' && (
                <div className="p-5 bg-[#F8F8F5] border border-[#EBEBE8] rounded-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                    <Banknote size={16} className="text-neutral-800" />
                    <span>Pay Cash Upon Delivery</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    You can pay the delivery rider in cash or via M-Pesa directly when your parcel is delivered to your doorstep. Available across Nairobi and major Kenyan towns.
                  </p>
                </div>
              )}

              {/* Complete Order Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 bg-[#D2DB6B] hover:bg-[#C2CB5E] text-black font-bold text-xs uppercase tracking-wider py-4 rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.99] disabled:opacity-50"
              >
                <Lock size={14} />
                <span>
                  {isSubmitting
                    ? 'Processing Order...'
                    : paymentMethod === 'cod'
                    ? `Confirm Order (Pay KES ${total.toLocaleString()} on Delivery)`
                    : `Place Order — KES ${total.toLocaleString()}`}
                </span>
              </button>

              <p className="text-[11px] text-neutral-400 text-center pt-1">
                By placing your order, you agree to Afriqan Caps and Hoodies Kenya terms. Exchanges available within 7 days.
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
              {items.map((it) => {
                const itemUnitTotal = it.price + (it.hasCustomPrint ? it.customPrintFee || 500 : 0);
                return (
                  <div key={it.id} className="py-3 flex gap-3 items-center">
                    <div className="relative w-14 h-16 bg-[#ECECE9] rounded-xs overflow-hidden shrink-0">
                      <Image src={it.image} alt={it.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xs font-bold text-neutral-900">{it.name}</h3>
                      <p className="text-[11px] text-neutral-500">
                        {it.color} / Size {it.size}
                      </p>
                      {it.hasCustomPrint && (
                        <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                          <Sparkles size={10} /> Print: {it.customPrintText} (+KES 500)
                        </p>
                      )}
                      <p className="text-[11px] text-neutral-500">Qty: {it.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-neutral-900">
                      KES {(itemUnitTotal * it.quantity).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Price lines */}
            <div className="border-t border-[#EBEBE8] pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal ({items.length} items)</span>
                <span className="font-semibold text-neutral-900">KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Delivery</span>
                <span className="font-semibold text-neutral-900">
                  {shipping === 0 ? 'Free' : `KES ${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-[#EBEBE8] pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-neutral-900">Total · KES</span>
                <span className="text-xl font-extrabold text-neutral-900">
                  KES {total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Arrival estimate */}
            <div className="pt-2 border-t border-[#EBEBE8] space-y-2 text-xs text-neutral-600">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-black">Estimated arrival:</span>
                <span>1–2 business days</span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Nairobi express doorstep dispatch. Wells Fargo/G4S for upcountry delivery.
              </p>
              <div className="pt-2 text-[11px] text-neutral-400">
                Support: orders@afriqan.co.ke · WhatsApp +254 712 345 678
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

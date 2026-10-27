'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Check, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { fetchOrderByNumber } from '@/lib/api';
import { Order } from '@/types';

function OrderConfirmedContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order_number') || 'OH-10482';
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrderByNumber(orderNumber).then((data) => {
      if (data) {
        setOrder(data);
      } else {
        // Fallback default order in KES
        setOrder({
          id: 10482,
          order_number: orderNumber,
          email: 'alex.mwangi@gmail.com',
          first_name: 'Alex',
          last_name: 'Mwangi',
          address: 'Wood Avenue, Kilimani',
          apartment: 'Suite 4B, Silver Crest',
          city: 'Nairobi',
          state: 'Nairobi County',
          zip_code: '00100',
          country: 'Kenya',
          phone: '+254 712 345 678',
          shipping_method: 'Nairobi Metro Express Delivery',
          shipping_cost: 0,
          subtotal: 5500.0,
          tax: 0.0,
          total: 5500.0,
          currency: 'KES',
          payment_method: 'mpesa_till',
          payment_status: 'paid',
          mpesa_phone: '254712345678',
          mpesa_receipt_number: 'SGK8291KL0',
          status: 'confirmed',
          status_display: 'Order confirmed',
          order_note: '',
          estimated_arrival: 'October 14–15, 2026',
          created_at: 'October 13, 2026',
          items: [
            {
              id: 1,
              product_name: 'The Heavyweight Hoodie',
              color: 'Ash',
              size: 'M',
              price: 3500.0,
              quantity: 1,
              image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80',
              has_custom_print: true,
              custom_print_text: 'NAIROBI ROTATION 254',
              custom_print_placement: 'Upper Back (+KES 500)',
              custom_print_fee: 500.0,
            },
            {
              id: 2,
              product_name: 'The Afriqan Signature Cap',
              color: 'Ink',
              size: 'ONE SIZE',
              price: 1500.0,
              quantity: 1,
              image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80',
              has_custom_print: false,
              custom_print_text: '',
              custom_print_placement: '',
              custom_print_fee: 0.0,
            },
          ],
        });
      }
    });
  }, [orderNumber]);

  if (!order) {
    return (
      <div className="py-24 text-center text-xs tracking-widest font-mono text-neutral-400">
        Retrieving order status...
      </div>
    );
  }

  const paymentMethodLabel =
    order.payment_method === 'mpesa_till'
      ? 'Lipa na M-Pesa Buy Goods (Till 4466556)'
      : order.payment_method === 'mpesa_express'
      ? 'Safaricom M-Pesa Express'
      : 'Cash on Delivery';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Top Confirmed Greeting */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-theme flex items-center justify-center text-white shadow-sm">
            <Check size={20} strokeWidth={2.5} />
          </div>
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-500">
              ORDER {order.order_number} / CONFIRMED
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 leading-tight">
              Good choice, {order.first_name}.
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 pl-13">
          Your Kenyan street rotation just got better. Confirmation updates sent to <span className="font-semibold text-black">{order.email}</span> and SMS to <span className="font-semibold text-black">{order.phone}</span>.
        </p>
      </div>

      {/* Estimated Arrival Banner Card */}
      <div className="bg-[#EBF1A8]/45 border border-[#DEE690] p-6 rounded-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4DC7E] pb-4">
          <div>
            <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-600 block">
              ESTIMATED ARRIVAL IN KENYA
            </span>
            <span className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
              {order.estimated_arrival}
            </span>
          </div>
          <Link
            href={`/order-confirmed?order_number=${order.order_number}`}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-black hover:underline"
          >
            Track order status <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* 4 Steps timeline */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-neutral-900 flex items-center gap-1">
              <span>✓ Order confirmed</span>
            </div>
            <div className="text-[11px] text-neutral-600">October 13, 2026</div>
          </div>

          <div className="space-y-1">
            <div className="font-semibold text-neutral-800">Printing &amp; Packing</div>
            <div className="text-[11px] text-neutral-600">Nairobi Hub Dispatch</div>
          </div>

          <div className="space-y-1">
            <div className="font-semibold text-neutral-800">Rider on the way</div>
            <div className="text-[11px] text-neutral-600">Rider calls on arrival</div>
          </div>

          <div className="space-y-1">
            <div className="font-semibold text-neutral-800">Delivered</div>
            <div className="text-[11px] text-neutral-600">Enjoy your Afriqan fit</div>
          </div>
        </div>
      </div>

      {/* Main Order Details Columns */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Your Essentials (7 cols) */}
        <div className="md:col-span-7 bg-[#FBFBF9] border border-[#EBEBE8] p-6 rounded-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#EBEBE8] pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              Your essentials
            </h2>
            <span className="text-xs text-neutral-500 font-mono">
              {order.items.reduce((sum, it) => sum + it.quantity, 0)} items
            </span>
          </div>

          <div className="divide-y divide-[#EBEBE8]">
            {order.items.map((it) => {
              const itemTotal = (it.price + (it.has_custom_print ? it.custom_print_fee || 500 : 0)) * it.quantity;
              return (
                <div key={it.id} className="py-4 flex gap-4 items-center">
                  <div className="relative w-16 h-20 bg-[#ECECE9] rounded-xs overflow-hidden shrink-0">
                    <Image src={it.image_url} alt={it.product_name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xs font-bold text-neutral-900">{it.product_name}</h3>
                    <p className="text-[11px] text-neutral-500">
                      {it.color} / Size {it.size}
                    </p>
                    {it.has_custom_print && (
                      <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                        <Sparkles size={10} /> Print: {it.custom_print_text} (+KES 500)
                      </p>
                    )}
                    <p className="text-[11px] text-neutral-500">Quantity: {it.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-neutral-900">
                    KES {itemTotal.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-[#EBEBE8] pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900">KES {order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Delivery</span>
              <span className="font-semibold text-neutral-900">
                {order.shipping_cost === 0 ? 'Free' : `KES ${order.shipping_cost.toFixed(2)}`}
              </span>
            </div>
            <div className="border-t border-[#EBEBE8] pt-3 flex justify-between items-baseline">
              <span className="text-sm font-bold text-neutral-900">Total · KES</span>
              <span className="text-2xl font-black text-neutral-900">
                KES {order.total.toLocaleString()}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 pt-1">
              Payment Method: <strong>{paymentMethodLabel}</strong>
              {order.mpesa_receipt_number && (
                <span> · Receipt: <strong className="font-mono">{order.mpesa_receipt_number}</strong></span>
              )}
            </p>
          </div>
        </div>

        {/* Right Column: Shipping To & Payment */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#F8F8F5] border border-[#EBEBE8] p-6 rounded-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Delivery Destination
            </h3>
            <div className="text-xs text-neutral-700 leading-relaxed space-y-0.5">
              <p className="font-bold text-black">{order.first_name} {order.last_name}</p>
              <p>{order.address}</p>
              {order.apartment && <p>{order.apartment}</p>}
              <p>{order.city}, {order.state}</p>
              <p>Kenya</p>
              <p className="pt-2 text-neutral-600 font-mono font-bold">Phone: {order.phone}</p>
            </div>

            <div className="pt-4 border-t border-[#EBEBE8] space-y-1 text-xs">
              <div className="font-bold text-black">Delivery Details</div>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Rider will contact you 30 minutes before arrival at your address.
              </p>
            </div>

            <div className="pt-4 border-t border-[#EBEBE8] space-y-1 text-xs">
              <div className="font-bold text-black">Payment Reference</div>
              <p className="text-[11px] text-neutral-600 font-semibold">
                {paymentMethodLabel}
              </p>
              <p className="text-[11px] text-neutral-500">
                Status: {order.payment_status === 'paid' ? 'Paid ✓' : 'Pay On Delivery / Pending Confirmation'}
              </p>
            </div>

            <div className="pt-4 border-t border-[#EBEBE8] text-[11px] text-neutral-500">
              Need to adjust your delivery or custom print? WhatsApp us at{' '}
              <a href="https://wa.me/254712345678" target="_blank" rel="noreferrer" className="underline text-[#008000] font-bold">
                +254 712 345 678
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Retention and Care Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div className="bg-[#F4F4F0] p-6 rounded-xs space-y-3">
          <h3 className="text-sm font-bold text-neutral-900">Keep your essentials close.</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Create an account to track orders, save your favorites and make next time even easier.
          </p>
          <Link
            href="/account"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-black underline underline-offset-4"
          >
            Track in Account <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="bg-[#F4F4F0] p-6 rounded-xs space-y-3">
          <h3 className="text-sm font-bold text-neutral-900">Made to stay in rotation.</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Wash cold, hang dry. Need a size adjustment? We offer 7-day exchanges across Nairobi and Kenya.
          </p>
          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-black">
            <Link href="#" className="flex items-center gap-1 hover:underline">
              Care guide <ArrowUpRight size={14} />
            </Link>
            <Link href="#" className="flex items-center gap-1 hover:underline">
              Returns &amp; exchanges <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Back to the good stuff Button */}
      <div className="text-center pt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-theme hover:bg-theme-hover text-white font-bold text-xs uppercase tracking-wider py-4 px-10 rounded-xl transition-all shadow-md active:scale-95"
        >
          <span>Back to the good stuff</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-xs font-mono">Loading order...</div>}>
      <OrderConfirmedContent />
    </Suspense>
  );
}

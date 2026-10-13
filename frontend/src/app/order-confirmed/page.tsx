'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Check, ArrowRight, ArrowUpRight } from 'lucide-react';
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
        // Fallback default order matching the user's design reference
        setOrder({
          id: 10482,
          order_number: orderNumber,
          email: 'alex.morgan@email.com',
          first_name: 'Alex',
          last_name: 'Morgan',
          address: '128 Sunset Avenue',
          apartment: 'Apartment 4B',
          city: 'Los Angeles',
          state: 'CA',
          zip_code: '90026',
          country: 'United States',
          phone: '+1 (213) 555-0142',
          shipping_method: 'Standard shipping',
          shipping_cost: 0,
          subtotal: 126.0,
          tax: 10.08,
          total: 136.08,
          currency: 'USD',
          payment_method: 'Visa',
          card_last_four: '4242',
          status: 'confirmed',
          status_display: 'Order confirmed',
          order_note: '',
          estimated_arrival: 'October 19–21, 2026',
          created_at: 'October 13, 2026',
          items: [
            {
              id: 1,
              product_name: 'The Heavyweight Hoodie',
              color: 'Ash',
              size: 'M',
              price: 88.0,
              quantity: 1,
              image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80',
            },
            {
              id: 2,
              product_name: 'The Afriqan Signature Cap',
              color: 'Ink',
              size: 'ONE SIZE',
              price: 38.0,
              quantity: 1,
              image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80',
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Top Confirmed Greeting matching screenshot 1 */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D2DB6B] flex items-center justify-center text-black">
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
          Your everyday just got better. A confirmation has been sent to <span className="font-semibold text-black">{order.email}</span>.
        </p>
      </div>

      {/* Estimated Arrival Banner Card in soft Citron tint */}
      <div className="bg-[#EBF1A8]/45 border border-[#DEE690] p-6 rounded-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4DC7E] pb-4">
          <div>
            <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-600 block">
              ESTIMATED ARRIVAL
            </span>
            <span className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
              {order.estimated_arrival}
            </span>
          </div>
          <Link
            href={`/order-confirmed?order_number=${order.order_number}`}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-black hover:underline"
          >
            View order status <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* 4 Steps timeline: Order confirmed -> Getting it ready -> On the way -> At your door */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-neutral-900 flex items-center gap-1">
              <span>✓ Order confirmed</span>
            </div>
            <div className="text-[11px] text-neutral-600">October 13, 2026</div>
          </div>

          <div className="space-y-1">
            <div className="font-semibold text-neutral-800">Getting it ready</div>
            <div className="text-[11px] text-neutral-600">Ships in 1–2 business days</div>
          </div>

          <div className="space-y-1">
            <div className="font-semibold text-neutral-800">On the way</div>
            <div className="text-[11px] text-neutral-600">Tracking sent by email</div>
          </div>

          <div className="space-y-1">
            <div className="font-semibold text-neutral-800">At your door</div>
            <div className="text-[11px] text-neutral-600">Enjoy your new essentials</div>
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
            {order.items.map((it) => (
              <div key={it.id} className="py-4 flex gap-4 items-center">
                <div className="relative w-16 h-20 bg-[#ECECE9] rounded-xs overflow-hidden shrink-0">
                  <Image src={it.image_url} alt={it.product_name} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xs font-bold text-neutral-900">{it.product_name}</h3>
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

          <div className="border-t border-[#EBEBE8] pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal ({order.items.length} items)</span>
              <span className="font-semibold text-neutral-900">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Standard shipping</span>
              <span className="font-semibold text-neutral-900">
                {order.shipping_cost === 0 ? 'Free' : `$${order.shipping_cost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Tax</span>
              <span className="font-semibold text-neutral-900">${order.tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-[#EBEBE8] pt-3 flex justify-between items-baseline">
              <span className="text-sm font-bold text-neutral-900">Total · USD</span>
              <span className="text-2xl font-black text-neutral-900">${order.total.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-neutral-400">
              Paid on October 13, 2026 · Visa ending in {order.card_last_four}
            </p>
          </div>
        </div>

        {/* Right Column: Shipping To & Payment (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#F8F8F5] border border-[#EBEBE8] p-6 rounded-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Shipping to
            </h3>
            <div className="text-xs text-neutral-700 leading-relaxed space-y-0.5">
              <p className="font-bold text-black">{order.first_name} {order.last_name}</p>
              <p>{order.address}</p>
              {order.apartment && <p>{order.apartment}</p>}
              <p>{order.city}, {order.state} {order.zip_code}</p>
              <p>{order.country}</p>
              <p className="pt-2 text-neutral-500 font-mono">{order.phone}</p>
            </div>

            <div className="pt-4 border-t border-[#EBEBE8] space-y-1 text-xs">
              <div className="font-bold text-black">Standard shipping · Free</div>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                3–5 business days after dispatch. We&apos;ll send your tracking link as soon as it&apos;s on the way.
              </p>
            </div>

            <div className="pt-4 border-t border-[#EBEBE8] space-y-1 text-xs">
              <div className="font-bold text-black">Payment</div>
              <p className="text-[11px] text-neutral-600">
                Visa ending in {order.card_last_four} · ${order.total.toFixed(2)}
              </p>
              <p className="text-[11px] text-neutral-500">Billing address same as shipping</p>
            </div>

            <div className="pt-4 border-t border-[#EBEBE8] text-[11px] text-neutral-500">
              Need to change something? Contact us before dispatch at{' '}
              <a href="mailto:hello@afriqan.studio" className="underline text-black font-semibold">
                hello@afriqan.studio
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
            Create an account <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="bg-[#F4F4F0] p-6 rounded-xs space-y-3">
          <h3 className="text-sm font-bold text-neutral-900">Made to stay in rotation.</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Wash cold, wear often. Not quite your fit? You have 30 days after delivery to return unworn items.
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

      {/* Back to the good stuff Button in signature Citron color */}
      <div className="text-center pt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-[#D2DB6B] hover:bg-[#C2CB5E] text-black font-bold text-xs uppercase tracking-wider py-4 px-10 rounded-xs transition-colors shadow-xs"
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


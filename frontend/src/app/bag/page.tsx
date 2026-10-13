'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { fetchProducts } from '@/lib/api';
import { ProductListItem } from '@/types';
import ProductCard from '@/components/ProductCard';

export default function BagPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
    orderNote,
    setOrderNote,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [recommendations, setRecommendations] = useState<ProductListItem[]>([]);

  React.useEffect(() => {
    fetchProducts().then((data) => {
      setRecommendations(data.slice(0, 4));
    });
  }, []);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) {
      setPromoApplied(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Banner if qualified for shipping */}
      {subtotal >= 100 && (
        <div className="bg-[#E9F3A1]/50 border border-[#D5E473] text-black px-4 py-2.5 rounded-xs text-xs font-medium mb-8 flex items-center justify-between">
          <span>You&apos;ve unlocked free US shipping. Your essentials are ready for a new home.</span>
        </div>
      )}

      {/* Title Bar */}
      <div className="flex items-center justify-between border-b border-[#EBEBE8] pb-6 mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Your bag.
        </h1>
        <Link
          href="/"
          className="text-xs font-semibold text-neutral-600 hover:text-black transition-colors"
        >
          ← Continue shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center space-y-4">
          <p className="text-neutral-500 text-sm">Your shopping bag is currently empty.</p>
          <Link
            href="/"
            className="inline-block bg-black text-white text-xs uppercase tracking-wider font-bold py-3 px-8 rounded-xs"
          >
            Discover Essentials
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between text-xs text-neutral-400 font-mono uppercase pb-2 border-b border-[#EBEBE8]">
              <span>{itemCount} ITEMS</span>
              <span>PRICE</span>
            </div>

            <div className="divide-y divide-[#EBEBE8]">
              {items.map((item) => (
                <div key={item.id} className="py-6 flex gap-4 sm:gap-6">
                  {/* Thumbnail */}
                  <div className="relative w-24 h-28 sm:w-28 sm:h-32 bg-[#ECECE9] rounded-xs overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <Link href={`/products/${item.slug}`}>
                          <h3 className="text-sm font-bold text-neutral-900 hover:underline">
                            {item.name}
                          </h3>
                        </Link>
                        <span className="text-sm font-semibold text-neutral-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {item.color} / Size {item.size}
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        In stock · Ready to ship
                      </p>
                    </div>

                    {/* Quantity and Actions */}
                    <div className="flex items-center justify-between pt-4">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#D5D5CF] bg-white rounded-xs">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2.5 py-1 text-xs text-neutral-600 hover:text-black cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2.5 py-1 text-xs text-neutral-600 hover:text-black cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-neutral-500">
                        <button className="hover:text-black cursor-pointer">Save for later</button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="hover:text-black cursor-pointer underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add an order note */}
            <div className="pt-4 border-t border-[#EBEBE8] space-y-2">
              <label htmlFor="order-note-input" className="text-xs font-semibold text-neutral-800">
                Add an order note (optional)
              </label>
              <textarea
                id="order-note-input"
                rows={2}
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="Anything we should know?"
                className="w-full text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Order Summary Box (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F8F8F5] border border-[#EBEBE8] p-6 rounded-xs space-y-5">
              <h2 className="text-base font-bold text-neutral-900 border-b border-[#EBEBE8] pb-4">
                Order summary
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-semibold text-neutral-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Standard shipping</span>
                  <span className="font-semibold text-neutral-900">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Estimated tax</span>
                  <span className="font-semibold text-neutral-900">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-[#EBEBE8] pt-3 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-neutral-900">Total · USD</span>
                  </div>
                  <span className="text-xl font-extrabold text-neutral-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Tax estimated for California. Final amount confirmed at checkout.
                </p>
              </div>

              {/* Discount Code */}
              <form onSubmit={handleApplyPromo} className="pt-2 flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Discount code"
                  className="flex-grow text-xs px-3 py-2 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-semibold px-4 py-2 rounded-xs"
                >
                  Apply
                </button>
              </form>
              {promoApplied && (
                <p className="text-xs text-emerald-600 font-medium">
                  Code &apos;{promoCode}&apos; applied.
                </p>
              )}

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="w-full bg-[#D2DB6B] hover:bg-[#C2CB5E] text-black font-bold text-xs uppercase tracking-wider py-4 rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.99]"
              >
                <span>Checkout</span>
                <ArrowRight size={16} />
              </Link>

              {/* Encrypted payment badge */}
              <div className="text-center pt-2 space-y-2">
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
                  <Lock size={12} />
                  <span>Secure checkout · Encrypted payments</span>
                </div>
                <div className="flex justify-center items-center gap-3 text-xs font-semibold text-neutral-400">
                  <span>VISA</span>
                  <span>Mastercard</span>
                  <span>Apple Pay</span>
                  <span>PayPal</span>
                </div>
              </div>
            </div>

            {/* The details sorted info */}
            <div className="p-4 bg-[#F2F2EE] border border-[#E6E6E1] rounded-xs space-y-1.5">
              <h4 className="text-xs font-bold text-neutral-900">The details, sorted.</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Standard delivery in 3–5 business days after dispatch. Returns within 30 days. Questions? hello@afriqan.studio
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Room for one more? Cross-sell Carousel */}
      <section className="mt-24 pt-12 border-t border-[#EBEBE8]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Room for one more?
          </h2>
          <Link
            href="/"
            className="flex items-center gap-1 text-xs font-semibold text-black hover:underline"
          >
            Shop all essentials <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
}

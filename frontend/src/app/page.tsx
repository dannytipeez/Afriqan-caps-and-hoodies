'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { fetchProducts } from '@/lib/api';
import { ProductListItem } from '@/types';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      {/* 1. OFFHOURS HERO: YOUR TIME. YOUR UNIFORM. */}
      <section className="relative min-h-[580px] sm:min-h-[720px] bg-[#EBEBE8] dark:bg-[#18191B] overflow-hidden flex items-end">
        {/* Background Editorial Model Photography */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1800&q=85"
            alt="Afriqan Core Collection - Relaxed Streetwear"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full flex flex-col justify-end text-white">
          <div className="max-w-xl space-y-5">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#D2DB6B]">
              CORE COLLECTION / VOL. 01
            </span>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[0.98]">
              Your time.<br />
              Your uniform.
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 font-normal max-w-md leading-relaxed">
              Everyday caps. Heavyweight hoodies.<br />
              Less to think about. More to live in.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="bg-[#D2DB6B] hover:bg-[#C2CB5E] text-black font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-xs transition-colors shadow-sm"
              >
                Shop the collection
              </Link>
              <Link
                href="/shop?category=hoodies"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-xs border border-white/20 transition-colors"
              >
                Explore hoodies ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REASSURANCE STRIP IN SIGNATURE CITRON */}
      <section className="bg-[#D2DB6B] text-black py-4 px-4 sm:px-8 border-y border-[#C2CB5E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm font-semibold gap-3 tracking-tight">
          <div>✓ Free Kenya delivery on orders KES 5,000+</div>
          <div>↺ 7-day easy exchanges</div>
          <div>⚖ Heavyweight 460 GSM Everyday Cotton</div>
          <div>★ Unisex by design</div>
        </div>
      </section>

      {/* 3. TWO ESSENTIALS. ENDLESS POSSIBILITIES. */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
            THE DAILY ROTATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
            Two essentials. Endless possibilities.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Essential 1: Caps */}
          <Link href="/shop?category=caps" className="group block space-y-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECECE9] dark:bg-[#1E1F21] rounded-xs">
              <Image
                src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80"
                alt="Afriqan Street Caps"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Caps</h3>
                <p className="text-xs text-neutral-500">Your everyday starting point. From KES 1,500.</p>
              </div>
              <span className="text-lg font-light text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors">↗</span>
            </div>
          </Link>

          {/* Essential 2: Hoodies */}
          <Link href="/shop?category=hoodies" className="group block space-y-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECECE9] dark:bg-[#1E1F21] rounded-xs">
              <Image
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80"
                alt="Afriqan Heavyweight Hoodies"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Hoodies</h3>
                <p className="text-xs text-neutral-500">A little weight. A lot of comfort. From KES 3,500.</p>
              </div>
              <span className="text-lg font-light text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors">↗</span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. ON REPEAT, FOR A REASON (THE FAVORITES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-[#EBEBE8] dark:border-[#27282B]">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
              ON REPEAT, FOR A REASON
            </span>
            <h2 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
              The favorites.
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-1 text-xs font-semibold text-black dark:text-white hover:underline"
          >
            Shop all essentials <ArrowUpRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="py-20 text-center text-xs text-neutral-400 font-mono uppercase tracking-widest animate-pulse">
            Loading favorites...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* 5. FEEL THE DIFFERENCE (NOTHING EXTRA. NOTHING ORDINARY.) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F4F4F0] dark:bg-[#161718] p-8 sm:p-14 rounded-xs border border-[#E6E6E1] dark:border-[#27282B]">
          <div className="lg:col-span-6 relative aspect-square rounded-xs overflow-hidden bg-neutral-200">
            <Image
              src="https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80"
              alt="460 GSM Heavyweight Brushed Cotton Fabric Texture"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
              FEEL THE DIFFERENCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight">
              Nothing extra.<br />
              Nothing ordinary.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
              Substantial cotton. Considered proportions. The kind of quality you notice every time you put it on. Pre-shrunk for a consistent fit.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#E5E5DE] dark:border-[#27282B]">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100">100%</div>
                <div className="text-[10px] uppercase font-mono text-neutral-500 mt-1">Cotton Twill</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100">460</div>
                <div className="text-[10px] uppercase font-mono text-neutral-500 mt-1">GSM Fleece</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100">+500</div>
                <div className="text-[10px] uppercase font-mono text-neutral-500 mt-1">Custom Print</div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1 text-xs font-bold text-black dark:text-white uppercase tracking-wider underline underline-offset-4"
              >
                Meet your new everyday <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED REVIEWS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-[#EBEBE8] dark:border-[#27282B]">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
              REAL PEOPLE. REAL ROTATION.
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
              Already on repeat.
            </h2>
          </div>
          <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            4.9 / 5 from 284 reviews ↗
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#FBFBF9] dark:bg-[#161718] border border-[#EBEBE8] dark:border-[#27282B] rounded-xs space-y-3">
            <div className="text-black dark:text-[#D2DB6B] text-xs">★★★★★</div>
            <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed italic">
              &ldquo;Finally, a hoodie with the right weight. It holds its shape, and the fit is exactly what I wanted.&rdquo;
            </p>
            <div className="pt-2 text-[11px] text-neutral-500">
              Jordan M. · Verified buyer ✓<br />
              <span className="text-neutral-400">Heavyweight Hoodie / Ash</span>
            </div>
          </div>

          <div className="p-6 bg-[#FBFBF9] dark:bg-[#161718] border border-[#EBEBE8] dark:border-[#27282B] rounded-xs space-y-3">
            <div className="text-black dark:text-[#D2DB6B] text-xs">★★★★★</div>
            <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed italic">
              &ldquo;The cap I reach for first. Great structure, perfect curve. Fast delivery to Westlands.&rdquo;
            </p>
            <div className="pt-2 text-[11px] text-neutral-500">
              Alex M. · Verified buyer ✓<br />
              <span className="text-neutral-400">Afriqan Signature Cap / Ink</span>
            </div>
          </div>

          <div className="p-6 bg-[#FBFBF9] dark:bg-[#161718] border border-[#EBEBE8] dark:border-[#27282B] rounded-xs space-y-3">
            <div className="text-black dark:text-[#D2DB6B] text-xs">★★★★★</div>
            <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed italic">
              &ldquo;Simple done really, really well. Soft from day one and even better after a few washes.&rdquo;
            </p>
            <div className="pt-2 text-[11px] text-neutral-500">
              Sam R. · Verified buyer ✓<br />
              <span className="text-neutral-400">The Savannah Hoodie / Citron</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER BAR IN CITRON (GOOD THINGS. NO NOISE.) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#D2DB6B] text-black p-8 sm:p-12 rounded-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Good things. No noise.</h3>
            <p className="text-xs text-neutral-800">
              Get KES 500 off your first order. New drops and essentials, only when it matters.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              required
              placeholder="Your email address"
              className="px-4 py-3 text-xs bg-white text-black rounded-xs focus:outline-none min-w-[240px]"
            />
            <button
              type="submit"
              className="bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xs whitespace-nowrap transition-colors"
            >
              Sign me up →
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
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

  const featuredCollections = [
    {
      title: 'Tee Pants Series',
      subtitle: 'Relaxed Silhouette',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
      link: '/shop?category=hoodies',
    },
    {
      title: 'Top Shirt Series',
      subtitle: 'Nairobi Street Layer',
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
      link: '/shop?category=hoodies',
    },
    {
      title: 'Full Set Series',
      subtitle: 'Signature 460 GSM Fleece',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      link: '/shop?category=hoodies',
      spanTwo: true,
    },
    {
      title: 'Winter Collection',
      subtitle: 'Heavyweight Ribbed Edition',
      image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
      link: '/shop?category=hoodies',
    },
    {
      title: 'Top Pants Series',
      subtitle: 'Earth Tone Rotation',
      image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=800&q=80',
      link: '/shop?category=caps',
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-24 pb-16">
      {/* 1. HERO BENTO SECTION MATCHING USER INSPIRATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Hero Left Card (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#141124] rounded-3xl p-8 sm:p-12 flex flex-col justify-between border border-[#E9E5F5] dark:border-[#2A2344] shadow-xs">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 text-[11px] font-black uppercase tracking-wider rounded-full border border-purple-200 dark:border-purple-800">
                <Sparkles size={12} className="text-[#7C3AED]" /> New Season · Nairobi Streetwear
              </span>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0F0E17] dark:text-[#FAF8FF] leading-[1.05]">
                Unleash Your Style <br className="hidden sm:inline" />
                Shop the Latest Trends
              </h1>
              <p className="text-sm text-[#5B586E] dark:text-[#B6B0D1] max-w-md leading-relaxed">
                Discover the latest street essentials in exploration of daily aesthetics. Shop exclusive Kenyan 460 GSM heavyweight hoodies, custom printing, and structured caps designed for you.
              </p>
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-full transition-all shadow-md active:scale-95"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Social proof badge */}
            <div className="pt-10 sm:pt-14 flex items-center gap-4 border-t border-[#E9E5F5] dark:border-[#2A2344] mt-8">
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full bg-purple-200 text-purple-900 border-2 border-white dark:border-[#141124] flex items-center justify-center text-[10px] font-bold">JM</div>
                <div className="w-9 h-9 rounded-full bg-purple-400 text-white border-2 border-white dark:border-[#141124] flex items-center justify-center text-[10px] font-bold">AO</div>
                <div className="w-9 h-9 rounded-full bg-[#581C87] text-white border-2 border-white dark:border-[#141124] flex items-center justify-center text-[10px] font-bold">KK</div>
              </div>
              <div>
                <div className="text-sm font-black text-[#0F0E17] dark:text-[#FAF8FF]">25,000+ Happy Kenyans</div>
                <p className="text-[11px] text-[#5B586E] dark:text-[#B6B0D1]">Over 25,000 customers in Kenya trust our quality, style, and fast delivery.</p>
              </div>
            </div>
          </div>

          {/* Hero Right Main Model Image (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[380px] sm:min-h-[460px] bg-purple-100/40 dark:bg-purple-950/30 rounded-3xl overflow-hidden border border-[#E9E5F5] dark:border-[#2A2344] group">
            <Image
              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80"
              alt="Model wearing Nairobi streetwear outfit"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-8">
              <div className="text-white space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-purple-300">CORE LOOKBOOK</span>
                <h3 className="text-xl font-bold">The Nairobi Oversized Silhouette</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Secondary 3-Card Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-5 sm:mt-6">
          <div className="relative h-44 rounded-2xl overflow-hidden bg-neutral-200 border border-[#E9E5F5] dark:border-[#2A2344]">
            <Image
              src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80"
              alt="Heavyweight cotton textured weave"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/35 flex items-end p-5">
              <span className="text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                460 GSM Looped Fleece
              </span>
            </div>
          </div>

          <div className="relative h-44 rounded-2xl overflow-hidden bg-neutral-200 border border-[#E9E5F5] dark:border-[#2A2344]">
            <Image
              src="https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80"
              alt="Collection rack in Nairobi showroom"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/35 flex items-end p-5">
              <span className="text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                Custom Printing Station
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#141124] rounded-2xl p-6 border border-[#E9E5F5] dark:border-[#2A2344] flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-purple-600 dark:text-purple-400 font-bold">LOOKBOOK</span>
              <h3 className="text-lg font-black text-[#0F0E17] dark:text-[#FAF8FF] mt-1 leading-snug">
                Models wearing full outfits
              </h3>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold py-2.5 px-5 rounded-full transition-colors w-fit mt-4 shadow-xs"
            >
              <span>Explore Look</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. LOGO MARQUEE / SPONSOR STRIP */}
      <section className="border-y border-[#E9E5F5] dark:border-[#2A2344] py-8 bg-purple-50/40 dark:bg-[#100D1C]">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-around gap-8 text-[#5B586E] dark:text-[#B6B0D1] font-black tracking-widest text-xs uppercase">
          <div className="flex items-center gap-2">
            <span className="text-lg font-serif text-[#7C3AED]">GRAPHIC</span> STUDIO
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-mono text-[#7C3AED]">S. SALVA</span> ARCHIVE
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg text-[#7C3AED]">KILIMANI</span> GOODS
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-serif text-[#7C3AED]">NAIROBI</span> DESIGN
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg text-[#7C3AED]">STREET</span> COMMERCE
          </div>
        </div>
      </section>

      {/* 3. OUR CATEGORY LIST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F0E17] dark:text-[#FAF8FF] tracking-tight">
            Our Category List
          </h2>
          <p className="text-xs text-[#5B586E] dark:text-[#B6B0D1] mt-1">
            Curated essentials tailored for clean urban rotations in Nairobi and across Kenya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category 1: Hoodies Collection */}
          <Link
            href="/shop?category=hoodies"
            className="group relative h-96 rounded-2xl overflow-hidden bg-neutral-100 border border-[#E9E5F5] dark:border-[#2A2344] shadow-xs"
          >
            <Image
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
              alt="Hoodies Collection"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
              <h3 className="text-xl font-black">Hoodies Collection</h3>
              <p className="text-xs text-neutral-300 mt-0.5">3 Items · 460 GSM Heavyweight Fleece</p>
            </div>
          </Link>

          {/* Category 2: Caps Collection */}
          <Link
            href="/shop?category=caps"
            className="group relative h-96 rounded-2xl overflow-hidden bg-neutral-100 border border-[#E9E5F5] dark:border-[#2A2344] shadow-xs"
          >
            <Image
              src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80"
              alt="Caps Collection"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
              <h3 className="text-xl font-black">Caps Collection</h3>
              <p className="text-xs text-neutral-300 mt-0.5">3 Items · Structured 6-Panel Twill</p>
            </div>
          </Link>

          {/* Category 3: Custom Print Studio */}
          <Link
            href="/shop"
            className="group relative h-96 rounded-2xl overflow-hidden bg-neutral-100 border border-[#E9E5F5] dark:border-[#2A2344] shadow-xs"
          >
            <Image
              src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80"
              alt="Custom Printing Studio"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
              <div className="inline-flex items-center gap-1 bg-[#7C3AED] text-white px-2.5 py-0.5 rounded-full text-[10px] font-black w-fit mb-1.5 shadow-sm">
                <Sparkles size={11} /> ADD-ON
              </div>
              <h3 className="text-xl font-black">Custom Print Add-On</h3>
              <p className="text-xs text-neutral-300 mt-0.5">KES 500 per placement on plain hoodies</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. OUR PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1.5">
          <h2 className="text-3xl font-black text-[#0F0E17] dark:text-[#FAF8FF] tracking-tight">
            Our Products
          </h2>
          <p className="text-xs text-[#5B586E] dark:text-[#B6B0D1]">
            Recently added streetwear stock. Heavyweight cotton &amp; structured caps.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-xs text-purple-600 font-mono uppercase tracking-widest animate-pulse">
            Loading collection...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs uppercase tracking-wider py-4 px-10 rounded-full transition-all shadow-md active:scale-95"
          >
            <span>View All Essentials</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 5. PROMO HERO BANNER: GET 30% OFF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 via-purple-950 to-[#141124] border border-purple-800/50 p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-lg">
          <div className="space-y-4 max-w-md text-center md:text-left">
            <span className="text-[10px] font-black tracking-widest uppercase bg-purple-500/20 text-purple-200 border border-purple-400/30 px-3 py-1 rounded-full">
              LIMITED DROP
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Get Up to 30% Off
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
              For all new hoodie &amp; cap bundle purchases in Kenya. Free delivery included for orders above KES 5,000.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white hover:bg-purple-50 text-purple-950 font-black text-xs uppercase tracking-wider py-3.5 px-8 rounded-full transition-colors shadow-sm"
              >
                <span>Shop Drop</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="relative w-full md:w-1/2 h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
              alt="Afriqan Hoodies and Caps Drop"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. OUR FEATURED COLLECTIONS (BENTO GRID WITH CIRCLE ARROW BUTTONS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1.5">
          <h2 className="text-3xl font-black text-[#0F0E17] dark:text-[#FAF8FF] tracking-tight">
            Our Featured Collections
          </h2>
          <p className="text-xs text-[#5B586E] dark:text-[#B6B0D1]">
            Recently added streetwear collections and limited edition capsule drops.
          </p>
        </div>

        {/* 5-Card Bento Grid Matching User's Image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Top Left */}
          <Link
            href={featuredCollections[0].link}
            className="group relative h-80 rounded-2xl overflow-hidden bg-neutral-200 border border-[#E9E5F5] dark:border-[#2A2344] shadow-xs"
          >
            <Image
              src={featuredCollections[0].image}
              alt={featuredCollections[0].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-6 text-white">
              <div>
                <h3 className="text-base font-bold">{featuredCollections[0].title}</h3>
                <p className="text-[11px] text-neutral-300">{featuredCollections[0].subtitle}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/95 text-purple-900 flex items-center justify-center group-hover:bg-[#7C3AED] group-hover:text-white transition-all shadow-md shrink-0">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </Link>

          {/* Card 3: Middle Tall Card */}
          <Link
            href={featuredCollections[2].link}
            className="group relative h-80 md:h-auto md:row-span-2 rounded-2xl overflow-hidden bg-neutral-200 border border-[#E9E5F5] dark:border-[#2A2344] shadow-xs"
          >
            <Image
              src={featuredCollections[2].image}
              alt={featuredCollections[2].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-6 text-white">
              <div>
                <span className="text-[10px] font-black tracking-widest text-purple-300 uppercase bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">BESTSELLER</span>
                <h3 className="text-lg font-black mt-1">{featuredCollections[2].title}</h3>
                <p className="text-[11px] text-neutral-300">{featuredCollections[2].subtitle}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/95 text-purple-900 flex items-center justify-center group-hover:bg-[#7C3AED] group-hover:text-white transition-all shadow-md shrink-0">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </Link>

          {/* Card 4: Top Right */}
          <Link
            href={featuredCollections[3].link}
            className="group relative h-80 rounded-2xl overflow-hidden bg-neutral-200 border border-[#E9E5F5] dark:border-[#2A2344] shadow-xs"
          >
            <Image
              src={featuredCollections[3].image}
              alt={featuredCollections[3].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-6 text-white">
              <div>
                <h3 className="text-base font-bold">{featuredCollections[3].title}</h3>
                <p className="text-[11px] text-neutral-300">{featuredCollections[3].subtitle}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/95 text-purple-900 flex items-center justify-center group-hover:bg-[#7C3AED] group-hover:text-white transition-all shadow-md shrink-0">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </Link>

          {/* Card 2: Bottom Left */}
          <Link
            href={featuredCollections[1].link}
            className="group relative h-80 rounded-2xl overflow-hidden bg-neutral-200 border border-[#E9E5F5] dark:border-[#2A2344] shadow-xs"
          >
            <Image
              src={featuredCollections[1].image}
              alt={featuredCollections[1].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-6 text-white">
              <div>
                <h3 className="text-base font-bold">{featuredCollections[1].title}</h3>
                <p className="text-[11px] text-neutral-300">{featuredCollections[1].subtitle}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/95 text-purple-900 flex items-center justify-center group-hover:bg-[#7C3AED] group-hover:text-white transition-all shadow-md shrink-0">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </Link>

          {/* Card 5: Bottom Right */}
          <Link
            href={featuredCollections[4].link}
            className="group relative h-80 rounded-2xl overflow-hidden bg-neutral-200 border border-[#E9E5F5] dark:border-[#2A2344] shadow-xs"
          >
            <Image
              src={featuredCollections[4].image}
              alt={featuredCollections[4].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-6 text-white">
              <div>
                <h3 className="text-base font-bold">{featuredCollections[4].title}</h3>
                <p className="text-[11px] text-neutral-300">{featuredCollections[4].subtitle}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/95 text-purple-900 flex items-center justify-center group-hover:bg-[#7C3AED] group-hover:text-white transition-all shadow-md shrink-0">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 7. VALUE PROPOSITIONS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 bg-white dark:bg-[#141124] rounded-2xl border border-[#E9E5F5] dark:border-[#2A2344] shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-[#7C3AED] flex items-center justify-center shadow-xs shrink-0">
              <Truck size={22} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0F0E17] dark:text-[#FAF8FF]">Swift Kenya Delivery</h4>
              <p className="text-xs text-[#5B586E] dark:text-[#B6B0D1]">Same-day rider in Nairobi, Wells Fargo upcountry.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-[#008000] flex items-center justify-center shadow-xs shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0F0E17] dark:text-[#FAF8FF]">Lipa na M-PESA &amp; COD</h4>
              <p className="text-xs text-[#5B586E] dark:text-[#B6B0D1]">Till 4466556 or pay rider cash on delivery.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-[#7C3AED] flex items-center justify-center shadow-xs shrink-0">
              <RefreshCw size={22} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0F0E17] dark:text-[#FAF8FF]">Custom Printing Add-On</h4>
              <p className="text-xs text-[#5B586E] dark:text-[#B6B0D1]">Add custom text or branding for KES 500.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

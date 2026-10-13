'use client';

import React from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-[#EBEBE8]">
      {/* Top Banner */}
      <div className="bg-[#121212] text-white text-[11px] tracking-wider font-medium text-center py-2 px-4 uppercase">
        GOOD THINGS TAKE NO EFFORT. FREE US SHIPPING ON ORDERS $100+
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl sm:text-2xl font-black tracking-tight uppercase hover:opacity-80 transition-opacity">
            AFRIQAN<span className="text-[10px] align-top ml-0.5 font-normal">®</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-neutral-800">
            <Link href="/" className="hover:text-black transition-colors">
              Shop all
            </Link>
            <Link href="/?category=caps" className="hover:text-black transition-colors">
              Caps
            </Link>
            <Link href="/?category=hoodies" className="hover:text-black transition-colors">
              Hoodies
            </Link>
            <Link href="/our-story" className="text-neutral-500 hover:text-black transition-colors">
              Our story
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5 text-neutral-800">
          <button aria-label="Search" className="hover:text-black transition-colors cursor-pointer">
            <Search size={18} strokeWidth={2} />
          </button>
          <Link href="/account" aria-label="Account" className="hover:text-black transition-colors">
            <User size={18} strokeWidth={2} />
          </Link>
          <Link
            href="/bag"
            aria-label="Shopping Bag"
            className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider hover:text-black transition-colors"
          >
            <span>Bag</span>
            <span className="text-neutral-600">({itemCount})</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

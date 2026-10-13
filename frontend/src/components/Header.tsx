'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, User, Sun, Moon, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { itemCount, cartMessage } = useCart();
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const isDarkSaved = localStorage.getItem('afriqan_theme') === 'dark';
    if (isDarkSaved) {
      document.body.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const willBeDark = !isDark;
    setIsDark(willBeDark);
    if (willBeDark) {
      document.body.classList.add('dark');
      localStorage.setItem('afriqan_theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('afriqan_theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FBFBF9]/95 dark:bg-[#0F1011]/95 backdrop-blur-md border-b border-[#EBEBE8] dark:border-[#27282B] transition-colors">
      {/* Top Banner */}
      <div className="bg-[#121212] dark:bg-black text-white text-[11px] tracking-wider font-medium text-center py-2 px-4 uppercase">
        GOOD THINGS TAKE NO EFFORT. FREE KENYA DELIVERY ON ORDERS KES 5,000+
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl sm:text-2xl font-black tracking-tight uppercase hover:opacity-80 transition-opacity">
            AFRIQAN<span className="text-[10px] align-top ml-0.5 font-normal">®</span>
          </Link>

          {/* Clean Minimalist Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
              Shop all
            </Link>
            <Link href="/shop?category=caps" className="hover:text-black dark:hover:text-white transition-colors">
              Caps
            </Link>
            <Link href="/shop?category=hoodies" className="hover:text-black dark:hover:text-white transition-colors">
              Hoodies
            </Link>
            <Link href="/our-story" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
              Our story
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5 text-neutral-800 dark:text-neutral-200">
          {/* Minimal Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            title="Toggle Light / Dark mode"
          >
            {isDark ? <Sun size={17} strokeWidth={2} /> : <Moon size={17} strokeWidth={2} />}
          </button>

          <Link href="/shop" aria-label="Search" className="hover:text-black dark:hover:text-white transition-colors cursor-pointer">
            <Search size={18} strokeWidth={2} />
          </Link>

          <Link href="/account" aria-label="Account" className="hover:text-black dark:hover:text-white transition-colors">
            <User size={18} strokeWidth={2} />
          </Link>

          {/* Cart Icon & Flying Destination Target */}
          <Link
            href="/bag"
            aria-label="Shopping Bag"
            className="cart-target-icon relative flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider hover:text-black dark:hover:text-white transition-colors"
          >
            <span>Bag</span>
            <span className="cart-badge-count text-neutral-600 dark:text-neutral-400 font-semibold">
              ({itemCount})
            </span>

            {/* Quick pop toast message */}
            {cartMessage && (
              <span className="absolute -bottom-8 right-0 bg-black text-[#D2DB6B] text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-md pointer-events-none animate-bounce">
                {cartMessage}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

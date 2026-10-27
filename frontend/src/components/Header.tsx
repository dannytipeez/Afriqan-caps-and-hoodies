'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, User, Sun, Moon, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

export default function Header() {
  const { itemCount, cartMessage } = useCart();
  const { favoritesCount } = useFavorites();
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
    <header className="sticky top-0 z-50 bg-[#FAF8FF]/95 dark:bg-[#0B0914]/95 backdrop-blur-md border-b border-[#E9E5F5] dark:border-[#2A2344] transition-colors">
      {/* Top Banner - Royal Purple Accent */}
      <div className="bg-gradient-to-r from-[#3B0764] via-[#581C87] to-[#7C3AED] text-white text-[11px] tracking-wider font-semibold text-center py-2 px-4 uppercase shadow-inner">
        KENYAN STREETWEAR ESSENTIALS · FREE NAIROBI & NATIONWIDE DELIVERY OVER KES 5,000 · LIPA NA M-PESA
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl sm:text-2xl font-black tracking-tight uppercase hover:text-[#7C3AED] dark:hover:text-[#A78BFA] transition-colors">
            AFRIQAN<span className="text-[10px] align-top ml-0.5 font-normal text-purple-600 dark:text-purple-400">®</span>
          </Link>

          {/* Clean Minimalist Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-[#0F0E17] dark:text-[#FAF8FF]">
            <Link href="/" className="hover:text-[#7C3AED] dark:hover:text-[#A78BFA] transition-colors">
              Shop all
            </Link>
            <Link href="/shop?category=caps" className="hover:text-[#7C3AED] dark:hover:text-[#A78BFA] transition-colors">
              Caps
            </Link>
            <Link href="/shop?category=hoodies" className="hover:text-[#7C3AED] dark:hover:text-[#A78BFA] transition-colors">
              Hoodies
            </Link>
            <Link href="/our-story" className="text-[#5B586E] dark:text-[#B6B0D1] hover:text-[#7C3AED] dark:hover:text-[#A78BFA] transition-colors">
              Our story
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-5 text-[#0F0E17] dark:text-[#FAF8FF]">
          {/* Minimal Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1 text-[#5B586E] dark:text-[#B6B0D1] hover:text-[#7C3AED] dark:hover:text-[#A78BFA] transition-colors cursor-pointer"
            title="Toggle Light / Dark mode"
          >
            {isDark ? <Sun size={17} strokeWidth={2} /> : <Moon size={17} strokeWidth={2} />}
          </button>

          <Link
            href="/shop"
            aria-label="Search"
            className="p-1 text-[#5B586E] dark:text-[#B6B0D1] hover:text-[#7C3AED] dark:hover:text-[#A78BFA] transition-colors cursor-pointer"
          >
            <Search size={18} strokeWidth={2} />
          </Link>

          {/* Saved Favorites Link with Bouncing Heart Badge */}
          <Link
            href="/favorites"
            aria-label="Favorites"
            title="Saved Favorites"
            className="relative p-1 text-[#5B586E] dark:text-[#B6B0D1] hover:text-[#7C3AED] dark:hover:text-[#A78BFA] transition-colors cursor-pointer flex items-center"
          >
            <Heart
              size={18}
              strokeWidth={2}
              className={`transition-all ${
                favoritesCount > 0 ? 'fill-[#7C3AED] text-[#7C3AED] heart-animated' : ''
              }`}
            />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#7C3AED] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {favoritesCount}
              </span>
            )}
          </Link>

          <Link
            href="/account"
            aria-label="Account"
            className="p-1 text-[#5B586E] dark:text-[#B6B0D1] hover:text-[#7C3AED] dark:hover:text-[#A78BFA] transition-colors"
          >
            <User size={18} strokeWidth={2} />
          </Link>

          {/* Cart Icon & Flying Destination Target */}
          <Link
            href="/bag"
            aria-label="Shopping Bag"
            className="cart-target-icon relative flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-purple-100/70 dark:bg-purple-950/60 hover:bg-purple-200 dark:hover:bg-purple-900/60 text-purple-950 dark:text-purple-200 px-3 py-1.5 rounded-full transition-all border border-purple-200 dark:border-purple-800"
          >
            <ShoppingBag size={15} strokeWidth={2.2} />
            <span className="hidden sm:inline">Bag</span>
            <span className="cart-badge-count font-black text-purple-700 dark:text-purple-300">
              ({itemCount})
            </span>

            {/* Quick pop toast message */}
            {cartMessage && (
              <span className="absolute -bottom-9 right-0 bg-[#3B0764] text-white border border-[#7C3AED] text-[10px] font-black px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg pointer-events-none animate-bounce">
                {cartMessage}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

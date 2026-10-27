'use client';

import React from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import ThemeSelector from '@/components/ThemeSelector';

export default function Header() {
  const { itemCount, cartMessage } = useCart();
  const { favoritesCount } = useFavorites();

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border-color)] transition-colors">
      {/* Top Banner - Theme Accent Gradient */}
      <div className="bg-theme text-white text-[11px] tracking-wider font-bold text-center py-2 px-4 uppercase shadow-xs transition-colors">
        KENYAN STREETWEAR ESSENTIALS · FREE NAIROBI & NATIONWIDE DELIVERY OVER KES 5,000 · LIPA NA M-PESA
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-black tracking-tight uppercase hover:opacity-85 transition-opacity"
          >
            AFRIQAN
            <span className="text-[10px] align-top ml-0.5 font-bold text-theme">®</span>
          </Link>

          {/* Clean Minimalist Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            <Link href="/" className="hover:text-theme transition-colors">
              Shop all
            </Link>
            <Link href="/shop?category=caps" className="hover:text-theme transition-colors">
              Caps
            </Link>
            <Link href="/shop?category=hoodies" className="hover:text-theme transition-colors">
              Hoodies
            </Link>
            <Link
              href="/our-story"
              className="text-[var(--muted-text)] hover:text-theme transition-colors"
            >
              Our story
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3.5 sm:gap-5 text-[var(--foreground)]">
          {/* Theme Selector Popover Matching User Attachment */}
          <ThemeSelector />

          <Link
            href="/shop"
            aria-label="Search"
            className="p-1 text-[var(--muted-text)] hover:text-theme transition-colors cursor-pointer"
          >
            <Search size={18} strokeWidth={2} />
          </Link>

          {/* Saved Favorites Link with Bouncing Heart Badge */}
          <Link
            href="/favorites"
            aria-label="Favorites"
            title="Saved Favorites"
            className="relative p-1 text-[var(--muted-text)] hover:text-theme transition-colors cursor-pointer flex items-center"
          >
            <Heart
              size={18}
              strokeWidth={2}
              className={`transition-all ${
                favoritesCount > 0 ? 'fill-theme text-theme heart-animated' : ''
              }`}
            />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-theme text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {favoritesCount}
              </span>
            )}
          </Link>

          <Link
            href="/account"
            aria-label="Account"
            className="p-1 text-[var(--muted-text)] hover:text-theme transition-colors"
          >
            <User size={18} strokeWidth={2} />
          </Link>

          {/* Cart Icon & Flying Destination Target */}
          <Link
            href="/bag"
            aria-label="Shopping Bag"
            className="cart-target-icon relative flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-theme-light hover:opacity-90 text-theme px-3.5 py-1.5 rounded-full transition-all border border-theme/30 shadow-xs"
          >
            <ShoppingBag size={15} strokeWidth={2.2} />
            <span className="hidden sm:inline">Bag</span>
            <span className="cart-badge-count font-black text-theme">
              ({itemCount})
            </span>

            {/* Quick pop toast message */}
            {cartMessage && (
              <span className="absolute -bottom-9 right-0 bg-theme text-white text-[10px] font-black px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg pointer-events-none animate-bounce">
                {cartMessage}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

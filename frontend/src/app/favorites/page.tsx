'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function FavoritesPage() {
  const { favorites, removeFavorite, clearFavorites, favoritesCount } = useFavorites();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    favorites.forEach((prod) => {
      addToCart({
        productId: prod.id,
        slug: prod.slug,
        name: prod.name,
        color: prod.colors[0]?.name || 'Standard',
        size: prod.category_name.toLowerCase() === 'caps' ? 'ONE SIZE' : 'M',
        price: prod.price,
        quantity: 1,
        image: prod.primary_image,
        inStock: prod.in_stock,
        hasCustomPrint: false,
      });
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#E9E5F5] dark:border-[#2A2344]">
        <div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-white transition-colors mb-3"
          >
            <ArrowLeft size={14} />
            <span>Continue Shopping</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center">
              <Heart size={20} className="fill-purple-600 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F0E17] dark:text-[#FAF8FF]">
                Your Favorites
              </h1>
              <p className="text-xs text-[#5B586E] dark:text-[#B6B0D1] mt-0.5">
                {favoritesCount === 1
                  ? '1 item saved for your next Nairobi streetwear rotation'
                  : `${favoritesCount} items saved for your next Nairobi streetwear rotation`}
              </p>
            </div>
          </div>
        </div>

        {favorites.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddAllToCart}
              className="inline-flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-full transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <ShoppingBag size={14} />
              <span>Add All to Bag</span>
            </button>
            <button
              onClick={clearFavorites}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-red-600 py-3 px-3 transition-colors cursor-pointer"
              title="Clear all saved favorites"
            >
              <Trash2 size={14} />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      {favorites.length === 0 ? (
        <div className="py-24 text-center max-w-md mx-auto space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 mx-auto flex items-center justify-center shadow-inner">
            <Heart size={28} strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#0F0E17] dark:text-[#FAF8FF]">
              Your wishlist is empty
            </h2>
            <p className="text-xs text-[#5B586E] dark:text-[#B6B0D1] leading-relaxed">
              Explore our Kenyan heavyweight 460 GSM hoodies and structured caps. Tap the heart on any product to save it here for later.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-8 rounded-full transition-all shadow-md active:scale-95"
            >
              <span>Explore Collection</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="pt-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {favorites.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


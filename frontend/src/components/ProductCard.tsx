'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Plus, Sparkles } from 'lucide-react';
import { ProductListItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

interface ProductCardProps {
  product: ProductListItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Ash');
  const imgRef = useRef<HTMLImageElement | null>(null);

  const isLiked = isFavorite(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        color: selectedColor,
        size: product.category_name.toLowerCase() === 'caps' ? 'ONE SIZE' : 'M',
        price: product.price,
        quantity: 1,
        image: product.primary_image,
        inStock: product.in_stock,
        hasCustomPrint: false,
      },
      imgRef.current
    );
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <div className="atc-product group relative flex flex-col bg-[var(--card-bg)] rounded-2xl p-3 border border-[var(--border-color)] shadow-xs hover:shadow-md transition-all">
      {/* Product Image Box */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-theme-light/40 rounded-xl">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            ref={imgRef}
            src={product.primary_image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="atc-image object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Minimal badge on top-left */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 bg-theme text-white text-[10px] font-black tracking-wider px-2 py-0.5 uppercase rounded-md shadow-xs">
            {product.badge}
          </span>
        )}

        {/* Bouncing heart favorites button with global persistent state */}
        <button
          onClick={handleToggleLike}
          aria-label={isLiked ? 'Remove from favorites' : 'Save to favorites'}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center text-neutral-400 hover:text-theme transition-all cursor-pointer shadow-xs active:scale-90"
        >
          <Heart
            size={16}
            strokeWidth={2}
            className={`transition-all ${
              isLiked
                ? 'fill-theme text-theme heart-animated'
                : 'hover:scale-115'
            }`}
          />
        </button>

        {/* Quick Add Button with Slow Smooth Flying Animation */}
        <button
          onClick={handleQuickAdd}
          aria-label="Add to bag"
          title="Add to bag"
          className="atc-btn absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full bg-theme hover:bg-theme-hover text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <Plus size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Info */}
      <div className="pt-3 pb-1 flex flex-col justify-between flex-grow">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <Link href={`/products/${product.slug}`}>
              <h3 className="text-sm font-bold text-[var(--foreground)] group-hover:text-theme transition-colors leading-tight line-clamp-1">
                {product.name}
              </h3>
            </Link>
            <p className="text-[11px] text-[var(--muted-text)] line-clamp-1">{product.tagline}</p>
          </div>
          <span className="text-sm font-black text-[var(--foreground)] whitespace-nowrap">
            KES {product.price.toLocaleString()}
          </span>
        </div>

        {/* Custom print add-on badge */}
        {product.supports_custom_print && (
          <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-theme bg-theme-light px-2 py-0.5 rounded-md w-fit border border-theme/20">
            <Sparkles size={10} className="text-theme" />
            <span>Custom print add-on +KES 500</span>
          </div>
        )}

        {/* Color swatches */}
        <div className="flex items-center gap-1.5 mt-2.5">
          {product.colors.map((c) => {
            const isSelected = selectedColor === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                title={c.name}
                aria-label={`Select color ${c.name}`}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  isSelected
                    ? 'ring-2 ring-offset-1 ring-theme border-transparent scale-110'
                    : 'border-black/20 dark:border-white/20 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

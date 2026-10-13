'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Plus } from 'lucide-react';
import { ProductListItem } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: ProductListItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Ash');
  const [isLiked, setIsLiked] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

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
    setIsLiked(!isLiked);
  };

  return (
    <div className="atc-product group relative flex flex-col">
      {/* Product Image Box */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECECE9] dark:bg-[#1C1D1F] rounded-xs">
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
          <span className="absolute top-3 left-3 bg-white/95 dark:bg-black/95 text-black dark:text-white text-[10px] font-bold tracking-wider px-2 py-0.5 uppercase shadow-xs">
            {product.badge}
          </span>
        )}

        {/* Bouncing heart favorites button matching user prompt */}
        <button
          onClick={handleToggleLike}
          aria-label="Save to favorites"
          className="absolute top-3 right-3 p-1.5 rounded-full text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          <Heart
            size={16}
            strokeWidth={1.8}
            className={`transition-all ${
              isLiked
                ? 'fill-[#D2DB6B] text-[#B8C244] heart-animated'
                : 'hover:scale-110'
            }`}
          />
        </button>

        {/* Quick Add Button with Flying Animation */}
        <button
          onClick={handleQuickAdd}
          aria-label="Add to bag"
          className="atc-btn absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white dark:bg-neutral-900 text-black dark:text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer opacity-90 group-hover:opacity-100"
        >
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* Info */}
      <div className="pt-3 pb-2 flex flex-col justify-between flex-grow">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/products/${product.slug}`}>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white transition-colors leading-tight">
                {product.name}
              </h3>
            </Link>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{product.tagline}</p>
          </div>
          <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
            KES {product.price.toLocaleString()}
          </span>
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-1.5 mt-3">
          {product.colors.map((c) => {
            const isSelected = selectedColor === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                title={c.name}
                aria-label={`Select color ${c.name}`}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  isSelected ? 'ring-1 ring-offset-1 ring-black dark:ring-white border-transparent scale-110' : 'border-black/20 hover:scale-105'
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

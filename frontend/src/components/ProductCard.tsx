'use client';

import React from 'react';
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
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0]?.name || 'Ash');

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      color: selectedColor,
      size: product.category_name.toLowerCase() === 'caps' ? 'ONE SIZE' : 'M',
      price: product.price,
      quantity: 1,
      image: product.primary_image,
      inStock: product.in_stock,
    });
  };

  return (
    <div className="group relative flex flex-col">
      {/* Product Image Box */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECECE9] rounded-sm">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.primary_image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badge on top-left if present */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-white/95 text-black text-[10px] font-bold tracking-wider px-2 py-0.5 uppercase shadow-xs">
            {product.badge}
          </span>
        )}

        {/* Wishlist Heart Icon top-right */}
        <button
          aria-label="Save to wishlist"
          className="absolute top-3 right-3 text-neutral-500 hover:text-black transition-colors p-1"
        >
          <Heart size={16} strokeWidth={1.8} />
        </button>

        {/* Quick Add Button bottom-right */}
        <button
          onClick={handleQuickAdd}
          aria-label="Add to bag"
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer opacity-90 group-hover:opacity-100"
        >
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* Info */}
      <div className="pt-3 pb-2 flex flex-col justify-between flex-grow">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/products/${product.slug}`}>
              <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-black transition-colors leading-tight">
                {product.name}
              </h3>
            </Link>
            <p className="text-xs text-neutral-500 mt-0.5">{product.tagline}</p>
          </div>
          <span className="text-sm font-semibold text-neutral-900">
            ${product.price.toFixed(2)}
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
                  isSelected ? 'ring-1 ring-offset-1 ring-black border-transparent scale-110' : 'border-black/20 hover:scale-105'
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


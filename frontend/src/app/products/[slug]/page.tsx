'use client';

import React, { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Star, Check, Sparkles } from 'lucide-react';
import { fetchProductBySlug, fetchProducts } from '@/lib/api';
import { ProductDetail, ProductListItem } from '@/types';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [related, setRelated] = useState<ProductListItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [unitMeasure, setUnitMeasure] = useState<'CM' | 'IN'>('CM');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Custom printing add-on states
  const [enableCustomPrint, setEnableCustomPrint] = useState<boolean>(false);
  const [customPrintText, setCustomPrintText] = useState<string>('');
  const [customPrintPlacement, setCustomPrintPlacement] = useState<string>('Chest Front');

  const { addToCart } = useCart();

  useEffect(() => {
    fetchProductBySlug(slug).then((data) => {
      setProduct(data);
      if (data?.images?.length) {
        setSelectedImage(data.images[0].image_url);
      }
      if (data?.colors?.length) {
        setSelectedColor(data.colors[0].name);
      }
      if (data?.sizes?.length) {
        setSelectedSize(data.sizes[Math.min(2, data.sizes.length - 1)] || data.sizes[0]);
      }
    });

    fetchProducts().then((all) => {
      setRelated(all.filter((p: ProductListItem) => p.slug !== slug).slice(0, 4));
    });
  }, [slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center text-xs tracking-widest uppercase font-mono text-neutral-400">
        Loading essential details...
      </div>
    );
  }

  const customPrintFeePerItem = enableCustomPrint && product.supports_custom_print ? 500 : 0;
  const unitTotal = product.price + customPrintFeePerItem;
  const lineTotal = unitTotal * quantity;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      color: selectedColor || product.colors[0]?.name || 'Ash',
      size: selectedSize || product.sizes[0] || 'M',
      price: product.price,
      quantity,
      image: selectedImage || product.images[0]?.image_url,
      inStock: product.in_stock,
      hasCustomPrint: enableCustomPrint && product.supports_custom_print,
      customPrintText: enableCustomPrint ? customPrintText || 'Custom Brand Logo' : '',
      customPrintPlacement: enableCustomPrint ? customPrintPlacement : '',
      customPrintFee: customPrintFeePerItem,
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-neutral-400 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link href="/" className="hover:text-black">Shop all</Link>
        <span>/</span>
        <span className="text-neutral-700 font-medium">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Gallery (7 columns) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECECE9] rounded-xs">
            <Image
              src={selectedImage || product.images[0]?.image_url}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
              {product.badge && (
                <span className="bg-white/95 text-black text-[10px] font-bold tracking-wider px-2 py-0.5 uppercase shadow-xs">
                  {product.badge}
                </span>
              )}
              {product.supports_custom_print && (
                <span className="bg-[#D2DB6B] text-black text-[10px] font-black tracking-wider px-2 py-0.5 uppercase shadow-xs flex items-center gap-1">
                  <Sparkles size={11} /> Custom Print Option Available (+KES 500)
                </span>
              )}
            </div>
          </div>

          {/* Sub Gallery Images Grid */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-2 gap-4 pt-2">
              {product.images.slice(1, 3).map((img) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedImage(img.image_url)}
                  className="relative aspect-square overflow-hidden bg-[#ECECE9] rounded-xs cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <Image
                    src={img.image_url}
                    alt={img.alt_text}
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover object-center"
                  />
                </div>
              ))}
            </div>
          )}

          <p className="text-[11px] text-neutral-400 font-mono pt-1">
            Model in Nairobi is 6&apos;1&quot; / 185 cm and wears size L. Photography shows {selectedColor || 'Ash'}.
          </p>
        </div>

        {/* Right Product Details & Buy Box (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-b border-[#EBEBE8] pb-6">
            <div className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase">
              {product.badge || 'CORE ESSENTIAL'}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 mt-1">
              {product.name}
            </h1>

            {/* Price and Rating */}
            <div className="flex items-center justify-between mt-3">
              <div>
                <span className="text-2xl font-black text-neutral-900">
                  KES {product.price.toLocaleString()}
                </span>
                {enableCustomPrint && (
                  <span className="ml-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                    + KES 500 Custom Print
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-700">
                <div className="flex text-black">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
                <span className="font-semibold">{product.rating}</span>
                <span className="text-neutral-400">({product.review_count} reviews)</span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 mt-4 leading-relaxed font-normal">
              {product.description}
            </p>
          </div>

          {/* Color Selector */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-neutral-800">
              Color: <span className="font-normal text-neutral-600">{selectedColor}</span>
            </div>
            <div className="flex items-center gap-2">
              {product.colors.map((c) => {
                const isSelected = selectedColor.toLowerCase() === c.name.toLowerCase();
                return (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    aria-label={`Color ${c.name}`}
                    className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-xs text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'border-black bg-white ring-1 ring-black font-semibold'
                        : 'border-[#E2E2DE] hover:border-black'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-800">
              <div>
                Size: <span className="font-normal text-neutral-600">{selectedSize}</span>
              </div>
              <button className="flex items-center gap-0.5 text-neutral-500 hover:text-black font-normal cursor-pointer">
                Size guide <ArrowUpRight size={12} />
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((sz) => {
                const isSelected = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 text-xs font-medium border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-black bg-black text-white'
                        : 'border-[#E0E0DC] bg-white text-neutral-800 hover:border-black'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-neutral-500">
              {product.fit_guide}
            </p>
          </div>

          {/* CUSTOM PRINTING ADD-ON FOR PLAIN HOODIES (KES 500) */}
          {product.supports_custom_print && (
            <div className="p-4 bg-[#F8F8F5] border-2 border-[#D2DB6B] rounded-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableCustomPrint}
                    onChange={(e) => setEnableCustomPrint(e.target.checked)}
                    className="w-4 h-4 text-black rounded-xs focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#96A020]" />
                    Add Custom Printing
                  </span>
                </label>
                <span className="text-xs font-bold text-black bg-[#D2DB6B] px-2 py-0.5 rounded-xs">
                  + KES 500 per hoodie
                </span>
              </div>

              {enableCustomPrint && (
                <div className="space-y-3 pt-2 border-t border-[#E8E8E2]">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                      Placement on Hoodie:
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {['Chest Front', 'Upper Back', 'Left Sleeve'].map((pos) => (
                        <button
                          key={pos}
                          type="button"
                          onClick={() => setCustomPrintPlacement(pos)}
                          className={`py-1.5 px-2 text-[11px] border rounded-xs font-medium text-center ${
                            customPrintPlacement === pos
                              ? 'border-black bg-black text-white'
                              : 'border-[#D5D5CF] bg-white text-neutral-700'
                          }`}
                        >
                          {pos}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                      Text, Monogram, or Brand Tag to print:
                    </label>
                    <input
                      type="text"
                      value={customPrintText}
                      onChange={(e) => setCustomPrintText(e.target.value)}
                      placeholder="e.g. NAIROBI 254 or Your Brand Initials"
                      className="w-full text-xs p-2.5 border border-[#D5D5CF] bg-white rounded-xs focus:outline-none focus:border-black"
                    />
                    <p className="text-[10px] text-neutral-400 mt-1">
                      High-definition DTF / screen print. Our production team will contact you on WhatsApp / email to confirm design placement.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Availability Status */}
          <div className="flex items-center gap-2 text-xs text-neutral-700">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>In stock in Nairobi · Next-day rider dispatch across Kenya</span>
          </div>

          {/* Quantity and Add to Bag Bar */}
          <div className="flex items-center gap-3 pt-2">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#D5D5CF] bg-white rounded-xs">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-3 text-sm text-neutral-600 hover:text-black cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-3 text-xs font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-3 text-sm text-neutral-600 hover:text-black cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Add to Bag CTA Button in signature Citron color */}
            <button
              onClick={handleAddToCart}
              className="flex-grow bg-[#D2DB6B] hover:bg-[#C2CB5E] text-black font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.99]"
            >
              {addedSuccess ? (
                <>
                  <Check size={16} /> Added to bag
                </>
              ) : (
                <>
                  Add to bag — KES {lineTotal.toLocaleString()}
                </>
              )}
            </button>
          </div>

          {/* Perks list */}
          <div className="pt-4 border-t border-[#EBEBE8] space-y-2 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <span className="text-black font-medium">✓ Free delivery in Kenya for orders over KES 5,000</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-black font-medium">✓ Lipa na M-Pesa Buy Goods Till 4466556 or Cash on Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-black font-medium">↺ Easy 7-day exchanges on unworn items</span>
            </div>
          </div>

          {/* Details & Care Collapsible Section */}
          <div className="pt-4 border-t border-[#EBEBE8] space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">
              Details & care
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {product.details_and_care}
            </p>
          </div>

          {/* Fit Measurements Chart */}
          <div className="pt-4 border-t border-[#EBEBE8] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                Find your fit
              </h3>
              <div className="flex text-[11px] font-mono border border-[#E0E0DC] rounded-xs overflow-hidden">
                <button
                  onClick={() => setUnitMeasure('CM')}
                  className={`px-2 py-0.5 ${unitMeasure === 'CM' ? 'bg-black text-white' : 'text-neutral-600'}`}
                >
                  CM
                </button>
                <button
                  onClick={() => setUnitMeasure('IN')}
                  className={`px-2 py-0.5 ${unitMeasure === 'IN' ? 'bg-black text-white' : 'text-neutral-600'}`}
                >
                  IN
                </button>
              </div>
            </div>
            <p className="text-[11px] text-neutral-400">Garment measurements. Measured flat.</p>

            <div className="overflow-x-auto text-[11px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#EBEBE8] text-neutral-400 font-mono">
                    <th className="py-1.5 font-normal">Size</th>
                    <th className="py-1.5 font-normal">XS</th>
                    <th className="py-1.5 font-normal">S</th>
                    <th className="py-1.5 font-normal">M</th>
                    <th className="py-1.5 font-normal">L</th>
                    <th className="py-1.5 font-normal">XL</th>
                    <th className="py-1.5 font-normal">XXL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBEBE8] text-neutral-700 font-medium">
                  <tr>
                    <td className="py-1.5 text-neutral-400 font-normal">Chest</td>
                    <td>{unitMeasure === 'CM' ? '56' : '22.0'}</td>
                    <td>{unitMeasure === 'CM' ? '59' : '23.2'}</td>
                    <td>{unitMeasure === 'CM' ? '62' : '24.4'}</td>
                    <td>{unitMeasure === 'CM' ? '65' : '25.6'}</td>
                    <td>{unitMeasure === 'CM' ? '68' : '26.8'}</td>
                    <td>{unitMeasure === 'CM' ? '71' : '28.0'}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-neutral-400 font-normal">Length</td>
                    <td>{unitMeasure === 'CM' ? '64' : '25.2'}</td>
                    <td>{unitMeasure === 'CM' ? '66' : '26.0'}</td>
                    <td>{unitMeasure === 'CM' ? '68' : '26.8'}</td>
                    <td>{unitMeasure === 'CM' ? '70' : '27.5'}</td>
                    <td>{unitMeasure === 'CM' ? '72' : '28.3'}</td>
                    <td>{unitMeasure === 'CM' ? '74' : '29.1'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-neutral-500 italic">
              Between sizes? Size down for a closer fit, or up for an oversized streetwear look.
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Banner Section */}
      <section className="mt-24 pt-12 border-t border-[#EBEBE8]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-2">
            <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400">
              WORN AND LOVED IN NAIROBI
            </span>
            <div className="text-4xl font-extrabold text-neutral-900">{product.rating} / 5</div>
            <div className="flex text-black">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="text-xs text-neutral-500">Based on {product.review_count} verified Kenyan buyers</p>
            <p className="text-xs font-semibold text-neutral-800 pt-2">Fit: True to size</p>
          </div>

          <div className="md:col-span-8 bg-[#F4F4F0] p-6 sm:p-8 rounded-xs space-y-3">
            <div className="flex items-center gap-2 text-xs text-neutral-600">
              <div className="flex text-black">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </div>
              <span className="font-semibold text-black">Verified buyer ✓</span>
            </div>
            <p className="text-base sm:text-lg font-serif italic text-neutral-900 leading-snug">
              &ldquo;{product.reviews[0]?.comment || 'Best hoodie in Kenya hands down. Thick 460 GSM material keeps me warm in Limuru and Nairobi mornings.'}&rdquo;
            </p>
            <div className="text-xs text-neutral-500 pt-2">
              {product.reviews[0]?.author || 'Jordan Mwangi'} / {product.reviews[0]?.variant_info || 'Ash M'} / {product.reviews[0]?.date_str || 'October 8, 2026'}
            </div>
          </div>
        </div>
      </section>

      {/* Good Together / Related Essentials Carousel */}
      <section className="mt-24 pt-12 border-t border-[#EBEBE8]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Good together.
          </h2>
          <Link
            href="/"
            className="flex items-center gap-1 text-xs font-semibold text-black hover:underline"
          >
            Shop all essentials <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
}

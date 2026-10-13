'use client';

import React, { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/lib/api';
import { ProductListItem } from '@/types';

export default function ShopAllPage() {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [loading, setLoading] = useState<boolean>(true);
  const [, startTransition] = useTransition();

  const loadData = () => {
    setLoading(true);
    fetchProducts({
      category: activeCategory !== 'all' ? activeCategory : undefined,
      color: selectedColor || undefined,
      size: selectedSize || undefined,
      price_range: priceRange || undefined,
      in_stock_only: inStockOnly,
      sort: sortBy,
    })
      .then((data) => {
        setProducts(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, [activeCategory, selectedSize, selectedColor, priceRange, inStockOnly, sortBy]);

  const clearFilters = () => {
    setActiveCategory('all');
    setSelectedSize('');
    setSelectedColor('');
    setPriceRange('');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const categories = [
    { label: 'All essentials (6)', value: 'all' },
    { label: 'Caps (3)', value: 'caps' },
    { label: 'Hoodies (3)', value: 'hoodies' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Ink', hex: '#1E1F21' },
    { name: 'Chalk', hex: '#E5E1D8' },
    { name: 'Ash', hex: '#9A9E99' },
    { name: 'Moss', hex: '#5F6A51' },
    { name: 'Citron', hex: '#CED587' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-neutral-400 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <span className="text-neutral-700 font-medium">Shop all</span>
      </nav>

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#EBEBE8] pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-none">
            The daily rotation.
          </h1>
          <p className="text-sm text-neutral-500 mt-2 font-medium">
            Considered essentials. Nothing more, nothing less.
          </p>
        </div>
        <div className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
          CORE COLLECTION / VOL. 01
        </div>
      </div>

      {/* Category Pills Header */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => {
                startTransition(() => {
                  setActiveCategory(cat.value);
                });
              }}
              className={`text-xs px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-black text-white'
                  : 'bg-[#EFEFEA] text-neutral-700 hover:bg-[#E4E4DF]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Main Grid with Left Sidebar Filters matching offhours screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Left Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-8 pr-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EBEBE8]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Filters</h2>
            <button
              onClick={clearFilters}
              className="text-xs text-neutral-500 hover:text-black cursor-pointer underline underline-offset-2"
            >
              Clear all
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-neutral-800 uppercase tracking-wide">Category</h3>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-neutral-700 hover:text-black">
                <input
                  type="checkbox"
                  checked={activeCategory === 'caps'}
                  onChange={() => setActiveCategory(activeCategory === 'caps' ? 'all' : 'caps')}
                  className="rounded-xs border-neutral-300 text-black focus:ring-0"
                />
                <span>Caps (3)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-neutral-700 hover:text-black">
                <input
                  type="checkbox"
                  checked={activeCategory === 'hoodies'}
                  onChange={() => setActiveCategory(activeCategory === 'hoodies' ? 'all' : 'hoodies')}
                  className="rounded-xs border-neutral-300 text-black focus:ring-0"
                />
                <span>Hoodies (3)</span>
              </label>
            </div>
          </div>

          {/* Size Filter Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-neutral-800 uppercase tracking-wide">Size</h3>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((sz) => {
                const isSelected = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(isSelected ? '' : sz)}
                    className={`py-2 text-xs font-medium border text-center transition-all ${
                      isSelected
                        ? 'border-black bg-black text-white'
                        : 'border-[#E0E0DC] bg-white text-neutral-700 hover:border-black'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-neutral-800 uppercase tracking-wide">Color</h3>
            <div className="space-y-2">
              {colors.map((c) => {
                const isSelected = selectedColor.toLowerCase() === c.name.toLowerCase();
                return (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(isSelected ? '' : c.name)}
                    className="flex items-center gap-2.5 text-xs text-neutral-700 hover:text-black w-full text-left"
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full border ${
                        isSelected ? 'ring-2 ring-black border-white' : 'border-black/20'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className={isSelected ? 'font-bold text-black' : ''}>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-neutral-800 uppercase tracking-wide">Price</h3>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-neutral-700 hover:text-black">
                <input
                  type="checkbox"
                  checked={priceRange === 'under_50'}
                  onChange={() => setPriceRange(priceRange === 'under_50' ? '' : 'under_50')}
                  className="rounded-xs border-neutral-300 text-black focus:ring-0"
                />
                <span>Under $50 (3)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-neutral-700 hover:text-black">
                <input
                  type="checkbox"
                  checked={priceRange === '50_100'}
                  onChange={() => setPriceRange(priceRange === '50_100' ? '' : '50_100')}
                  className="rounded-xs border-neutral-300 text-black focus:ring-0"
                />
                <span>$50 – $100 (3)</span>
              </label>
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-neutral-800 uppercase tracking-wide">Availability</h3>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700 hover:text-black">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded-xs border-neutral-300 text-black focus:ring-0"
              />
              <span>In stock (6)</span>
            </label>
          </div>

          {/* Find your fit banner card */}
          <div className="p-4 bg-[#F2F2EE] border border-[#E6E6E1] rounded-xs space-y-2">
            <h4 className="text-xs font-bold text-neutral-900">Find your fit.</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Unisex sizing. Relaxed by design. Built to drape cleanly.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-1 text-xs font-semibold text-black hover:underline pt-1"
            >
              View size guide <ArrowUpRight size={13} />
            </Link>
          </div>
        </aside>

        {/* Product Grid Area */}
        <section className="lg:col-span-3">
          {/* Top meta bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EBEBE8] text-xs text-neutral-500">
            <div>
              <span>{products.length} essentials</span>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-neutral-500">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-medium text-black focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Loading or Grid */}
          {loading ? (
            <div className="py-20 text-center text-xs text-neutral-400 animate-pulse font-mono uppercase tracking-widest">
              Updating essentials...
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <p className="text-sm text-neutral-600">No essentials matched the chosen filters.</p>
              <button
                onClick={clearFilters}
                className="text-xs font-semibold underline text-black cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
              {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}

          {/* End of catalog banner */}
          <div className="mt-20 pt-10 border-t border-[#EBEBE8] text-center space-y-2">
            <p className="text-xs text-neutral-400">You’ve seen all {products.length} essentials.</p>
            <p className="text-sm font-serif italic text-neutral-700">Less, but better.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

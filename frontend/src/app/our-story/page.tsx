import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Our Story | Afriqan Caps and Hoodies®",
  description: "Learn about the craft, ethos, and minimalist philosophy behind Afriqan Caps and Hoodies.",
};

export default function OurStoryPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-12">
      <div className="space-y-3 border-b border-[#EBEBE8] pb-8">
        <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
          AFRIQAN ETHOS / ESSENTIALS
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900">
          Less noise. Better essentials.
        </h1>
        <p className="text-sm font-medium text-neutral-500">
          Made for the hours that are yours.
        </p>
      </div>

      <div className="space-y-6 text-sm text-neutral-700 leading-relaxed">
        <p>
          Afriqan was founded on a simple premise: everyday streetwear garments should be uncompromising in quality, heavy in hand-feel, and free of unnecessary visual noise.
        </p>
        <p>
          We construct our hoodies using bespoke 460–480 GSM combed organic cotton terry with double-layer hoods, dropped shoulders, and pre-shrunk tailoring that holds its architectural shape wash after wash.
        </p>
        <p>
          Our caps are cut from durable washed cotton twill, featuring antique brass buckle sliders, curved brims, and understated tonal embroidery that celebrates African craftsmanship for a global wardrobe.
        </p>
      </div>

      <div className="bg-[#F4F4F0] p-8 rounded-xs space-y-4">
        <h2 className="text-base font-bold text-neutral-900">Our Commitments</h2>
        <ul className="space-y-3 text-xs text-neutral-600">
          <li className="flex items-start gap-2">
            <span className="font-bold text-black">• 100% Organic &amp; Sustainable Fibers:</span> Zero harsh plastics or lightweight synthetics.
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-black">• Ethical Manufacturing:</span> Fair living wages and safe conditions across our partner mills.
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-black">• 30-Day Wear Guarantee:</span> Wear them, wash them, rotate them. Returns within 30 days are seamless.
          </li>
        </ul>
      </div>

      <div className="pt-6">
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-black text-white text-xs uppercase tracking-wider font-bold py-3.5 px-8 rounded-xs hover:bg-neutral-800 transition-colors"
        >
          Explore The Collection
        </Link>
      </div>
    </div>
  );
}


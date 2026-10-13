import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[#EBEBE8] bg-[#FBFBF9]">
      {/* Top Value Proposition Bar in Citron Yellow */}
      <div className="bg-[#D2DB6B] text-black py-4 px-4 sm:px-8 border-b border-[#C2CB5E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm font-medium gap-3">
          <div>Free US shipping $100+</div>
          <div>30-day easy returns</div>
          <a
            href="mailto:hello@afriqan.studio"
            className="flex items-center gap-1 hover:underline font-semibold"
          >
            Need help? We&apos;re here <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              AFRIQAN<span className="text-[10px] align-top font-normal">®</span>
            </h2>
            <p className="text-xs text-neutral-600 max-w-sm leading-relaxed">
              Less noise. Better essentials. Made for the hours that are yours. Crafted with heavyweight organic fibers and timeless silhouettes.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-neutral-800 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-0.5 hover:text-black">
                Instagram <ArrowUpRight size={12} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="flex items-center gap-0.5 hover:text-black">
                TikTok <ArrowUpRight size={12} />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="flex items-center gap-0.5 hover:text-black">
                Pinterest <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          {/* Shop Col */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">Shop</h3>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li><Link href="/" className="hover:text-black">All essentials</Link></li>
              <li><Link href="/?category=caps" className="hover:text-black">Caps</Link></li>
              <li><Link href="/?category=hoodies" className="hover:text-black">Hoodies</Link></li>
              <li><Link href="#" className="hover:text-black">Gift cards</Link></li>
            </ul>
          </div>

          {/* Support Col */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">Support</h3>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li><Link href="#" className="hover:text-black">Shipping & returns</Link></li>
              <li><Link href="#" className="hover:text-black">Size guide</Link></li>
              <li><Link href="#" className="hover:text-black">FAQs</Link></li>
              <li><a href="mailto:hello@afriqan.studio" className="hover:text-black">Contact us</a></li>
            </ul>
          </div>

          {/* About Col */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">Afriqan</h3>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li><Link href="/our-story" className="hover:text-black">Our story</Link></li>
              <li><Link href="#" className="hover:text-black">Materials</Link></li>
              <li><Link href="#" className="hover:text-black">Journal</Link></li>
              <li><Link href="#" className="hover:text-black">Stockists</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="mt-16 pt-8 border-t border-[#EBEBE8] flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <div>
            © 2026 Afriqan Caps & Hoodies Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>United States / USD $</span>
            <Link href="#" className="hover:underline">Privacy policy</Link>
            <Link href="#" className="hover:underline">Terms of service</Link>
          </div>
          <div className="flex items-center gap-3 font-semibold text-neutral-600">
            <span>VISA</span>
            <span>Mastercard</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

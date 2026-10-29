import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[#EBEBE8] bg-[#FBFBF9]">
      {/* Top Value Proposition Bar with Theme Accent */}
      <div className="bg-theme text-white py-4 px-4 sm:px-8 border-b border-black/10 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm font-semibold gap-3">
          <div>Free Kenya delivery on orders KES 5,000+</div>
          <div>Lipa na M-Pesa Buy Goods Till 4466556 &amp; Cash on Delivery</div>
          <a
            href="mailto:orders@afriqan.co.ke"
            className="flex items-center gap-1 hover:underline font-bold text-purple-100"
          >
            Need help? Contact our Nairobi hub <ArrowUpRight size={14} />
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
              Less noise. Better essentials. Designed and crafted in Nairobi, Kenya. Heavyweight 460 GSM combed cotton hoodies, bespoke custom printing (+KES 500), and 6-panel embroidered streetwear caps.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-neutral-800 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-0.5 hover:text-black">
                Instagram <ArrowUpRight size={12} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="flex items-center gap-0.5 hover:text-black">
                TikTok <ArrowUpRight size={12} />
              </a>
              <a href="https://wa.me/254712345678" target="_blank" rel="noreferrer" className="flex items-center gap-0.5 hover:text-black">
                WhatsApp <ArrowUpRight size={12} />
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
              <li><Link href="#" className="hover:text-black">Custom Printing</Link></li>
            </ul>
          </div>

          {/* Support Col */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">Support</h3>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li><Link href="#" className="hover:text-black">Delivery &amp; Rider Rates</Link></li>
              <li><Link href="#" className="hover:text-black">Size guide</Link></li>
              <li><Link href="#" className="hover:text-black">M-Pesa Till 4466556 Guide</Link></li>
              <li><a href="mailto:orders@afriqan.co.ke" className="hover:text-black">Contact us</a></li>
            </ul>
          </div>

          {/* About Col */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">Afriqan Kenya</h3>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li><Link href="/our-story" className="hover:text-black">Our Nairobi Story</Link></li>
              <li><Link href="#" className="hover:text-black">Local Materials</Link></li>
              <li><Link href="#" className="hover:text-black">Stockists in Kenya</Link></li>
              <li><Link href="/admin" className="hover:text-black font-semibold text-neutral-800">Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="mt-16 pt-8 border-t border-[#EBEBE8] flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <div>
            © 2026 Afriqan Caps &amp; Hoodies Kenya Hub. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="font-semibold text-black">Kenya / KES (KSh)</span>
            <Link href="#" className="hover:underline">Privacy policy</Link>
            <Link href="#" className="hover:underline">Terms of service</Link>
          </div>
          <div className="flex items-center gap-3 font-semibold text-neutral-700">
            <span className="text-[#008000] font-bold">Lipa na M-PESA</span>
            <span>·</span>
            <span>Cash On Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

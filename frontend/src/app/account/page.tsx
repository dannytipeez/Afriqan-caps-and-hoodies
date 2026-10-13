'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const router = useRouter();
  const [orderQuery, setOrderQuery] = useState('');

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      router.push(`/order-confirmed?order_number=${encodeURIComponent(orderQuery.trim())}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-16 space-y-10">
      <div className="space-y-2 border-b border-[#EBEBE8] pb-6">
        <h1 className="text-3xl font-black text-neutral-900 tracking-tight">Account &amp; Orders</h1>
        <p className="text-xs text-neutral-500">Track current orders or manage saved preferences.</p>
      </div>

      {/* Track order form */}
      <div className="bg-[#F8F8F5] border border-[#EBEBE8] p-6 rounded-xs space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">Track an Order</h2>
        <p className="text-xs text-neutral-600">Enter your order confirmation number (e.g., OH-10482 or AF-12345):</p>
        <form onSubmit={handleTrackOrder} className="flex gap-2">
          <input
            type="text"
            required
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            placeholder="OH-10482"
            className="flex-grow text-xs p-3 border border-[#D5D5CF] rounded-xs bg-white focus:outline-none focus:border-black uppercase font-mono"
          />
          <button
            type="submit"
            className="bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xs cursor-pointer"
          >
            Track
          </button>
        </form>
      </div>

      {/* Demo Account Overview */}
      <div className="bg-[#F4F4F0] p-6 rounded-xs space-y-4">
        <h2 className="text-sm font-bold text-neutral-900">Signed In As Alex Morgan</h2>
        <p className="text-xs text-neutral-600">alex.morgan@email.com</p>
        <div className="pt-2 text-xs text-neutral-500 flex gap-4">
          <Link href="/order-confirmed?order_number=OH-10482" className="underline font-semibold text-black">
            View Recent Order (OH-10482)
          </Link>
          <span>·</span>
          <Link href="/" className="underline text-neutral-600 hover:text-black">
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}


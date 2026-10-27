'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>, sourceImgEl?: HTMLElement | null) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  orderNote: string;
  setOrderNote: (note: string) => void;
  cartMessage: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orderNote, setOrderNote] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [cartMessage, setCartMessage] = useState<string>('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('afriqan_cart_kes');
      if (saved) {
        setItems(JSON.parse(saved));
      } else {
        const initialCart: CartItem[] = [
          {
            id: 'the-heavyweight-hoodie-ash-Ash-M-plain',
            productId: 1,
            slug: 'the-heavyweight-hoodie-ash',
            name: 'The Heavyweight Hoodie',
            color: 'Ash',
            size: 'M',
            price: 3500.0,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80',
            inStock: true,
            hasCustomPrint: false,
            customPrintFee: 0,
          },
          {
            id: 'the-afriqan-signature-cap-Ink-ONE SIZE-plain',
            productId: 2,
            slug: 'the-afriqan-signature-cap',
            name: 'The Afriqan Signature Cap',
            color: 'Ink',
            size: 'ONE SIZE',
            price: 1500.0,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80',
            inStock: true,
            hasCustomPrint: false,
            customPrintFee: 0,
          },
        ];
        setItems(initialCart);
      }
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('afriqan_cart_kes', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const runFlyingAnimation = (sourceImgEl: HTMLElement | null, newCount: number) => {
    if (typeof window === 'undefined') return;

    // Resolve true <img> element
    let targetImg: HTMLImageElement | null = null;
    if (sourceImgEl) {
      if (sourceImgEl.tagName.toLowerCase() === 'img') {
        targetImg = sourceImgEl as HTMLImageElement;
      } else {
        targetImg = sourceImgEl.querySelector('img');
      }
    }

    const cartTarget = document.querySelector('.cart-target-icon') as HTMLElement;
    if (!cartTarget) return;

    const cartRect = cartTarget.getBoundingClientRect();
    const imgRect = targetImg ? targetImg.getBoundingClientRect() : null;

    const startX = imgRect && imgRect.width > 0 ? imgRect.left : window.innerWidth / 2 - 60;
    const startY = imgRect && imgRect.height > 0 ? imgRect.top : window.innerHeight / 2 - 60;
    const startW = imgRect && imgRect.width > 0 ? imgRect.width : 120;
    const startH = imgRect && imgRect.height > 0 ? imgRect.height : 140;

    const clone = document.createElement('img');
    const src = targetImg?.src || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80';
    clone.src = src;

    Object.assign(clone.style, {
      position: 'fixed',
      top: `${startY}px`,
      left: `${startX}px`,
      width: `${startW}px`,
      height: `${startH}px`,
      borderRadius: '14px',
      objectFit: 'cover',
      zIndex: '99999',
      pointerEvents: 'none',
      boxShadow: '0 16px 36px rgba(124, 58, 237, 0.45), 0 0 0 2px rgba(124, 58, 237, 0.6)',
      transition: 'none',
    });
    document.body.appendChild(clone);

    const destX = cartRect.left + cartRect.width / 2 - startW / 2;
    const destY = cartRect.top + cartRect.height / 2 - startH / 2;
    const deltaX = destX - startX;
    const deltaY = destY - startY;

    // Smooth, slow curved flight path so the user can clearly trace it
    const flyAnim = clone.animate(
      [
        {
          transform: 'translate(0px, 0px) scale(1) rotate(0deg)',
          opacity: 1,
        },
        {
          transform: `translate(${deltaX * 0.35}px, ${deltaY * 0.2 - 60}px) scale(0.9) rotate(-8deg)`,
          opacity: 0.95,
        },
        {
          transform: `translate(${deltaX * 0.75}px, ${deltaY * 0.65 - 25}px) scale(0.55) rotate(5deg)`,
          opacity: 0.85,
        },
        {
          transform: `translate(${deltaX}px, ${deltaY}px) scale(0.12) rotate(0deg)`,
          opacity: 0.1,
        },
      ],
      {
        duration: 1150,
        easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
        fill: 'forwards',
      }
    );

    flyAnim.onfinish = () => clone.remove();

    setTimeout(() => {
      // Animate cart icon pop and purple pulse
      cartTarget.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(1.35)' },
          { transform: 'scale(0.95)' },
          { transform: 'scale(1)' },
        ],
        { duration: 320, easing: 'ease-out' }
      );

      const cartCountEl = document.querySelector('.cart-badge-count') as HTMLElement;
      if (cartCountEl) {
        cartCountEl.animate(
          [
            { transform: 'scale(1)', color: 'inherit' },
            { transform: 'scale(1.45)', color: '#7C3AED' },
            { transform: 'scale(1)', color: 'inherit' },
          ],
          { duration: 280 }
        );
      }

      // Dynamic milestone messages
      const cartMessages: Record<number, string> = {
        1: 'Added to bag!',
        2: 'Woohoo! 2 items!',
        3: 'Nice rotation!',
        5: 'Clean essentials!',
        10: 'Nice! 10 items!',
        20: 'Crazy! 20 already!',
      };
      if (cartMessages[newCount]) {
        setCartMessage(cartMessages[newCount]);
        setTimeout(() => setCartMessage(''), 3000);
      }
    }, 1050);
  };

  const addToCart = (newItem: Omit<CartItem, 'id'>, sourceImgEl?: HTMLElement | null) => {
    const printKey = newItem.hasCustomPrint
      ? `print-${newItem.customPrintPlacement}-${newItem.customPrintText}`
      : 'plain';
    const itemId = `${newItem.slug}-${newItem.color}-${newItem.size}-${printKey}`;

    let updatedCount = 0;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        updated = [...prev, { ...newItem, id: itemId }];
      }
      updatedCount = updated.reduce((s, it) => s + it.quantity, 0);
      return updated;
    });

    if (sourceImgEl) {
      runFlyingAnimation(sourceImgEl, updatedCount);
    }
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + (item.price + (item.hasCustomPrint ? item.customPrintFee || 500 : 0)) * item.quantity,
    0
  );
  const shipping = subtotal >= 5000 || subtotal === 0 ? 0.0 : 300.0;
  const tax = 0.0;
  const total = Number((subtotal + shipping + tax).toFixed(2));

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        shipping,
        tax,
        total,
        orderNote,
        setOrderNote,
        cartMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

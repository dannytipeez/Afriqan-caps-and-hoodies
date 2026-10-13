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
    if (!sourceImgEl || typeof window === 'undefined') return;

    const cartTarget = document.querySelector('.cart-target-icon') as HTMLElement;
    if (!cartTarget) return;

    const imgRect = sourceImgEl.getBoundingClientRect();
    const cartRect = cartTarget.getBoundingClientRect();

    const clone = document.createElement('img');
    const src = (sourceImgEl as HTMLImageElement).src || sourceImgEl.getAttribute('src');
    if (src) clone.src = src;

    Object.assign(clone.style, {
      position: 'fixed',
      top: `${imgRect.top}px`,
      left: `${imgRect.left}px`,
      width: `${imgRect.width}px`,
      height: `${imgRect.height}px`,
      borderRadius: '8px',
      objectFit: 'cover',
      zIndex: '9999',
      pointerEvents: 'none',
      boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
    });
    document.body.appendChild(clone);

    const destX = cartRect.left + cartRect.width / 2 - imgRect.width / 2;
    const destY = cartRect.top + cartRect.height / 2 - imgRect.height / 2;

    const flyAnim = clone.animate(
      [
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        {
          transform: `translate(${destX - imgRect.left}px, ${destY - imgRect.top}px) scale(0.12)`,
          opacity: 0.1,
        },
      ],
      {
        duration: 750,
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        fill: 'forwards',
      }
    );

    flyAnim.onfinish = () => clone.remove();

    setTimeout(() => {
      // Animate cart icon pop
      cartTarget.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(1.3)' },
          { transform: 'scale(1)' },
        ],
        { duration: 280, easing: 'ease-out' }
      );

      const cartCountEl = document.querySelector('.cart-badge-count') as HTMLElement;
      if (cartCountEl) {
        cartCountEl.animate(
          [
            { transform: 'scale(1)' },
            { transform: 'scale(1.4)' },
            { transform: 'scale(1)' },
          ],
          { duration: 220 }
        );
      }

      // Fun milestones from prompt
      const cartMessages: Record<number, string> = {
        1: 'Added to bag!',
        3: 'Nice rotation!',
        5: 'Clean essentials!',
        10: 'Nice! 10 items!',
        20: 'Crazy! 20 already!',
      };
      if (cartMessages[newCount]) {
        setCartMessage(cartMessages[newCount]);
        setTimeout(() => setCartMessage(''), 2500);
      }
    }, 650);
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

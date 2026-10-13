'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orderNote, setOrderNote] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('afriqan_cart_kes');
      if (saved) {
        setItems(JSON.parse(saved));
      } else {
        // Initial sample items in KES:
        // 1. The Heavyweight Hoodie (KES 3,500) + Custom Print (KES 500)
        // 2. The Afriqan Signature Cap (KES 1,500)
        // Subtotal = 3500 + 500 + 1500 = KES 5,500 -> Free delivery in Nairobi / Kenya (> KES 5,000)
        const initialCart: CartItem[] = [
          {
            id: 'the-heavyweight-hoodie-ash-Ash-M-print',
            productId: 1,
            slug: 'the-heavyweight-hoodie-ash',
            name: 'The Heavyweight Hoodie',
            color: 'Ash',
            size: 'M',
            price: 3500.0,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80',
            inStock: true,
            hasCustomPrint: true,
            customPrintText: 'NAIROBI ROTATION 254',
            customPrintPlacement: 'Upper Back (+KES 500)',
            customPrintFee: 500.0,
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

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const printKey = newItem.hasCustomPrint
      ? `print-${newItem.customPrintPlacement}-${newItem.customPrintText}`
      : 'plain';
    const itemId = `${newItem.slug}-${newItem.color}-${newItem.size}-${printKey}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, { ...newItem, id: itemId }];
    });
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
  // Free shipping in Kenya for orders >= KES 5,000; otherwise flat KES 300
  const shipping = subtotal >= 5000 || subtotal === 0 ? 0.0 : 300.0;
  const tax = 0.0; // In Kenya, VAT is inclusive in retail prices
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

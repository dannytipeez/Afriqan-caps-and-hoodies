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

  // Initialize from localStorage or sample mock items matching the Offhours checkout designs
  useEffect(() => {
    try {
      const saved = localStorage.getItem('afriqan_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      } else {
        // Default cart with 2 essentials as pictured in the user's mock:
        // 1. The Heavyweight Hoodie ($88)
        // 2. The Afriqan Signature Cap ($38) -> Subtotal $126
        const initialCart: CartItem[] = [
          {
            id: 'the-heavyweight-hoodie-ash-Ash-M',
            productId: 1,
            slug: 'the-heavyweight-hoodie-ash',
            name: 'The Heavyweight Hoodie',
            color: 'Ash',
            size: 'M',
            price: 88.0,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80',
            inStock: true,
          },
          {
            id: 'the-afriqan-signature-cap-Ink-ONE SIZE',
            productId: 2,
            slug: 'the-afriqan-signature-cap',
            name: 'The Afriqan Signature Cap',
            color: 'Ink',
            size: 'ONE SIZE',
            price: 38.0,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80',
            inStock: true,
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
      localStorage.setItem('afriqan_cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const itemId = `${newItem.slug}-${newItem.color}-${newItem.size}`;
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
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 100 || subtotal === 0 ? 0.0 : 12.0; // Free shipping over $100
  const tax = Number((subtotal * 0.08).toFixed(2)); // ~8% tax
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


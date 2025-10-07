"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Item } from "./ItemData";

type WishlistItem = {
  item: Item;
  quantity: number;
  selectedAddOns: string[]; // Tracks selected add-on names
};

type Wishlist = Record<number, WishlistItem>;

type WishlistContextType = {
  wishlist: Wishlist;
  toggleWishlist: (item: Item) => void;
  updateQuantity: (id: number, change: number) => void;
  clearWishlist: () => void;
  updateAddOns: (id: number, addOnName: string) => void; // Toggle add-ons
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Wishlist>({});

  const toggleWishlist = (item: Item) => {
    setWishlist(wishlist =>
      wishlist[item.id]
        ? (() => {
            const w = { ...wishlist };
            delete w[item.id];
            return w;
          })()
        : { ...wishlist, [item.id]: { item, quantity: 1, selectedAddOns: [] } }
    );
  };

  const updateQuantity = (id: number, change: number) => {
    setWishlist(wishlist => {
      const entry = wishlist[id];
      if (!entry) return wishlist;
      const nextQty = entry.quantity + change;
      if (nextQty <= 0) {
        const w = { ...wishlist };
        delete w[id];
        return w;
      }
      return { ...wishlist, [id]: { ...entry, quantity: nextQty } };
    });
  };

  const clearWishlist = () => setWishlist({});

  const updateAddOns = (id: number, addOnName: string) => {
    setWishlist(wishlist => {
      const entry = wishlist[id];
      if (!entry) return wishlist;
      if (!entry.item.addOns.some(a => a.name === addOnName)) return wishlist;
      const selectedAddOns = entry.selectedAddOns.includes(addOnName)
        ? entry.selectedAddOns.filter(name => name !== addOnName)
        : [...entry.selectedAddOns, addOnName];
      return { ...wishlist, [id]: { ...entry, selectedAddOns } };
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, updateQuantity, clearWishlist, updateAddOns }}>
      {children}
    </WishlistContext.Provider>
  );
};
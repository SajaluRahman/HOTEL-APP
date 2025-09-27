"use client";
import React from "react";
import { useWishlist } from "./WishlistContext";

const CheckoutPanel: React.FC = () => {
  const { wishlist, updateQuantity, clearWishlist } = useWishlist();

  const wishlistArray = Object.values(wishlist);
  const subtotal = wishlistArray.reduce((sum, w) => sum + w.item.price * w.quantity, 0);
  const originalTotal = wishlistArray.reduce((sum, w) => sum + w.item.originalPrice * w.quantity, 0);
  const discount = originalTotal - subtotal;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const proceedToCheckout = () => {
    if (!wishlistArray.length) {
      alert("Please add items to your order before proceeding to checkout.");
      return;
    }
    alert("Proceeding to secure checkout...");
    clearWishlist();
  };

  return (
    <div className="w-full lg:w-[350px] bg-white border-l border-gray-200 p-8 overflow-y-auto flex flex-col">
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Your Order</h3>
      </div>
      <div className="mb-8 flex-1">
        {wishlistArray.length === 0 ? (
          <div className="text-center text-gray-400 text-base py-8">
            Your wishlist is empty.<br />Add items to get started.
          </div>
        ) : (
          wishlistArray.map((w) => (
            <div
              key={w.item.id}
              className="flex justify-between items-center py-4 border-b border-gray-100"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">{w.item.name}</div>
                <div className="text-yellow-600 font-semibold text-sm">
                  ${(w.item.price * w.quantity).toFixed(2)}
                </div>
              </div>
              <div className="flex gap-2 items-center ml-4">
                <button
                  className="bg-gray-100 rounded px-2 py-1"
                  onClick={() => updateQuantity(w.item.id, -1)}
                >
                  −
                </button>
                <span className="font-medium">{w.quantity}</span>
                <button
                  className="bg-gray-100 rounded px-2 py-1"
                  onClick={() => updateQuantity(w.item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {wishlistArray.length > 0 && (
        <div className="border-t-2 border-gray-100 pt-6 mb-6">
          <div className="flex justify-between mb-2 text-base">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-base">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-base">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-4 font-bold text-lg text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      )}
      <button
        className="w-full bg-gray-900 text-white rounded-xl py-3 font-bold text-base mt-auto transition hover:bg-gray-800"
        onClick={proceedToCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CheckoutPanel;
"use client";
import React from "react";
import { useWishlist } from "./WishlistContext";

const CheckoutPanel: React.FC = () => {
  const { wishlist, updateQuantity, clearWishlist, updateAddOns } = useWishlist();

  const wishlistArray = Object.values(wishlist);
  
  // Calculate total for each item including add-ons
  const calculateItemTotal = (w: typeof wishlistArray[0]) => {
    const addOnsTotal = w.selectedAddOns.reduce((sum, addOnName) => {
      const addOn = w.item.addOns.find((a) => a.name === addOnName);
      return sum + (addOn?.price || 0);
    }, 0);
    return (w.item.price + addOnsTotal) * w.quantity;
  };

  // Calculate order summary
  const subtotal = wishlistArray.reduce((sum, w) => sum + calculateItemTotal(w), 0);
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
    <div className="w-full lg:w-[400px] bg-gradient-to-b from-white to-amber-50 overflow-y-auto flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-8 pb-6 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">🛒</span>
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Your Cart
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {wishlistArray.length} {wishlistArray.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 p-6 overflow-y-auto">
        {wishlistArray.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🛍️</span>
            </div>
            <p className="text-gray-400 font-medium mb-1">Your cart is empty</p>
            <p className="text-gray-400 text-sm">Add delicious items to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistArray.map((w) => (
              <div
                key={w.item.id}
                className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
              >
                {/* Item Info */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">{w.item.name}</h4>
                    <p className="text-amber-600 font-bold text-lg">
                      ${calculateItemTotal(w).toFixed(2)}
                    </p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-amber-50 rounded-full p-1">
                    <button
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:bg-amber-100"
                      onClick={() => updateQuantity(w.item.id, -1)}
                      aria-label={`Decrease quantity of ${w.item.name}`}
                    >
                      <span className="text-amber-600 font-bold">−</span>
                    </button>
                    <span className="font-bold text-gray-900 w-6 text-center">{w.quantity}</span>
                    <button
                      className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                      onClick={() => updateQuantity(w.item.id, 1)}
                      aria-label={`Increase quantity of ${w.item.name}`}
                    >
                      <span className="text-white font-bold">+</span>
                    </button>
                  </div>
                </div>

                {/* Add-ons Section */}
                <div className="mt-3">
                  <select
                    className="w-full p-3 rounded-xl border-2 border-amber-200 text-sm text-gray-600 focus:border-amber-400 focus:outline-none transition-all bg-white"
                    value=""
                    onChange={(e) => updateAddOns(w.item.id, e.target.value)}
                    aria-label={`Select add-ons for ${w.item.name}`}
                  >
                    <option value="" disabled>
                      ✨ Add extras
                    </option>
                    {w.item.addOns.map((addOn) => (
                      <option
                        key={addOn.name}
                        value={addOn.name}
                        disabled={w.selectedAddOns.includes(addOn.name)}
                      >
                        {addOn.name} (+${addOn.price.toFixed(2)})
                      </option>
                    ))}
                  </select>
                  
                  {/* Selected Add-ons */}
                  {w.selectedAddOns.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {w.selectedAddOns.map((addOnName) => (
                        <div
                          key={addOnName}
                          className="flex items-center bg-gradient-to-r from-amber-100 to-orange-100 rounded-full px-3 py-1.5 text-sm text-amber-700 font-medium shadow-sm"
                        >
                          <span>{addOnName}</span>
                          <button
                            className="ml-2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-amber-600 hover:bg-amber-200 transition-all"
                            onClick={() => updateAddOns(w.item.id, addOnName)}
                            aria-label={`Remove ${addOnName} from ${w.item.name}`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary */}
      {wishlistArray.length > 0 && (
        <div className="p-6 bg-white border-t-2 border-amber-100">
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span className="font-semibold">-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (8%)</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
            <div className="border-t-2 border-amber-100 pt-3 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-2xl py-4 font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={proceedToCheckout}
            aria-label="Proceed to checkout"
          >
            Proceed to Checkout 🎉
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPanel;
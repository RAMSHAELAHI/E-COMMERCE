// app/cart/page.tsx (if using App Router) 
// OR pages/cart.tsx (if using Pages Router)

'use client'; // only if you're using App Router and handling client-side behavior

import React from 'react';
import { useRouter } from 'next/navigation'; // for App Router
// import { useRouter } from 'next/router'; // for Pages Router

const Cart = () => {
  const router = useRouter();

  // Simulated cart - replace this with real cart data from context or state
  const cartItems: any[] = []; // Empty for demonstration

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          🛒 Your Cart
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6 text-center w-full max-w-lg">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 px-6 rounded"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Render cart items here */}
      <h1 className="text-2xl font-bold mb-4">Your Cart Items</h1>
      {/* Map through cartItems */}
    </div>
  );
};

export default Cart;

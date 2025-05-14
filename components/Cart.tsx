// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useCart } from '@/app/context/CartContext';

// const Cart: React.FC = () => {
//   const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

//   const calculateSubtotal = () =>
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   const handleCheckout = () => {
//     // 🚀 Replace this with your real checkout integration
//     alert('Member Checkout clicked!');
//     // Example: redirect to Stripe checkout session, etc.
//     // Or call your /api/checkout endpoint
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6 flex items-center">
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
//           <path fillRule="evenodd" d="M10.5 3.75a6 6 0 00-3 10.397l3 5.2A2.25 2.25 0 0013.5 18a2.25 2.25 0 002.1-1.597l3-5.2a6 6 0 00-3-10.397H10.5zM12 6a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd" />
//         </svg>
//         Your Cart
//       </h1>

//       <div className="bg-white rounded-lg shadow-sm p-8">
//         {cartItems.length === 0 ? (
//           <div className="text-center text-gray-700">
//             <p className="mb-4">Your cart is empty.</p>
//             <Link href="/products" className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded">
//               Continue Shopping
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-6">
//             {cartItems.map((item) => (
//               <div key={item._id} className="flex items-center border rounded-lg p-4 shadow-sm">
//                 <div className="w-24 h-24 relative mr-4">
//                   <Image
//                     src={item.imgUrl}
//                     alt={item.title}
//                     fill
//                     className="object-cover rounded"
//                     unoptimized
//                   />
//                 </div>
//                 <div className="flex-grow">
//                   <h2 className="font-semibold">{item.title}</h2>
//                   <p className="text-gray-600">Price: ${item.price}</p>
//                   {item.size && <p className="text-gray-600">Size: {item.size}</p>}
//                   <div className="flex items-center mt-2">
//                     <button
//                       className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
//                       onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                     >
//                       -
//                     </button>
//                     <span className="mx-2">{item.quantity}</span>
//                     <button
//                       className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
//                       onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => removeFromCart(item._id)}
//                   className="text-red-500 hover:text-red-700"
//                   aria-label="Remove item"
//                 >
//                   🗑️
//                 </button>
//               </div>
//             ))}

//             {/* Order Summary */}
//             <div className="mt-6 border-t pt-4">
//               <h2 className="text-xl font-semibold">Order Summary</h2>
//               <div className="flex justify-between mt-2">
//                 <span>Subtotal:</span>
//                 <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <span>Delivery:</span>
//                 <span>Free</span>
//               </div>
//               <div className="flex justify-between mt-4 font-bold text-lg">
//                 <span>Total:</span>
//                 <span>${calculateSubtotal().toFixed(2)}</span>
//               </div>

//               <button
//                 className="w-full mt-4 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
//                 onClick={handleCheckout}
//               >
//                 Member Checkout
//               </button>

//               <button
//                 className="w-full mt-2 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition"
//                 onClick={clearCart}
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;
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


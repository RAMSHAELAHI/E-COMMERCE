'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, HeartOff } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart, CartItem } from '@/app/context/CartContext'; // Import useCart and CartItem
import { useWishlist, WishlistItem } from '@/app/context/WishlistContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  tag?: string;
}

const AllProducts = () => {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const products: Product[] = [
    { id: 1, name: 'Library Stool Chair', price: 20, image: '/images/01.jpg', tag: 'New' },
    { id: 2, name: 'Library Stool Chair', price: 20, originalPrice: 30, image: '/images/02.jpg', tag: 'Sales' },
    { id: 3, name: 'Library Stool Chair', price: 20, image: '/images/03.jpg' },
    { id: 4, name: 'Library Stool Chair', price: 20, image: '/images/01.jpg' },
    { id: 5, name: 'Library Stool Chair', price: 20, image: '/images/08.jpg', tag: 'New' },
    { id: 6, name: 'Library Stool Chair', price: 20, originalPrice: 30, image: '/images/06.jpg', tag: 'Sales' },
    { id: 7, name: 'Library Stool Chair', price: 20, image: '/images/07.jpg' },
    { id: 8, name: 'Library Stool Chair', price: 20, image: '/images/01.jpg' },
    { id: 9, name: 'Library Stool Chair', price: 20, image: '/images/grey wood2.png', tag: 'New' },
    { id: 10, name: 'Library Stool Chair', price: 20, originalPrice: 30, image: '/images/02.jpg', tag: 'Sales' },
    { id: 11, name: 'Library Stool Chair', price: 20, image: '/images/03.jpg' },
    { id: 12, name: 'Library Stool Chair', price: 20, image: '/images/bl wh2.png' },
  ];

  const toggleWishlist = (product: Product) => {
    const wishlistProduct: WishlistItem = {
      _id: product.id.toString(),
      title: product.name,
      price: product.price,
      imageUrl: product.image,
    };

    if (isInWishlist(wishlistProduct._id)) {
      removeFromWishlist(wishlistProduct._id);
      toast.error(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(wishlistProduct);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const handleAddToCartClick = (product: Product) => {
    const cartItem: CartItem = {
      _id: product.id.toString(),
      title: product.name,
      price: product.price,
      imgUrl: product.image,
      quantity: 1,
      // You might want to handle size selection later
    };
    addToCart(cartItem);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <article
            key={product.id}
            className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition duration-300 relative"
          >
            {product.tag && (
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-2 ${
                  product.tag === 'New' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-800'
                }`}
              >
                {product.tag}
              </span>
            )}

            <button
              className="absolute top-4 right-4 z-10"
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
            >
              {isInWishlist(product.id.toString()) ? (
                <Heart className="text-red-500 fill-red-500" />
              ) : (
                <HeartOff className="text-gray-400" />
              )}
            </button>

            <div className="w-full h-64 mb-4 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-full object-cover rounded"
                unoptimized
              />
            </div>

            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>

            <p className="text-gray-700 font-medium">
              ${product.price}
              {product.originalPrice && (
                <span className="line-through text-gray-500 ml-2">${product.originalPrice}</span>
              )}
            </p>

            <button
              className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-md shadow hover:bg-teal-600 transition w-full"
              onClick={() => handleAddToCartClick(product)}
            >
              Add to Cart
            </button>
          </article>
        ))}
      </div>

      <ToastContainer />
    </section>
  );
};

export default AllProducts;
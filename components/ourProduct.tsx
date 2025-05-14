"use client";

import React from "react";
import Image from "next/image"; // Use Next.js optimized Image component

const ProductGrid = () => {
  const products = [
    { id: 1, name: "Library Stool Chair", price: 20, image: "/images/01.jpg", tag: "New" },
    { id: 2, name: "Library Stool Chair", price: 20, originalPrice: 30, image: "/images/02.jpg", tag: "Sales" },
    { id: 3, name: "Library Stool Chair", price: 20, image: "/images/03.jpg" },
    { id: 4, name: "Library Stool Chair", price: 20, image: "/images/04.jpg" },
    { id: 5, name: "Library Stool Chair", price: 20, image: "/images/grey wood2.png", tag: "New" },
    { id: 6, name: "Library Stool Chair", price: 20, originalPrice: 30, image: "/images/06.jpg", tag: "Sales" },
    { id: 7, name: "Library Stool Chair", price: 20, image: "/images/black grey.png" },
    { id: 8, name: "Library Stool Chair", price: 20, image: "/images/08.jpg" },
  ];

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            {/* Image Container */}
            <div className="relative w-full h-60">
              {/* Optimized Image with Next.js */}
              <Image
                src={product.image}
                alt={product.name}
                width={300} // Set width
                height={300} // Set height
                className="w-full h-full object-cover rounded-md transition-transform duration-300 hover:scale-105 hover:opacity-90"
              />
              {/* Tag Display */}
              {product.tag && (
                <span
                  className={`absolute top-2 left-2 px-3 py-1 text-sm font-semibold rounded-full ${
                    product.tag === "New"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.tag}
                </span>
              )}
            </div>
            {/* Product Info */}
            <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
            <p className="text-gray-700 font-medium">
              ${product.price}
              {product.originalPrice && (
                <span className="line-through text-gray-500 ml-2">
                  ${product.originalPrice}
                </span>
              )}
            </p>
            {/* Add to Cart Button */}
            <button
              className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-md shadow hover:bg-teal-600 transition w-full"
              aria-label={`Add ${product.name} to cart`}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;

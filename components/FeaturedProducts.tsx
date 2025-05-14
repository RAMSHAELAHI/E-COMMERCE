"use client";

import React from "react";
import Image from "next/image";

const FeaturedProducts = () => {
  const products = [
    { id: 1, name: "Library Stool Chair", price: 20, image: "/images/01.jpg", tag: "New" },
    { id: 2, name: "Library Stool Chair", price: 20, originalPrice: 30, image: "/images/02.jpg", tag: "Sales" },
    { id: 3, name: "Library Stool Chair", price: 20, image: "/images/03.jpg" },
    { id: 4, name: "Library Stool Chair", price: 20, image: "/images/04.jpg" },
    { id: 5, name: "Library Stool Chair", price: 20, image: "/images/05.jpg" },
     
  ];

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between"
          >
            {product.tag && (
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4 ${
                  product.tag === "New" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {product.tag}
              </span>
            )}

            <div className="w-auto h-64 mb-4 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/fallback.png"; // Use a default fallback
                }}
              />
            </div>

            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>

            <p className="text-gray-700 font-medium">
              ${product.price}
              {product.originalPrice && (
                <span className="line-through text-gray-500 ml-2">
                  ${product.originalPrice}
                </span>
              )}
            </p>

            <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-md shadow hover:bg-teal-600 transition w-full">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@sanity/client";

// Initialize Sanity client
const sanity = createClient({
  projectId: "pux4p4jv",
  dataset: "production",
  apiVersion: "v2023-08-01",
  useCdn: true,
});

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  discountPercentage?: number;
  imageUrl: string;
  tags?: string[];
}

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Sanity
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const query = `
       *[_type == "products"] {
        _id, // ✅ FIXED: Ensure unique key
        title,
        price,
        priceWithoutDiscount,
        badge,
        "imageUrl": image.asset->url,
        category->{
          title
        },
        description,
        inventory,
        tags
      }
      `;
      const data: Product[] = await sanity.fetch(query);
      console.log("Fetched Products:", data); // ✅ Check API response
      setProducts(data);
    } catch (error) {
      console.error("Error Fetching Products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.title} has been added to your cart!`);
  };

  // Truncate description
  const truncateDescription = (description: string) => {
    return description.length > 100 ? description.substring(0, 100) + "..." : description;
  };

  return (
    <div className="p-4">
      <h2 className="text-center text-slate-800 mt-4 mb-4">Products From API's Data</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id} // ✅ Now it's unique
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={300}
                height={300}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-slate-800">{truncateDescription(product.description)}</p>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-slate-600 font-bold">${product.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap mt-2">
                  {product.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded-lg mr-2 mb-2"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Add to Cart Button */}
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Summary */}
      <div className="mt-8 bg-slate-100 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-black text-red-800">Cart Summary</h2>
        {cart.length > 0 ? (
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white shadow-sm p-4 rounded-md"
              >
                <div>
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="text-sm text-blue-600">${item.price.toFixed(2)}</p>
                </div>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-black text-center">Your Cart is empty! Please add products.</p>
        )}
      </div>
    </div>
  );
};

export default ProductCards;

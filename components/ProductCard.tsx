"use client";

import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount?: number;
  imageUrl: string;
  badge?: string;
  description?: string;
  inventory?: number;
  tags?: string[];
}

export default function OurProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = groq`
        *[_type == "products"] {
          _id, // ✅ Ensure _id is fetched
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
        }`;

      const data: Product[] = await client.fetch(query);
      console.log("Fetched Products:", data); // ✅ Check API response in console
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // ✅ Ensure unique keys using _id
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl text-center font-semibold text-[#1C1B1F] tracking-tight mb-8">
        Our Products
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product._id} className="group relative rounded-lg bg-white">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              {product.badge && (
                <Badge className="absolute left-3 top-3 bg-emerald-500 hover:bg-emerald-600">
                  {product.badge}
                </Badge>
              )}
              <Link href={`/product/${product._id}`}>
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  height={400}
                  width={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm text-[#1C1B1F]">{product.title}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-lg font-medium text-[#1C1B1F]">
                    ${product.price}
                  </span>
                  {product.priceWithoutDiscount && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.priceWithoutDiscount}
                    </span>
                  )}
                </div>
              </div>
              <button className="rounded-full bg-[#00B5A5] p-2 text-white transition-colors hover:bg-[#00A294]">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Add to cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



// "use client";

// import { ShoppingCart } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { groq } from "next-sanity";
// import { client } from "@/sanity/lib/client";

// interface Product {
//   _id: string;
//   title: string;
//   price: number;
//   priceWithoutDiscount?: number;
//   imageUrl: string;
//   badge?: string;
//   description?: string;
//   inventory?: number;
//   tags?: string[];
// }

// export default function OurProduct() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true); // Added loading state
  

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const query = groq`*[_type == "products"][0..8] {
//         _id,
//         title,
//         price,
//         priceWithoutDiscount,
//         "imageUrl": image.asset->url,
//         badge,
//         description,
//         inventory,
//         tags
//       }`;

//       try {
//         const data: Product[] = await client.fetch(query);
//         console.log("Fetched products:", data);

//         // Ensure unique _id and filter out duplicates or missing _id values
//         const uniqueProducts = data.reduce<Product[]>((acc, product) => {
//           if (product._id && !acc.some((p) => p._id === product._id)) {
//             acc.push(product);
//           } else {
//             console.error("Duplicate or missing _id detected:", product);
//           }
//           return acc;
//         }, []);

//         setProducts(uniqueProducts);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-20">
//       <h1 className="text-3xl text-center font-semibold text-[#1C1B1F] tracking-tight mb-8">
//         Our Products
//       </h1>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading products...</p>
//       ) : products.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product, index) => (
//   <div key={product._id || `product-${index}`} className="group relative rounded-lg bg-white">

//               <div className="relative aspect-square overflow-hidden rounded-lg">
//                 {product.badge && (
//                   <Badge className="absolute left-3 top-3 bg-emerald-500 hover:bg-emerald-600">
//                     {product.badge}
//                   </Badge>
//                 )}
//                 <Link href={`/components/productDescription/description`}>
//                   <Image
//                     src={product.imageUrl}
//                     alt={product.title}
//                     height={400}
//                     width={400}
//                     className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//                   />
//                 </Link>
//               </div>
//               <div className="mt-4 flex items-center justify-between">
//                 <div>
//                   <h3 className="text-sm text-[#1C1B1F]">{product.title}</h3>
//                   <div className="mt-1 flex items-center gap-2">
//                     <span className="text-lg font-medium text-[#1C1B1F]">
//                       ${product.price}
//                     </span>
//                     {product.priceWithoutDiscount && (
//                       <span className="text-sm text-gray-500 line-through">
//                         ${product.priceWithoutDiscount}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <button className="rounded-full bg-[#00B5A5] p-2 text-white transition-colors hover:bg-[#00A294]">
//                   <ShoppingCart className="h-5 w-5" />
//                   <span className="sr-only">Add to cart</span>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No products available.</p>
//       )}
//     </div>
//   );
// }

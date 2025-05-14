"use client"; //

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Datafetch = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = await client.fetch(
          `*[_type == "products"] {
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
          }`
        );
        setProducts(query);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {products.map((product: any, index: number) => (
        <div key={index}>
          <h1>{product.title}</h1>
          <p>{product.price}</p>
          {product.imageUrl && (
            <Image
              src={urlFor(product.imageUrl).url()}
              alt={product.title}
              width={100}
              height={100}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Datafetch;

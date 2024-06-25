"use client";
import { useWixClient } from "@/hooks/useWixClient";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

const PRODUCT_PER_PAGE = 20;

const ProductList = ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const [data, setData] = useState<products.Product[]>([]);
  const WixClient = useWixClient();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await WixClient.products
          .queryProducts()
          .eq("collectionIds", categoryId)
          .limit(limit || PRODUCT_PER_PAGE)
          .find();

        setData(res.items);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, [categoryId, limit, WixClient]);
  console.log(data);
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {data.map((product: products.Product) => (
        <Link
          href={"/" + product.slug}
          className="relative w-full h-80 flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}
        >
          <div className="relative w-full h-80">
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              alt={product.name || ""}
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
            />
            {product.media?.items && (
              <Image
                src={product.media?.items[1]?.image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.price?.price}</span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find(
                    (section: any) => section.title === "shortSECS"
                  )?.description || ""
                ),
              }}
            ></div>
          )}
          <button className="rounded-2xl ring-1 ring-[#F35C7A] text-[#F35C7A] w-max py-2 px-4 text-xs hover:bg-[#F35C7A] hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;

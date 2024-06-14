import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductList = () => {
  return (
    <div className="mt-12 flex gap-x-8 gay-y-16 justify-between flex-wrap">
      <Link
        href="/test"
        className="relative w-full h-80 flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="/KMI_logo.png"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Product Name</span>
          <span className="font-semibold">$44</span>
        </div>
        <div className="text-sm text-gray-500">DESC</div>
        <button className="rounded-2xl ring-1 ring-[#F35C7A] text-[#F35C7A] w-max py-2 px-4 text-xs hover:bg-[#F35C7A] hover:text-white">
          Add to Cart
        </button>
      </Link>
    </div>
  );
};

export default ProductList;

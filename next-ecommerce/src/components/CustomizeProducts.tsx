"use client";

import { products } from "@wix/stores";
import { useState } from "react";

const CustomizeProducts = ({
  productId,
  varriants,
  productOptions,
}: {
  productId: string;
  varriants: products.Variant[];
  productOptions: products.ProductOption[];
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  const isVarriantInStock = (choice: { [key: string]: string }) => {
    return varriants.some((varriant) => {
      const varriantChoices = varriant.choices;

      if (!varriantChoices) return false;
      return (
        Object.entries(choice).every(
          ([key, value]) => varriantChoices[key] === value
        ) &&
        varriant.stock?.inStock &&
        varriant.stock?.quantity &&
        varriant.stock?.quantity > 0
      );
    });
  };
  console.log("SELECTED : >>>> ", selectedOptions);
  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <div className="flex flex-col gap-4" key={option.name}>
          <h4 className="font-medium">Choose a {option.name}</h4>
          <ul className="flex items-center gap-3">
            {option.choices?.map((choice) => {
              const disable = !isVarriantInStock({
                ...selectedOptions,
                [option.name!]: choice.description!,
              });

              const selected =
                selectedOptions[option.name!] === choice.description;

              const clickHandler = disable
                ? undefined
                : () => handleOptionSelect(option.name!, choice.description!);

              return option.name === "Color" ? (
                <>
                  <li
                    className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500"
                    style={{
                      backgroundColor: choice.value,
                      cursor: disable ? "not-allowed" : "pointer",
                    }}
                    onClick={clickHandler}
                  >
                    {selected && (
                      <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                    {disable && (
                      <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " />
                    )}
                  </li>
                </>
              ) : (
                <>
                  <li
                    className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm"
                    style={{
                      cursor: disable ? "not-allowed" : "pointer",
                      backgroundColor: selected
                        ? "#f35c7a"
                        : disable
                        ? "#FBCFE8"
                        : "white",
                      color: selected || disable ? "white" : "#f35c7a",
                      boxShadow: disable ? "none" : "",
                    }}
                    key={choice.description}
                    onClick={clickHandler}
                  >
                    {choice.description}
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CustomizeProducts;

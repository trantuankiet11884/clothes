"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface PaginationProps {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  hasPrev,
  hasNext,
  onPageChange,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    createPageUrl(page);
    onPageChange(page);
  };

  return (
    <div className="mt-12 flex justify-between w-full">
      <button
        className="rounded-md bg-p text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrev}
      >
        Previous
      </button>
      <button
        className="rounded-md bg-p text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

import { wixClientServer } from "@/lib/wixClientServer";

export async function getProductData(
  categoryId: string,
  limit?: number,
  searchParams?: any
) {
  const wixClient = await wixClientServer();

  let productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || 8)
    .skip(
      searchParams?.page ? (parseInt(searchParams.page) - 1) * (limit || 8) : 0
    );

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");
    if (sortType === "asc") {
      productQuery = productQuery.ascending(sortBy);
    }
    if (sortType === "desc") {
      productQuery = productQuery.descending(sortBy);
    }
  }

  const res = await productQuery.find();
  return {
    items: res.items,
    hasPrev: res.hasPrev(),
    hasNext: res.hasNext(),
  };
}

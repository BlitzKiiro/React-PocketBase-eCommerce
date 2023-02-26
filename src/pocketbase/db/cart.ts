import pb from "../config";
import { QueryFunctionContext } from "@tanstack/react-query";
import { CartItemRecord } from "../interfaces/cart";
import { ProductRecord } from "../interfaces/products";

const getProductThumb = (record: ProductRecord, filename: string): string => {
  return pb.getFileUrl(record, filename, { thumb: "100x100" });
};

const getTotalInvoice = (cartItems: CartItemRecord[]) => {
  let total = 0;
  cartItems.forEach((item) => {
    total += (item.expand?.item as ProductRecord).price * item.quantity;
  });
  return total;
};

const getTotalItems = (cartItems: CartItemRecord[]) => {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.quantity;
  });
  return total;
};

export const getCartItems = async ({
  queryKey,
}: QueryFunctionContext<
  [string, boolean | undefined, string | null | undefined]
>): Promise<{
  totalItems: number;
  totalInvoice: number;
  cartItems: CartItemRecord[];
}> => {
  const isOnline = queryKey[1];
  const userId = queryKey[2];
  if (isOnline) {
    const items: CartItemRecord[] = await pb
      .collection("cart")
      .getFullList(200 /* batch size */, {
        sort: "-created",
        filter: `user='${userId}'`,
        expand: "item",
      });
    items.forEach((item) => {
      const product = item.expand?.item as ProductRecord;
      product.img = getProductThumb(product, product.img);
    });

    const totalItems = getTotalItems(items);
    const totalInvoice = getTotalInvoice(items);

    return { cartItems: items, totalItems, totalInvoice };
  } else {
    const localCartItems = JSON.parse(localStorage.getItem("cart") ?? "[]");
    return localCartItems;
  }
};

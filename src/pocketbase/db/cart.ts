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
  return total.toFixed(2);
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
  totalInvoice: string;
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
    const totalItems = getTotalItems(localCartItems);
    const totalInvoice = getTotalInvoice(localCartItems);
    return { cartItems: localCartItems, totalItems, totalInvoice };
  }
};

export const addItemToCart = async (query: {
  isOnline: boolean | undefined;
  itemID: string;
  product: ProductRecord;
  quantity: number;
  userId?: string;
}) => {
  if (query.isOnline) {
    try {
      const record: CartItemRecord = await pb
        .collection("cart")
        .getFirstListItem(`user="${query.userId}" && item="${query.itemID}" `);
      await pb.collection("cart").update(record.id as string, {
        "quantity+": query.quantity,
      });
    } catch (error: any) {
      if (error.status == 404) {
        const data = {
          user: query.userId,
          item: query.itemID,
          quantity: query.quantity,
        };
        await pb.collection("cart").create(data);
      } else throw new Error(error.message);
    }
  } else {
    const localCartItems = JSON.parse(
      localStorage.getItem("cart") ?? "[]"
    ) as any[];

    const existingItemIndex = localCartItems.findIndex((item) => {
      return item.item == query.itemID;
    });
    console.log(existingItemIndex);

    if (existingItemIndex != -1) {
      localCartItems[existingItemIndex].quantity += query.quantity;
    } else {
      const data = {
        item: query.itemID,
        quantity: query.quantity,
        expand: {
          item: query.product,
        },
      };
      localCartItems.push(data);
    }

    localStorage.setItem("cart", JSON.stringify(localCartItems));
  }
};

export const removeItemFromCart = async (query: {
  itemID: string;
  isonline?: boolean;
  productID?: string;
}) => {
  if (query.isonline) {
    await pb.collection("cart").delete(query.itemID);
  } else {
    const localCart = JSON.parse(localStorage.getItem("cart")!) as any[];
    const newCart = localCart.filter((item) => {
      return item.item != query.productID;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
  }
};

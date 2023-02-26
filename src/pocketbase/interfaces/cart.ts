import { Record } from "pocketbase";
import { ProductRecord } from "./products";

interface CartItem {
  user: string;
  item: string;
  quantity: number;
  expand?: {
    item: ProductRecord;
  };
}

export type CartItemRecord = CartItem | Record;

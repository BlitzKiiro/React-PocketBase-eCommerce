export interface Product {
  id: string;
  created: string;
  updated: string;
  "@collectionId": string;
  "@collectionName": string;
  name: string;
  price: number;
  amount: number;
  img: string;
  categories: Array<string>;
}

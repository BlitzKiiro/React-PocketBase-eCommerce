import { Record } from "pocketbase";

export interface Category {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
  name: string;
}

export type CategoryRecord = Category | Record;

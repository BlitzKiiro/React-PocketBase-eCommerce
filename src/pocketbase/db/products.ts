import pb from "../config";
import { ProductRecord } from "../interfaces/products";
import { QueryFunctionContext } from "@tanstack/react-query";

const getProductThumb = (record: ProductRecord, filename: string): string => {
  return pb.getFileUrl(record, filename, { thumb: "100x100" });
};

export const getProductsList = async ({
  queryKey,
}: QueryFunctionContext<[string, number, string | null, string | null]>) => {
  const sort = queryKey[2] ?? "-created";
  const filter = queryKey[3] ? `categories~'${queryKey[3]}'` : "";
  const resultList = await pb.collection("products").getList(queryKey[1], 12, {
    sort,
    filter,
    expand: " categories",
  });
  const items: Array<ProductRecord> = resultList.items.map(
    (item: ProductRecord) => {
      const img = getProductThumb(item, item.img);
      return { ...item, img } as ProductRecord;
    }
  );
  return { ...resultList, items };
};

import pb from "../config";

export const addToCart = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  await pb.collection("users").update(userId, {
    "wishlist-": productId,
  });
  await pb.collection("users").update(userId, {
    "cart+": productId,
  });
};

export const addToWishList = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  await pb.collection("users").update(userId, {
    "wishlist+": productId,
  });
  await pb.collection("users").update(userId, {
    "cart-": productId,
  });
};

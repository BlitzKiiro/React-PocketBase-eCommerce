import pb from "../config";

const authStore = pb.authStore;

export const getCurrentUser = () => {
  return authStore.model;
};

export const loginWithPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await await pb.collection("users").authWithPassword(email, password);
};

export const registerWithPassword = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  await await pb.collection("users").create({
    name,
    email,
    password,
    passwordConfirm: password,
  });
};

export const userLogOut = () => {
  authStore.clear();
};

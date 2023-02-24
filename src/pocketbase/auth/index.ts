import pb from "../config";
import { UserRecord } from "../interfaces/users";

const authStore = pb.authStore;

export const getAuthStatus = () => {
  return authStore.isValid;
};

export const loginWithPassword = async (email: string, password: string) => {
  const authData = await await pb
    .collection("users")
    .authWithPassword(email, password);
  return authData;
};

export const registerWithPassword = async (
  name: string,
  email: string,
  password: string
) => {
  await await pb.collection("users").create({
    name,
    email,
    password,
    passwordConfirm: password,
  });
  const authData = await await pb
    .collection("users")
    .authWithPassword(email, password);
  return authData;
};

export const clearAuth = () => {
  authStore.clear();
};

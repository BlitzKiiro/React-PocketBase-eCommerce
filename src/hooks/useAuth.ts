import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../pocketbase/auth";

const useAuth = () => {
  const { data, refetch } = useQuery(["user"], getCurrentUser);
  return { user: data, refetchUser: refetch };
};

export default useAuth;

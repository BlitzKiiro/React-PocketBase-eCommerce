import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../pocketbase/auth";

const useAuth = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery(["user"], getCurrentUser);
  const refreshUser = () => {
    queryClient.invalidateQueries(["user"]);
  };

  return { user: data, refreshUser };
};

export default useAuth;

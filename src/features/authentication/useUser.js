import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

const useUser = () => {
  const {
    isLoading: isLoadingUser,
    error,
    data: user,
    fetchStatus,
    isFetching,
  } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });

  return {
    isLoadingUser,
    user,
    isAuthenticated: user?.user.role === "authenticated",
    isFetching,
  };
};

export default useUser;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useLogout = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { isLoading: isLoggingOut, mutate: handleLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isLoggingOut, handleLogout };
};

export default useLogout;

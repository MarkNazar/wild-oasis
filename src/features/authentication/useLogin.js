import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isLoading: isLoggingIn, mutate: handleLogin } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      toast.success("Login Successfully");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoggingIn, handleLogin };
};

export default useLogin;

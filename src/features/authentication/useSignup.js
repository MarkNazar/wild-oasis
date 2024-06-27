import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

const useSignup = () => {
  const { isLoading: isSigningup, mutate: handleSignup } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signup({ email, password, fullName }),
    onSuccess: (user) => {
      toast.success(
        "New user created succesfully. Please verify the new account from the users's email address"
      );
    },
    onError: (err) => toast.error(err.message),
  });
  return { isSigningup, handleSignup };
};

export default useSignup;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate: handleUpdateSetting } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Setting updated succesfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, handleUpdateSetting };
};

export default useUpdateSetting;

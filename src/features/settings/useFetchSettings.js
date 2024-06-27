import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

const useFetchSettings = () => {
  const { isLoading, data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, settings };
};

export default useFetchSettings;

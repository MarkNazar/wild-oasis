import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { ITEM_PER_PAGE } from "../../utils/constants";

const useFetchBookings = () => {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  //filter value

  const filterValue = searchParams.get("status") || "all";

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  //sort value

  const sortValue = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortValue.split("-");
  const modifier = direction === "asc";

  const sortBy = { field, modifier };

  //pagination

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const {
    isLoading,
    data: { bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  const pageCount = Math.ceil(count / ITEM_PER_PAGE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, error, count };
};

export default useFetchBookings;

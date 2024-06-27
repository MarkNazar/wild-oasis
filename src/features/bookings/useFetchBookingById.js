import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

const useFetchBookingById = () => {
  const { bookingId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  return { data, isLoading, error };
};

export default useFetchBookingById;

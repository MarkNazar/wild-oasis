import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

const useCheckin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: isCheckingIn, mutate: checkin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} succesfully checked in`);
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCheckingIn, checkin };
};

export default useCheckin;

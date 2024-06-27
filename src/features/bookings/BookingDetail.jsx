import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useFetchBookingById from "./useFetchBookingById";
import Spinner from "../../ui/Spinner";
import PageNotFound from "../../pages/PageNotFound";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import toast from "react-hot-toast";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { data: booking = {}, isLoading, error } = useFetchBookingById();
  const { isDeleting, handleDeleteBooking } = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const navigate = useNavigate();

  const { status, id: bookingId } = booking;

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (error) return <PageNotFound />;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <>
          {status === "unconfirmed" && (
            <Button
              disabled={isCheckingOut}
              onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              Check in
            </Button>
          )}
          {status === "checked-in" && (
            <Button
              disabled={isCheckingOut}
              onClick={() => checkout(bookingId)}
            >
              Check Out
            </Button>
          )}
          <Modal>
            <Modal.Open opens="delete-booking">
              <Button variation="danger">Delete</Button>
            </Modal.Open>

            <Modal.Window name="delete-booking">
              <ConfirmDelete
                resourceName="bookings"
                onConfirm={() =>
                  handleDeleteBooking(bookingId, {
                    onSuccess: () => navigate("/bookings"),
                    onError: (err) => toast.error(err.message),
                  })
                }
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
          <Button
            disabled={isCheckingOut}
            variation="secondary"
            onClick={moveBack}
          >
            Back
          </Button>
        </>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useFetchSettings from "./useFetchSettings";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useFetchSettings();
  const {
    breakfastPrice,
    maxBookingLength,
    maxGuestsPerBooking,
    minimumBookingLength,
  } = settings;

  const { isLoading: isUpdating, handleUpdateSetting } = useUpdateSetting();

  const { register } = useForm();

  const handleUpdate = (e) => {
    const value = e.target.value;
    if (+value === +settings[e.target.name]) return;
    if (!value) return;
    const newSetting = {
      [e.target.name]: value,
    };
    handleUpdateSetting(newSetting);
  };

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minimumBookingLength}
          disabled={isUpdating}
          {...register("minimumBookingLength", {
            onBlur: (e) => handleUpdate(e),
          })}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          {...register("maxBookingLength", {
            onBlur: (e) => handleUpdate(e, "maxBookingLength"),
          })}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          {...register("maxGuestsPerBooking", {
            onBlur: (e) => handleUpdate(e, "maxGuestsPerBooking"),
          })}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          {...register("breakfastPrice", {
            onBlur: (e) => handleUpdate(e, "breakfastPrice"),
          })}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

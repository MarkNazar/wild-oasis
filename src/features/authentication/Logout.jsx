import React from "react";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import SpinnerMini from "../../ui/SpinnerMini";

const Logout = () => {
  const { isLoggingOut, handleLogout } = useLogout();
  return (
    <ButtonIcon disabled={isLoggingOut} onClick={handleLogout}>
      {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
};

export default Logout;

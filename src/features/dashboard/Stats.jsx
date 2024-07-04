import React from "react";
import Stat from "./Stat";
import { HiOutlineBriefcase } from "react-icons/hi";
import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  const numBookings = bookings.length;
  const sales = bookings?.reduce((sum, current) => {
    return (sum += current.totalPrice);
  }, 0);

  const checkIns = confirmedStays.length;
  const occupancyRate =
    confirmedStays.reduce((sum, current) => {
      return (sum += current.numNights);
    }, 0) /
    (cabinCount * numDays);

  // console.log(numDays, cabinCount);
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        color="blue"
        value={numBookings}
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        color="green"
        value={formatCurrency(sales)}
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check Ins"
        color="indigo"
        value={checkIns}
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy Rate"
        color="yellow"
        value={Math.round(occupancyRate * 100) + "%"}
      />
    </>
  );
};

export default Stats;

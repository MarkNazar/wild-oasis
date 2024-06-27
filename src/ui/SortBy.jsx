import { useState } from "react";
import Select from "../ui/Select";
import { useSearchParams } from "react-router-dom";

const SortBy = ({ options, filterField }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "";
  const handleChange = (e) => {
    const value = e.target.value;
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  };
  return (
    <Select
      options={options}
      value={sortBy}
      type="white"
      onChange={handleChange}
    />
  );
};

export default SortBy;

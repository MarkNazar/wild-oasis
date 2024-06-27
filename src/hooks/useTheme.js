import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error("Theme context was used outside of theme provider");
  return context;
};

export default useTheme;

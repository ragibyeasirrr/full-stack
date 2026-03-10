
import { createContext } from "react";
import usebookingcart from "./usebookingcart";


const bookingcartContext = createContext();

export const BookingcartProvider = ({ children }) => {
  const allValue = usebookingcart();
  return (
    <bookingcartContext.Provider value={allValue}>{children}</bookingcartContext.Provider>
  );
};

export default bookingcartContext;

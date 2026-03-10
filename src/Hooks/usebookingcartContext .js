import { useContext } from "react";
import bookingcartContext from "./bookingcartContext";


const usebookingCartContext = () => {
  return useContext(bookingcartContext);
};

export default usebookingCartContext ;
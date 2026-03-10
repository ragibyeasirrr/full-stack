


import { useState } from "react";
import { FaCheck, FaCalendarCheck } from "react-icons/fa";
 import usebookingCartContext from "../Hooks/usebookingcartContext ";

const Addtobookingcart = ({ room }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { AddCartItems } = usebookingCartContext();

  const addToCart = async () => {
    setIsAdding(true);
    console.log("Adding room to cart:", room);
    try {
      const result = await AddCartItems(room.id);
      console.log("AddCartItems result:", result);
      setIsAdded(true);
      setIsAdding(false);
    } catch (error) {
      console.log("AddCartItems error:", error);
      setIsAdding(false);
    }
  };

 

  return (
    <div className="space-y-4">
      <button
        className="btn btn-primary w-full"
        onClick={addToCart}
        disabled={isAdding || isAdded || !room.available}
      >
        {isAdding ? (
          <span className="flex items-center">
            <span className="loading loading-spinner loading-sm mr-2"></span>
            Adding...
          </span>
        ) : isAdded ? (
          <span className="flex items-center">
            <FaCheck className="mr-2 h-4 w-4" />
            Selected
          </span>
        ) : (
          <span className="flex items-center">
            <FaCalendarCheck className="mr-2 h-4 w-4" />
           Select For Booking
          </span>
        )}
      </button>
    </div>
  );
};

export default Addtobookingcart;
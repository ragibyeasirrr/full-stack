


import { Suspense, useEffect, useState } from "react";
import usebookingCartContext from "../Hooks/usebookingcartContext ";
import Bookingcartlist from "./Bookingcartlist";
import Bookingcartsummary from "./Bookingcartsummary";

const Bookingcart = () => {
  const {
    cart,
    cartId,
    loading,
    createOrGetCart,
    // updateCartItemQuantity,
    deleteCartItems,
  } = usebookingCartContext();

  const [localCart, setLocalCart] = useState(cart);


  useEffect(() => {
    if (!cart && !loading) createOrGetCart();
  }, [createOrGetCart, cart, loading]);

  useEffect(() => {
    setLocalCart(cart);

    // console.log(" Current cart from backend:", cart);
    // console.log(" LocalCart state:", localCart);
  }, [cart]);

  if (loading) return <p>Loading...</p>;
  if (!localCart) return <p>No Booking Cart Found</p>;


  const handleRemoveItem = async (itemId) => {
    setLocalCart((prevLocalCart) => {
      const updatedItems = prevLocalCart.CartBookingRoom.filter(
        (item) => item.id !== itemId
      );

      return {
        ...prevLocalCart,
        CartBookingRoom: updatedItems,
      };
    });

    try {
      await deleteCartItems(itemId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Suspense fallback={<p>Loading Booking Cart...</p>}>
            <Bookingcartlist
              items={localCart.CartBookingRoom}
              // handleUpdateQuantity={handleUpdateQuantity}
              handleRemoveItem={handleRemoveItem}
            />
          </Suspense>
        </div>
        <div>
          <Bookingcartsummary
            totalPrice={localCart.total_price}
            itemCount={localCart.CartBookingRoom.length}
            cartId={cartId}
          />
        </div>
      </div>
    </div>
  );
};

export default Bookingcart;
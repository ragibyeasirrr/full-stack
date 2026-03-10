


import { useCallback, useEffect, useState } from "react";
import authApiClient from "../mainlinks/auth-apiclient";

const usebookingcart = () => {
  const [authToken] = useState(
    () => JSON.parse(localStorage.getItem("authTokens"))?.access
  );
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [loading, setLoading] = useState(false);

  
  const createOrGetCart = useCallback(async () => {
  setLoading(true);
  try {
    if (!cartId) {
      const response = await authApiClient.post("/cart_booking/");
      localStorage.setItem("cartId", response.data.id);
      setCartId(response.data.id);
      setCart(response.data);
    } else {
      try {
        const response = await authApiClient.get(`/cart_booking/${cartId}/`);
        setCart(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          const response = await authApiClient.post("/cart_booking/");
          localStorage.setItem("cartId", response.data.id);
          setCartId(response.data.id);
          setCart(response.data);
        } else {
          throw err;
        }
      }
    }
  } catch (error) {
    console.log("Cart error:", error);
  } finally {
    setLoading(false);
  }
}, [cartId]);

  const AddCartItems = useCallback(
    async (room_id) => {
      setLoading(true);
      try {
        if (!cartId) await createOrGetCart();
        const response = await authApiClient.post(
          `/cart_booking/${cartId}/bookingroom/`,
          { cartRoom_id: room_id }
        );
        setCart((prevCart) => ({
          ...prevCart,
          CartBookingRoom: [...(prevCart?.CartBookingRoom || []), response.data],
        }));
        return response.data;
      } catch (error) {
        console.log("Error adding Items:", error);
      } finally {
        setLoading(false);
      }
    },
    [cartId, createOrGetCart]
  );

  const deleteCartItems = useCallback(
    async (roomId) => {
      try {
        await authApiClient.delete(
          `/cart_booking/${cartId}/bookingroom/${roomId}/`
        );
        setCart((prevCart) => ({
          ...prevCart,
          CartBookingRoom: prevCart.CartBookingRoom.filter(
            (item) => item.id !== roomId
          ),
        }));
      } catch (error) {
        console.log("Error deleting item:", error);
      }
    },
    [cartId]
  );

  useEffect(() => {
    const initializeCart = async () => {
      await createOrGetCart();
    };
    initializeCart();
  }, [createOrGetCart]);

  return {
    cart,
    loading,
    cartId,
    createOrGetCart,
    AddCartItems,
    deleteCartItems,
  };
};

export default usebookingcart;
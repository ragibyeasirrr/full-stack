

import authApiClient from "../mainlinks/auth-apiclient";

const Bookingcartsummary = ({ totalPrice, itemCount, cartId }) => {

  const shipping = 0; 
  const tax = 0; 
  const bookingTotal = parseFloat(totalPrice);

  const deleteCart = () => {
    localStorage.removeItem("cartId");
  };

  const createBooking = async () => {
    try {
      const booking = await authApiClient.post("/bookings/", { cartbooking_id: cartId });
      if (booking.status === 201) {
        deleteCart();
        alert("Booking placed successfully");
        window.location.reload(); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal {itemCount} rooms</span>
            <span>${parseFloat(totalPrice).toFixed(2)}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Total Price</span>
              <span>${bookingTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button
            disabled={itemCount === 0}
            onClick={createBooking}
            className="btn btn-primary w-full"
          >
            Proceed to Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bookingcartsummary;
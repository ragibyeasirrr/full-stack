


import { useState } from "react";
import Bookingtable from "./Bookingtable";
import useAuthContext from "../Hooks/UseAuthcontext";
import authApiClient from "../mainlinks/auth-apiclient";


const BookingCard = ({ booking, onCancel }) => {
  const { user } = useAuthContext();

  const [status, setStatus] = useState(booking.status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;

    try {
      const response = await authApiClient.patch(
        `/bookings/${booking.id}/update_status/`,
        { status: newStatus }
      );

      if (response.status === 200) {
        setStatus(newStatus);
        alert(response.data.status);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const handlePayment = async () => {
  setLoading(true);

  try {
    console.log("User:", user);
    console.log("Booking data:", {
      amount: booking.total_price,
      orderId: booking.id,
      numItems: booking.rooms?.length,
    });

    const response = await authApiClient.post("/payment/initiate/", {
      amount: booking.total_price,
      orderId: booking.id,
      numItems: booking.rooms?.length,
    });

    console.log("Payment response:", response.data);

    if (response.data.payment_url) {
      window.location.href = response.data.payment_url;
    } else {
      alert("Payment failed");
    }
  } catch (error) {
    console.log("Payment error:", error.response || error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
      <div className="bg-gray-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold">Booking #{booking.id}</h2>
          <p className="text-gray-600 text-sm">Placed on {booking.created_at}</p>
        </div>

        <div className="flex gap-2">
          {user.is_staff ? (
            <select
              value={status}
              onChange={handleStatusChange}
              className="px-3 py-1 rounded-full text-white text-sm font-medium bg-blue-500"
            >
              <option value="not paid">Not Paid</option>
              <option value="pending">Pending</option>
              <option value="booked">Booked</option>
              <option value="cancel">Canceled</option>
            </select>
          ) : (
            <span
              className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                status === "not paid" ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {status}
            </span>
          )}

          {status !== "booked" && status !== "cancel" && !user.is_staff && (
            <button
              onClick={() => onCancel(booking.id)}
              className="text-blue-700 hover:underline"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-medium text-lg mb-4">Booking Rooms</h3>
        <Bookingtable items={booking.rooms} />
      </div>

      <div className="border-t p-6 flex flex-col items-end">
        <div className="space-y-2 w-full max-w-[200px]">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${booking.total_price.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>

          <div className="flex justify-between font-bold border-t pt-2">
            <span>Total:</span>
            <span>${booking.total_price.toFixed(2)}</span>
          </div>
        </div>

        {!user.is_staff && status === "pending" && (
          <button
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
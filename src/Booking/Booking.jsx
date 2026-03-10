

import { useEffect, useState } from "react";

import authApiClient from "../mainlinks/auth-apiclient";
import BookingCard from "./Bookingcard";


const Booking = () => {
  const [bookings, setBookings] = useState([]);




useEffect(() => {
  authApiClient.get("/bookings/").then((res) => {
    console.log("Bookings API:", res.data);
    
    setBookings(res.data.results || res.data);
  });
}, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await authApiClient.post(`/bookings/${bookingId}/cancel/`);
      if (response.status === 200) {
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b.id === bookingId ? { ...b, status: "cancel" } : b
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Booking Details</h1>
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onCancel={handleCancelBooking}
        />
      ))}
    </div>
  );
};

export default Booking;
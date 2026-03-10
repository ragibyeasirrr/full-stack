import { Route, Routes } from "react-router-dom";
import HotelLayout from "../Layout/HotelLayout";
import Home from "../Page/Home";
import Showrooms from "../Show-rooms/Showrooms";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ActivateAccount from "../Auth/ActivateAccount";
import Dashboard from "../Dashboard/Dashboard";
import DashboardLayout from "../Layout/DashboardLayout";
import PrivateRoute from "../Dashboard/PrivateRoute";
import Profile from "../profile/Profile";
import Bookingcart from "../Booking/Bookingcart";
import Booking from "../Booking/Booking";
import Aboutrooms from "../Show-rooms/Aboutrooms";
import Addroom from "../Show-rooms/Addroom";
import Addhotelcategory from "../Show-rooms/hotelcat";
import Addhotel from "../Show-rooms/Addhotel";
import Addfacility from "../Show-rooms/Addfacility";
import ShowHotels from "../Show-rooms/ShowHotels";
import AboutHotel from "../Show-rooms/AboutHotel";
import PaymentSuccess from "../Page/PaymentSuccess";

const Approutes = () => {
  return (
    <Routes>
      <Route element={<HotelLayout />}>
        <Route index element={<Home />} />
        <Route path="/rooms" element={<Showrooms />} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="activate/:uid/:token" element={<ActivateAccount />} />
        <Route path="rooms/:roomId" element={<Aboutrooms />} />
        <Route path="/hotels" element={<ShowHotels />} />
        <Route path="/hotels/:hotelId" element={<AboutHotel />} />
        
      </Route>
    <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="cart" element={<Bookingcart />} />
        <Route path="Bookings" element={<Booking />} />
         
         <Route path="payment/success" element={<PaymentSuccess />} />
         <Route path="addroom" element={<Addroom />} /> 
          <Route path="addhotelcat" element={<Addhotelcategory />} /> 
           <Route path="addhotel" element={<Addhotel />} /> 
            <Route path="addfacility" element={<Addfacility />} /> 
      </Route>



    </Routes>
  );
};

export default Approutes;
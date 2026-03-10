

import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useCartContext from "../hooks/usebookingcart";
import { User, Bed, CalendarDays, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, logoutUser } = useAuthContext();
  const { cart } = useCartContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="navbar bg-[#0b1e3b] text-white shadow-md px-4 py-3">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-2xl font-bold text-yellow-400">
          HotelBooking
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg font-medium">
          <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
          <li><Link to="/rooms" className="hover:text-yellow-300">Rooms</Link></li>
          <li><Link to="/hotels" className="hover:text-yellow-300">Hotels</Link></li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        {user && (
          <>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <CalendarDays className="w-6 h-6 text-yellow-400" />
                  <span className="badge badge-sm badge-warning indicator-item">
                    {cart?.CartBookingRoom?.length || 0}
                  </span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-white text-black z-10 mt-3 w-56 shadow-lg rounded-lg"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">
                    {cart?.CartBookingRoom?.length || 0} Bookings
                  </span>
                  <div className="card-actions">
                    <Link to="/dashboard/cart">
                      <button className="btn btn-primary btn-block">View Bookings</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <User className="w-10 h-10 text-yellow-400 p-1 bg-white rounded-full" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white text-black rounded-box z-10 mt-3 w-52 p-2 shadow-lg"
              >
                <li><Link to="/dashboard/profile">Profile</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={logoutUser}>Logout</button></li>
              </ul>
            </div>
          </>
        )}

        {!user && (
          <div className="flex gap-3">
            <Link to="/login" className="btn btn-outline btn-warning">Login</Link>
            <Link to="/register" className="btn btn-warning text-white">Register</Link>
          </div>
        )}

        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost btn-circle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-yellow-400" /> : <Menu className="w-6 h-6 text-yellow-400" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#0b1e3b] absolute top-full left-0 shadow-lg z-20">
          <ul className="menu flex flex-col p-4 gap-2 text-lg font-medium">
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-yellow-300">Home</Link></li>
            <li><Link to="/rooms" onClick={() => setMobileMenuOpen(false)} className="hover:text-yellow-300">Rooms</Link></li>
            <li><Link to="/hotels" onClick={() => setMobileMenuOpen(false)} className="hover:text-yellow-300">Hotels</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
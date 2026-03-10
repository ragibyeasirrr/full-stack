

import { Link } from "react-router-dom";
import { useState } from "react";
import { User, LayoutDashboard, CalendarDays } from "lucide-react";

import useAuthContext from "../Hooks/UseAuthcontext";
import usebookingCartContext from "../Hooks/usebookingcartContext ";
// import useAuthContext from "../hooks/useAuthContext";

const Nave = ({ sidebarOpen }) => {
  const { user, logoutUser } = useAuthContext();
  const { cart } = usebookingCartContext();
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <nav className="bg-[#0b1e3b] text-white shadow-md">
      <div className="px-4">
        <div className="flex justify-between items-center h-16">

          <div className="lg:hidden">
            <label htmlFor="drawer-toggle" className="cursor-pointer text-2xl">
              ☰
            </label>
          </div>

          <Link to="/dashboard" className="flex items-center space-x-2 text-xl font-bold">
            <LayoutDashboard className="w-6 h-6 text-yellow-400" />
            <span>Dashboard</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="relative">
                  <button
                    onClick={() => setCartOpen(!cartOpen)}
                    className="btn btn-ghost btn-circle"
                  >
                    <div className="indicator">
                      <CalendarDays className="w-6 h-6 text-yellow-400" />
                      <span className="badge badge-sm badge-warning indicator-item">
                        {cart?.CartBookingRoom?.length || 0}
                      </span>
                    </div>
                  </button>
                  {cartOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white text-black shadow-lg rounded-lg z-10">
                      <div className="p-4">
                        <p className="font-bold">{cart?.CartBookingRoom?.length || 0} Bookings</p>
                        <Link to="/dashboard/cart">
                          <button className="btn btn-primary btn-block mt-2">View Cart</button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="btn btn-ghost btn-circle"
                  >
                    <User className="w-8 h-8 text-yellow-400 p-1 bg-white rounded-full" />
                  </button>
                  {profileOpen && (
                    <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10 p-2">
                      <li>
                        <Link to="/dashboard/profile" onClick={() => setProfileOpen(false)}>Profile</Link>
                      </li>
                      <li>
                        <Link to="/dashboard" onClick={() => setProfileOpen(false)}>Dashboard</Link>
                      </li>
                      <li>
                        <button onClick={logoutUser}>Logout</button>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            )}

            {!user && (
              <div className="flex gap-3">
                <Link to="/login" className="btn btn-outline btn-warning">Login</Link>
                <Link to="/register" className="btn btn-warning text-white">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nave;
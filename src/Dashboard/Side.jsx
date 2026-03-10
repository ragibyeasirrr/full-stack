


import {
  FiBarChart2,
  FiShoppingCart,
  FiPackage,
  FiStar,
  FiHome,
  FiPlusCircle,
  FiCoffee,
  FiLayers,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import useAuthContext from "../Hooks/UseAuthcontext";

const Side = () => {
  const { user } = useAuthContext();
  if (!user) return null;

  const customerMenus = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { to: "/dashboard/cart", icon: FiShoppingCart, label: "Booking Cart" },
    { to: "/dashboard/Bookings", icon: FiPackage, label: "My Bookings" },
     { to: "/rooms", icon: FiCoffee, label: "Rooms" },
     { to: "/hotels", icon: FiHome, label: "Hotels" },
    
  ];

  const adminMenus = [
    { to: "/dashboard", icon: FiBarChart2, label: "Admin Dashboard" },
    { to: "/dashboard/cart", icon: FiShoppingCart, label: "All Carts" },
    { to: "/dashboard/Bookings", icon: FiPackage, label: "All Bookings" },
    { to: "/rooms", icon: FiCoffee, label: "Rooms" },
    { to: "/dashboard/addroom", icon: FiPlusCircle, label: "Add Room" },
    { to: "/hotels", icon: FiHome, label: "Hotels" },
    { to: "/dashboard/addhotel", icon: FiPlusCircle, label: "Add Hotel" },
    { to: "/dashboard/addfacility", icon: FiLayers, label: "Add Facilities" },
    { to: "/dashboard/addhotelcat", icon: FiLayers, label: "Add Hotel Category" },

  ];

  const menuItems = user.is_staff === true ? adminMenus : customerMenus;

  return (
    <div className="drawer-side z-10">
      <label htmlFor="drawer-toggle" aria-label="close sidebar" className="drawer-overlay"></label>
      <aside className="menu bg-base-200 w-64 min-h-full p-4 text-base-content">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-6 px-2">
            <FiPackage className="h-6 w-6" />
            <h1 className="text-xl font-bold">Hotel Admin</h1>
          </Link>
        </div>

        <ul className="menu menu-md gap-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.to} className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6 text-xs text-base-content/70">
          © 2026 Hotel Booking Admin
        </div>
      </aside>
    </div>
  );
};

export default Side;


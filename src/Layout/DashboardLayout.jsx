import { useState } from "react";


import { Outlet } from "react-router";


import Side from "../Dashboard/Side";
import Nave from "./Nave";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="drawer lg:drawer-open">
    
      <input
        id="drawer-toggle"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={toggleSidebar}
      />

      <div className="drawer-content flex flex-col">
        {/* Navbar   */}
        <Nave  sidebarOpen={sidebarOpen}  />

       
        <main className="p-6">
          <Outlet />
        </main>
      </div>

     
      <Side />
    </div>
  );
};

export default DashboardLayout;




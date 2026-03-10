// import { Outlet } from "react-router";

import Footer from "../frontsection/footer";
import Navber from "./Navber";




import { Outlet } from "react-router-dom";
const HotelLayout = () => {
    return (
        <>
           <Navber/>
          <Outlet />
          < Footer/>



        </>
    );
};

export default HotelLayout;
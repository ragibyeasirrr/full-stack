
import { FiHome, FiCalendar, FiUsers, FiStar } from "react-icons/fi";

import StatCard from "./StatCard";
import Booking from "../Booking/Booking";

export default function Dashboard() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FiHome} title="Total Rooms" value="245" />
        <StatCard icon={FiCalendar} title="Total Bookings" value={128} />
        <StatCard icon={FiUsers} title="Total Guests" value={573} />
        <StatCard icon={FiStar} title="Average Rating" value={4.8} />
      </div>

      <Booking />
    </div>
  );
}
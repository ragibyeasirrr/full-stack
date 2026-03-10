import { useEffect, useState } from "react";
import apiClient from "../mainlinks/apiclient";
import HotelCard from "./cardhotel";


const ShowHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient.get("/hotel/")
      .then(res => setHotels(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center items-center py-10 min-h-screen">
    <span className="loading loading-spinner loading-xl text-secondary"></span>
  </div>;

  return (
    <div className="max-w-full mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Hotels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map(hotel => (
          <HotelCard hotel={hotel} key={hotel.id} />
        ))}
      </div>
    </div>
  );
};

export default ShowHotels;
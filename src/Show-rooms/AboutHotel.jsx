import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import apiClient from "../mainlinks/apiclient";

const AboutHotel = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient.get(`/hotel/${hotelId}/`)
      .then(res => setHotel(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [hotelId]);

  if (loading) return <div>Loading...</div>;
  if (!hotel) return <div>Hotel Not Found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/hotels" className="flex items-center text-sm text-base-content/70 hover:text-base-content transition-colors mb-4">
        <FaArrowLeft className="mr-2 h-4 w-4" /> Back to Hotels
      </Link>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <img
          src={hotel.image || "/default-hotel.jpg"}
          alt={hotel.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
          <p className="text-gray-600 mb-2">{hotel.address}</p>
          <p className="mb-4">{hotel.description || "No description available."}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {hotel.rooms?.map(room => (
              <div key={room.id} className="border p-2 rounded-md text-center">
                <p>Room #{room.room_num}</p>
                <p>${room.cost_per_day} / day</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHotel;
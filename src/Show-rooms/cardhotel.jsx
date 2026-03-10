import { Link } from "react-router";
import defaultImage from "../image/h1.png"; 

const HotelCard = ({ hotel }) => {
  return (
    <Link to={`/hotels/${hotel.id}`}>
      <div className="card bg-base-100 shadow-sm hover:shadow-lg transition-shadow rounded-xl">
        <figure className="px-6 pt-6">
          <img
            src={hotel.image || defaultImage}
            alt={hotel.name}
            className="rounded-xl h-48 w-full object-cover"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-xl font-bold">{hotel.name}</h2>
          <p className="text-gray-600">{hotel.address}</p>
          <p className="text-sm mt-2">{hotel.description || "No description available."}</p>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
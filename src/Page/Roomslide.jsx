

import { Link } from "react-router";
import defaultImage from "../image/h1.png"; 
const Roomslide = ({ room }) => {
  return (
        <Link to={`/rooms/${room.id}`}>
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img
          src={room.images?.length > 0 ? room.images[0].image : defaultImage}
          alt="Room"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{room.hotel.name}</h2>
        <h3 className="font-bold text-xl text-red-700">${room.cost_per_day}</h3>
        <p>{room.room_num}</p>
        <div className="card-actions mt-1">
          <button className="btn btn-secondary">View</button>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default Roomslide;
import { Link } from "react-router";
import defaultImage from "../image/h10.png"; 

const RoomDetails = ({ room }) => {
  return (
    <Link to={`/rooms/${room.id}`}>
      
       <div className="card bg-base-100 shadow-sm rounded-xl hover:shadow-lg transition-shadow w-full">
        <figure className="px-10 pt-10">
  <img
    src={room.images?.[0]?.image || defaultImage}
    alt="Room Image"
    className="rounded-xl"
  />
</figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Room #{room.room_num}</h2>
          <h3 className="font-bold text-xl text-red-700">
            ${room.cost_per_day} / day
          </h3>
          <p>Hotel: {room.hotel?.name}</p>
          <p>Capacity: {room.capecity} persons</p>
          <p>
            Facilities:{" "}
            {room.facility?.map((f) => f.name).join(", ") || "No facilities"}
          </p>
          <div className="card-actions mt-1">
            <button className="btn btn-secondary">
              {room.available ? "Book Now" : "Not Available"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoomDetails;
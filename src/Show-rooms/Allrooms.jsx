
import RoomDetails  from "./Roomdetails";
const Allrooms = ({ rooms, loading }) => {
  if (loading)
    return (
      <div className="flex justify-center items-center py-10 min-h-screen">
        <span className="loading loading-spinner loading-xl text-secondary"></span>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <RoomDetails room={room} key={room.id} />
      ))}
    </div>
  );
};

export default Allrooms;


import Bookingitem from "./Bookingitem";

const Bookingtable = ({ items }) => {
 
 
  if (!items || items.length === 0) {
    return <p className="py-4 text-gray-500 text-center">No rooms booked.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-4 py-3 text-left">Room</th>
            <th className="px-4 py-3 text-right">Price per Day</th>
            <th className="px-4 py-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => (
            <Bookingitem key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookingtable;



import { FaRegTrashAlt } from "react-icons/fa";

const Bookingcartlist = ({ items, handleRemoveItem }) => {
  
  if (!items?.length) {
    return (
      <div className="py-6 text-center text-gray-500">Your cart is empty</div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Booking Cart</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Room</th>
              <th className="text-right">Price</th>
              <th className="text-right">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="font-medium">
                  {item.cartRoom.hotel.name} - Room {item.cartRoom.room_num}
                </td>
                <td className="text-right">${item.cartRoom.cost_per_day}</td>
                <td className="text-right font-medium">
                  ${item.cartRoom.cost_per_day}
                </td>
                <td>
                  <button
                    className="btn btn-ghost btn-xs btn-circle"
                    aria-label={`Remove ${item.cartRoom.room_num} from cart`}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <FaRegTrashAlt className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookingcartlist;
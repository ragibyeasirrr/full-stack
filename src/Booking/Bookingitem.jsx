

const Bookingitem = ({ item }) => {
  return (
    <tr className="border-b">
      <td className="px-4 py-3 font-medium">
        {item.Room?.hotel?.name} - {item.Room?.room_num}
      </td>
      <td className="px-4 py-3 text-right">
        ${item.Room?.cost_per_day?.toFixed(2)}
      </td>
      <td className="px-4 py-3 text-right">
        ${item.cost_per_day?.toFixed(2)}
      </td>
    </tr>
  );
};
export default Bookingitem;
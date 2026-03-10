






const FilterSection = ({
  priceRange,
  handlePriceChange,
  hotels,
  selectedhotel,
  handlehotelChange,
  sortOrder,
  handleSorting,
  facilities,
  selectedFacilities,
  handleFacilityChange,
}) => {
  return (
    <div className="flex flex-col gap-6">

     
      <div className="bg-white p-5 rounded-xl shadow-md border">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Price Range
        </label>

        <input
          type="range"
          min="0"
          max="10000"
          step="10"
          value={priceRange[1]}
          onChange={(e) => handlePriceChange(1, Number(e.target.value))}
          className="range range-primary w-full"
        />

        <div className="flex justify-between mt-3 text-sm font-medium text-gray-600">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

    
      <div className="bg-white p-5 rounded-xl shadow-md border">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Hotel
        </label>

        <select
          className="w-full p-2 border rounded-md"
          value={selectedhotel}
          onChange={(e) => handlehotelChange(e.target.value)}
        >
          <option value="">All Hotels</option>

          {hotels?.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.name}
            </option>
          ))}
        </select>
      </div>

   
      <div className="bg-white p-5 rounded-xl shadow-md border">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Facilities
        </label>

        <div className="space-y-2 max-h-32 overflow-y-auto">

          {facilities?.map((facility) => (
            <label key={facility.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                value={facility.id}
                checked={selectedFacilities.includes(facility.id)}
                onChange={() => handleFacilityChange(facility.id)}
                className="checkbox checkbox-sm"
              />
              {facility.name}
            </label>
          ))}

        </div>
      </div>

    
      <div className="bg-white p-5 rounded-xl shadow-md border">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Sort By Price
        </label>

        <select
          className="w-full p-2 border rounded-md"
          value={sortOrder}
          onChange={(e) => handleSorting(e.target.value)}
        >
          <option value="">Default</option>
          <option value="cost_per_day">Price: Low to High</option>
          <option value="-cost_per_day">Price: High to Low</option>
        </select>
      </div>

    </div>
  );
};

export default FilterSection;
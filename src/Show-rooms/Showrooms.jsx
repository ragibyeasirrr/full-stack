


import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Usefetchrooms from "../Hooks/Usefetchrooms";
import useFetchhotels from "../Hooks/Usefetchhotels";
import FilterSection from "./Filtersection";
import Allrooms from "./Allrooms";
import apiClient from "../mainlinks/apiclient";

const Showrooms = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedhotel, setSelecetedhotel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  useEffect(() => {
    apiClient.get("/room_facility/")
      .then(res => setFacilities(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleFacilityChange = (id) => {
    if (selectedFacilities.includes(id)) {
      setSelectedFacilities(selectedFacilities.filter(f => f !== id));
    } else {
      setSelectedFacilities([...selectedFacilities, id]);
    }
    setCurrentPage(1);
  };

  const { rooms, loading, totalPages } = Usefetchrooms(
    currentPage,
    priceRange,
    selectedhotel,
    searchQuery,
    sortOrder,
    selectedFacilities
  );

  const hotels = useFetchhotels();

  const handlePriceChange = (index, value) => {
    setPriceRange(prev => {
      const newRange = [...prev];
      newRange[index] = value;
      return newRange;
    });
    setCurrentPage(1);
  };

  return (
    <div className="max-w-full mx-auto px-2 py-8">
      <h1 className="text-3xl font-bold mb-8">Book A Room</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/4 flex-shrink-0">
          <FilterSection
            priceRange={priceRange}
            handlePriceChange={handlePriceChange}
            hotels={hotels}
            selectedhotel={selectedhotel}
            handlehotelChange={setSelecetedhotel}
            searchQuery={searchQuery}
            handleSearchQuery={setSearchQuery}
            sortOrder={sortOrder}
            handleSorting={setSortOrder}
            facilities={facilities}
            handleFacilityChange={handleFacilityChange}
            selectedFacilities={selectedFacilities}
          />
        </div>
        <div className="w-full lg:w-3/4 lg:pl-4">
          <Allrooms rooms={rooms} loading={loading} />
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Showrooms;
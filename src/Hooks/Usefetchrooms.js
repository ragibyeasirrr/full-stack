

import { useEffect, useState } from "react";
import apiClient from "../mainlinks/apiclient";

const Usefetchrooms = (
  currentPage,
  priceRange,
  selectedHotel,
  searchQuery,
  sortOrder,
  selectedFacilities  
) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);

      let url = `/room/?cost_per_day__gt=${priceRange[0]}&cost_per_day__lt=${priceRange[1]}&page=${currentPage}`;

      if (selectedHotel) {
        url += `&hotel=${selectedHotel}`;
      }

      if (searchQuery) {
        url += `&search=${searchQuery}`;
      }

      if (sortOrder) {
        url += `&ordering=${sortOrder}`;
      }

      
      if (selectedFacilities && selectedFacilities.length > 0) {
        url += `&facility=${selectedFacilities.join(",")}`;
      }

      try {
        const response = await apiClient.get(url);
        const data = response.data;

        setRooms(data.results || []);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (error) {
        console.log("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();

  }, [
    currentPage,
    priceRange,
    selectedHotel,
    searchQuery,
    sortOrder,
    selectedFacilities   
  ]);

  return { rooms, loading, totalPages };
};

export default Usefetchrooms;

import { useEffect, useState } from "react";
import apiClient from "../mainlinks/apiclient";


const useFetchhotels = () => {
  const [hotel, sethotel] = useState([]);
  useEffect(() => {
    apiClient.get("/hotel/").then((res) => sethotel(res.data));
  }, []);

  return hotel;
};

export default useFetchhotels;

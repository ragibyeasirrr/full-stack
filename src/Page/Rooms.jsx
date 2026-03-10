import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";


import Roomslide from "./Roomslide";
import ErroAlert from "./ErroAlert";
import apiClient from "../mainlinks/apiclient";

const Rooms = () => {
  const [rooms, setrooms] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/room/")
      .then((res) => setrooms(res.data.results|| []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);



  return (
    <section className="bg-gray-50">
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-4 md:px-8 mb-4">
          <h2 className="text-3xl md:text-4xl font-bold">Available Rooms</h2>
          <a
            href="rooms"
            className="btn btn-secondary px-6 py-6 rounded-full text-lg"
          >
            View All
          </a>
        </div>
       
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <span className="loading loading-spinner loading-xl text-secondary"></span>
          </div>
        )}

        {error && <ErroAlert error={error} />}
       
        {!isLoading && !error && rooms.length > 0 && (
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            className="mt-4 px-4 container"
          >
            {rooms.map((room) => (
              <SwiperSlide key={room.id} className="flex justify-center">
                <Roomslide key={room.id} room={room} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {!isLoading && !error && rooms.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No Products Available
          </p>
        )}
      </div>
    </section>
  );
};

export default Rooms;




import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";



import { Autoplay, Pagination, Navigation } from "swiper/modules";

import b   from "../image/h3.png"; 
import f  from "../image/h4.png"; 
import t from "../image/h5.png"; 
import h6 from "../image/h6.png"; 
import h7 from "../image/h7.png"; 
import h8 from "../image/h8.png"; 
import h2 from "../image/h2.png"; 
import CarouselSlide from "./Carouselslide";
import { Link } from "react-router";

const Carousel = () => {
  const slides = [
    {
      image: b,
    },
    {
      
      image: f,
    },
    {
      
      image:t,
    },
{
      
      image: h6,
    },
    {
      
      image: h7,
    },
    {
      
      image: h8,
    },
    {
      
      image: h2,
    },


  ];

  return (
    <>
    <div className="py-12 px-4 max-w-7xl mx-auto ">
    <div  className="flex justify-between m-6">
    <h1 className="text-4xl text-bold  ">All Hotels  </h1>
    <Link to="/hotels">
    <button className="btn btn-secondary px-6 py-3 rounded-full shadow-md">
            View Hotels
          </button>
          </Link>
          </div>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <CarouselSlide
             
              image={slide.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </>
  );
};

export default Carousel;

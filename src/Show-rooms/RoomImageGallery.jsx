


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import defaultImage from "../image/h10.png";

const RoomImageGallery = ({ images, Roomnum }) => {
  const [thumbsSwiper] = useState(null);

  const displayImages =
    images && images.length > 0 ? images : [{ image: defaultImage }];

  return (
    <div className="rounded-lg border overflow-hidden w-full">
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="room-main-slider"
      >
        {displayImages.map((imgObj, index) => (
          <SwiperSlide key={index}>
            {/* CHANGED HERE */}
            <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-base-100">
              <img
                src={imgObj?.image || defaultImage}
                alt={Roomnum}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RoomImageGallery;
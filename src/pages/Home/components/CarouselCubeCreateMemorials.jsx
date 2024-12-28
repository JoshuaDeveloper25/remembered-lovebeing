import rememberedProfilePrev1 from "../../../assets/rememberedAboutPrev.png";
import rememberedProfilePrev2 from "../../../assets/rememberedMediaPrev.png";
import rememberedProfilePrev3 from "../../../assets/rememberedTributePrev.png";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectCube, Pagination } from "swiper/modules";

// Carousel Images
const carouselMemorialPrev = [
  {
    imgPath: rememberedProfilePrev1,
  },

  {
    imgPath: rememberedProfilePrev2,
  },

  {
    imgPath: rememberedProfilePrev3,
  },
];

const CarouselCubeCreateMemorials = () => {
  return (
    <div className="swiper-cube relative">
      <Swiper
        effect={"cube"}
        grabCursor={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={{
          clickable: true,
        }}
        speed={1000}
        loop={false}
        modules={[Autoplay, EffectCube, Pagination]}
        className="mySwiper"
      >
        {carouselMemorialPrev?.map((carouselImage, index) => (
          <SwiperSlide key={index}>
            <img
              className="max-w-lg mx-auto"
              src={carouselImage?.imgPath}
              loading="lazy"
              decoding="async"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselCubeCreateMemorials;

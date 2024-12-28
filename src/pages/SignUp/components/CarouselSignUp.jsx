import { authCarouselPreviews } from "../../../db/data";
import { Autoplay } from "swiper/modules";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

const CarouselSignUp = () => {
  return (
    <div className="flex-1">
      <Swiper
        loop={false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={800}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {authCarouselPreviews?.map((prevImage, index) => (
          <SwiperSlide key={index}>
            <img
              className="rounded-2xl sm:block hidden h-[35rem] w-full object-cover"
              decoding="async"
              src={prevImage}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselSignUp;

import { signInCarouselPreviews } from "../../../db/data";
import { Autoplay, EffectFade } from "swiper/modules";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/effect-fade';

const CarouselSignIn = () => {
  return (
    <div className="flex-1">
      <Swiper
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade]}
        className="mySwiper"
        effect="fade"
      >
        {signInCarouselPreviews?.map((prevImage, index) => (
          <SwiperSlide key={index}>
            <img
              className="rounded-2xl"
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

export default CarouselSignIn;

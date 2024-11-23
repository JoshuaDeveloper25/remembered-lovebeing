import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { stepsApp } from "../../../db/data";

const CarouselStepsApp = () => {
  return (
    <div className="min-[500px]:max-w-2xl max-w-[18rem] mx-auto">
      <Swiper
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        style={{
          "--swiper-pagination-bullet-size": "8px",
          "--swiper-pagination-bullet-height": "7px",
        }}
        loop={true}
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 0,
          },

          550: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          750: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="carousel-steps"
      >
        {stepsApp?.map((stepApp, index) => (
          <SwiperSlide
            key={index}
            className="bg-primary-color text-white shadow-lg rounded-sm px-6 py-6"
          >
            <div className="flex items-center gap-3 text-yellow-500 font-medium">
              <h3 className="text-4xl font-black">{stepApp?.numberStep}</h3>
              <div className="bg-yellow-500 h-1 w-full"></div>
            </div>

            <h3 className="text-xl mt-2">{stepApp?.descStep}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselStepsApp;

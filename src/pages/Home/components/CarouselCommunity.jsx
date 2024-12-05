import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

// import required modules
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { websiteAnalytics } from "../../../db/data";
import { t } from "i18next";

const CarouselCommunity = () => {
  return (
    <div className="min-[500px]:max-w-2xl max-w-[18rem] mx-auto">
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".website-analytics-swiper-button-next",
          prevEl: ".website-analytics-swiper-button-prev",
        }}
        breakpoints={{
          350: {
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
        modules={[Autoplay, Navigation, Pagination]}
        className="website-analytics"
      >
        {websiteAnalytics?.map((track, index) => (
          <SwiperSlide
            key={index}
            className="bg-gray-100/55 border px-1 py-2 text-center shadow-lg"
          >
            {track?.analyticIcon}

            <h3 className="font-bold text-4xl mb-2 text-primary-color">
              {track?.analyticNumber}
            </h3>

            <h5 className="text-xl">{t(track?.analyticName)}</h5>
          </SwiperSlide>
        ))}
      </Swiper>
      <FaCircleChevronLeft className="website-analytics-swiper-button-prev md:hidden block absolute top-[50%] left-0 transform -translate-y-1/2 -translate-x-0 z-50 cursor-pointer text-primary-color-light size-10" />{" "}
      <FaCircleChevronRight className="website-analytics-swiper-button-next md:hidden block absolute top-[50%] right-0 transform -translate-y-1/2 -translate-x-0 z-50 cursor-pointer text-primary-color-light size-10" />
    </div>
  );
};

export default CarouselCommunity;

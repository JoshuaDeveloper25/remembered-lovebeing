import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import grave from "../../../assets/grave.jpeg";
import caballete from "../../../assets/caballete.png";
import urna from "../../../assets/urna.png";
import bookmark from "../../../assets/bookmark.png";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";

const StepsCarousel = () => {
  const { t } = useTranslation();

  return (
    <section className="px-3 py-8 bg-white">
      <div className="container-page relative">
        <div className="my-12">
          <h2 className="font-mono tracking-wider text-4xl text-primary-color text-center uppercase font-semibold ">
            {t("Ways to use your QR code")}
          </h2>
          <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
        </div>

        <article className="grid md:grid-cols-2 grid-cols-1">
          <div className="md:block hidden flex-1">
            <h4 className="font-medium uppercase tracking-widest px-2 text-xl border-b-2 border-yellow-500 inline">
              CREATE
            </h4>
            <h2 className="text-4xl text-fourth-color font-semibold my-4">
              Create an online memorial{" "}
              <span className="text-modern-color block font-medium text-3xl">
                Share your loved one's story
              </span>
            </h2>
            <p className="max-w-sm text-xl">
              Create an online memorial. Add photos, videos, messages, gifs, or
              links. Gift cards can also be attached.
            </p>
            <button
              className="btn btn-blue-light w-auto text-xl mt-4"
              type="button"
            >
              Create a Memorial
            </button>
          </div>

          <div>
            {" "}
            <Swiper
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              style={{
                "--swiper-pagination-bullet-size": "8px",
                "--swiper-pagination-bullet-height": "7px",
              }}
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: ".stepsCarousel-swiper-button-next",
                prevEl: ".stepsCarousel-swiper-button-prev",
              }}
              modules={[Autoplay, Navigation, Pagination]}
              className="stepsCarousel"
            >
              <SwiperSlide>
                <img
                  className="w-full h-[23rem] rounded-md md:object-contain object-cover"
                  loading="lazy"
                  src={grave}
                  decoding="async"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  className="w-full h-[23rem] rounded-md md:object-contain object-cover"
                  src={caballete}
                  loading="lazy"
                  decoding="async"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  className="w-full h-[23rem] rounded-md md:object-contain object-cover"
                  src={urna}
                  loading="lazy"
                  decoding="async"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  className="w-full h-[23rem] rounded-md md:object-contain object-cover"
                  src={bookmark}
                  loading="lazy"
                  decoding="async"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </article>

        {/* <FaCircleChevronRight className="stepsCarousel-swiper-button-next xl:block hidden absolute top-[45%] right-0 transform translate-y-1/2 translate-x-[1.4rem] z-50 cursor-pointer text-primary-color-light size-10" />
        <FaCircleChevronLeft className="stepsCarousel-swiper-button-prev xl:block hidden absolute top-[45%] left-0 transform translate-y-1/2 -translate-x-[1.4rem] z-50 cursor-pointer text-primary-color-light size-10" /> */}
      </div>
    </section>
  );
};

export default StepsCarousel;

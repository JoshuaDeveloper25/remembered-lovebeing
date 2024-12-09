import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import rememberedProfilePrev1 from "../../../assets/rememberedAboutPrev.png";
import rememberedProfilePrev2 from "../../../assets/rememberedMediaPrev.png";
import rememberedProfilePrev3 from "../../../assets/rememberedTributePrev.png";

// import required modules
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";

const WhatWeOfferResponsive = () => {
  const { t } = useTranslation();

  return (
    <section className="sm:hidden block px-3 sm:py-8 py-3  border border-gray-400">
      <div className="container-page relative">
        <div className="sm:my-12">
          <h2 className="font-mono sm:tracking-wider sm:text-4xl text-3xl text-primary-color text-center uppercase font-semibold ">
            {t("We offer modern designs.")}
          </h2>
          <div className="bg-yellow-500 h-2 w-24 mt-0 mb-3 mx-auto"></div>
        </div>

        <article>
          <div className="sticky">
            {" "}
            <Swiper
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              style={{
                "--swiper-pagination-bullet-size": "7px",
                "--swiper-pagination-bullet-height": "7px",
              }}
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: ".modernDesignsResponsive-swiper-button-next",
                prevEl: ".modernDesignsResponsive-swiper-button-prev",
              }}
              modules={[Autoplay, Navigation, Pagination]}
              className="modernDesignsResponsive"
            >
              <SwiperSlide>
                <img
                  className="w-full rounded-md"
                  loading="lazy"
                  src={rememberedProfilePrev1}
                  decoding="async"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  className="w-full rounded-md"
                  src={rememberedProfilePrev2}
                  loading="lazy"
                  decoding="async"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  className="w-full rounded-md"
                  src={rememberedProfilePrev3}
                  loading="lazy"
                  decoding="async"
                />
              </SwiperSlide>
            </Swiper>
          </div>
          <FaCircleChevronLeft className="modernDesignsResponsive-swiper-button-prev md:hidden block absolute top-[50%] left-0 transform translate-y-1/2 -translate-x-0 z-50 cursor-pointer text-primary-color-light size-10" />{" "}
          <FaCircleChevronRight className="modernDesignsResponsive-swiper-button-next md:hidden block absolute top-[50%] right-0 transform translate-y-1/2 -translate-x-0 z-50 cursor-pointer text-primary-color-light size-10" />
        </article>
      </div>
    </section>
  );
};

export default WhatWeOfferResponsive;

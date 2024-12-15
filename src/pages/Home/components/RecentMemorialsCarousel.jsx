// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { useInfiniteQuery } from "@tanstack/react-query";
import { Pagination, Autoplay } from "swiper/modules";

import { PiCakeFill } from "react-icons/pi";
import { GiTombstone } from "react-icons/gi";

import axios from "axios";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const RecentMemorialsCarousel = () => {
  const { t } = useTranslation(); // Hook para traducciones

  const memorialsQuery = useInfiniteQuery({
    queryKey: ["memorials"],
    queryFn: (data) => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/get-remembereds`,
        {
          params: {
            page: data?.pageParam || 1,
            size: 8,
          },
        }
      );
    },

    getNextPageParam: () => {
      return 0;
    },
  });

  if (memorialsQuery?.isLoading) return <p>{t("Loading...")}</p>;

  return (
    <section className="bg-white">
      <div className="container-page px-3 sm:py-14 py-3">
        <h2 className="tracking-wider font-mono sm:text-4xl text-3xl text-primary-color text-center uppercase font-semibold">
          {t("Recent online memorials")}
        </h2>
        <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>

        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            // when window width is >= 340px
            340: {
              slidesPerView: 1,
              spaceBetween: 30,
            },

            // when window width is >= 500px
            500: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            // when window width is >= 700px
            700: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            // when window width is >= 768px
            950: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper recent-memorials-carousel"
        >
          {memorialsQuery?.data?.pages[0]?.data?.items.length > 0 ? (
            memorialsQuery?.data?.pages[0]?.data?.items?.map(
              (recentMemorial, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className="bg-gray-100/55 border-2 px-2"
                  >
                    <Link to={`/remembered-profile/${recentMemorial?.slug}`}>
                      <img
                        src={
                          recentMemorial?.profile_images
                            ? `${recentMemorial?.profile_images?.cloud_front_domain}/${recentMemorial?.profile_images?.aws_file_name}`
                            : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                        }
                        loading="lazy"
                        decoding="async"
                        className="w-32 h-24 object-cover rounded-lg mx-auto -mt-6 sticky z-[999]"
                      />
                      {recentMemorial?.first_name.replace(/\s/g, "")?.length +
                        recentMemorial?.last_name.replace(/\s/g, "")?.length >
                      15 ? (
                        <>
                          <div className="md:block hidden relative z-[9999999] group cursor-pointer leading-4">
                            <span className="text-center font-semibold mt-2 block md:overflow-hidden md:text-ellipsis md:whitespace-nowrap md:max-w-[8rem] mx-auto">
                              {recentMemorial?.first_name}{" "}
                              {recentMemorial?.last_name}
                            </span>
                            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden w-max px-2 py-1 text-white bg-black rounded-md text-sm group-hover:block">
                              {recentMemorial?.first_name}{" "}
                              {recentMemorial?.last_name}
                            </span>
                          </div>

                          <h2 className="md:hidden block text-center font-semibold mt-2 max-w-[8rem] mx-auto leading-4">
                            {recentMemorial?.first_name}{" "}
                            {recentMemorial?.last_name}
                          </h2>
                        </>
                      ) : (
                        <h2 className="block text-center font-semibold mt-2 max-w-[8rem] whitespace-nowrap mx-auto leading-4">
                          {recentMemorial?.first_name}{" "}
                          {recentMemorial?.last_name}
                        </h2>
                      )}

                      <div className="flex justify-between gap-2 my-3">
                        <div>
                          <h2 className="text-sm text-fourth-color/80">
                            <span className=" font-semibold">
                              <PiCakeFill className="inline-block size-6 align-bottom" />
                              :
                            </span>{" "}
                            {recentMemorial?.birth_date || t("No Date...")}
                          </h2>
                        </div>

                        <div>
                          <h2 className="text-sm text-fourth-color/80">
                            <span className="font-semibold">
                              <GiTombstone className="inline-block size-6 align-bottom" />
                              :
                            </span>{" "}
                            <span>
                              {recentMemorial?.death_date || t("No Date...")}
                            </span>
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              }
            )
          ) : (
            <h2 className="text-primary-color text-center text-2xl uppercase tracking-wider">
              {t(`There's no recent memorials for the moment...`)}
            </h2>
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default RecentMemorialsCarousel;

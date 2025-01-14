import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useParams } from "react-router-dom";
import { ImUser } from "react-icons/im";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

const CarouselProfiles = ({ rememberedProfiles }) => {
  const params = useParams();

  return (
    <div className="sticky">
      {rememberedProfiles?.length === 0 ? null : (
        <>
          <div className="swiper-button image-swiper-button-next absolute z-50 cursor-pointer top-20 xl:-right-7 right-0">
            <IoIosArrowForward className="text-white bg-black/50 rounded-full p-1 size-6" />
          </div>

          <div className="swiper-button image-swiper-button-prev absolute z-50 cursor-pointer top-20 xl:-left-7 left-0">
            <IoIosArrowBack className="text-white bg-black/50 rounded-full p-1 size-6" />
          </div>
        </>
      )}

      <Swiper
        centeredSlides={false}
        modules={[Pagination, Navigation]}
        className="carouselProfilesSwiper"
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        breakpoints={{
          // when window width is >= 340px
          340: {
            slidesPerView: 1,
            spaceBetween: 30,
          },

          // when window width is >= 340px
          500: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // when window width is >= 768px
          950: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        loop={false}
      >
        {rememberedProfiles
          ?.filter((item) => item?.id !== +params?.id)
          ?.map((remember, index) => (
            <SwiperSlide
              key={index}
              className="bg-white border-2 shadow-xl rounded-md py-3 px-3"
            >
              <img
                className="w-28 mx-auto rounded-md"
                loading="lazy"
                decoding="async"
                src={
                  remember?.profile_images
                    ? `${remember?.profile_images?.cloud_front_domain}/${remember?.profile_images?.aws_file_name}`
                    : `https://i.pinimg.com/474x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg`
                }
              />

              <h3 className="text-center mt-2 font-bold text-primary-color">
                {remember?.name}
              </h3>

              <Link
                to={`/remembered-profile/${remember?.id}`}
                target="_blank"
                style={{ fontSize: ".8rem" }}
                className="btn btn-blue block w-full text-center mt-2"
              >
                <ImUser className="inline-block align-baseline me-1" />
                View Profile
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default CarouselProfiles;

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useParams } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Carousel = ({ galleryImages }) => {
  const params = useParams();

  return (
    <div className="relative mb-8">
      <Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={{ clickable: true }}
        // navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="mySwiper"
      >
        {galleryImages
          ?.filter((item) => item?.id !== +params?.id)
          ?.map((remember, index) => (
            <SwiperSlide key={index} className="">
              <img
                className="w-72 h-72 object-cover mx-auto rounded-md shadow-lg"
                loading="lazy"
                decoding="async"
                src={
                  remember?.id
                    ? `${remember?.cloud_front_domain}/${remember?.aws_file_name}`
                    : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                }
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Carousel;

import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import imageOne from "../../../../../../../Pictures/Images/PackedImages/image1.jpg";
import imageTwo from "../../../../../../../Pictures/Images/PackedImages/image2.jpg";
import imageThree from "../../../../../../../Pictures/Images/PackedImages/image3.jpg";
import imageFour  from "../../../../../../../Pictures/Images/PackedImages/image4.jpg";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const HeaderCarousel = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="swiperHeaderHome"
        loop={true}
      >
        <SwiperSlide>
          <img className="objectViewBoxImages h-[30rem] w-full object-cover" src={imageFour} />
          <h3></h3>
        </SwiperSlide>
       
        <SwiperSlide>
          <img className="objectViewBoxImages h-[30rem] w-full object-cover" src={imageOne} />
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
};

export default HeaderCarousel;

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const StepsCarousel = () => {
  return (
    <section className="px-3 py-8 bg-white">
      <div className="container-page">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation]}
          className="stepsCarousel mySwiper"
        >
          <SwiperSlide>
            <article className="flex">
              <div className="flex-1">Content</div>

              <div className="flex-1">Image</div>
            </article>
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default StepsCarousel;

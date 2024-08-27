import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const StepsCarousel = () => {
  return (
    <section className="px-3 py-8 bg-white">
      <div className="container-page relative">
        <h2 className="text-4xl text-fourth-color text-center uppercase font-semibold my-12">
          Ways to use your code QR
        </h2>

        <Swiper
          style={{
            "-swiper-pagination-bullet-width": "6px",
            "--swiper-pagination-bullet-size": "24px",
            "--swiper-pagination-bullet-height": "6px",
          }}
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".stepsCarousel-swiper-button-next",
            prevEl: ".stepsCarousel-swiper-button-prev",
          }}
          modules={[Navigation, Pagination]}
          className="stepsCarousel mySwiper"
        >
          <SwiperSlide>
            <article className="flex flex-col-reverse md:flex-row gap-4 px-5">
              <div className="flex-1">
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
                  Create an online memorial. Add photos, videos, messages, gifs,
                  or links. Gift cards can also be attached.
                </p>
                <button
                  className="btn btn-blue-light w-auto text-xl mt-4"
                  type="button"
                >
                  Create a Memorial
                </button>
              </div>

              <div className="flex-1">
                <img
                  src={
                    "https://images.pexels.com/photos/6384/woman-hand-desk-office.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                  className="rounded-md"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          </SwiperSlide>

          <SwiperSlide>
            <article className="flex flex-col-reverse md:flex-row gap-4 px-5">
              <div className="flex-1">
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
                  Create an online memorial. Add photos, videos, messages, gifs,
                  or links. Gift cards can also be attached.
                </p>
                <button
                  className="btn btn-blue-light w-auto text-xl mt-4"
                  type="button"
                >
                  Create a Memorial
                </button>
              </div>

              <div className="flex-1">
                <img
                  src={
                    "https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                  className="rounded-md"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          </SwiperSlide>

          <SwiperSlide>
            <article className="flex flex-col-reverse md:flex-row gap-4 px-5">
              <div className="flex-1">
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
                  Create an online memorial. Add photos, videos, messages, gifs,
                  or links. Gift cards can also be attached.
                </p>
                <button
                  className="btn btn-blue-light w-auto text-xl mt-4"
                  type="button"
                >
                  Create a Memorial
                </button>
              </div>

              <div className="flex-1">
                <img
                  src={
                    "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                  className="rounded-md"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          </SwiperSlide>

          <SwiperSlide>
            <article className="flex flex-col-reverse md:flex-row gap-4 px-5">
              <div className="flex-1">
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
                  Create an online memorial. Add photos, videos, messages, gifs,
                  or links. Gift cards can also be attached.
                </p>
                <button
                  className="btn btn-blue-light w-auto text-xl mt-4"
                  type="button"
                >
                  Create a Memorial
                </button>
              </div>

              <div className="flex-1">
                <img
                  src={
                    "https://images.pexels.com/photos/840996/pexels-photo-840996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                  className="rounded-md"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          </SwiperSlide>
        </Swiper>

        <FaArrowAltCircleRight className="stepsCarousel-swiper-button-next xl:block hidden absolute top-1/2 right-0 transform translate-y-1/2 translate-x-[2rem] z-50 cursor-pointer text-primary-color-light size-10" />
        <FaArrowAltCircleLeft className="stepsCarousel-swiper-button-prev xl:block hidden absolute top-1/2 left-0 transform translate-y-1/2 -translate-x-[2rem] z-50 cursor-pointer text-primary-color-light size-10" />
      </div>
    </section>
  );
};

export default StepsCarousel;

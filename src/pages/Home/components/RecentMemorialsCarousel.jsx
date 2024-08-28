import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

import { MdOutlineArrowRightAlt } from "react-icons/md";
import { PiCakeFill } from "react-icons/pi";
import { GiTombstone } from "react-icons/gi";

const RecentMemorialsCarousel = () => {
  return (
    <section className="bg-white">
      <div className="container-page px-3 py-14">
        <h2 className="text-4xl text-fourth-color text-center uppercase font-semibold">
          Recent online memorials
        </h2>

        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
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
          <SwiperSlide className="bg-gray-200/40 rounded-md px-2.5">
            <img
              src={
                "https://images.unsplash.com/photo-1445053023192-8d45cb66099d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              loading="lazy"
              decoding="async"
              className="w-32 h-24 object-cover rounded-md mx-auto -mt-6 sticky z-[999]"
            />
            <h3 className="text-center mt-2 font-bold">Jane Doe</h3>

            <div className="flex justify-between gap-2 my-3">
              <div>
                <h2 className="text-sm text-fourth-color/80">
                  <span className=" font-semibold">
                    <PiCakeFill className="inline-block size-6 align-bottom" />:
                  </span>{" "}
                  01/01/2000
                </h2>
              </div>

              <div>
                <h2 className="text-sm text-fourth-color/80">
                  <span className="font-semibold">
                    <GiTombstone className="inline-block size-6 align-bottom" />
                    :
                  </span>{" "}
                  <span>01/01/2020</span>
                </h2>
              </div>
            </div>

            <div className="py-3">
              <button className="btn btn-blue-light rounded-sm text-sm">
                Preview <MdOutlineArrowRightAlt className="inline" />
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide className="bg-gray-200/40 rounded-md px-2.5">
            <img
              src={
                "https://images.unsplash.com/photo-1445053023192-8d45cb66099d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              loading="lazy"
              decoding="async"
              className="w-32 h-24 object-cover rounded-md mx-auto -mt-6 sticky z-[999]"
            />
            <h3 className="text-center mt-2 font-bold">Jane Doe</h3>

            <div className="flex justify-between gap-2 my-3">
              <div>
                <h2 className="text-sm text-fourth-color/80">
                  <span className=" font-semibold">
                    <PiCakeFill className="inline-block size-6 align-bottom" />:
                  </span>{" "}
                  01/01/2000
                </h2>
              </div>

              <div>
                <h2 className="text-sm text-fourth-color/80">
                  <span className="font-semibold">
                    <GiTombstone className="inline-block size-6 align-bottom" />
                    :
                  </span>{" "}
                  <span>01/01/2020</span>
                </h2>
              </div>
            </div>

            <div className="py-3">
              <button className="btn btn-blue-light rounded-sm text-sm">
                Preview <MdOutlineArrowRightAlt className="inline" />
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide className="bg-gray-200/40 rounded-md px-2.5">
            <img
              src={
                "https://images.unsplash.com/photo-1445053023192-8d45cb66099d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              loading="lazy"
              decoding="async"
              className="w-32 h-24 object-cover rounded-md mx-auto -mt-6 sticky z-[999]"
            />
            <h3 className="text-center mt-2 font-bold">Jane Doe</h3>

            <div className="flex justify-between gap-2 my-3">
              <div>
                <h2 className="text-sm text-fourth-color/80">
                  <span className=" font-semibold">
                    <PiCakeFill className="inline-block size-6 align-bottom" />:
                  </span>{" "}
                  01/01/2000
                </h2>
              </div>

              <div>
                <h2 className="text-sm text-fourth-color/80">
                  <span className="font-semibold">
                    <GiTombstone className="inline-block size-6 align-bottom" />
                    :
                  </span>{" "}
                  <span>01/01/2020</span>
                </h2>
              </div>
            </div>

            <div className="py-3">
              <button className="btn btn-blue-light rounded-sm text-sm">
                Preview <MdOutlineArrowRightAlt className="inline" />
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide className="bg-gray-200/40 rounded-md px-2.5">
            <img
              src={
                "https://images.unsplash.com/photo-1445053023192-8d45cb66099d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              loading="lazy"
              decoding="async"
              className="w-32 h-24 object-cover rounded-md mx-auto -mt-6 sticky z-[999]"
            />
            <h3 className="text-center mt-2 font-bold">Jane Doe</h3>

            <div className="flex justify-between gap-2 my-3">
              <div>
                <h2 className="text-sm text-fourth-color/80">
                  <span className=" font-semibold">
                    <PiCakeFill className="inline-block size-6 align-bottom" />:
                  </span>{" "}
                  01/01/2000
                </h2>
              </div>

              <div>
                <h2 className="text-sm text-fourth-color/80">
                  <span className="font-semibold">
                    <GiTombstone className="inline-block size-6 align-bottom" />
                    :
                  </span>{" "}
                  <span>01/01/2020</span>
                </h2>
              </div>
            </div>

            <div className="py-3">
              <button className="btn btn-blue-light rounded-sm text-sm">
                Preview <MdOutlineArrowRightAlt className="inline" />
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide className="bg-gray-200/40 rounded-md px-2.5">
            <img
              src={
                "https://images.unsplash.com/photo-1445053023192-8d45cb66099d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              loading="lazy"
              decoding="async"
              className="w-32 h-24 object-cover rounded-md mx-auto -mt-6 sticky z-[999]"
            />
            <h3 className="text-center mt-2 font-bold">Jane Doe</h3>

            <div className="flex justify-between gap-2 my-3">
              <div>
                <h2 className="text-sm text-fourth-color/80">
                  <span className=" font-semibold">
                    <PiCakeFill className="inline-block size-6 align-bottom" />:
                  </span>{" "}
                  01/01/2000
                </h2>
              </div>

              <div>
                <h2 className="text-sm text-fourth-color/80">
                  <span className="font-semibold">
                    <GiTombstone className="inline-block size-6 align-bottom" />
                    :
                  </span>{" "}
                  <span>01/01/2020</span>
                </h2>
              </div>
            </div>

            <div className="py-3">
              <button className="btn btn-blue-light rounded-sm text-sm">
                Preview <MdOutlineArrowRightAlt className="inline" />
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide className="bg-gray-200/40 rounded-md px-2.5">
            <img
              src={
                "https://images.unsplash.com/photo-1445053023192-8d45cb66099d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              loading="lazy"
              decoding="async"
              className="w-32 h-24 object-cover rounded-md mx-auto -mt-6 sticky z-[999]"
            />
            <h3 className="text-center mt-2 font-bold">Jane Doe</h3>

            <div className="flex justify-between gap-2 my-3">
              <div>
                <h2 className="text-sm text-fourth-color/80">
                  <span className=" font-semibold">
                    <PiCakeFill className="inline-block size-6 align-bottom" />:
                  </span>{" "}
                  01/01/2000
                </h2>
              </div>

              <div>
                <h2 className="text-sm text-fourth-color/80">
                  <span className="font-semibold">
                    <GiTombstone className="inline-block size-6 align-bottom" />
                    :
                  </span>{" "}
                  <span>01/01/2020</span>
                </h2>
              </div>
            </div>

            <div className="py-3">
              <button className="btn btn-blue-light rounded-sm text-sm">
                Preview <MdOutlineArrowRightAlt className="inline" />
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide className="bg-gray-200/40 rounded-md px-2.5">
            <img
              src={
                "https://images.unsplash.com/photo-1445053023192-8d45cb66099d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              loading="lazy"
              decoding="async"
              className="w-32 h-24 object-cover rounded-md mx-auto -mt-6 sticky z-[999]"
            />
            <h3 className="text-center mt-2 font-bold">Jane Doe</h3>

            <div className="flex justify-between gap-2 my-3">
              <div>
                <h2 className="text-sm text-fourth-color/80">
                  <span className=" font-semibold">
                    <PiCakeFill className="inline-block size-6 align-bottom" />:
                  </span>{" "}
                  01/01/2000
                </h2>
              </div>

              <div>
                <h2 className="text-sm text-fourth-color/80">
                  <span className="font-semibold">
                    <GiTombstone className="inline-block size-6 align-bottom" />
                    :
                  </span>{" "}
                  <span>01/01/2020</span>
                </h2>
              </div>
            </div>

            <div className="py-3">
              <button className="btn btn-blue-light rounded-sm text-sm">
                Preview <MdOutlineArrowRightAlt className="inline" />
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide className="bg-gray-200/40 rounded-md px-2.5">
            <img
              src={
                "https://images.unsplash.com/photo-1445053023192-8d45cb66099d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              loading="lazy"
              decoding="async"
              className="w-32 h-24 object-cover rounded-md mx-auto -mt-6 sticky z-[999]"
            />
            <h3 className="text-center mt-2 font-bold">Jane Doe</h3>

            <div className="flex justify-between gap-2 my-3">
              <div>
                <h2 className="text-sm text-fourth-color/80">
                  <span className=" font-semibold">
                    <PiCakeFill className="inline-block size-6 align-bottom" />:
                  </span>{" "}
                  01/01/2000
                </h2>
              </div>

              <div>
                <h2 className="text-sm text-fourth-color/80">
                  <span className="font-semibold">
                    <GiTombstone className="inline-block size-6 align-bottom" />
                    :
                  </span>{" "}
                  <span>01/01/2020</span>
                </h2>
              </div>
            </div>

            <div className="py-3">
              <button className="btn btn-blue-light rounded-sm text-sm">
                Preview <MdOutlineArrowRightAlt className="inline" />
              </button>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default RecentMemorialsCarousel;

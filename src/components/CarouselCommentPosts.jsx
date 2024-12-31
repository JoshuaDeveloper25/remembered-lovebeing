import { useState } from "react";

const CarouselCommentPosts = ({ commentImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? commentImages.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === commentImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative md:h-full h-[15rem] w-full bg-black">
      <div className="relative h-full w-full overflow-hidden">
        {/* Carousel wrapper */}
        {commentImages?.map((item, index) => {
          return (
            <div
              key={item?.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={`${item?.cloud_front_domain}/${item?.aws_file_name}`}
                className="block w-full h-full object-contain"
                alt={`Image ${item?.id}`}
                onError={() =>
                  console.log(
                    "Error loading image:",
                    `${item?.cloud_front_domain}/${item?.aws_file_name}`
                  )
                }
              />
            </div>
          );
        })}
      </div>

      {/* Slider controls */}
      {commentImages?.length >= 2 && (
        <>
          <button
            type="button"
            className="absolute top-1/2 left-0 transform -translate-y-1/2 z-30 flex items-center rounded-full justify-center cursor-pointer mx-4 group focus:outline-none"
            onClick={prevSlide}
          >
            <span className="group inline-flex items-center justify-center w-10 h-10 rounded-full border border-white text-white hover:bg-white">
              <svg
                className="w-4 h-4 group-hover:text-primary-color rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>

          <button
            type="button"
            className="absolute top-1/2 right-0 transform -translate-y-1/2 z-30 flex rounded-full items-center justify-center cursor-pointer mx-4 group focus:outline-none"
            onClick={nextSlide}
          >
            <span className="group inline-flex items-center justify-center w-10 h-10 rounded-full border border-white text-white hover:bg-white">
              <svg
                className="w-4 h-4 group-hover:text-primary-color rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </>
      )}
    </div>
  );
};

export default CarouselCommentPosts;

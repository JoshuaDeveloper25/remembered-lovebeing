import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import AppContext from "../../../context/AppProvider";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { stepsApp } from "../../../db/data";
import CarouselStepsApp from "./CarouselStepsApp";

const Header = () => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.4 });
  const { t } = useTranslation(); // Hook para traducciones
  const { userInfo } = useContext(AppContext);

  return (
    <>
      <header className="relative h-[75vh]">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={
            "https://videos.pexels.com/video-files/6074179/6074179-uhd_2732_1440_25fps.mp4"
          }
          autoPlay
          loop
          muted
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

        <div
          className={`container-page relative z-10 px-3 py-4 h-full animated-box-comingDown ${
            isIntersecting ? "animate" : ""
          } `}
          ref={ref}
        >
          <div className="flex flex-col items-center justify-center text-center h-full ">
            <h1 className="font-serif md:text-6xl text-5xl text-white max-w-2xl">
              {t("Preserve the memories of those you love")}
            </h1>

            <p className="md:text-xl text-lg max-w-2xl text-white my-5">
              {t(
                `Create a profile for your loved one, upload photos, share memories through posts and allow others to leave tributes and condolences. Generate a QR code.`
              )}
            </p>

            <div className="flex flex-col md:flex-row items-center gap-3 mt-3 text-xl">
              <div className="md:w-auto w-full">
                <Link
                  to={
                    userInfo?.access_token
                      ? "/my-profiles/"
                      : "/sign-in?redirect=/my-profiles/"
                  }
                >
                  <button
                    type="button"
                    className="btn btn-blue-light w-full block rounded-sm"
                  >
                    {t("Get Started")}
                  </button>
                </Link>
              </div>

              <div className="md:w-auto w-full">
                <Link
                  to={"/remembered-profile/Albert-Einstein-27"}
                  target="_blank"
                >
                  <button
                    type="button"
                    className="font-medium animation-fade px-6 py-2 inline-block border border-white text-white hover:bg-white hover:text-black rounded-sm"
                  >
                    {t("See An Example Memorial")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="container-page px-3 sticky">
        {/* From 850px to up we're going to show it */}
        <div className="min-[850px]:block hidden">
          <div className="grid grid-cols-4 justify-center gap-8 md:-mt-16 -mt-4 mb-14 items-stretch place-items-center">
            {stepsApp?.map((stepApp, index) => (
              <article
                key={index}
                className="w-52 bg-primary-color text-white shadow-lg rounded-sm px-6 py-4"
              >
                <div className="flex items-center gap-3 text-yellow-500 font-medium">
                  <h3 className="text-4xl font-black">{stepApp?.numberStep}</h3>
                  <div className="bg-yellow-500 h-1 w-full"></div>
                </div>

                <h3 className="text-xl mt-2">{stepApp?.descStep}</h3>
              </article>
            ))}
          </div>
        </div>

        {/* From 850px to bottom we're going to show it */}
        <div className="min-[850px]:hidden block">
          <div className="-mt-8 sticky z-50">
            <CarouselStepsApp />
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;

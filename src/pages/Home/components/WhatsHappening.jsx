import CarouselCommunity from "./CarouselCommunity";
import { useTranslation } from "react-i18next";
import { websiteAnalytics } from "../../../db/data";

const WhatsHappening = () => {
  const { t } = useTranslation(); // Hook para traducciones

  return (
    <section className="bg-white py-16">
      <div className="container-page">
        <div className="text-center">
          <h2 className="font-mono text-5xl font-semibold text-primary-color tracking-wider">
            {t("Our Community Today")}
          </h2>
          <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
          <p className="text-xl max-w-2xl mx-auto mt-2 mb-8 text-muted-color">
            {t(
              "Discover the number of memorials, tributes and active posts, and how our community keep growing up and remembering."
            )}
          </p>
        </div>

        <div className="bg-[#F1EFEC] shadow-lg rounded min-[850px]:py-6 py-8 px-6">
          {/* From 850px to up we're going to show it */}
          <div className="min-[850px]:flex hidden flex-wrap justify-center items-center md:gap-24 gap-14">
            {websiteAnalytics?.map((track, index) => (
              <div key={index} className="text-center">
                {track?.analyticIcon}

                <h3 className="font-bold text-4xl mb-2 text-primary-color">
                  {track?.analyticNumber}
                </h3>
                <h5 className="border-b border-black/50 text-xl">
                  {t(track?.analyticName)}
                </h5>
              </div>
            ))}
          </div>

          {/* From 850px to bottom we're going to show it */}
          <div className="min-[850px]:hidden block">
            <div className="sticky z-50">
              <CarouselCommunity />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsHappening;

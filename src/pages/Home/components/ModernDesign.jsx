import modernDesignPrev from "../../../assets/modern-design.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ModernDesign = () => {
  const { t } = useTranslation();

  return (
    <section className="sm:block hidden px-3 sm:py-8 py-3 sm:border-none border-gray-400 border">
      <div className="container-page">
        <h2 className="font-mono tracking-wider sm:text-4xl text-3xl text-primary-color uppercase font-semibold">
          {t("We offer modern designs.")}
        </h2>
        <div className="bg-yellow-500 h-2 w-24 my-3"></div>

        <div className="flex flex-col md:flex-row items-center text-modern-color gap-3">
          <div className="flex-1">
            <img
              className="-mt-10"
              src={modernDesignPrev}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="flex-1">
            <h2 className="sm:text-3xl text-2xl font-semibold my-4">
              {t("Modern, beautiful design")}
            </h2>
            <p className="text-muted-color max-w-sm text-xl">
              Memorial pages are thoughtfully designed with a modern and elegant
              style, ensuring they look beautiful and function perfectly on any
              device.
            </p>

            <Link to={`/memorials`}>
              <button
                type="button"
                className={`btn text-[#00A2B3] animation-fade text-xl hover:bg-[#00A2B3] hover:text-white border border-[#00A2B3] rounded-sm mt-3 w-auto`}
              >
                {t("Preview Memorials")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernDesign;

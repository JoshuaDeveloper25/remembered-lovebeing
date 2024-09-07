import modernDesignPrev from "../../../assets/modern-design.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ModernDesign = () => {
  const { t } = useTranslation();

  return (
    <section className="px-3 py-8 ">
      <div className="container-page">
        <h2 className="font-mono tracking-wider text-4xl text-primary-color uppercase font-semibold">
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
            <h2 className="text-3xl font-semibold my-4">
              {t("Modern, beautiful design")}
            </h2>
            <p className="text-muted-color max-w-sm text-xl">
              {t(
                "Memorial Source memorial pages are built with elegant, modern design that looks good on all devices."
              )}
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

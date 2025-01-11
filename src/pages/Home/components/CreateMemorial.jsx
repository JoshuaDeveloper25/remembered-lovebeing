import { Link } from "react-router-dom";
import CarouselCubeCreateMemorials from "./CarouselCubeCreateMemorials";
import { useTranslation } from "react-i18next";

const CreateMemorial = () => {
  const { t } = useTranslation(); // Hook para traducciones

  return (
    <section className="px-3 sm:py-14 py-3 sm:border-none border-gray-400 border">
      <div className="container-page">
        <div className="flex flex-col md:flex-row items-center text-modern-color gap-3">
          <div className="flex-1">
            <h4 className="font-medium uppercase tracking-widest px-2 text-xl border-b-2 border-yellow-500 inline">
              {t("CREATE")}
            </h4>
            <h2 className="sm:text-4xl text-3xl text-fourth-color font-semibold my-4">
              {t("Create an online memorial")}{" "}
              <span className="text-modern-color block font-medium sm:text-3xl text-2xl">
                {t(`Share your loved one's story`)}.
              </span>
            </h2>
            <p className="text-muted-color max-w-sm text-xl sm:block hidden">
              {t(
                "Create a meaningful online memorial to celebrate your loved one’s life. Share stories, upload photos, receive condolences, post tributes, and keep their memory alive."
              )}
            </p>
            <Link to="/prices/">
              <button
                className="btn btn-blue-light w-auto text-xl sm:mt-4"
                type="button"
              >
                {t("Create a Memorial")}
              </button>
            </Link>
          </div>

          <div className="md:block hidden flex-1">
            <CarouselCubeCreateMemorials />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateMemorial;

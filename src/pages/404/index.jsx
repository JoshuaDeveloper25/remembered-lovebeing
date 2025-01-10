import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";

const Page404 = () => {
  const [searchParams] = useSearchParams();
  const urlType = searchParams?.get("type");
  const { t } = useTranslation();

  return (
    <section className="h-[60vh]">
      {/* --> Introduction */}
      <div className="flex flex-col justify-center items-center h-full text-center px-2">
        <h2 className="font-mono tracking-wider text-4xl text-primary-color uppercase font-semibold">
          {urlType === "altered-url" ? t("The URL has been altered!") : t("Page Not Found")}
        </h2>

        <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>

        <p className="text-xl max-w-2xl mx-auto mt-2 mb-8 text-muted-color">
          {t(
            "Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or never existed in the first place. Please check the URL or go back to the homepage."
          )}
        </p>

        {urlType === "altered-url" && (
          <Link to={"/prices"} className="btn btn-blue max-w-xs mx-auto">
            {t("Go Prices")}
          </Link>
        )}
      </div>
    </section>
  );
};

export default Page404;

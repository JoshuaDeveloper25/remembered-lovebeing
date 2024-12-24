import AppContext from "../../context/AppProvider";
import { IoCloseSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoStop } from "react-icons/go";
import { useContext } from "react";

const Prices = () => {
  const { t } = useTranslation();
  const { userInfo } = useContext(AppContext);

  return (
    <section className="container-page px-3 py-16">
      <div className="text-center">
        <h2 className="font-mono tracking-wider text-4xl text-primary-color uppercase font-semibold">
          {t("Pricing Plans")}
        </h2>
        <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
        <p className="text-xl max-w-2xl mx-auto  text-muted-color">
          {t(
            "Explore our flexible pricing options and find the plan that best suits your needs and budget."
          )}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 mt-16">
        <div className="min-w-[20rem] hover:scale-105 hover:shadow-2xl animation-fade border shadow-xl rounded-md text-center py-11 px-7 bg-white">
          <span className="font-semibold text-primary-color-light uppercase tracking-wider">
            {t("Free")}
          </span>

          <div className="mt-5">
            <h2 className="font-bold text-primary-color-light text-5xl tracking-tighter">
              <span className="align-text-top text-4xl me-3">$</span>
              <span>0.00</span>
            </h2>
           
          </div>

          <ul className="text-muted-color leading-9 my-5">
            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              {t("Tributes")}
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              {t("Condolences")}
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <GoStop className="text-yellow-500 size-5 font-bold inline-block" />
              {t("Up to 6 images")}
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <IoCloseSharp className="text-red-500 size-[1.3rem] font-bold inline-block" />
              {t("No posts")}
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <IoCloseSharp className="text-red-500 size-[1.3rem] font-bold inline-block" />
              {t("Generate QR Code")}
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <IoCloseSharp className="text-red-500 size-[1.3rem] font-bold inline-block" />
              {t("N° of Premium Profiles")} (0)
            </li>
          </ul>
          <Link
            to={
              userInfo?.access_token
                ? "/my-profiles/"
                : "/sign-in?redirect=/my-profiles/"
            }
          >
            <button
              className="btn hover:bg-primary-color-light hover:text-white animation-fade border w-auto rounded-full"
              type="button"
            >
              {t("Select Plan")}
            </button>
          </Link>
        </div>

        <div className="min-w-[20rem] hover:scale-105 hover:shadow-2xl animation-fade border shadow-xl rounded-md text-center py-11 px-7 bg-white relative">
          <div className="absolute top-5 -left-8">
            <h3 className="bg-red-500 shadow-lg rounded-sm text-white font-semibold tracking-wider font-mono uppercase -rotate-45 px-2">
              {t("Most Popular!")}
            </h3>
          </div>

          <span className="font-semibold text-primary-color-light uppercase tracking-wider">
            Single Package
          </span>

          <div className="mt-5">
            <h2 className="font-bold text-primary-color-light text-5xl tracking-tighter">
              <span className="align-text-top text-4xl me-3">$</span>
              <span>19.99</span>
            </h2>
          </div>

          <ul className="text-muted-color leading-9 my-5">
            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              {t("Tributes")}
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              {t("Condolences")}
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              {t("Unlimited images")}
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              {t("Unlimited posts")}
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              {t("Generate QR Code")}
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              {t("N° of Premium Profiles")} (1)
            </li>
          </ul>

          <Link
            to={
              userInfo?.access_token
                ? "/checkout/?packageName=singlePackage"
                : "/sign-in?redirect=/checkout/?packageName=singlePackage"
            }
          >
            <button
              className="btn bg-primary-color-light text-white hover:bg-primary-color-light/55 animation-fade border w-auto rounded-full"
              type="button"
            >
              {t("Select Plan")}
            </button>
          </Link>
        </div>

        <div className="min-w-[20rem] hover:scale-105 hover:shadow-2xl animation-fade border shadow-xl rounded-md text-center py-11 px-7 bg-white">
          <span className="font-semibold text-primary-color-light uppercase tracking-wider">
            Tertiary Package
          </span>
          <div className="mt-5">
            <h2 className="font-bold text-primary-color-light text-5xl tracking-tighter">
              <span className="align-text-top text-4xl me-3">$</span>
              <span>59.99</span>
            </h2>
          </div>
          <ul className="text-muted-color leading-9 my-5">
            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              {t("Tributes")}
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              {t("Condolences")}
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              {t("Unlimited images")}
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              {t("Unlimited posts")}
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              {t("Generate QR Code")}
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              {t("N° of Premium Profiles")} (3)
            </li>
          </ul>
          <Link
            to={
              userInfo?.access_token
                ? "/checkout/?packageName=tertiaryPackage"
                : "/sign-in?redirect=/checkout/?packageName=tertiaryPackage"
            }
          >
            <button
              className="btn hover:bg-primary-color-light hover:text-white animation-fade border w-auto rounded-full"
              type="button"
            >
              {t("Select Plan")}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Prices;

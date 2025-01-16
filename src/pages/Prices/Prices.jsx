import QuestionMarkInfo from "../../components/QuestionMarkInfo";
import { useMutation } from "@tanstack/react-query";
import AppContext from "../../context/AppProvider";
import { IoCloseSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import SelectCurrency from "./SelectCurrency";
import { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoStop } from "react-icons/go";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const Prices = () => {
  const { t } = useTranslation();
  const { userInfo } = useContext(AppContext);
  const [currency, setCurrency] = useState("");
  let currencySymbol;

  if (currency === "HNL") {
    currencySymbol = "L";
  } else if (currency === "GTQ") {
    currencySymbol = "Q";
  } else if (currency === "NIO") {
    currencySymbol = "C$";
  } else if (currency === "CRC") {
    currencySymbol = "₡";
  } else if (currency === "MXN") {
    currencySymbol = "Mex$";
  }

  // This is for turning a remembered profile from free to PRO
  const getCurrencyMutation = useMutation({
    mutationFn: async () =>
      await axios.get(
        `https://v6.exchangerate-api.com/v6/${
          import.meta.env.VITE_CURRENCY_KEY
        }/pair/USD/${currency}`
      ),
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleChangeCurrency = (e) => {
    setCurrency(e.target.value);

    getCurrencyMutation.mutate();
  };

  return (
    <section className="container-page px-3 py-16">
      <Helmet>
        <title>Eternal MemoriesX | Prices</title>
      </Helmet>

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

      <div className="grid place-items-center mt-8">
        <SelectCurrency
          handleChangeCurrency={handleChangeCurrency}
          setCurrency={setCurrency}
          currency={currency}
          t={t}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
        <div className="min-w-[20rem] hover:shadow-2xl animation-fade border shadow-xl rounded-md text-center py-11 px-7 bg-white">
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
              {t("No posts")}{" "}
              <QuestionMarkInfo toolTipId={"postsHelpFree"}>
                <div className="text-white max-w-sm leading-5 text-xs">
                  <h3 className="font-bold text-sm">{t("Posts")}</h3>
                  <p className="text-start">
                    {t(
                      "Create special posts with meaningful images of your loved ones, allowing others to leave comments and hearts as a token of affection and support."
                    )}
                  </p>
                </div>
              </QuestionMarkInfo>
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <IoCloseSharp className="text-red-500 size-[1.3rem] font-bold inline-block" />
              {t("Generate QR Code")}{" "}
              <QuestionMarkInfo toolTipId={"generateQRCodeHelpFree"}>
                <div className="text-white max-w-sm leading-5 text-xs">
                  <h3 className="font-bold text-sm">{t("QR Code")}</h3>

                  <p className="text-start">
                    {t(
                      "Generate a unique QR code for easy access to the memorial profile, perfect for placing on meaningful objects such as:"
                    )}
                  </p>

                  <ul className="pl-5 list-disc text-start mt-4">
                    <li>{t("Urn")}</li>
                    <li>{t("Headstone")}</li>
                    <li>{t("T-shirts")}</li>
                  </ul>
                </div>
              </QuestionMarkInfo>
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <IoCloseSharp className="text-red-500 size-[1.3rem] font-bold inline-block" />
              {t("N° of Premium Profiles")} (0){" "}
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

        <div className="min-w-[20rem] hover:shadow-2xl animation-fade border shadow-xl rounded-md text-center py-11 px-7 bg-white relative">
          <div className="absolute top-5 -left-8">
            <h3 className="bg-red-500 shadow-lg rounded-sm text-white font-semibold tracking-wider font-mono uppercase -rotate-45 px-2">
              {t("Most Popular!")}
            </h3>
          </div>

          <span className="font-semibold text-primary-color-light uppercase tracking-wider">
            {t("Single Package")}
          </span>

          <div className="mt-5">
            <h2 className="font-bold text-primary-color-light text-5xl tracking-tighter">
              <span className="align-text-top text-4xl me-3">$</span>
              <span>1.00</span>
            </h2>

            {currency ? (
              <h4 className="text-muted-color">
                {t("Aprox.")} {currencySymbol}{" "}
                <span className="font-extrabold">
                  {(
                    getCurrencyMutation?.data?.data?.conversion_rate * 1.00
                  ).toFixed("2")}
                </span>
              </h4>
            ) : (
              ""
            )}
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
              {t("Unlimited posts")}{" "}
              <QuestionMarkInfo toolTipId={"postsHelp19"}>
                <div className="text-white max-w-sm leading-5 text-xs">
                  <h3 className="font-bold text-sm">{t("Posts")}</h3>
                  <p className="text-start">
                    {t(
                      "Create special posts with meaningful images of your loved ones, allowing others to leave comments and hearts as a token of affection and support."
                    )}
                  </p>
                </div>
              </QuestionMarkInfo>
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              {t("Generate QR Code")}{" "}
              <QuestionMarkInfo toolTipId={"generateQRCodeHelp19"}>
                <div className="text-white max-w-sm leading-5 text-xs">
                  <h3 className="font-bold text-sm">{t("QR Code")}</h3>

                  <p className="text-start">
                    {t(
                      "Generate a unique QR code for easy access to the memorial profile, perfect for placing on meaningful objects such as:"
                    )}
                  </p>

                  <ul className="pl-5 list-disc text-start mt-4">
                    <li>{t("Urn")}</li>
                    <li>{t("Headstone")}</li>
                    <li>{t("T-shirts")}</li>
                  </ul>
                </div>
              </QuestionMarkInfo>
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
        {/* 
        <div className="min-w-[20rem] hover:shadow-2xl animation-fade border shadow-xl rounded-md text-center py-11 px-7 bg-white">
          <span className="font-semibold text-primary-color-light uppercase tracking-wider">
            {t("Tertiary Package")}
          </span>
          <div className="mt-5">
            <h2 className="font-bold text-primary-color-light text-5xl tracking-tighter">
              <span className="align-text-top text-4xl me-3">$</span>
              <span>49.99</span>
            </h2>

            {currency ? (
              <h4 className="text-muted-color">
                {t("Aprox.")} {currencySymbol}{" "}
                <span className="font-extrabold">
                  {(
                    getCurrencyMutation?.data?.data?.conversion_rate * 49.99
                  ).toFixed("2")}
                </span>
              </h4>
            ) : (
              ""
            )}
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
              <QuestionMarkInfo toolTipId={"postsHelp49"}>
                <div className="text-white max-w-sm leading-5 text-xs">
                  <h3 className="font-bold text-sm">{t("Posts")}</h3>
                  <p className="text-start">
                    {t(
                      "Create special posts with meaningful images of your loved ones, allowing others to leave comments and hearts as a token of affection and support."
                    )}
                  </p>
                </div>
              </QuestionMarkInfo>
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              {t("Generate QR Code")}{" "}
              <QuestionMarkInfo toolTipId={"generateQRCodeHelp49"}>
                <div className="text-white max-w-sm leading-5 text-xs">
                  <h3 className="font-bold text-sm">{t("QR Code")}</h3>

                  <p className="text-start">
                    {t(
                      "Generate a unique QR code for easy access to the memorial profile, perfect for placing on meaningful objects such as:"
                    )}
                  </p>

                  <ul className="pl-5 list-disc text-start mt-4">
                    <li>{t("Urn")}</li>
                    <li>{t("Headstone")}</li>
                    <li>{t("T-shirts")}</li>
                  </ul>
                </div>
              </QuestionMarkInfo>
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
        </div> */}
      </div>
    </section>
  );
};

export default Prices;

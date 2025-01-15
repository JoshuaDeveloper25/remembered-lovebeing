import PaypalComponent from "../../../components/PaypalComponent";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import AppContext from "../../../context/AppProvider";
import { useMutation } from "@tanstack/react-query";
import payments from "../../../assets/payments.png";
import paypal from "../../../assets/paypal.png";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { TbPigMoney } from "react-icons/tb";
import { packages } from "../../../db/data";
import { FaCheck, FaCreditCard } from "react-icons/fa";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const packageNames = Object.keys(packages);

const PricesPlan = ({ packageName }) => {
  const [selectedPayments, setSelectedPayments] = useState(false);
  const { t } = useTranslation();
  const { userInfo } = useContext(AppContext);
  const shortId = uuidv4().slice(0, 8);

  if (packageNames.findIndex((item) => item === packageName) === -1)
    return <Navigate to={"/*?type=altered-url"} />;

  const ern = `${`${shortId}-`}${
    packageName === "singlePackage" ? "singlePackage-1" : "tertiaryPackage-3"
  }`;

  const handlePaymentChange = (value) => {
    setSelectedPayments(value);
  };

  const generatePaymentURLMutation = useMutation({
    mutationFn: async (paymentInfo) =>
      await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/payments/generate-pagadito-payment-url`,
        paymentInfo
      ),
    onSuccess: (res) => {
      const paymentUrl = res?.data?.data?.url;

      if (paymentUrl) {
        window.location.href = `${paymentUrl}`;
      } else {
        toast.error("Didn't receive a valid url.");
      }
    },
    onError: (err) => {
      toast.error(getFastApiErrors(err));
    },
  });

  const generatePaymentURL = () => {
    generatePaymentURLMutation?.mutate({
      ern: ern,
      amount: packageName === "singlePackage" ? 1 : 49.99,
      currency: "USD",
      details: [
        {
          quantity: 1,
          description:
            packageName === "singlePackage"
              ? "Compra De SinglePackage Premium (Incluye 1 Perfil Premium)"
              : "Compra De TertiaryPackage (Incluye 3 Perfiles Premium)",
          price: packageName === "singlePackage" ? 1 : 49.99,
        },
      ],
      custom_params: {
        param1: userInfo?.email,
      },
    });
  };

  return (
    <div className="flex items-start flex-col md:flex-row gap-8 bg-primary-color text-white shadow-primary-color hover:shadow-primary-color hover:shadow-2xl animation-fade rounded-md shadow-lg p-4">
      {/* Package to buy - LEFT */}
      {packageName === "singlePackage" ? (
        <div className="min-w-[20rem] mx-auto hover:shadow-2xl animation-fade border border-primary-color-light shadow-xl rounded-sm text-center py-8 px-7">
          <span className="font-semibold text-primary-color-light uppercase tracking-wider">
            {t("Single Package")}
          </span>

          <div className="mt-5">
            <h2 className="font-bold text-primary-color-light text-5xl tracking-tighter">
              <span className="align-text-top text-4xl me-3">$</span>
              <span>1.00</span>
            </h2>
            <h3 className="text-primary-color-light">for life</h3>
          </div>

          <ul className="text-white leading-9 my-5">
            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Tributes
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Condolences
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Unlimited images
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Unlimited posts
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Generate QR Code
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Number of Premium Profiles (1)
            </li>
          </ul>
        </div>
      ) : (
        <div className="min-w-[20rem] mx-auto hover:shadow-2xl animation-fade border border-primary-color-light shadow-xl rounded-sm text-center py-8 px-7">
          <span className="font-semibold text-primary-color-light uppercase tracking-wider">
            {t("Tertiary Package")}
          </span>
          <div className="mt-5">
            <h2 className="font-bold text-primary-color-light text-5xl tracking-tighter">
              <span className="align-text-top text-4xl me-3">$</span>
              <span>49.99</span>
            </h2>
            <h3 className="text-primary-color-light">for life</h3>
          </div>
          <ul className="text-white leading-9 my-5">
            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Tributes
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Condolences
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Unlimited images
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Unlimited posts
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Generate QR Code
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Number of Premium Profiles (3)
            </li>
          </ul>
        </div>
      )}

      {/* Payment Method - RIGHT */}
      <div className="md:flex-[40%] w-full px-4 py-8">
        <div>
          <h2 className="font-mono tracking-wider text-3xl uppercase font-semibold">
            Select a payment method
          </h2>
          <div className="bg-yellow-500 h-2 w-24 my-3"></div>
        </div>

        <div className="space-y-4 mt-8">
          <label
            className={`flex items-center justify-between border rounded-md py-1.5 px-4 shadow-md hover:shadow-lg animation-fade active:shadow-2xl ${
              selectedPayments === "plural"
                ? "bg-primary-color-light/50 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                checked={selectedPayments === "plural"}
                name="paymentMethod"
                value="plural"
                onChange={() => handlePaymentChange("plural")}
                className="w-4 h-4 text-primary-color-light bg-gray-100 border-gray-300 focus:ring-primary-color-light dark:focus:ring-primary-color-light dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="ms-2 text-sm font-medium  dark:text-gray-300">
                Pay with a card
              </p>
            </div>
            <div>
              <img src={payments} className="sm:w-52 w-32" />
            </div>
          </label>

          {selectedPayments === "plural" && (
            <div className="shadow-md rounded-md bg-white p-4">
              <button
                type="button"
                className="btn bg-[#41CA7F] hover:opacity-50 text-white flex mx-auto items-center gap-2 w-fit font-semibold disabled:animate-pulse animation-fade"
                onClick={generatePaymentURL}
                disabled={generatePaymentURLMutation?.isPending}
              >
                <FaCreditCard  size={26} />
                {generatePaymentURLMutation?.isPending
                  ? t("Loading...")
                  : "Continue With A Card"}
              </button>
            </div>
          )}

          <label
            className={`flex items-center justify-between border rounded-md py-1.5 px-4 shadow-md hover:shadow-lg animation-fade active:shadow-2xl ${
              selectedPayments === "singular"
                ? "bg-primary-color-light/50 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                checked={selectedPayments === "singular"}
                name="paymentMethod"
                value="singular"
                onChange={() => handlePaymentChange("singular")}
                className="w-4 h-4 text-primary-color-light bg-gray-100 border-gray-300 focus:ring-primary-color-light dark:focus:ring-primary-color-light dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="ms-2 text-sm font-medium  dark:text-gray-300">
                Pay with Paypal
              </p>
            </div>
            <div>
              <img src={paypal} className="sm:w-36 w-32" />
            </div>
          </label>

          {selectedPayments === "singular" && (
            <>
              <PaypalComponent packageName={packageName} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricesPlan;

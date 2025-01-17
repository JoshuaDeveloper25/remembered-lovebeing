import PaypalComponent from "../../../components/PaypalComponent";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getLivedDays } from "../../../utils/getLivedDays";
import AppContext from "../../../context/AppProvider";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// Images && icons
import payments from "../../../assets/payments.png";
import paypal from "../../../assets/paypal.png";
import { FaCreditCard } from "react-icons/fa";

const ProfilePlanStatus = () => {
  const { userInfo } = useContext(AppContext);
  const [selectedPayments, setSelectedPayments] = useState(false);
  const [searchParams] = useSearchParams();
  const shortId = uuidv4().slice(0, 8);
  const { t } = useTranslation();

  // --> 🧓 Get certain profile by remember id
  const rememberProfileQuery = useQuery({
    queryKey: [`profile`, searchParams.get("slug")],
    queryFn: async () =>
      await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/remembereds/get-profile/${searchParams.get("slug")}`
      ),
  });

  const rememberedId = rememberProfileQuery?.data?.data?.remembered_profile?.id;
  const ern = `${`${shortId}-`}${`goPro-${rememberedId}`}`;

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

  const handlePaymentChange = (value) => {
    setSelectedPayments(value);
  };

  const generatePaymentURL = () => {
    generatePaymentURLMutation?.mutate({
      ern: ern,
      amount: 4.99,
      currency: "USD",
      details: [
        {
          quantity: 1,
          description: t("Making FREE profile to PRO"),
          price: 4.99,
        },
      ],
      custom_params: {
        param1: userInfo?.email,
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 bg-primary-color text-white shadow-primary-color hover:shadow-primary-color hover:shadow-2xl animation-fade rounded-md shadow-lg p-4">
      {/* Remebered to pass pro - LEFT */}
      {rememberProfileQuery?.isLoading ? (
        t("Loading...")
      ) : (
        <div className="flex-1 relative shadow-2xl rounded-md">
          <img
            src={
              rememberProfileQuery?.data?.data?.remembered_profile?.cover_images
                ?.cloud_front_domain
                ? `${rememberProfileQuery?.data?.data?.remembered_profile?.cover_images?.cloud_front_domain}/${rememberProfileQuery?.data?.data?.remembered_profile?.cover_images?.aws_file_name}`
                : "https://images.unsplash.com/photo-1506353187171-d49740268889?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            className="w-full h-32 object-cover rounded-t-lg"
            decoding="async"
            loading="lazy"
          />

          <div className="relative bg-white p-6 pb-6 rounded-b-lg">
            <div className="absolute top-2 right-2">
              <p className="text-green-500 rounded-sm bg-green-500/20 p-2">
                Plan: <span className="font-semibold">{t("Free")}</span>
              </p>
            </div>

            <div>
              <img
                src={
                  rememberProfileQuery.data?.data?.remembered_profile
                    ?.profile_images?.cloud_front_domain
                    ? `${rememberProfileQuery?.data?.data?.remembered_profile?.profile_images?.cloud_front_domain}/${rememberProfileQuery?.data?.data?.remembered_profile?.profile_images?.aws_file_name}`
                    : "https://i.pinimg.com/474x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg"
                }
                className="h-24 w-24 -mt-20 object-cover rounded-full border-4 border-black/60"
                decoding="async"
                loading="lazy"
              />

              <h2 className="text-primary-color-light text-center text-2xl mt-3 font-bold">
                <span className="align-text-top text-sm font-bold">$ </span>
                4.99
              </h2>

              <h3 className="text-center font-semibold text-muted-color mt-6 mb-2">
                {t("In Loving Memory Of")}
              </h3>

              <h2 className="capitalize self-end font-bold text-2xl text-primary-color leading-6 text-center my-6">
                {`${
                  rememberProfileQuery?.data?.data?.remembered_profile
                    ?.first_name
                } ${
                  rememberProfileQuery?.data?.data?.remembered_profile
                    ?.last_name || ""
                }`}
              </h2>

              {!rememberProfileQuery?.data?.data?.remembered_profile
                ?.birth_date &&
              !rememberProfileQuery?.data?.data?.remembered_profile
                ?.birth_date ? (
                <h2 className="text-center font-semibold mt-4 text-muted-color">
                  {t("User hasn't input a date...")}
                </h2>
              ) : (
                <div className="mt-4 text-center">
                  <h4 className="text-gray-700 font-semibold text-base">
                    {
                      rememberProfileQuery?.data?.data?.remembered_profile
                        ?.birth_date
                    }{" "}
                    -{" "}
                    {
                      rememberProfileQuery?.data?.data?.remembered_profile
                        ?.death_date
                    }
                    <span className="block text-xs font-medium">
                      {!rememberProfileQuery?.data?.data?.remembered_profile
                        ?.birth_date &&
                      !rememberProfileQuery?.data?.data?.remembered_profile
                        ?.death_date
                        ? null
                        : `${t("Lived")}: ${getLivedDays(
                            rememberProfileQuery?.data?.data?.remembered_profile
                              ?.birth_date,
                            rememberProfileQuery?.data?.data?.remembered_profile
                              ?.death_date
                          )}`}
                    </span>
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Method - RIGHT */}
      <div className="flex-[40%] px-4 py-8">
        <div>
          <h2 className="font-mono tracking-wider text-3xl uppercase font-semibold">
            {t("Select a payment method")}
          </h2>
          <div className="bg-yellow-500 h-2 w-24 my-3"></div>
        </div>

        <div className="space-y-4 mt-8">
          <label
            className={`flex items-center justify-between border-2 rounded-md py-1.5 px-4 shadow-md hover:shadow-lg animation-fade active:shadow-2xl ${
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
                {t("Pay with a card")}
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
                className="disabled:bg-green-300 disabled:pointer-events-none btn bg-[#41CA7F] text-white hover:opacity-50 flex mx-auto items-center gap-2 w-fit font-semibold disabled:animate-pulse animation-fade"
                onClick={generatePaymentURL}
                disabled={generatePaymentURLMutation?.isPending}
              >
                <FaCreditCard size={26} />
                {generatePaymentURLMutation?.isPending
                  ? t("Loading...")
                  : t("Continue With A Card")}
              </button>
            </div>
          )}

          <label
            className={`flex items-center justify-between border-2 rounded-md py-1.5 px-4 shadow-md hover:shadow-lg animation-fade active:shadow-2xl ${
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
                {t("Pay with Paypal")}
              </p>
            </div>
            <div>
              <img src={paypal} className="sm:w-36 w-32" />
            </div>
          </label>

          {selectedPayments === "singular" && (
            <>
              <PaypalComponent
                rememberedId={
                  rememberProfileQuery?.data?.data?.remembered_profile?.id
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePlanStatus;

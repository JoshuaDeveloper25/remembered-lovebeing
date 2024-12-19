import getFastApiErrors from "../../utils/getFastApiErrors";
import { Link, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import AppContext from "../../context/AppProvider";
import { useReactToPrint } from "react-to-print";
import { AiFillPrinter } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import axios from "axios";

import peaceDove from "../../assets/peace-dove.png";
import cloud from "../../assets/cloud.png";
import logo from "../../assets/logo.png";

const CheckingStatusPagadito = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const { userInfo } = useContext(AppContext);
  const { t } = useTranslation();
  let transactionStatus;

  const [searchParams] = useSearchParams();
  const comprobante = searchParams.get("comprobante")?.split("-");

  // Get status of the payment (EXPIRED, COMPLETED, REGISTERED)
  const getStatusPagaditoPayment = useMutation({
    mutationFn: async (paymentInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payments/get-status-pagadito-payment`,
        paymentInfo
      ),
    onSuccess: (res) => {
      // console.log(res);
    },
    onError: (err) => {
      toast.error(getFastApiErrors(err));
    },
  });

  // This is for buying a package of 1 or 3
  const payPremiumProfilePrices = useMutation({
    mutationFn: async (paymentInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payments/get-premium-profiles/pay/${
          comprobante[1] === "singlePackage" ? 1 : 3
        }/${searchParams?.get("token")}`,
        paymentInfo
      ),
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  // This is for turning a remembered profile from free to PRO
  const payRememberedProProfile = useMutation({
    mutationFn: async (paymentInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payments/pay?remembered_id=${
          comprobante[2]
        }&token=${searchParams.get("token")}`,
        paymentInfo
      ),
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      toast.error(getFastApiErrors(err));
    },
  });

  // This is the transaction text depending of PAGADITO STATUS
  if (getStatusPagaditoPayment?.data?.data?.data?.status === "REGISTERED") {
    transactionStatus = "La transacción no se ha completado.";
  } else if (
    getStatusPagaditoPayment?.data?.data?.data?.status === "COMPLETED"
  ) {
    transactionStatus = "Transacción realizada correctamente.";
  } else {
    transactionStatus = "La transacción ha expirado.";
  }

  // When component is mounted we mutate the getStatusPagaditoPayment (We send token)
  useEffect(() => {
    getStatusPagaditoPayment?.mutate({
      token: searchParams.get("token"),
    });
  }, []);

  // If getStatusPagaditoPayment changes we want to PAY (If its a REMEMBERED profile or PACKAGE (1, 3))
  useEffect(() => {
    if (getStatusPagaditoPayment?.data?.data?.data?.status === "COMPLETED") {
      sendInvoiceToUserEmail();

      if (comprobante[1] === "goPro") {
        payRememberedProProfile?.mutate();
      } else {
        payPremiumProfilePrices?.mutate();
      }
    }
  }, [getStatusPagaditoPayment?.data?.data?.data?.status]);

  // Print the invoice
  const handlePrint = () => {
    contentRef.current.scrollIntoView();
    reactToPrintFn();
  };

  // This is the information that's send to EMAILJS (INVOICE)
  const sendInvoiceToUserEmail = async () => {
    const emailSent = localStorage.getItem("invoiceSent");

    if (emailSent) {
      return;
    }

    const invoiceInfo = {
      user_name: userInfo?.name,
      email_id: userInfo?.email,
      invoice_number: searchParams.get("comprobante"),
      invoice_approval_number:
        getStatusPagaditoPayment?.data?.data?.data?.reference,
      invoice_date: getStatusPagaditoPayment?.data?.data?.data?.date_trans,
      invoice_description:
        comprobante[1] === "goPro"
          ? "Making FREE profile to PRO"
          : comprobante[1] === "singlePackage"
          ? "SinglePackage Premium"
          : "TertiaryPackage Premium",
      invoice_type_plan:
        comprobante[1] === "singlePackage" || comprobante[1] === "goPro"
          ? "Single"
          : "Tertiary",
      invoice_price:
        comprobante[1] === "singlePackage" || comprobante[1] === "goPro"
          ? 19.99
          : 59.99,
    };

    if (Object?.keys(invoiceInfo)?.includes("")) {
      return toast.error(
        "Any of the provided fields are empty, we coudn't send the invoice to email!"
      );
    }

    try {
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_INVOICE_ID,
        invoiceInfo,
        import.meta.env.VITE_PUBLIC_KEY
      );
    } catch (error) {
      toast.error(error?.text);
    }
  };

  return (
    <main className="relative container-page my-32">
      <div className="fixed top-16 -z-[1] right-8">
        <img className="w-32 rotate-[90]" src={peaceDove} />
      </div>

      <div className="fixed top-16 -z-[1] left-8">
        <img className="w-32 [transform:rotateY(180deg)]" src={peaceDove} />
      </div>

      <div className="fixed top-[20rem] left-1/2 transform translate-x-1/2 -translate-y-1/2 -z-[2]">
        <img className="w-[100rem] rotate-[20deg]" src={cloud} alt="cloud" />
      </div>

      <div className="fixed top-[20rem] right-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-[2]">
        <img className="w-[100rem] rotate-[-20deg]" src={cloud} alt="cloud" />
      </div>

      <div className="text-center bg-white shadow-lg hover:shadow-2xl mx-auto animation-fade w-fit p-8 rounded-md">
        {getStatusPagaditoPayment?.isError ? (
          <>
            <h2 className="font-mono max-w-md tracking-wider text-3xl text-primary-color uppercase font-semibold">
              {t("This transaction has expired.")}
            </h2>
            <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>

            <div className="flex justify-center gap-2.5 mt-8">
              <Link
                className="btn btn-blue-light border-0"
                to={"/my-profiles/"}
              >
                {t("View Profiles")}
              </Link>

              <Link className="btn btn-blue-light border-0" to={"/prices"}>
                {t("View Plans")}
              </Link>
            </div>
          </>
        ) : (
          <>
            {getStatusPagaditoPayment?.isPending ? (
              <>
                <h2 className="font-mono max-w-md tracking-wider text-3xl text-primary-color uppercase font-semibold">
                  {t("Checking the transaction status, please wait...")}
                </h2>
                <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>

                <div role="status" className="flex justify-center mt-8">
                  <svg
                    aria-hidden="true"
                    className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-400 fill-primary-color-light"
                    style={{ animationDuration: "1.4s" }}
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">{t("Loading...")}</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="sm:max-w-md max-w-full text-center bg-white rounded-xl shadow-lg hover:shadow-2xl animation-fade p-10">
                  <div className="flex flex-col items-center justify-center h-full">
                    <h2 className="font-mono max-w-md tracking-wider text-3xl text-primary-color uppercase font-semibold">
                      {transactionStatus}
                    </h2>
                    <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>

                    <div className="mt-8">
                      <Link
                        className="btn btn-blue-light border-0"
                        to={"/my-profiles/"}
                      >
                        Ve a Mis Perfiles
                      </Link>
                    </div>
                  </div>
                </div>

                <div
                  ref={contentRef}
                  className="printable-section w-full bg-white rounded-xl shadow-lg hover:shadow-2xl animation-fade p-10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <img
                        src={logo}
                        className="w-72 rounded-md"
                        alt="App Logo"
                      />
                    </div>

                    <div>
                      <h2 className="uppercase font-semibold text-2xl tracking-normal text-primary-color">
                        {t("Invoice")}{" "}
                      </h2>
                    </div>
                  </div>

                  <div className="flex justify-between sm:gap-0 gap-4 text-sm my-8 text-primary-color">
                    <div className="text-start">
                      <h2 className="mb-1">
                        <span className="font-semibold">
                          {t("Cust. Email")}:{" "}
                          <span className="font-extralight">
                            {userInfo?.email}
                          </span>
                        </span>
                      </h2>

                      <h2>
                        <span className="font-semibold">
                          {t("Invoice Number")}:{" "}
                          <span className="font-extralight">
                            {searchParams.get("comprobante")}
                          </span>
                        </span>
                      </h2>
                    </div>

                    <div className="text-end">
                      <h2 className="mb-1">
                        <span className="font-semibold">
                          {t("Approval Number")}:{" "}
                          <span className="font-extralight">
                            {
                              getStatusPagaditoPayment?.data?.data?.data
                                ?.reference
                            }
                          </span>
                        </span>
                      </h2>

                      <h2>
                        <span className="font-semibold">
                          {t("Date")}:{" "}
                          <span className="font-extralight">
                            {
                              getStatusPagaditoPayment?.data?.data?.data
                                ?.date_trans
                            }
                          </span>
                        </span>
                      </h2>
                    </div>
                  </div>

                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Description
                          </th>

                          <th scope="col" className="px-6 py-3 text-nowrap">
                            Type Plan
                          </th>

                          <th scope="col" className="px-6 py-3 text-end">
                            Price
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {comprobante[1] === "goPro"
                              ? "Making FREE profile to PRO"
                              : comprobante[1] === "singlePackage"
                              ? "SinglePackage Premium"
                              : "TertiaryPackage Premium"}
                          </th>
                          <td className="px-6 py-4">
                            {comprobante[1] === "singlePackage" ||
                            comprobante[1] === "goPro"
                              ? "Single"
                              : "Tertiary"}
                          </td>
                          <td className="px-6 py-4 text-end">
                            $
                            {comprobante[1] === "singlePackage" ||
                            comprobante[1] === "goPro"
                              ? 19.99
                              : 59.99}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="text-start">
                    <button
                      className="bg-gray-400 text-white mt-8 py-3.5 px-6 rounded-md hover:bg-gray-400/80 animation-fade"
                      onClick={handlePrint}
                      type="button"
                    >
                      <AiFillPrinter size={22} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default CheckingStatusPagadito;

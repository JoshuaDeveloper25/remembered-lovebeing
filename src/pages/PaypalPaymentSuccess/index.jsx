import { Link, Navigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import formatDate from "../../utils/formatDate";
import { AiFillPrinter } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";

const PaypalPaymentSuccess = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const { t } = useTranslation();
  const location = useLocation();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const retrievedObject = localStorage.getItem("invoiceDetails");

    if (retrievedObject) {
      setDetails(JSON.parse(retrievedObject));
      localStorage.removeItem("invoiceDetails");
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!details) {
    return <Navigate to={"/*"} />;
  }

  // Print the invoice
  const handlePrint = () => {
    contentRef.current.scrollIntoView();
    reactToPrintFn();
  };

  return (
    <main className="container-page my-32">
      <div className="text-center bg-white shadow-lg hover:shadow-2xl mx-auto animation-fade w-fit p-8 rounded-md">
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <div className="sm:max-w-md max-w-full text-center bg-white rounded-xl shadow-lg hover:shadow-2xl animation-fade p-10">
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="font-mono max-w-md tracking-wider text-2xl text-primary-color uppercase font-semibold">
                {"Transacción realizada correctamente"}
              </h2>

              <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>

              <p className="max-w-md text-[14px] font-semibold">
                {t(
                  "Your invoice has been sent by email. If you can't find it in your inbox, please check your spam."
                )}
              </p>

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
                <img src={logo} className="w-72 rounded-md" alt="App Logo" />
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
                      {location?.state?.id}
                    </span>
                  </span>
                </h2>

                <h2>
                  <span className="font-semibold">
                    {t("Invoice Number")}:{" "}
                    <span className="font-extralight">
                      {location?.state?.invoiceNumber}
                    </span>
                  </span>
                </h2>
              </div>

              <div className="text-end">
                <h2 className="mb-1">
                  <span className="font-semibold">
                    {t("Approval Number")}:{" "}
                    <span className="font-extralight">
                      {location?.state?.approvalNumber}
                    </span>
                  </span>
                </h2>

                <h2>
                  <span className="font-semibold">
                    {t("Date")}:{" "}
                    <span className="font-extralight">
                      {formatDate(location?.state?.creation_date)}
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
                      {location?.state?.description}
                    </th>
                    <td className="px-6 py-4">{location?.state?.type_plan}</td>
                    <td className="px-6 py-4 text-end">
                      ${location?.state?.price}
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
      </div>
    </main>
  );
};

export default PaypalPaymentSuccess;

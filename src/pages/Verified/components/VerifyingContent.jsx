import peaceDove from "../../../assets/peace-dove.png";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/logo.png";
import cloud from "../../../assets/cloud.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const VerifyingContent = ({ isPending, error }) => {
  const { t } = useTranslation();

  return (
    <main className="relative">
      <Helmet>
        <title>Eternal MemoriesX | Verified</title>
      </Helmet>

      <div className="fixed top-18 right-8">
        <img className="w-32 rotate-[90]" src={peaceDove} />
      </div>

      <div className="fixed top-18 left-8">
        <img className="w-32 [transform:rotateY(180deg)]" src={peaceDove} />
      </div>

      <div className="fixed top-[20rem] left-1/2 transform translate-x-1/2 -translate-y-1/2 -z-[1]">
        <img className="w-[100rem] rotate-[20deg]" src={cloud} alt="cloud" />
      </div>

      <div className="fixed top-[20rem] right-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-[1]">
        <img className="w-[100rem] rotate-[-20deg]" src={cloud} alt="cloud" />
      </div>

      <section className="flex justify-center items-center min-h-[100vh]">
        <div className="bg-primary-color text-white max-w-2xl mx-4 shadow-primary-color shadow-xl hover:shadow-primary-color hover:shadow-2xl animation-fade p-5 rounded-lg">
          <img className="w-96 mx-auto" src={logo} alt="Logo" />

          {isPending ? (
            <div className="text-center">
              <div className="my-8">
                <h2 className="font-mono tracking-wider text-4xl uppercase font-semibold">
                  {t("Verifying your account, please wait...")}
                </h2>
                <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
              </div>

              <p className="text-xl max-w-lg mx-auto mt-2 mb-8 px-4">
                {t(
                  "We are processing your information to verify your account. This may take a few moments. Please do not close this window."
                )}
              </p>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="my-8">
                <h2 className="font-mono tracking-wider text-4xl uppercase font-semibold">
                  {t("Invalid Token")}
                </h2>
                <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
              </div>

              <p className="text-xl max-w-lg mx-auto mt-2 mb-8 px-4">
                {t(
                  "The token provided is invalid. Please check and try again."
                )}
              </p>

              <div className="text-center">
                <Link
                  className="underline text-lg text-primary-color-light font-semibold"
                  to={`/sign-up`}
                >
                  {t("Sign Up")}
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="my-8">
                <h2 className="font-mono tracking-wider text-4xl uppercase font-semibold">
                  {t("Your account has been verified.")}
                </h2>
                <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
              </div>

              <p className="text-xl max-w-lg mx-auto mt-2 mb-8 px-4">
                {t(
                  "Your account has been successfully verified. You can now access all available features."
                )}
              </p>

              <div className="text-center">
                <Link
                  className="underline text-lg text-primary-color-light font-semibold"
                  to={`/sign-in`}
                >
                  {t("Log In")}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default VerifyingContent;

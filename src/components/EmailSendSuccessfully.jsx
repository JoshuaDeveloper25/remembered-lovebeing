import { t } from "i18next";
import { Link } from "react-router-dom";

const EmailSendSuccessfully = () => {
  return (
    <section className="text-center">
      <div className="container-page px-3 py-3 my-24">
        <div className="flex justify-center items-center w-full h-full">
          <div className=" bg-primary-color mx-auto text-white rounded-md p-8 shadow-lg shadow-primary-color">
            <h2 className="font-mono tracking-wider text-4xl uppercase font-semibold">
              {`¡${t("Email Send Sucessfully")}!`}
            </h2>
            <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
            <p className="text-primary-color-light text-xl font-medium mt-7">
              {t("If you'd like you can close this page or go back")}{" "}
              <Link to={"/"} className="underline">
                {t("Home")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailSendSuccessfully;

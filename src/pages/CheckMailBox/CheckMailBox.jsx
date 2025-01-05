import peaceDove from "../../assets/peace-dove.png";
import { useTranslation } from "react-i18next";
import mailbox from "../../assets/mailbox.png";
import cloud from "../../assets/cloud.png";
import logo from "../../assets/logo.png";

const CheckMailBox = () => {
  const { t } = useTranslation();

  return (
    <main className="relative">
      {/* <div className="md:block hidden fixed top-18 right-8">
        <img className="w-32 rotate-[90]" src={peaceDove} />
      </div>

      <div className="md:block hidden fixed top-18 left-8">
        <img className="w-32 [transform:rotateY(180deg)]" src={peaceDove} />
      </div>

      <div className="fixed top-[20rem] left-1/2 transform translate-x-1/2 -translate-y-1/2 -z-[1]">
        <img className="w-[100rem] rotate-[20deg]" src={cloud} alt="cloud" />
      </div>

      <div className="fixed top-[20rem] right-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-[1]">
        <img className="w-[100rem] rotate-[-20deg]" src={cloud} alt="cloud" />
      </div> */}
      <section className="flex justify-center items-center min-h-[100vh]">
        <div>
          <img className="w-96 mx-auto rounded-md mb-8" src={logo} alt="Logo" />

          <div className="bg-primary-color text-white max-w-2xl mx-4 shadow-primary-color shadow-xl hover:shadow-primary-color hover:shadow-2xl animation-fade p-5 rounded-lg">
            <div className="text-center">
              <img className="w-52 mx-auto" src={mailbox} alt="Mailbox icon" />

              <div className="my-8">
                <h2 className="font-mono tracking-wider text-4xl uppercase font-semibold">
                  {t("Check your mailbox!")}
                </h2>
                <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
              </div>

              <p className="text-xl max-w-lg mx-auto mt-2 mb-8 px-4">
                {t(
                  "We sent you a link to verify your email. Check your spam folder if you do not hear from us after a while."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CheckMailBox;

import aboutUsHero from "../../assets/about-us.jpg";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <main className="container-page py-14 lg:px-2 px-5">
      <Helmet>
        <title>Eternal MemoriesX | {t("About Us")}</title>
      </Helmet>

      <div className="flex flex-col-reverse md:flex-row gap-8 justify-between items-center">
        <div className="flex-1">
          <h2 className="text-primary-color font-mono font-bold sm:text-5xl text-4xl mb-4">
            {t("About us")}
          </h2>
          <p className="text-primary-color font-semibold font-mono max-w-lg sm:text-lg text-base">
            {t(
              "At Eternal MemoriesX, we are a team of four developers passionate about creating meaningful digital solutions."
            )}
          </p>
        </div>

        <div className="flex-1">
          <img
            src={aboutUsHero}
            className="rounded-full ms-auto object-cover sm:h-[23rem] w-[14rem] sm:w-[23rem] h-[14rem]"
            alt="About Us Hero"
          />
        </div>
      </div>

      <div className="mt-20 text-primary-color font-light border-t-2 pt-10">
        <p className="font-mono">
          {t(
            "Our story began as a result of a personal experience that deeply impacted our lives: the loss of a loved one. This profound pain led us to reflect on the importance of preserving the memories of those who have passed and how technology could help us create something special in their honor."
          )}
        </p>

        <p className="font-mono my-10">
          {t(
            "As programmers, we had the tools and the passion to build a platform that would not only be useful but also deeply meaningful. This is how Eternal MemoriesX was born—a space designed to honor and keep alive the legacies of those we love."
          )}
        </p>

        <p className="font-mono">
          {t(
            "We believe that every story deserves to be remembered and shared, and our goal is to offer a place where these memories can transcend time. Eternal MemoriesX is not just an app; it is a heartfelt tribute created by people who understand the importance of keeping memories alive."
          )}
        </p>

        <p className="font-mono mt-10">
          {t(
            "We are committed to combining technology and innovation to provide an intuitive, empathetic, and meaningful experience. Our mission is for this platform to not only connect people with their memories but also serve as a beacon of comfort and hope for those navigating grief."
          )}
        </p>
      </div>
    </main>
  );
};

export default AboutUs;

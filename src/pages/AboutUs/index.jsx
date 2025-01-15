import aboutUsHero from "../../assets/about-us.jpg";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <main className="container-page py-14 lg:px-2 px-5">
      <Helmet>
        <title>Eternal MemoriesX | About Us</title>
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
            "Our story began while working on independent projects for clients, where we were often asked for examples of our work or a personal portfolio. Although we had experience and achievements to showcase, we realized we didn’t have a project of our own that fully reflected our skills and creativity."
          )}
        </p>

        <p className="font-mono my-10">
          {t(
            "That search led us to reflect on what we could create that would not only be useful but also have a positive impact on people. This is how the idea for Eternal Memories was born—a platform to preserve and honor the memories of those who have passed away. We believe every story deserves to be remembered and shared, and our goal is to provide a space where memories can transcend time."
          )}
        </p>

        <p className="font-mono">
          {t(
            "Our commitment is to combine technology and innovation to deliver an intuitive and meaningful experience. Eternal Memories is more than just an app; it is a tribute to human legacy, created from the heart by people who understand the importance of keeping memories alive."
          )}
        </p>
      </div>
    </main>
  );
};

export default AboutUs;

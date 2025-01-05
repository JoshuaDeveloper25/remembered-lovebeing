import peaceDove from "../../assets/peace-dove.png";
import { useTranslation } from "react-i18next";
import cloud from "../../assets/cloud.png";

const TermsAndConditions = () => {
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
      <section className="max-w-3xl mx-auto px-6 py-6 text-primary-color bg-white shadow-xl rounded-lg my-12">
        <div className="mb-8">
          <h2 className="font-mono tracking-wider text-4xl uppercase font-semibold text-center">
            {t("Terms & Conditions")}
          </h2>

          <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
        </div>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary-color-light">
            1. {t("Introduction")}
          </h2>
          <p className="mt-2 text-lg">
            {t(
              "Welcome to our memorial platform. By using our application, you agree to comply with the terms and conditions outlined in this document. If you do not agree with any of these conditions, you will not be able to use our services."
            )}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary-color-light">
            2. {t("Service Description")}
          </h2>
          <p className="mt-2 text-lg">{t("Our platform allows users to:")}</p>
          <ul className="list-disc pl-8 mt-2 text-lg">
            <li>{t("Create memorial profiles to honor deceased people.")}</li>
            <li>
              {t("Upload images, write tributes, and offer condolences.")}
            </li>
            <li>
              {t(
                "Access different functionalities based on the selected plan."
              )}
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary-color-light">
            3. {t("Plans and Features")}
          </h2>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">3.1 {t("Free Plan")}</h3>
            <ul className="list-disc pl-8 mt-2 text-lg">
              <li>{t("Allows the creation of memorial profiles.")}</li>
              <li>{t("Ability to upload up to 5 images in the gallery.")}</li>
              <li>{t("Does not include the option to create posts.")}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">3.2 {t("Pro Plan")}</h3>
            <ul className="list-disc pl-8 mt-2 text-lg">
              <li>{t("Ability to upload an unlimited number of images.")}</li>
              <li>{t("Access to the posts functionality.")}</li>
              <li>
                {t(
                  "Other exclusive features specified in the plan description."
                )}
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary-color-light">
            4. {t("Responsible Use")}
          </h2>
          <p className="mt-2 text-lg">{t("Users agree to:")}</p>
          <ul className="list-disc pl-8 mt-2 text-lg">
            <li>{t("Use the platform respectfully and ethically.")}</li>
            <li>
              {t(
                "Not upload offensive, illegal content, or content that violates the rights of third parties."
              )}
            </li>
            <li>{t("Ensure all information provided is truthful.")}</li>
          </ul>
          <p className="mt-2 text-lg">
            {t(
              "We reserve the right to remove content or profiles that violate these rules without prior notice."
            )}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary-color-light">
            5. {t("Intellectual Property")}
          </h2>
          <p className="mt-2 text-lg">
            {t(
              "All rights to the design, content, and functionality of the platform are owned by Eternal MemoriesX. Users retain rights to the content they upload, but grant the platform a limited license to display it within the services."
            )}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary-color-light">
            6. {t("Liability Limitations")}
          </h2>
          <p className="mt-2 text-lg">
            {t("The platform is not responsible for:")}
          </p>
          <ul className="list-disc pl-8 mt-2 text-lg">
            <li>
              {t("The accuracy or veracity of content uploaded by users.")}
            </li>
            <li>
              {t("Technical failures, data loss, or service interruptions.")}
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary-color-light">
            7. {t("Account Cancellation")}
          </h2>
          <p className="mt-2 text-lg">
            {t(
              "We reserve the right to suspend or delete accounts that violate the terms of use or remain inactive for an extended period."
            )}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary-color-light">
            8. {t("Changes to Terms")}
          </h2>
          <p className="mt-2 text-lg">
            {t(
              "These terms may be modified at any time. Changes will be notified to users via the application and will take effect immediately."
            )}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary-color-light">
            9. {t("Applicable Law and Jurisdiction")}
          </h2>
          <p className="mt-2 text-lg">
            {t(
              "These terms will be governed by the laws of Honduras, and any disputes will be resolved in the courts of El Progreso, Yoro."
            )}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary-color-light">
            10. {t("Contact")}
          </h2>
          <p className="mt-2 text-lg">
            {t(
              "If you have any questions or concerns about these terms, you can contact us at [email address]."
            )}
          </p>
        </section>
      </section>
    </main>
  );
};

export default TermsAndConditions;

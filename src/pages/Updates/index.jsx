import { Accordion, AccordionItem } from "@nextui-org/react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const Updates = () => {
  const { t } = useTranslation();

  return (
    <main className="container-page py-16 px-2">
      <Helmet>
        <title>Eternal MemoriesX | {t("Updates")}</title>
      </Helmet>

      <div className="text-center mb-14">
        <h2 className="font-mono tracking-wider text-4xl text-primary-color uppercase font-semibold">
          {t("New Updates")}
        </h2>
        <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
        <p className="text-xl max-w-2xl mx-auto mt-2 mb-8 text-muted-color">
          {t("Keep up with the latest changes and what's coming next!")}
        </p>
      </div>

      <Accordion variant="splitted" className="max-w-2xl mx-auto">
        <AccordionItem
          classNames={{
            title: "font-semibold text-black",
            content: "text-sm",
            indicator: "text-xl",
          }}
          title={t("Future Mobile App Transition: Android & iOS")} // Transición Futuro de la App a Móviles: Android e iOS
          key="1"
        >
          <p>
            {t(
              "If you’re a mobile phone user, you’ll soon be able to enjoy the full experience of our app on your Android and iOS devices. Stay tuned for a seamless and smooth transition to your favorite platform, featuring enhanced features and optimized performance for mobile."
            )}
          </p>
        </AccordionItem>

        <AccordionItem
          classNames={{
            title: "font-semibold text-black",
            content: "text-sm",
            indicator: "text-xl",
          }}
          title={t("Profiles")}
          key="2"
        >
          <ul className="pl-4 list-disc space-y-4">
            <li>
              <h3 className="font-bold">
                {t("Invite your loved ones to manage this memorial profile")}
              </h3>

              <p>
                {t(
                  "Allow your loved ones to help manage and keep the memorial profile alive."
                )}
              </p>
            </li>

            <li>
              <h3 className="font-bold">
                {t("Reminder on their death anniversary for profile followers")}
              </h3>

              <p>
                {t(
                  "Receive an email message on their death anniversary to remember and honor their memory in a special way."
                )}
              </p>
            </li>
          </ul>
        </AccordionItem>

        <AccordionItem
          classNames={{
            title: "font-semibold text-black",
            content: "text-sm",
            indicator: "text-xl",
          }}
          title={t("Profiles Management")}
          key="3"
        >
          <ul className="pl-4 list-disc space-y-4">
            <li>
              <h3 className="font-bold">
                {t(
                  "Upgrade your profile to PRO for FREE using your purchased Premium packages"
                )}
              </h3>

              <p>
                {t(
                  "If you’ve already purchased Premium packages, you can use those benefits to upgrade your free profile to Pro without making an additional purchase. Make the most of your purchases and enhance your experience."
                )}
              </p>
            </li>
          </ul>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Updates;

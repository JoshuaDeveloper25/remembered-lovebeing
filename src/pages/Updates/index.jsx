import { Accordion, AccordionItem } from "@nextui-org/react";

import { IoMdInformationCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";

const Updates = () => {
  const { t } = useTranslation();

  return (
    <main className="container-page py-16 px-2">
      <div className="text-center mb-14">
        <h2 className="font-mono tracking-wider text-4xl text-primary-color uppercase font-semibold">
          {t("Nuevas Novedades")}
        </h2>
        <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
        <p className="text-xl max-w-2xl mx-auto mt-2 mb-8 text-muted-color">
          {t("Keep up with the latest changes and what's coming next!")}
        </p>
      </div>

      <Accordion variant="splitted" className="max-w-2xl mx-auto">
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          {"defaultContent"}
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {"defaultContent"}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {"defaultContent"}
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Updates;

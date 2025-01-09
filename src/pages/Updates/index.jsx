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
        <AccordionItem
          classNames={{ title: "font-semibold text-white", base: "bg-primary-color/50", content: "text-white text-sm", indicator: "text-white text-xl" }}
          title="Incorporación Multilingüe en la Página Web"
          key="1"
        >
          Expande el alcance global de tu página web al añadir soporte para
          múltiples idiomas, ofreciendo una experiencia personalizada a usuarios
          de diferentes regiones.
        </AccordionItem>

        <AccordionItem key="2" title="Accordion 2">
          {"defaultContent"}
        </AccordionItem>

        <AccordionItem key="3" title="Accordion 3">
          {"defaultContent"}
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Updates;

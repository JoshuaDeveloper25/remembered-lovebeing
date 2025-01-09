import { Accordion, AccordionItem } from "@nextui-org/react";
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
          classNames={{
            title: "font-semibold text-black",
            content: "text-sm",
            indicator: "text-xl",
          }}
          title="Profiles"
          key="1"
        >
          <ul className="pl-4 list-disc space-y-4">
            <li>
              <h3 className="font-bold">
                {t(
                  "Invita a tus seres queridos a gestionar este perfil conmemorativo"
                )}
              </h3>

              <p>
                Permite que tus seres queridos ayuden a gestionar y mantener
                vivo el perfil conmemorativo.
              </p>
            </li>

            <li>
              <h3 className="font-bold">
                {t(
                  "Recordatorio en su aniversario de fallecimiento para seguidores del perfil"
                )}
              </h3>

              <p>
                Recibe un mensaje por correo electrónico en el aniversario de su
                fallecimiento, para recordar y honrar su memoria de una forma
                especial.
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
          title="Profiles Management"
          key="2"
        >
          <ul className="pl-4 list-disc space-y-4">
            <li>
              <h3 className="font-bold">
                {t(
                  "Actualiza tu perfil GRATIS a PRO usando tus paquetes Premium adquiridos"
                )}
              </h3>

              <p>
                Si ya has adquirido paquetes Premium, puedes usar esos
                beneficios para actualizar tu perfil gratuito a Pro, sin
                necesidad de realizar una compra adicional. Aprovecha al máximo
                tus compras y mejora tu experiencia.
              </p>
            </li>
          </ul>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Updates;

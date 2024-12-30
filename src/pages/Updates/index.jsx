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

      <article className="grid grid-cols-3 gap-8">
        <div className="col-span-1">
          <img
            className="rounded-xl"
            src="https://imagenyproyeccion.com/wp-content/uploads/2021/07/diseno-web-marketing-digital-cordoba-1.jpg"
            alt="Imagen de Novedad"
          />
          <h3 className="my-3 font-semibold">Pronto NEXTJS</h3>

          <p>
            ¡Estamos trabajando en la transición a NextJS para ofrecerte una
            experiencia más rápida y moderna!
          </p>

          <button
            className="rounded-lg text-primary-color w-full py-1.5 px-1.5 flex items-center gap-2 mt-3"
            type="button"
          >
            <IoMdInformationCircleOutline />
            INFO
          </button>
        </div>
      </article>
    </main>
  );
};

export default Updates;

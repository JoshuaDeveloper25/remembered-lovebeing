import ButtonForm from "../../../components/ButtonForm";
import { useTranslation } from "react-i18next";

const FormCondolence = ({
  setOpenModalCreateCondolence,
  createCondolenceMutation,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="p-4">
        <label htmlFor="content">
          <span className="w-full inline-block text-start">{t("Content")}</span>
          <textarea
            className="border border-gray-200 form-input h-24"
            placeholder={t("Description of the condolence.")}
            id="content"
            name="content"
          ></textarea>
        </label>
      </div>

      <ButtonForm
        setOpenModal={setOpenModalCreateCondolence}
        isPending={createCondolenceMutation?.isPending}
        statusOn={t("Creating...")}
        statusOff={t("Create")}
      />
    </>
  );
};

export default FormCondolence;

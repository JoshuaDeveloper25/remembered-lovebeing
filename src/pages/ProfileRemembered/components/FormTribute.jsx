import ButtonForm from "../../../components/ButtonForm";

const FormTribute = ({
  setOpenModalCreateTribute,
  createTributeMutation,
  t,
}) => {
  return (
    <>
      <div className="p-4">
        <label htmlFor="content">
          <span className="w-full inline-block text-start">{t("Content")}</span>
          <textarea
            className="border border-gray-200 form-input h-24"
            placeholder={t("Description of the tribute.")}
            id="content"
            name="content"
          ></textarea>
        </label>
      </div>

      <ButtonForm
        setOpenModal={setOpenModalCreateTribute}
        isPending={createTributeMutation?.isPending}
        statusOn={t("Creating...")}
        statusOff={t("Create")}
      />
    </>
  );
};

export default FormTribute;

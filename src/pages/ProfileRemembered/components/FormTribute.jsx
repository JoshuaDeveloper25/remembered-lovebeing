import ButtonForm from "../../../components/ButtonForm";

const FormTribute = ({ setOpenModalCreateTribute, createTributeMutation }) => {
  return (
    <>
      <div className="p-4">
        <label htmlFor="content">
          <span className="w-full inline-block text-start">Content</span>
          <textarea
            className="border border-gray-200 form-input h-24"
            placeholder={"Description of the tribute."}
            id="content"
            name="content"
          ></textarea>
        </label>
      </div>

      <ButtonForm
        setOpenModal={setOpenModalCreateTribute}
        isPending={createTributeMutation?.isPending}
        statusOn={"Creating..."}
        statusOff={"Create"}
      />
    </>
  );
};

export default FormTribute;

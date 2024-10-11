import ButtonForm from "../../../components/ButtonForm";

const FormCondolence = ({
  setOpenModalCreateCondolence,
  createCondolenceMutation,
}) => {
  return (
    <>
      <div className="p-4">
        <label htmlFor="content">
          <span className="w-full inline-block text-start">Content</span>
          <textarea
            className=" form-input h-24"
            placeholder={"Description of the condolence."}
            id="content"
            name="content"
          ></textarea>
        </label>
      </div>

      <ButtonForm
        setOpenModal={setOpenModalCreateCondolence}
        isPending={createCondolenceMutation?.isPending}
        statusOn={"Creating..."}
        statusOff={"Create"}
      />
    </>
  );
};

export default FormCondolence;

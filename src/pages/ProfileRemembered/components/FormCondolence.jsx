import ButtonForm from "../../../components/ButtonForm";

const FormCondolence = ({ createCondolenceMutation }) => {
  return (
    <>
      <label htmlFor="content">
        <span className="w-full inline-block text-start">Content</span>
        <textarea
          className="form-input-focus form-input-normal h-24"
          placeholder={"Description of the condolence."}
          id="content"
          name="content"
        ></textarea>
      </label>

      <ButtonForm
        isPending={createCondolenceMutation?.isPending}
        statusOn={"Creating..."}
        statusOff={"Create"}
      />
    </>
  );
};

export default FormCondolence;

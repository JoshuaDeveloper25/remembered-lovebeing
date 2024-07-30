import ButtonForm from "../../../components/ButtonForm";

const FormTribute = ({ createTributeMutation }) => {
  return (
    <>
      <label htmlFor="content">
        <span className="w-full inline-block text-start">Content</span>
        <textarea
          className="form-input-focus form-input-normal h-24"
          placeholder={"Description of the tribute."}
          id="content"
          name="content"
        ></textarea>
      </label>

      <ButtonForm
        isPending={createTributeMutation?.isPending}
        statusOn={"Creating..."}
        statusOff={"Create"}
      />
    </>
  );
};

export default FormTribute;

import ButtonForm from "../../../components/ButtonForm";

const EditPostForm = ({ post, editPostMutation }) => {
  return (
    <>
      <label htmlFor="content">
        <span className="w-full inline-block text-start">Content</span>
        <textarea
          className=" form-input h-24"
          placeholder={"Description of the post."}
          id="content"
          name="content"
          defaultValue={post?.content}
        ></textarea>
      </label>

      <ButtonForm
        isPending={editPostMutation?.isPending}
        statusOn={"Saving..."}
        statusOff={"Save Changes"}
      />
    </>
  );
};

export default EditPostForm;

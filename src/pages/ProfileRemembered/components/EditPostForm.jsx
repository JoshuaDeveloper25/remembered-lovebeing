import ButtonForm from "../../../components/ButtonForm";

const EditPostForm = ({ setOpenModalEditPost, post, editPostMutation }) => {
  return (
    <>
      <div className="p-4">
        <label htmlFor="content">
          <span className="w-full inline-block text-start">Content</span>
          <textarea
            className="border border-gray-200 form-input h-24"
            placeholder={"Description of the post."}
            id="content"
            name="content"
            defaultValue={post?.content}
          ></textarea>
        </label>
      </div>

      <ButtonForm
        setOpenModal={setOpenModalEditPost}
        isPending={editPostMutation?.isPending}
        statusOn={"Saving..."}
        statusOff={"Save Changes"}
      />
    </>
  );
};

export default EditPostForm;

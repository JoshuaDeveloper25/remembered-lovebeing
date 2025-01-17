import ButtonForm from "../../../components/ButtonForm";

const EditPostForm = ({ setOpenModalEditPost, post, editPostMutation, t }) => {
  return (
    <>
      <div className="p-4">
        <label htmlFor="content">
          <span className="w-full inline-block text-start">{t("Content")}</span>
          <textarea
            className="border border-gray-200 form-input h-24"
            placeholder={t("Description of the post.")}
            id="content"
            name="content"
            defaultValue={post?.content}
          ></textarea>
        </label>
      </div>

      <ButtonForm
        setOpenModal={setOpenModalEditPost}
        isPending={editPostMutation?.isPending}
        statusOn={t("Saving...")}
        statusOff={t("Save changes")}
      />
    </>
  );
};

export default EditPostForm;

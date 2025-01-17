import AddPostModal from "../pages/ProfileRemembered/components/AddPostModal";
import FormPost from "../pages/ProfileRemembered/components/FormPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../utils/getFastApiErrors";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import ButtonForm from "./ButtonForm";
import { useState } from "react";
import axios from "axios";

const UploadPost = ({ galleryImages, statusPlan, isOwner, idRemembered }) => {
  const [tempSelectedGalleryImageInfo, setTempSelectedGalleryImageInfo] =
    useState([]);
  const [openModalCreatePost, setOpenModalCreatePost] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const imagesSelectedIds = tempSelectedGalleryImageInfo?.map(
    (item) => item?.id
  );

  const createPostMutation = useMutation({
    mutationFn: async (info) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/${idRemembered}`,
        info
      ),
    onSuccess: (res) => {
      toast.success("Upload successfull!");
      queryClient.invalidateQueries(["posts"]);
      setOpenModalCreatePost(false);
      setError("");
    },
    onError: (err) => {
      console.log(getFastApiErrors(err));
      // toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmitCreatePost = (e) => {
    e.preventDefault();

    const postInfo = {
      content: e?.target?.content?.value,
      gallery_image_ids: imagesSelectedIds,
    };

    if (!tempSelectedGalleryImageInfo?.length) {
      return setError(
        t("Please, upload/add images if you want to create a post.")
      );
    } else if (!postInfo?.content?.trim(" "))
      return toast.error("Fill up the blanks available!");

    setError("");

    createPostMutation?.mutate(postInfo);
  };

  return !isOwner || statusPlan === "free" ? null : (
    <>
      <button
        onClick={() => setOpenModalCreatePost(true)}
        className="btn btn-blue w-auto"
        type="button"
      >
        <FaPlus className="inline-block" /> {t("Add New Post")}
      </button>

      {/* Add Post Modal */}
      <AddPostModal
        setClearCache={setTempSelectedGalleryImageInfo}
        titleModal={t("Add Post")}
        handleSubmit={handleSubmitCreatePost}
        setOpenModal={setOpenModalCreatePost}
        openModal={openModalCreatePost}
        modalForm={true}
        footer={
          <ButtonForm
            setClearCache={setTempSelectedGalleryImageInfo}
            setOpenModal={setOpenModalCreatePost}
            isPending={createPostMutation?.isPending}
            statusOn={t("Creating...")}
            statusOff={t("Create")}
          />
        }
      >
        <FormPost
          error={error}
          setOpenModalCreatePost={setOpenModalCreatePost}
          galleryImages={galleryImages}
          tempSelectedGalleryImageInfo={tempSelectedGalleryImageInfo}
          setTempSelectedGalleryImageInfo={setTempSelectedGalleryImageInfo}
          createPostMutation={createPostMutation}
          isPending={createPostMutation?.isPending}
        />
      </AddPostModal>
    </>
  );
};

export default UploadPost;

import FormPost from "../pages/ProfileRemembered/components/FormPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../utils/getFastApiErrors";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import AddPostModal from "../pages/ProfileRemembered/components/AddPostModal";
import ButtonForm from "./ButtonForm";

const UploadPost = ({ galleryImages, statusPlan, isOwner, idRemembered }) => {
  const [tempSelectedGalleryImageInfo, setTempSelectedGalleryImageInfo] =
    useState([]);
  const [openModalCreatePost, setOpenModalCreatePost] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

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
        "Please, upload/add images if you want to create a post."
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
        <FaPlus className="inline-block" /> Add New Post
      </button>

      {/* Add Post Modal */}
      <AddPostModal
        setClearCache={setTempSelectedGalleryImageInfo}
        titleModal={"Add Post"}
        handleSubmit={handleSubmitCreatePost}
        setOpenModal={setOpenModalCreatePost}
        openModal={openModalCreatePost}
        modalForm={true}
        footer={
          <ButtonForm
            setClearCache={setTempSelectedGalleryImageInfo}
            setOpenModal={setOpenModalCreatePost}
            isPending={createPostMutation?.isPending}
            statusOn={"Creating..."}
            statusOff={"Create"}
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

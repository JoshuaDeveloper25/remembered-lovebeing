import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormPost from "../pages/ProfileRemembered/components/FormPost";
import getFastApiErrors from "../utils/getFastApiErrors";
import { FaPlus } from "react-icons/fa";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const UploadPost = ({
  galleryImages,
  isOwner,
  rememberedProfiles,
  idRemembered,
}) => {
  const [tempSelectedGalleryImageInfo, setTempSelectedGalleryImageInfo] =
    useState([]);
  const [openModalCreatePost, setOpenModalCreatePost] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const profileInfo = rememberedProfiles?.data
    ?.map((item) => item)
    ?.filter((item) => item?.id === +idRemembered);

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
      profile_image_id: profileInfo[0]?.profile_images
        ? +profileInfo[0]?.profile_images?.id
        : 0,
      gallery_image_ids: imagesSelectedIds,
    };

    if (!tempSelectedGalleryImageInfo?.length) {
      return setError(
        "Please, upload/add images if you want to create a post."
      );
    }

    setError("");

    createPostMutation?.mutate(postInfo);
  };

  return !isOwner ? null : (
    <>
      <button
        onClick={() => setOpenModalCreatePost(true)}
        className="btn btn-blue w-auto"
        type="button"
      >
        <FaPlus className="inline-block" /> Add New Post
      </button>

      {/* Add Post Modal */}
      <Modal
        setClearCache={setTempSelectedGalleryImageInfo}
        titleModal={"Add Post"}
        handleSubmit={handleSubmitCreatePost}
        setOpenModal={setOpenModalCreatePost}
        openModal={openModalCreatePost}
        modalForm={true}
      >
        <FormPost
          error={error}
          setOpenModalCreatePost={setOpenModalCreatePost}
          galleryImages={galleryImages}
          tempSelectedGalleryImageInfo={tempSelectedGalleryImageInfo}
          setTempSelectedGalleryImageInfo={setTempSelectedGalleryImageInfo}
          createPostMutation={createPostMutation}
          rememberedProfiles={rememberedProfiles}
          isPending={createPostMutation?.isPending}
        />
      </Modal>
    </>
  );
};

export default UploadPost;

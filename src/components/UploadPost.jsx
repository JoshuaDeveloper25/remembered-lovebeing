import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormPost from "../pages/Settings/components/FormPost";
import getFastApiErrors from "../utils/getFastApiErrors";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const UploadPost = ({ rememberedProfiles }) => {
  const [tempSelectedGalleryImageInfo, setTempSelectedGalleryImageInfo] =
    useState([]);
  const [openModalCreatePost, setOpenModalCreatePost] = useState(false);
  const queryClient = useQueryClient();
  const params = useParams();
  
  const profileInfo = rememberedProfiles?.data
  ?.map((item) => item)
  ?.filter((item) => item?.id === +params?.id);

  const imagesSelectedIds = tempSelectedGalleryImageInfo?.map(
    (item) => item?.id
  );

  const createPostMutation = useMutation({
    mutationFn: async (info) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/${params?.id}`,
        info
      ),
    onSuccess: (res) => {
      toast.success("Upload successfull!");
      queryClient.invalidateQueries(["posts"]);
      setOpenModalCreatePost(false);
    },
    onError: (err) => {
      console.log(getFastApiErrors(err));
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmitCreatePost = (e) => {
    e.preventDefault();

    const postInfo = {
      content: e?.target?.content?.value,
      profile_image_id: profileInfo[0]?.profile_images ? +profileInfo[0]?.profile_images?.id : 0,
      gallery_image_ids: imagesSelectedIds,
    };

    createPostMutation?.mutate(postInfo);
  };

  return (
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
        titleModal={"Add Post"}
        handleSubmit={handleSubmitCreatePost}
        setOpenModal={setOpenModalCreatePost}
        openModal={openModalCreatePost}
        modalForm={true}
      >
        <FormPost
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

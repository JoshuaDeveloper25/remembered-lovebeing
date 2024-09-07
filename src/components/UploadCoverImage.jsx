import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormCover from "../pages/ProfileRemembered/components/FormCover";
import getFastApiErrors from "../utils/getFastApiErrors";
import setCanvasPreview from "../utils/setCanvasPreview";
import { convertToPixelCrop } from "react-image-crop";
import { FaCameraRetro } from "react-icons/fa";
import { useRef, useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";
import axios from "axios";

const UploadCoverImage = ({ idRemembered }) => {
  const [openModalCover, setOpenModalCover] = useState(false);
  const previewCanvasRef = useRef(null);
  const queryClient = useQueryClient();
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);
  const avatarUrl = useRef(
    "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
  );

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  const changeImageCoverMutation = useMutation({
    mutationFn: async (imageInfo) =>
      await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/remembereds/upload_cover_image/${idRemembered}`,
        imageInfo
      ),
    onSuccess: (res) => {
      toast.success("¡Image uploaded successfully!");
      queryClient.invalidateQueries(["profile"]);
      setOpenModalCover(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmitCoverImage = async (e) => {
    e.preventDefault();

    const user_request = confirm(`Are you sure you want to change the image?`);

    if (!user_request) {
      return;
    }

    setCanvasPreview(
      imgRef.current, // HTMLImageElement
      previewCanvasRef.current, // HTMLCanvasElement
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
    );

    const dataUrl = previewCanvasRef.current.toDataURL();
    updateAvatar(dataUrl);

    const blob = await fetch(dataUrl).then((res) => res.blob());
    const file = new File([blob], "cover-image.png", { type: "image/png" });

    const formData = new FormData();
    formData.append("file", file);
    changeImageCoverMutation?.mutate(formData);
  };

  return (
    <>
      {/* Button to Open Profile Modal */}
      <button
        onClick={() => setOpenModalCover(true)}
        className="btn text-white bg-black/50"
        type="button"
      >
        <FaCameraRetro className="inline-block lg:me-2 size-5" />
        <span className="lg:inline-block hidden">Edit Cover Photo</span>
      </button>

      {/* Change Cover Image Modal */}
      <Modal
        titleModal={"Change Cover Image"}
        handleSubmit={handleSubmitCoverImage}
        setOpenModal={setOpenModalCover}
        openModal={openModalCover}
        modalForm={true}
        iconTitle={true}
      >
        <FormCover
          isPending={changeImageCoverMutation?.isPending}
          previewCanvasRef={previewCanvasRef}
          setCrop={setCrop}
          imgRef={imgRef}
          crop={crop}
          setOpenModalCover={setOpenModalCover}
        />
      </Modal>
    </>
  );
};

export default UploadCoverImage;

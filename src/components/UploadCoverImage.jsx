import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../utils/getFastApiErrors";
import setCanvasPreview from "../utils/setCanvasPreview";
import { convertToPixelCrop } from "react-image-crop";
import { FaCameraRetro } from "react-icons/fa";
import { useRef, useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@nextui-org/react";
import CoverRememberedModal from "../pages/ProfileRemembered/components/CoverRememberedModal";
import ImagesHandleCrop from "./ImagesHandleCrop";

export const CameraIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M17.44 6.236c.04.07.11.12.2.12 2.4 0 4.36 1.958 4.36 4.355v5.934A4.368 4.368 0 0117.64 21H6.36A4.361 4.361 0 012 16.645V10.71a4.361 4.361 0 014.36-4.355c.08 0 .16-.04.19-.12l.06-.12.106-.222a97.79 97.79 0 01.714-1.486C7.89 3.51 8.67 3.01 9.64 3h4.71c.97.01 1.76.51 2.22 1.408.157.315.397.822.629 1.31l.141.299.1.22zm-.73 3.836c0 .5.4.9.9.9s.91-.4.91-.9-.41-.909-.91-.909-.9.41-.9.91zm-6.44 1.548c.47-.47 1.08-.719 1.73-.719.65 0 1.26.25 1.72.71.46.459.71 1.068.71 1.717A2.438 2.438 0 0112 15.756c-.65 0-1.26-.25-1.72-.71a2.408 2.408 0 01-.71-1.717v-.01c-.01-.63.24-1.24.7-1.699zm4.5 4.485a3.91 3.91 0 01-2.77 1.15 3.921 3.921 0 01-3.93-3.926 3.865 3.865 0 011.14-2.767A3.921 3.921 0 0112 9.402c1.05 0 2.04.41 2.78 1.15.74.749 1.15 1.738 1.15 2.777a3.958 3.958 0 01-1.16 2.776z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );
};

export const CameraIcon2 = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M17.44 6.236c.04.07.11.12.2.12 2.4 0 4.36 1.958 4.36 4.355v5.934A4.368 4.368 0 0117.64 21H6.36A4.361 4.361 0 012 16.645V10.71a4.361 4.361 0 014.36-4.355c.08 0 .16-.04.19-.12l.06-.12.106-.222a97.79 97.79 0 01.714-1.486C7.89 3.51 8.67 3.01 9.64 3h4.71c.97.01 1.76.51 2.22 1.408.157.315.397.822.629 1.31l.141.299.1.22zm-.73 3.836c0 .5.4.9.9.9s.91-.4.91-.9-.41-.909-.91-.909-.9.41-.9.91zm-6.44 1.548c.47-.47 1.08-.719 1.73-.719.65 0 1.26.25 1.72.71.46.459.71 1.068.71 1.717A2.438 2.438 0 0112 15.756c-.65 0-1.26-.25-1.72-.71a2.408 2.408 0 01-.71-1.717v-.01c-.01-.63.24-1.24.7-1.699zm4.5 4.485a3.91 3.91 0 01-2.77 1.15 3.921 3.921 0 01-3.93-3.926 3.865 3.865 0 011.14-2.767A3.921 3.921 0 0112 9.402c1.05 0 2.04.41 2.78 1.15.74.749 1.15 1.738 1.15 2.777a3.958 3.958 0 01-1.16 2.776z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );
};

const UploadCoverImage = ({ idRemembered }) => {
  const [openModalCover, setOpenModalCover] = useState(false);
  const previewCanvasRef = useRef(null);
  const queryClient = useQueryClient();
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);
  const avatarUrl = useRef(
    "https://i.pinimg.com/474x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg"
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

    if (!imgRef.current) {
      return toast.error("Upload an image before uploading!");
    }

    setCanvasPreview(
      imgRef.current, // HTMLImageElement
      previewCanvasRef.current, // HTMLCanvasElement
      convertToPixelCrop(crop, imgRef?.current?.width, imgRef?.current?.height)
    );

    // Obtener el src del imgRef
    const imgSrc = imgRef.current.src;

    // Extraer el tipo MIME del Data URL
    const mimeType = imgSrc.match(/data:(.*?);base64/)?.[1] || "image/png"; // Por defecto PNG

    // Convertir el canvas a DataURL con el tipo MIME
    const dataUrl = previewCanvasRef.current.toDataURL(mimeType);

    // Convertir el DataURL a Blob
    const blob = await fetch(dataUrl).then((res) => res.blob());

    // Crear el nombre del archivo dinámicamente
    const fileName = `${e?.target?.uploadImages?.files[0]?.name}`;

    // Crear el archivo
    const file = new File([blob], fileName, { type: mimeType });

    const formData = new FormData();
    formData.append("file", file);
    changeImageCoverMutation?.mutate(formData);
  };

  return (
    <>
      {/* Button to Open Profile Modal */}
      {/* <div className="lg:block hidden">
        <button
          className="btn flex items-center text-white bg-black/50 hover:bg-black hover:border-black animation-fade"
          type="button"
        >
          <FaCameraRetro className="lg:me-2 size-5" />
          <span>Edit Cover Photo</span>
        </button>
      </div> */}

      <div className="lg:block hidden">
        <Button
          onPress={() => setOpenModalCover(true)}
          className="bg-primary-color text-white"
          endContent={<CameraIcon2 />}
        >
          Edit Cover Photo
        </Button>
      </div>

      <div className="lg:hidden block">
        <Button
          onPress={() => setOpenModalCover(true)}
          isIconOnly
          aria-label="Take a photo"
          color="warning"
          variant="faded"
        >
          <CameraIcon />
        </Button>
      </div>

      {/* Change Cover Image Modal */}
      <ImagesHandleCrop
        imgRef={imgRef}
        handleSubmit={handleSubmitCoverImage}
        setOpenModalCover={setOpenModalCover}
        openModalCover={openModalCover}
        onCancel={() => setOpenModalCover(false)}
        isPending={changeImageCoverMutation?.isPending}
        previewCanvasRef={previewCanvasRef}
        setCrop={setCrop}
        crop={crop}
        circle={false}
      />
    </>
  );
};

export default UploadCoverImage;

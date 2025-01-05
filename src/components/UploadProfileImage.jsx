import FormProfile from "../pages/ProfileRemembered/components/FormProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../utils/getFastApiErrors";
import setCanvasPreview from "../utils/setCanvasPreview";
import { convertToPixelCrop } from "react-image-crop";
import { useEffect, useRef, useState } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "./Modal";
import axios from "axios";
import Swal from "sweetalert2";

const UploadProfileImage = ({ idRemembered }) => {
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const previewCanvasRef = useRef(null);
  const queryClient = useQueryClient();
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);
  const avatarUrl = useRef(
    "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setOpenModalProfile(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  const changeImageProfileMutation = useMutation({
    mutationFn: async (imageInfo) =>
      await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/remembereds/upload_profile_image/${idRemembered}`,
        imageInfo
      ),
    onSuccess: (res) => {
      toast.success("¡Image uploaded successfully!");
      queryClient.invalidateQueries(["profile"]);
      setOpenModalProfile(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmitProfileImage = async (e) => {
    e.preventDefault();

    if (!imgRef.current) {
      return toast.error("Upload an image before uploading!");
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to upload the image?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, upload it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setCanvasPreview(
          imgRef.current, // HTMLImageElement
          previewCanvasRef.current, // HTMLCanvasElement
          convertToPixelCrop(
            crop,
            imgRef?.current?.width,
            imgRef?.current?.height
          )
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
        console.log(formData.get("file"));

        changeImageProfileMutation?.mutate(formData, {
          onSuccess: () => {
            // Opcional: Mostrar éxito
          },
          onError: () => {
            Swal.fire({
              title: "Error!",
              text: "There was an issue uploading your profile image.",
              icon: "error",
            });
          },
        });
      }
    });
  };

  return (
    <>
      {/* Button to Open Cover Modal */}
      <button
        onClick={() => setOpenModalProfile(true)}
        className="p-1.5 rounded text-white bg-black/50 hover:bg-black animation-fade"
        type="button"
      >
        <FaCameraRetro className="inline-block size-5" />
      </button>

      {/* Change Cover Image Modal */}
      <Modal
        titleModal={"Change Profile Image"}
        handleSubmit={handleSubmitProfileImage}
        setOpenModal={setOpenModalProfile}
        openModal={openModalProfile}
        modalForm={true}
      >
        <FormProfile
          isPending={changeImageProfileMutation?.isPending}
          setOpenModalProfile={setOpenModalProfile}
          previewCanvasRef={previewCanvasRef}
          setCrop={setCrop}
          imgRef={imgRef}
          crop={crop}
        />
      </Modal>
    </>
  );
};

export default UploadProfileImage;

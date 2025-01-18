import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import getFastApiErrors from "../utils/getFastApiErrors";
import ImagesHandleCrop from "./ImagesHandleCrop";
import { useTranslation } from "react-i18next";
import AppContext from "../context/AppProvider";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";

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

const UploadUserProfileImage = ({ iconClassname }) => {
  const { t } = useTranslation();
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const { userInfo, setUserInfo } = useContext(AppContext);
  const previewCanvasRef = useRef(null);
  const queryClient = useQueryClient();
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);
  const avatarUrl = useRef(
    "https://i.pinimg.com/474x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg"
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

  const changeImageProfileMutation = useMutation({
    mutationFn: async (imageInfo) =>
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/upload_profile_image`,
        imageInfo
      ),
    onSuccess: (res) => {
      toast.success(t("Image uploaded successfully!"));
      queryClient.invalidateQueries(["profile"]);
      setOpenModalProfile(false);

      const newObject = {
        ...userInfo,
        profile_image: res?.data?.data_image,
      };

      setUserInfo(newObject);

      localStorage.setItem("userInfo", JSON.stringify(newObject));
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
        const canvas = imgRef.current?.getCanvas();
        if (canvas) {
          const form = new FormData();
          canvas.toBlob((blob) => {
            if (blob) {
              form.append("file", blob);
              changeImageProfileMutation?.mutate(form);
            }
          }, e.target?.uploadImages?.files[0]?.type);
        }

        changeImageProfileMutation?.mutate(formData, {
          onSuccess: () => {
            // Swal.fire({
            //   title: "Uploaded!",
            //   text: "Your profile image has been successfully uploaded.",
            //   icon: "success",
            // });
          },
          onError: () => {
            Swal.fire({
              title: "Error!",
              text: "There was an issue uploading your profile image.",
              icon: "error",
            });
          },
        });

        // Uncomment this if you need to store the image data locally
        // localStorage?.setItem("userInfo", JSON.stringify(formData));
      }
    });
  };

  return (
    <>
      {/* Button to Open User Profile Modal */}
      <Button
        onPress={() => setOpenModalProfile(true)}
        isIconOnly
        aria-label={t("Take a photo")}
        color="warning"
        variant="faded"
      >
        <CameraIcon />
      </Button>

      {/* Change User Profile Image Modal */}
      <ImagesHandleCrop
        titleModal={t("Change Profile Image")}
        imgRef={imgRef}
        handleSubmit={handleSubmitProfileImage}
        setOpenModalCover={setOpenModalProfile}
        openModalCover={openModalProfile}
        onCancel={() => setOpenModalProfile(false)}
        isPending={changeImageProfileMutation?.isPending}
        previewCanvasRef={previewCanvasRef}
        setCrop={setCrop}
        crop={crop}
        circle={true}
      />
    </>
  );
};

export default UploadUserProfileImage;

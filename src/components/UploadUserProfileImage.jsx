import FormUserProfile from "../pages/MyProfiles/components/FormUserProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCameraRetro } from "react-icons/fa";
import getFastApiErrors from "../utils/getFastApiErrors";
import setCanvasPreview from "../utils/setCanvasPreview";
import { convertToPixelCrop } from "react-image-crop";
import { useContext, useRef, useState } from "react";
import AppContext from "../context/AppProvider";
import { DropdownItem } from "flowbite-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "./Modal";
import axios from "axios";

const UploadUserProfileImage = ({ iconChoosen = 1, iconClassname }) => {
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const { userInfo, setUserInfo } = useContext(AppContext);
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

  const changeImageProfileMutation = useMutation({
    mutationFn: async (imageInfo) =>
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/upload_profile_image`,
        imageInfo
      ),
    onSuccess: (res) => {
      toast.success("¡Image uploaded successfully!");
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

    const user_request = confirm(`Are you sure you want to upload the image?`);

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
    const file = new File([blob], "user-profile-image.png", {
      type: "image/png",
    });

    const formData = new FormData();
    formData.append("file", file);
    changeImageProfileMutation?.mutate(formData);

    // const newProfileImage = formData;
    // localStorage?.setItem("userInfo", JSON.stringify(newProfileImage));
  };

  return (
    <>
      {/* Button to Open User Profile Modal */}
      {iconChoosen === 1 && (
        <button
          onClick={() => setOpenModalProfile(true)}
          className="p-2.5 rounded-full text-white bg-blue-500 hover:bg-blue-800 animation-fade"
          type="button"
        >
          <FaCameraRetro
            className={`${iconClassname ? iconClassname : "size-5"}`}
          />
        </button>
      )}

      {iconChoosen === 2 && (
        <li
          className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
          onClick={() => setOpenModalProfile(true)}
        >
          <FaCameraRetro
            className={`${iconClassname ? iconClassname : "size-5"}`}
          />

          <div>
            <Link to={"#"} className="block">
              Change Your Profile Photo
            </Link>

            <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
              Update your profile image with a new photo.
            </p>
          </div>
        </li>
      )}

      {/* Change User Profile Image Modal */}
      <Modal
        titleModal={"Change Profile Image"}
        handleSubmit={handleSubmitProfileImage}
        setOpenModal={setOpenModalProfile}
        openModal={openModalProfile}
        modalForm={true}
        iconTitle={true}
      >
        <FormUserProfile
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

export default UploadUserProfileImage;

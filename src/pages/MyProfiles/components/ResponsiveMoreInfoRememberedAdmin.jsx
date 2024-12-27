import ModalProfilePhotoResponsive from "../../../components/ModalProfilePhotoResponsive";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import setCanvasPreview from "../../../utils/setCanvasPreview";
import { Dropdown, DropdownItem } from "flowbite-react";
import { FaCameraRetro, FaPlus } from "react-icons/fa";
import { convertToPixelCrop } from "react-image-crop";
import AppContext from "../../../context/AppProvider";
import { Link, useNavigate } from "react-router-dom";
import FormCreateProfile from "./FormCreateProfile";
import FormUserProfile from "./FormUserProfile";
import { HiDotsVertical } from "react-icons/hi";
import Modal from "../../../components/Modal";
import { GrNavigate } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoMdHeart } from "react-icons/io";
import { DiAptana } from "react-icons/di";
import { toast } from "react-toastify";
import axios from "axios";

const ResponsiveMoreInfoRememberedAdmin = ({
  premiumProfilesRemaining,
  totalFavoritesProfiles,
  totalOwnProfiles,
  setOpenPremiumModal,
  openPremiumModal,
  setOpenFreeModal,
  openFreeModal,
  setStatusPlan,
  handleSubmit,
  setOpenTab,
  isPending,
  setSlug,
  slug,
}) => {
  const [openChangeProfileModal, setOpenChangeProfileModal] = useState(false);
  const { userInfo, setUserInfo } = useContext(AppContext);
  const previewCanvasRef = useRef(null);
  const queryClient = useQueryClient();
  const [crop, setCrop] = useState("");
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const avatarUrl = useRef(
    "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpenChangeProfileModal(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const dropdown = document.querySelector(".dropdownResponsiveProfile");
    if (openChangeProfileModal) {
      dropdown?.classList.add("has-modal-open");
    } else {
      dropdown?.classList.remove("has-modal-open");
    }

    return () => dropdown?.classList.remove("has-modal-open");
  }, [openChangeProfileModal]);

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
      setOpenChangeProfileModal(false);

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

  const totalPremiumProfilesRemaining = premiumProfilesRemaining;

  return (
    <>
      {/* Dropdown Content */}
      <div className="flex dropdownResponsiveProfile">
        <Dropdown
          label={""}
          renderTrigger={() => (
            <span className="cursor-pointer">
              <HiDotsVertical size={23} />
            </span>
          )}
          className="max-w-sm max-h-[28rem] overflow-y-auto border-2 border-[#fab818]"
          inline
        >
          <h2 className="flex items-center gap-2 bg-gray-200 font-bold py-2.5 px-5 text-gray-700">
            <DiAptana size={20} /> My Settings
          </h2>

          {/* Create Pro Profile OR Go tu buy it */}
          {/* If there's premium profiles */}
          {totalPremiumProfilesRemaining >= 1 ? (
            <DropdownItem className="p-0">
              <li
                className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
                onClick={() => {
                  setOpenPremiumModal(true);
                  setStatusPlan(true);
                }}
              >
                <Modal
                  titleModal={"New Profile (Premium)"}
                  handleSubmit={handleSubmit}
                  setOpenModal={setOpenPremiumModal}
                  openModal={openPremiumModal}
                  modalForm={true}
                  editableWidth={"max-w-xl"}
                >
                  <FormCreateProfile
                    slug={slug}
                    setSlug={setSlug}
                    isPending={isPending}
                    setOpenPremiumModal={setOpenPremiumModal}
                  />
                </Modal>

                <svg
                  className="fill-[#fab818] h-6 premium-filled-icon--nW2Vi header-svg-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  data-t="premium-filled-svg"
                  aria-labelledby="premium-filled-svg"
                  aria-hidden="true"
                  role="img"
                >
                  <title id="premium-filled-svg">Premium</title>
                  <path d="M2.419 13L0 4.797 4.837 6.94 8 2l3.163 4.94L16 4.798 13.581 13z"></path>
                </svg>

                <div>
                  <Link className="block" to={"#"}>
                    Create Pro Profile
                  </Link>

                  <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                    Create a full-featured memorial profile with no limits. Pro
                    profiles remaining:{" "}
                    <span className="font-bold">
                      ({totalPremiumProfilesRemaining})
                    </span>
                  </p>
                </div>
              </li>
            </DropdownItem>
          ) : (
            // If there's no premium profiles
            <DropdownItem className="p-0 hover:bg-secondary-color group hover:text-white">
              <li
                className={`text-start  py-2.5 px-5 flex gap-2 items-start  font-bold animation-fade text-black text-sm cursor-pointer`}
                onClick={() => {
                  setOpenPremiumModal(true);
                  setStatusPlan(true);
                  navigate(`/prices/`);
                }}
              >
                <Modal
                  titleModal={"New Profile (Premium)"}
                  handleSubmit={handleSubmit}
                  setOpenModal={setOpenPremiumModal}
                  openModal={openPremiumModal}
                  modalForm={true}
                  editableWidth={"max-w-xl"}
                >
                  <FormCreateProfile
                    slug={slug}
                    setSlug={setSlug}
                    isPending={isPending}
                    setOpenPremiumModal={setOpenPremiumModal}
                  />
                </Modal>

                <svg
                  className="fill-[#fab818] h-6 premium-filled-icon--nW2Vi header-svg-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  data-t="premium-filled-svg"
                  aria-labelledby="premium-filled-svg"
                  aria-hidden="true"
                  role="img"
                >
                  <title id="premium-filled-svg">Premium</title>
                  <path d="M2.419 13L0 4.797 4.837 6.94 8 2l3.163 4.94L16 4.798 13.581 13z"></path>
                </svg>

                <div>
                  <Link className="block group-hover:text-white" to={"#"}>
                    See Plans
                  </Link>

                  <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                    Premium profiles available{" "}
                    <span className="font-bold">
                      ({totalPremiumProfilesRemaining})
                    </span>.
                  </p>
                </div>
              </li>
            </DropdownItem>
          )}

          {/* Edit Profile */}
          <DropdownItem className="p-0">
            <li
              className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
              onClick={() => {
                setOpenFreeModal(true);
                setStatusPlan(false);
              }}
            >
              <FaPlus className="h-[23px] w-[23px]" />

              <div>
                <Link className="block">Create Free Profile</Link>

                <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                  Create a memorial profile at no cost, with some feature
                  limits.
                </p>
              </div>
            </li>

            {/* MODAL of Create Free Profile */}
            <Modal
              editableWidth={"max-w-[700px] px-8"}
              setOpenModal={setOpenFreeModal}
              handleSubmit={handleSubmit}
              titleModal={"New Profile"}
              openModal={openFreeModal}
              modalForm={true}
            >
              <FormCreateProfile
                slug={slug}
                setSlug={setSlug}
                isPending={isPending}
                setOpenFreeModal={setOpenFreeModal}
              />
            </Modal>
          </DropdownItem>

          {/* Change Profile Photo */}
          <li
            className={`changeResponsivePhoto text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
            onClick={() => setOpenChangeProfileModal(!openChangeProfileModal)}
          >
            <FaCameraRetro className={`${"h-[19px] w-[19px]"}`} />

            <div>
              <button to={"#"} className="block">
                Change Your Profile Photo
              </button>

              <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                Update your profile image with a new photo.
              </p>
            </div>
          </li>

          {/* Navigation */}
          <h2 className="flex items-center gap-3 bg-gray-200 font-bold py-2.5 px-5 text-gray-700">
            <GrNavigate size={20} /> Navigation
          </h2>

          {/* Profiles */}
          <DropdownItem className="p-0 group hover:text-white hover:bg-secondary-color">
            <li
              className={`text-start py-2.5 px-5 flex gap-2 items-start  font-bold animation-fade text-black text-sm cursor-pointer`}
              onClick={() => setOpenTab(1)}
            >
              <CgProfile className="group-hover:text-white h-[28px] w-[28px]" />

              <div>
                <Link className="block group-hover:text-white">
                  Profiles ({totalOwnProfiles})
                </Link>

                <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                  Explore all your profiles.
                </p>
              </div>
            </li>
          </DropdownItem>

          {/* Favourites */}
          <DropdownItem className="p-0 group hover:text-white hover:bg-secondary-color">
            <li
              className={`text-start py-2.5 px-5 flex gap-2 items-start  font-bold animation-fade text-black text-sm cursor-pointer`}
              onClick={() => setOpenTab(2)}
            >
              <IoMdHeart className="text-red-500 h-[28px] w-[28px]" />

              <div>
                <Link className="block group-hover:text-white">
                  Favourites ({totalFavoritesProfiles})
                </Link>

                <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                  Find your favorites quickly.
                </p>
              </div>
            </li>
          </DropdownItem>
        </Dropdown>
      </div>

      {/* Modal of Change Photo Profile */}
      <ModalProfilePhotoResponsive
        titleModal={"Change Profile Image"}
        handleSubmit={handleSubmitProfileImage}
        setOpenModal={setOpenChangeProfileModal}
        openModal={openChangeProfileModal}
        modalForm={true}
        iconTitle={true}
      >
        <FormUserProfile
          isPending={changeImageProfileMutation?.isPending}
          setOpenModalProfile={setOpenChangeProfileModal}
          previewCanvasRef={previewCanvasRef}
          setCrop={setCrop}
          imgRef={imgRef}
          crop={crop}
        />
      </ModalProfilePhotoResponsive>
    </>
  );
};

export default ResponsiveMoreInfoRememberedAdmin;

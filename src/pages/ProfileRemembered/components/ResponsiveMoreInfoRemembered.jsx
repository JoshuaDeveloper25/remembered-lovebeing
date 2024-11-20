import ModalProfilePhotoResponsive from "../../../components/ModalProfilePhotoResponsive";
import FormUserProfile from "../../MyProfiles/components/FormUserProfile";
import { FaCameraRetro, FaRegImage, FaRibbon } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import setCanvasPreview from "../../../utils/setCanvasPreview";
import { BsInfoCircleFill, BsQrCode } from "react-icons/bs";
import { CgFileDocument, CgProfile } from "react-icons/cg";
import { Dropdown, DropdownItem } from "flowbite-react";
import { convertToPixelCrop } from "react-image-crop";
import { useEffect, useRef, useState } from "react";
import FormChangeStatus from "./FormChangeStatus";
import { MdChangeCircle } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import Modal from "../../../components/Modal";
import { GiFlowerPot } from "react-icons/gi";
import { GrNavigate } from "react-icons/gr";
import { DiAptana } from "react-icons/di";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ResponsiveMoreInfoRemembered = ({
  rememberedId,
  setEditRememberedProfile,
  setStatusOptionSelected,
  totalProfileCountTabs,
  setChangeStatusModal,
  statusOptionSelected,
  changeStatusMutation,
  handleChangeStatus,
  changeStatusModal,
  totalLengthPosts,
  setOpenTab,
  status,
  isOwner,
}) => {
  const [openChangeProfileModal, setOpenChangeProfileModal] = useState(false);
  const previewCanvasRef = useRef(null);
  const queryClient = useQueryClient();
  const [crop, setCrop] = useState();
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
      await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/remembereds/upload_profile_image/${rememberedId}`,
        imageInfo
      ),
    onSuccess: (res) => {
      toast.success("¡Image uploaded successfully!");
      queryClient.invalidateQueries(["profile"]);
      setOpenChangeProfileModal(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmitProfileImage = async (e) => {
    e.preventDefault();

    const user_request = confirm(`Are you sure you want to upload the image?`);

    if (!imgRef.current && user_request) {
      return toast.error("Upload an image before uploading!");
    }

    setCanvasPreview(
      imgRef.current, // HTMLImageElement
      previewCanvasRef.current, // HTMLCanvasElement
      convertToPixelCrop(crop, imgRef?.current?.width, imgRef?.current?.height)
    );

    const dataUrl = previewCanvasRef.current.toDataURL();
    updateAvatar(dataUrl);

    const blob = await fetch(dataUrl).then((res) => res.blob());
    const file = new File([blob], "remembered-profile-image.png", {
      type: "image/png",
    });

    const formData = new FormData();
    formData.append("file", file);
    changeImageProfileMutation?.mutate(formData);
  };

  return (
    <>
      <div className="flex dropdownResponsiveProfile">
        {/* Dropdown Content */}
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
          {/* Actions that only the owner can do and see */}
          {isOwner && (
            <>
              <h2 className="flex items-center gap-1.5 bg-gray-200 font-bold py-2.5 px-5 text-gray-700">
                <DiAptana size={20} /> My Settings
              </h2>

              {/* Edit Profile */}
              <DropdownItem className="p-0">
                <li
                  className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
                  onClick={() => setEditRememberedProfile(true)}
                >
                  <CgProfile className="h-[23px] w-[23px]" />

                  <div>
                    <Link className="block">Edit Profile</Link>

                    <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                      Edit your remembered profile as photo, and other special
                      things.
                    </p>
                  </div>
                </li>
              </DropdownItem>

              {/* Change Profile Photo */}
              <li
                className={`changeResponsivePhoto text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
                onClick={() =>
                  setOpenChangeProfileModal(!openChangeProfileModal)
                }
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

              {/* Memorial Status Options */}
              <DropdownItem className="p-0">
                <li
                  className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
                  onClick={() => setChangeStatusModal(true)}
                >
                  <MdChangeCircle className="h-[23px] w-[23px]" />

                  <div>
                    <Link className="block">Change Status</Link>

                    <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                      Edit your remembered profile as photo, and other special
                      things.
                    </p>
                  </div>

                  <Modal
                    titleModal={"Memorial Status Options..."}
                    handleSubmit={handleChangeStatus}
                    setOpenModal={setChangeStatusModal}
                    openModal={changeStatusModal}
                    modalForm={true}
                    editableWidth={"max-w-xl"}
                  >
                    <FormChangeStatus
                      setChangeStatusModal={setChangeStatusModal}
                      setStatusOptionSelected={setStatusOptionSelected}
                      statusOptionSelected={statusOptionSelected}
                      isPending={changeStatusMutation?.isPending}
                      status={status}
                    />
                  </Modal>
                </li>
              </DropdownItem>
            </>
          )}

          {/* Navigation */}
          <h2 className="flex items-center gap-3 bg-gray-200 font-bold py-2.5 px-5 text-gray-700">
            <GrNavigate size={20} /> Navigation
          </h2>

          {/* About */}
          <DropdownItem className="p-0">
            <li
              className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
              onClick={() => setOpenTab(1)}
            >
              <BsInfoCircleFill className="h-[20px] w-[20px]" />

              <div>
                <Link className="block">About</Link>

                <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                  Discover more about this person in common.
                </p>
              </div>
            </li>
          </DropdownItem>

          {/* Media */}
          <DropdownItem className="p-0">
            <li
              className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
              onClick={() => setOpenTab(3)}
            >
              <FaRegImage className="h-[20px] w-[20px]" />

              <div>
                <Link className="block">
                  Media ({totalProfileCountTabs?.gallery_images?.length})
                </Link>

                <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                  Pictures from this remembered and its family.
                </p>
              </div>
            </li>
          </DropdownItem>

          {/* Tributes */}
          <DropdownItem className="p-0">
            <li
              className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
              onClick={() => setOpenTab(5)}
            >
              <GiFlowerPot className="h-[20px] w-[20px]" />

              <div>
                <Link className="block">
                  Tributes ({totalProfileCountTabs?.tributes?.length})
                </Link>

                <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                  Tributes from this remembered and its family.
                </p>
              </div>
            </li>
          </DropdownItem>

          {/* Condolences */}
          <DropdownItem className="p-0">
            <li
              className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
              onClick={() => setOpenTab(4)}
            >
              <FaRibbon className="h-[20px] w-[20px]" />

              <div>
                <Link className="block">
                  Condolences ({totalProfileCountTabs?.condolences?.length})
                </Link>

                <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                  Tributes from this remembered and its family.
                </p>
              </div>
            </li>
          </DropdownItem>

          {/* Posts */}
          <DropdownItem className="p-0">
            <li
              className={`${
                !isOwner ? "rounded-b" : ""
              } text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
              onClick={() => setOpenTab(2)}
            >
              <CgFileDocument className="h-[23px] w-[23px]" />

              <div>
                <Link className="block">Posts ({totalLengthPosts})</Link>

                <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                  Posts uploaded from this remembered to share memories.
                </p>
              </div>
            </li>
          </DropdownItem>

          {/* QR Code */}
          {isOwner && (
            <DropdownItem className="p-0">
              <li
                className={`text-start hover:bg-secondary-color group rounded-b py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
                onClick={() => setOpenTab(6)}
              >
                <BsQrCode className="h-[20px] w-[20px]" />

                <div>
                  <Link className="block">QR Code</Link>

                  <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                    Generate a QR Code to have more accessibility from other
                    devices!
                  </p>
                </div>
              </li>
            </DropdownItem>
          )}
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

export default ResponsiveMoreInfoRemembered;

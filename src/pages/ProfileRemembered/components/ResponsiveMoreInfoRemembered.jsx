import ModalProfilePhotoResponsive from "../../../components/ModalProfilePhotoResponsive";
import FormUserProfile from "../../MyProfiles/components/FormUserProfile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@nextui-org/react";

import {
  FaCameraRetro,
  FaChevronDown,
  FaRegImage,
  FaRibbon,
} from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import setCanvasPreview from "../../../utils/setCanvasPreview";
import { BsInfoCircleFill, BsQrCode } from "react-icons/bs";
import { CgFileDocument, CgProfile } from "react-icons/cg";
import { convertToPixelCrop } from "react-image-crop";
import { useEffect, useRef, useState } from "react";
import FormChangeStatus from "./FormChangeStatus";
import { RiExchange2Fill } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import Modal from "../../../components/Modal";
import { GiFlowerPot } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { GrNavigate } from "react-icons/gr";
import { DiAptana } from "react-icons/di";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");

  const handleBackdropChange = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

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

    if (!imgRef.current) toast.error("Upload an image before sendidsdsng!");

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas subir esta imagen? Esta acción actualizará tu perfil.",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, subir",
      cancelButtonText: "Cancelar",
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

        const dataUrl = previewCanvasRef.current.toDataURL();
        updateAvatar(dataUrl);

        const blob = await fetch(dataUrl).then((res) => res.blob());
        const file = new File([blob], "remembered-profile-image.png", {
          type: "image/png",
        });

        const formData = new FormData();
        formData.append("file", file);

        changeImageProfileMutation?.mutate(formData, {
          onSuccess: () => {
            // Swal.fire({
            //   title: "¡Imagen subida!",
            //   text: "Tu imagen de perfil se ha actualizado correctamente.",
            //   icon: "success",
            // });
          },
          onError: () => {
            Swal.fire({
              title: "¡Error!",
              text: "Hubo un problema al subir la imagen. Intenta nuevamente.",
              icon: "error",
            });
          },
        });
      }
    });
  };

  return (
    <>
      <div className="flex dropdownResponsiveProfile">
        <div className="flex gap-2">
          <button
            onClick={() => handleBackdropChange(backdrop)}
            className="capitalize"
            color="primary"
            variant="flat"
          >
            <HiDotsVertical size={24} />
          </button>
        </div>

        <Drawer
          closeButton={<IoMdClose size={40} />}
          className={"drawer-profile-remembered"}
          classNames={{
            wrapper: "z-[99999]",
            base: "bg-primary-color text-white w-[20rem] custom-scrollbar-class",
            closeButton: "top-2.5 hover:bg-red-500 transition-all duration-200 text-white",
          }}
          backdrop={backdrop}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-col gap-1">
                  Profile
                </DrawerHeader>

                <DrawerBody>
                  {/* Actions that only the owner can do and see */}
                  {isOwner && (
                    <>
                      <h2 className="flex items-center gap-1.5 text-primary-color-light font-bold  py-2.5 ">
                        <DiAptana size={20} /> My Settings
                      </h2>

                      {/* Edit Profile */}
                      <li
                        className={`text-start rounded-lg hover:bg-secondary-color group py-2.5 px-2.5 flex gap-3 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
                        onClick={() => {
                          setEditRememberedProfile(true);
                          onClose();
                        }}
                      >
                        <CgProfile className="text-white h-[36px] w-[36px]" />

                        <div>
                          <Link className="block text-white">Edit Profile</Link>

                          <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                            Edit your remembered profile as photo, and other
                            special things.
                          </p>
                        </div>
                      </li>

                      {/* Change Profile Photo */}
                      <li
                        className={`changeResponsivePhoto rounded-lg text-start hover:bg-secondary-color group py-2.5 px-2.5 flex gap-3 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
                        onClick={() => {
                          setOpenChangeProfileModal(!openChangeProfileModal);
                          onClose();
                        }}
                      >
                        <FaCameraRetro
                          className={`${"text-white h-[26px] w-[26px]"}`}
                        />

                        <div>
                          <button to={"#"} className="block text-white">
                            Change Your Profile Photo
                          </button>

                          <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                            Update your profile image with a new photo.
                          </p>
                        </div>
                      </li>

                      {/* Memorial Status Options */}
                      <li
                        className={`text-start rounded-lg hover:bg-secondary-color group py-2.5 px-2.5 flex gap-3 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
                        onClick={() => {
                          setChangeStatusModal(true);
                          onClose();
                        }}
                      >
                        <RiExchange2Fill className="text-white h-[38px] w-[38px]" />

                        <div>
                          <Link className="block text-white">
                            Change Status
                          </Link>

                          <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                            Edit your remembered profile as photo, and other
                            special things.
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
                    </>
                  )}

                  {/* Navigation */}

                  <h2 className="flex items-center gap-1.5 text-primary-color-light font-bold py-2.5">
                    <GrNavigate size={20} /> Navigation
                  </h2>

                  {/* About */}
                  <li
                    className={` text-start rounded-lg hover:bg-secondary-color group py-2.5 px-2.5 flex gap-3 items-start hover:text-white font-bold animation-fade text-white text-sm cursor-pointer`}
                    onClick={() => {
                      setOpenTab(1);
                      onClose();
                    }}
                  >
                    <BsInfoCircleFill className="h-[30px] w-[30px]" />

                    <div>
                      <Link className="block">About</Link>

                      <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                        Discover more about this person in common.
                      </p>
                    </div>
                  </li>

                  {/* Media */}
                  <li
                    className={`text-start hover:bg-secondary-color group py-2.5 px-2.5 flex gap-3 items-start hover:text-white font-bold animation-fade text-white rounded-lg text-sm cursor-pointer`}
                    onClick={() => {
                      onClose();
                      setOpenTab(3);
                    }}
                  >
                    <FaRegImage className="h-[30px] w-[30px]" />

                    <div>
                      <Link className="block">
                        Media ({totalProfileCountTabs?.gallery_images?.length})
                      </Link>

                      <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                        Pictures from this remembered and its family.
                      </p>
                    </div>
                  </li>

                  {/* Tributes */}
                  <li
                    className={`text-start text-white rounded-lg hover:bg-secondary-color group py-2.5 px-2.5 flex gap-3 items-start hover:text-white font-bold animation-fade text-sm cursor-pointer`}
                    onClick={() => {
                      setOpenTab(5);
                      onClose();
                    }}
                  >
                    <GiFlowerPot className="h-[30px] w-[30px]" />

                    <div>
                      <Link className="block">
                        Tributes ({totalProfileCountTabs?.tributes?.length})
                      </Link>

                      <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                        Tributes from this remembered and its family.
                      </p>
                    </div>
                  </li>

                  {/* Condolences */}
                  <li
                    className={`text-start hover:bg-secondary-color group py-2.5 px-2.5 flex gap-3 items-start hover:text-white font-bold animation-fade text-white rounded-lg text-sm cursor-pointer`}
                    onClick={() => {
                      setOpenTab(4);
                      onClose();
                    }}
                  >
                    <FaRibbon className="h-[25px] w-[25px]" />

                    <div>
                      <Link className="block">
                        Condolences (
                        {totalProfileCountTabs?.condolences?.length})
                      </Link>

                      <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                        Tributes from this remembered and its family.
                      </p>
                    </div>
                  </li>

                  {/* Posts */}
                  <li
                    className={`text-start hover:bg-secondary-color rounded-lg group py-2.5 px-2.5 flex gap-3 items-start hover:text-white font-bold animation-fade text-white text-sm cursor-pointer`}
                    onClick={() => {
                      setOpenTab(2);
                      onClose();
                    }}
                  >
                    <CgFileDocument className="h-[33px] w-[33px]" />

                    <div>
                      <Link className="block">Posts ({totalLengthPosts})</Link>

                      <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                        Posts uploaded from this remembered to share memories.
                      </p>
                    </div>
                  </li>

                  {/* QR Code */}
                  {isOwner && (
                    <li
                      className={`text-start hover:bg-secondary-color group rounded-lg py-2.5 px-2.5 flex gap-3 items-start hover:text-white font-bold animation-fade text-white text-sm cursor-pointer`}
                      onClick={() => {
                        setOpenTab(6);
                        onClose();
                      }}
                    >
                      <BsQrCode className="h-[30px] w-[30px]" />

                      <div>
                        <Link className="block">QR Code</Link>

                        <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                          Generate a QR Code to have more accessibility from
                          other devices!
                        </p>
                      </div>
                    </li>
                  )}

                  <section id="navigation"></section>
                </DrawerBody>

                <DrawerFooter>
                  <a
                    className="bg-green-400/80 px-3 rounded-xl flex justify-center items-center h-full py-2.5 mx-auto hover:bg-green-400/60 animation-fade"
                    href={"#navigation"}
                  >
                    <FaChevronDown className="me-2.5" /> More options
                  </a>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
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

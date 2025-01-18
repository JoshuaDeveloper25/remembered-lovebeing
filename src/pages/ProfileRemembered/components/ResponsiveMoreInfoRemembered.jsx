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
import ImagesHandleCrop from "../../../components/ImagesHandleCrop";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import { BsInfoCircleFill, BsQrCode } from "react-icons/bs";
import { CgFileDocument, CgProfile } from "react-icons/cg";
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
  t,
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
    "https://i.pinimg.com/474x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg"
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

  const changeImageProfileMutation = useMutation({
    mutationFn: async (imageInfo) =>
      await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/remembereds/upload_profile_image/${rememberedId}`,
        imageInfo
      ),
    onSuccess: (res) => {
      toast.success(t("Image uploaded successfully!"));
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
      <div className="flex dropdownResponsiveProfile ">
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
            closeButton:
              "top-2.5 hover:bg-red-500 transition-all duration-200 text-white",
          }}
          backdrop={backdrop}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-col gap-1">
                  {t("Profile")}
                </DrawerHeader>

                <DrawerBody>
                  {/* Actions that only the owner can do and see */}
                  {isOwner && (
                    <>
                      <h2 className="flex items-center gap-1.5 text-primary-color-light font-bold  py-2.5 ">
                        <DiAptana size={20} /> {t("My Settings")}
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
                          <Link className="block text-white">
                            {t("Edit Profile")}
                          </Link>

                          <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                            {t(
                              "Edit your remembered profile as photo, and other special things."
                            )}
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
                            {t("Change Your Profile Photo")}
                          </button>

                          <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                            {t("Update your profile image with a new photo.")}
                          </p>
                        </div>
                      </li>

                      {/* Memorial Status Options */}
                      <li
                        className={`text-start rounded-lg hover:bg-secondary-color group py-2.5 px-2.5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
                        onClick={() => {
                          setChangeStatusModal(true);
                          onClose();
                        }}
                      >
                        <RiExchange2Fill className="text-white h-[38px] w-[38px]" />

                        <div>
                          <Link className="block text-white">
                            {t("Change Status")}
                          </Link>

                          <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                            {t(
                              "Control the visibility of your profile: private for more privacy and public to share with everyone."
                            )}
                          </p>
                        </div>

                        <Modal
                          titleModal={t("Memorial Status Options...")}
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
                    <GrNavigate size={20} /> {t("Navigation")}
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
                      <Link className="block">{t("About")}</Link>

                      <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                        {t("Discover more about this person in common.")}
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
                        {t("Media")} (
                        {totalProfileCountTabs?.gallery_images?.length})
                      </Link>

                      <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                        {t("Pictures from this remembered and its family.")}
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
                        {t("Tributes")} (
                        {totalProfileCountTabs?.tributes?.length})
                      </Link>

                      <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                        {t("Tributes from this remembered and its family.")}
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
                        {t("Condolences from this remembered and its family.")}
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
                      <Link className="block">
                        {t("Posts")} ({totalLengthPosts})
                      </Link>

                      <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                        {t(
                          "Posts uploaded from this remembered to share memories."
                        )}
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
                        <Link className="block">{t("QR Code")}</Link>

                        <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                          {t(
                            "Generate a QR Code to have more accessibility from other devices!"
                          )}
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
                    <FaChevronDown className="me-2.5" /> {t("More options")}
                  </a>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </div>

      {/* Modal of Change Photo Profile */}
      <ImagesHandleCrop
        onCancel={() => setOpenChangeProfileModal(false)}
        isPending={changeImageProfileMutation?.isPending}
        setOpenModalCover={setOpenChangeProfileModal}
        handleSubmit={handleSubmitProfileImage}
        openModalCover={openChangeProfileModal}
        titleModal={"Change Profile Image"}
        previewCanvasRef={previewCanvasRef}
        setCrop={setCrop}
        imgRef={imgRef}
        circle={true}
        crop={crop}
      />
    </>
  );
};

export default ResponsiveMoreInfoRemembered;

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@nextui-org/react";
import ImagesHandleCrop from "../../../components/ImagesHandleCrop";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import { FaCameraRetro, FaPlus } from "react-icons/fa";
import AppContext from "../../../context/AppProvider";
import { IoMdClose, IoMdHeart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import FormCreateProfile from "./FormCreateProfile";
import { HiDotsVertical } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import Modal from "../../../components/Modal";
import { GrNavigate } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { DiAptana } from "react-icons/di";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";

const ResponsiveMoreInfoRememberedAdmin = ({
  statusPlan,
  premiumProfilesRemaining,
  totalFavoritesProfiles,
  totalOwnProfiles,
  setOpenPremiumModal,
  setOpenFreeModal,
  openFreeModal,
  setStatusPlan,
  handleSubmit,
  setOpenTab,
  isPending,
  setSlug,
  slug,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const { t } = useTranslation();

  const handleBackdropChange = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const [openChangeProfileModal, setOpenChangeProfileModal] = useState(false);
  const { userInfo, setUserInfo } = useContext(AppContext);
  const previewCanvasRef = useRef(null);
  const queryClient = useQueryClient();
  const [crop, setCrop] = useState("");
  const navigate = useNavigate();
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
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/upload_profile_image`,
        imageInfo
      ),
    onSuccess: (res) => {
      toast.success(t("Image uploaded successfully!"));
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

    if (!imgRef.current) {
      return toast.error(t("Upload an image before uploading!"));
    }

    Swal.fire({
      title: t("Are you sure?"),
      text: t("Do you want to upload the image?"),
      // icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("Yes, upload it!"),
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
              title: t("Error!"),
              text: t("There was an issue uploading your profile image."),
              icon: "error",
            });
          },
        });

        // Uncomment this if you need to store the image data locally
        // localStorage?.setItem("userInfo", JSON.stringify(formData));
      }
    });
  };

  const totalPremiumProfilesRemaining = premiumProfilesRemaining;

  return (
    <>
      {/* Dropdown Content */}
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
                  {t("Profile Settings")}
                </DrawerHeader>

                <DrawerBody>
                  <h2 className="flex items-center gap-1.5 text-primary-color-light font-bold  py-2.5 ">
                    <DiAptana size={20} /> {t("My Settings")}
                  </h2>

                  {/* Create Pro Profile OR Go tu buy it */}
                  {/* If there's premium profiles */}
                  {totalPremiumProfilesRemaining >= 1 ? (
                    <li
                      className={`text-start py-2.5 rounded-lg hover:bg-secondary-color flex gap-3 items-start px-2 font-bold animation-fade text-white text-sm cursor-pointer`}
                      onClick={() => {
                        setOpenPremiumModal(true);
                        setStatusPlan(true);
                        onClose();
                      }}
                    >
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
                          {t("Create Pro Profile")}
                        </Link>

                        <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                          {t(
                            "Create a full-featured memorial profile with no limits. Pro profiles remaining:"
                          )}{" "}
                          <span className="font-bold">
                            ({totalPremiumProfilesRemaining})
                          </span>
                        </p>
                      </div>
                    </li>
                  ) : (
                    // If there's no premium profiles
                    <li
                      className={`text-start py-2.5 rounded-lg hover:bg-secondary-color flex gap-3 items-start px-2 font-bold animation-fade text-white text-sm cursor-pointer`}
                      onClick={() => {
                        navigate(`/prices/`);
                      }}
                    >
                      <svg
                        className="fill-[#fab818] h-4 premium-filled-icon--nW2Vi header-svg-icon"
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
                          {t("See Plans")}
                        </Link>

                        <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                          {t("Premium profiles available")}{" "}
                          <span className="font-bold">
                            ({totalPremiumProfilesRemaining})
                          </span>
                          .
                        </p>
                      </div>
                    </li>
                  )}

                  {/* Edit Profile */}
                  {totalPremiumProfilesRemaining >= 1 ? null : (
                    <>
                      <li
                        className={`text-start py-2.5 rounded-lg hover:bg-secondary-color flex gap-3 items-start px-2 font-bold animation-fade text-white text-sm cursor-pointer`}
                        onClick={() => {
                          setOpenFreeModal(true);
                          setStatusPlan(false);
                          onClose();
                        }}
                      >
                        <FaPlus className="h-[23px] w-[23px]" />

                        <div>
                          <Link className="block">
                            {t("Create Free Profile")}
                          </Link>

                          <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                            {t(
                              "Create a memorial profile at no cost, with some feature limits."
                            )}
                          </p>
                        </div>
                      </li>

                      <Modal
                        editableWidth={"max-w-[700px] px-8"}
                        setOpenModal={setOpenFreeModal}
                        handleSubmit={handleSubmit}
                        titleModal={t("New Profile")}
                        openModal={openFreeModal}
                        modalForm={true}
                      >
                        <FormCreateProfile
                          t={t}
                          slug={slug}
                          setSlug={setSlug}
                          isPending={isPending}
                          statusPlan={statusPlan}
                          setOpenFreeModal={setOpenFreeModal}
                        />
                      </Modal>
                    </>
                  )}

                  {/* Change Profile Photo */}
                  <li
                    className={`changeResponsivePhoto text-start py-2.5 rounded-lg hover:bg-secondary-color flex gap-3 items-start px-2 font-bold animation-fade text-white text-sm cursor-pointer`}
                    onClick={() => {
                      setOpenChangeProfileModal(!openChangeProfileModal),
                        onClose();
                    }}
                  >
                    <FaCameraRetro className={`${"h-[19px] w-[19px]"}`} />

                    <div>
                      <button to={"#"} className="block">
                        {t("Change Your Profile Photo")}
                      </button>

                      <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                        {t("Update your profile image with a new photo.")}
                      </p>
                    </div>
                  </li>

                  {/* Navigation */}
                  <h2 className="flex items-center gap-1.5 text-primary-color-light font-bold py-2.5">
                    <GrNavigate size={20} /> {t("Navigation")}
                  </h2>

                  {/* Profiles */}
                  <li
                    className={`text-start py-2.5 rounded-lg hover:bg-secondary-color flex gap-3 items-start px-2 font-bold animation-fade text-white text-sm cursor-pointer`}
                    onClick={() => {
                      setOpenTab(1);
                      onClose();
                    }}
                  >
                    <CgProfile className="group-hover:text-white h-[24px] w-[24px]" />

                    <div>
                      <Link className="block group-hover:text-white">
                        {t("Profiles")} ({totalOwnProfiles})
                      </Link>

                      <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                        {t("Explore all your profiles.")}
                      </p>
                    </div>
                  </li>

                  {/* Favourites */}
                  <li
                    className={`text-start py-2.5 rounded-lg hover:bg-secondary-color flex gap-3 items-start px-2 font-bold animation-fade text-white text-sm cursor-pointer`}
                    onClick={() => {
                      setOpenTab(2);
                      onClose();
                    }}
                  >
                    <IoMdHeart className="text-red-500 h-[24px] w-[24px]" />

                    <div>
                      <Link className="block group-hover:text-white">
                        {t("Favourites")} ({totalFavoritesProfiles})
                      </Link>

                      <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                        {t("Find your favorites quickly.")}
                      </p>
                    </div>
                  </li>

                  <section id="navigation"></section>
                </DrawerBody>

                <DrawerFooter>
                  {/* <a
                    className="bg-green-400/80 px-3 rounded-xl flex justify-center items-center h-full py-2.5 mx-auto hover:bg-green-400/60 animation-fade"
                    href={"#navigation"}
                  >
                    <FaChevronDown className="me-2.5" /> More options
                  </a> */}
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </div>

      {/* Modal of Change Photo Profile */}
      <ImagesHandleCrop
        titleModal={t("Change Profile Image")}
        imgRef={imgRef}
        handleSubmit={handleSubmitProfileImage}
        setOpenModalCover={setOpenChangeProfileModal}
        openModalCover={openChangeProfileModal}
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

export default ResponsiveMoreInfoRememberedAdmin;

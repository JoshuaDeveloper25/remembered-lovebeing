import ModalProfilePhotoResponsive from "../../../components/ModalProfilePhotoResponsive";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import setCanvasPreview from "../../../utils/setCanvasPreview";
import { Dropdown, DropdownItem } from "flowbite-react";
import { FaCameraRetro, FaChevronDown, FaPlus } from "react-icons/fa";
import { convertToPixelCrop } from "react-image-crop";
import AppContext from "../../../context/AppProvider";
import { Link, useNavigate } from "react-router-dom";
import FormCreateProfile from "./FormCreateProfile";
import FormUserProfile from "./FormUserProfile";
import { HiDotsVertical } from "react-icons/hi";
import Modal from "../../../components/Modal";
import { GrNavigate } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoMdClose, IoMdHeart } from "react-icons/io";
import { DiAptana } from "react-icons/di";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import ModalCreateFreeProfileResponsive from "./ModalCreateFreeProfileResponsive";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");

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

    if (!imgRef.current) {
      return toast.error("Upload an image before!");
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to upload the image?",
      // icon: "question",
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
                  Profile Settings
                </DrawerHeader>

                <DrawerBody>
                  <h2 className="flex items-center gap-1.5 text-primary-color-light font-bold  py-2.5 ">
                    <DiAptana size={20} /> My Settings
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
                          Create a full-featured memorial profile with no
                          limits. Pro profiles remaining:{" "}
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
                        setOpenPremiumModal(true);
                        setStatusPlan(true);
                        onClose();
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
                          See Plans
                        </Link>

                        <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                          Premium profiles available{" "}
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
                          <Link className="block">Create Free Profile</Link>

                          <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                            Create a memorial profile at no cost, with some
                            feature limits.
                          </p>
                        </div>
                      </li>

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
                        Change Your Profile Photo
                      </button>

                      <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                        Update your profile image with a new photo.
                      </p>
                    </div>
                  </li>

                  {/* Navigation */}
                  <h2 className="flex items-center gap-1.5 text-primary-color-light font-bold py-2.5">
                    <GrNavigate size={20} /> Navigation
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
                        Profiles ({totalOwnProfiles})
                      </Link>

                      <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                        Explore all your profiles.
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
                        Favourites ({totalFavoritesProfiles})
                      </Link>

                      <p className="text-sm max-w-[392px] font-normal text-white/50 group-hover:text-white/90">
                        Find your favorites quickly.
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

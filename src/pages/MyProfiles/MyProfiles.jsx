import ResponsiveMoreInfoRememberedAdmin from "./components/ResponsiveMoreInfoRememberedAdmin";
import IndividualUserProfileCard from "./components/IndividualUserProfileCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import IndividualUserProfileTab from "./components/IndividualUserProfileTab";
import UploadUserProfileImage from "../../components/UploadUserProfileImage";
import cloudsVideo from "../../assets/videos/clouds-myprofiles-cover.mp4";
import FormCreateProfile from "./components/FormCreateProfile";
import getFastApiErrors from "../../utils/getFastApiErrors";
import AppContext from "../../context/AppProvider";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import Modal from "../../components/Modal";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ModalCreateFreeProfileResponsive from "./components/ModalCreateFreeProfileResponsive";

const MyProfiles = () => {
  const { userInfo } = useContext(AppContext);
  const [openPremiumModal, setOpenPremiumModal] = useState(false);
  const [openFreeModal, setOpenFreeModal] = useState(false);
  const [statusPlan, setStatusPlan] = useState("");
  const [slug, setSlug] = useState("");
  const queryClient = useQueryClient();
  const [openTab, setOpenTab] = useState(1);
  const { t } = useTranslation();

  // Get own profiles
  const { data, isPending } = useQuery({
    queryKey: ["ownProfiles"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/get-own-profiles`
      ),
  });

  const createProfileMutation = useMutation({
    mutationFn: async (profileInfo) =>
      await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/remembereds/create-profile/${statusPlan}`,
        profileInfo
      ),
    onSuccess: (res) => {
      toast.success("Successfully profile created!");
      queryClient.invalidateQueries({ queryKey: ["ownProfiles"] });
      queryClient.invalidateQueries({ queryKey: ["premiumProfilesRemaining"] });
      setOpenFreeModal(false);
      setOpenPremiumModal(false);
      setSlug("");
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const profileInfo = {
      first_name: e?.target?.first_name?.value?.trim(),
      middle_name: e?.target?.middle_name?.value?.trim(),
      last_name: e?.target?.last_name?.value?.trim(),
      gender: e?.target?.gender?.value?.trim(),
      designation: e?.target?.designation?.value?.trim(),
      user_relationship: e?.target?.user_relationship?.value?.trim(),
      slug: slug?.replace(/ /g, "-"),
    };

    createProfileMutation?.mutate(profileInfo);
  };

  const handleCreateFreeProfile = () => {
    setOpenFreeModal(true);
    setStatusPlan(false);
  };

  const handleCreatePremiumProfile = () => {
    setOpenPremiumModal(true);
    setStatusPlan(true);
  };

  return (
    <>
      {/* Sky Video */}
      <video
        className="md:flex hidden w-full h-60 object-cover"
        playsInline
        autoPlay
        muted
        loop
      >
        <source src={cloudsVideo} type="video/mp4" />
        Your browser does not support HTML video.
      </video>

      {/* Profiles */}
      <section className="container-page md:px-1 md:my-3">
        <div className="md:hidden sticky h-[56px] top-0 z-[49] bg-white border shadow-lg">
          <div className="flex justify-between  gap-4 items-center px-5 py-2 sticky z-20">
            <div className="flex items-center justify-center gap-3">
              <div className="relative">
                <img
                  className="w-[40px] h-[40px] object-cover mx-auto rounded-full shadow-lg"
                  src={
                    userInfo?.profile_image
                      ? `${userInfo?.profile_image?.cloud_front_domain}/${userInfo?.profile_image?.aws_file_name}`
                      : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                  }
                />

                {/* From lg to up it's going to be visible */}
                <div className="md:block hidden absolute -bottom-3 left-[55%] z-[100] cursor-pointer">
                  <UploadUserProfileImage iconClassname={"size-4"} />
                </div>
              </div>

              <div>
                <h2 className="font-bold capitalize text-lg leading-3 mt-1.5">
                  {userInfo?.name}
                </h2>
                <h4 className="text-gray-600 font-semibold text-sm">
                  {userInfo?.email}
                </h4>
              </div>
            </div>

            <div>
              <ResponsiveMoreInfoRememberedAdmin
                premiumProfilesRemaining={
                  data?.data?.remaining_premium_profiles
                }
                openPremiumModal={openPremiumModal}
                setOpenPremiumModal={setOpenPremiumModal}
                setStatusPlan={setStatusPlan}
                setOpenTab={setOpenTab}
                isPending={createProfileMutation?.isPending}
                userStats={data?.data?.user_stats}
                setOpenFreeModal={setOpenFreeModal}
                openFreeModal={openFreeModal}
                handleSubmit={handleSubmit}
                setSlug={setSlug}
                slug={slug}
                totalFavoritesProfiles={data?.data?.favorites?.length}
                totalOwnProfiles={data?.data?.remembered?.length}
              />
            </div>
          </div>
        </div>

        {/* 768px to up */}
        <article className="md:block hidden mb-2 md:text-end text-start">
          <div className=" w-fit ms-auto mb-2.5">
            {data?.data?.remaining_premium_profiles !== 0 ? (
              <p className="font-mono tracking-tighter text-primary-color shadow-lg  bg-slate-200 px-3 rounded-md">
                Premium profiles
                <span className="font-bold mx-1">
                  ({data?.data?.remaining_premium_profiles})
                </span>
                remaining
              </p>
            ) : (
              <p className="font-mono tracking-tighter text-primary-color shadow-lg  bg-slate-200 px-3 rounded-md">
                Premium profiles<span className="font-bold mx-1">(0)</span>
                available,{" "}
                <Link
                  to={"/prices"}
                  className="text-primary-color-light font-semibold underline"
                >
                  SEE PLANS
                </Link>
              </p>
            )}
          </div>

          {data?.data?.remaining_premium_profiles === 0 ? (
            <>
              <div className="inline-block">
                <button
                  onClick={handleCreateFreeProfile}
                  className="btn btn-blue"
                >
                  <GoPlus className="size-5 inline" /> Create Free Profile
                </button>
              </div>
              
              <ModalCreateFreeProfileResponsive
                titleModal={"New Profile"}
                handleSubmit={handleSubmit}
                setOpenModal={setOpenFreeModal}
                openModal={openFreeModal}
                modalForm={true}
                editableWidth={"sm:max-w-[700px] max-w-full sm:px-8 px-0 h-full"}
                crudModalClassName={"sm:px-4 px-0 "}
                formContainerClassName={'sm:max-h-[34rem] max-h[34rem] overflow-y-auto'}
                modalContentClassNames={'sm:relative static'}
              >
                <FormCreateProfile
                  slug={slug}
                  setSlug={setSlug}
                  isPending={createProfileMutation?.isPending}
                  setOpenFreeModal={setOpenFreeModal}
                />
              </ModalCreateFreeProfileResponsive>
            </>
          ) : (
            <>
              <button
                onClick={handleCreatePremiumProfile}
                type="button"
                className="btn hover:bg-[#fab818] hover:shadow-xl hover:shadow-[#fab818]  shadow-lg shadow-black border-transparent hover:text-white group animation-fade bg-black/90 uppercase text-[#fab818] w-auto"
              >
                <div className="flex items-center gap-1.5">
                  <svg
                    className="fill-[#fab818] h-5 group-hover:fill-white premium-filled-icon--nW2Vi header-svg-icon"
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
                  {t("Create Pro Profile")}
                </div>
              </button>

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
                  isPending={createProfileMutation?.isPending}
                  setOpenPremiumModal={setOpenPremiumModal}
                />
              </Modal>
            </>
          )}
        </article>

        <div className="grid md:grid-cols-4 grid-cols-1 items-start min-[1150px]:gap-3 sm:gap-1 gap-0">
          {/* User Profile - 768 to up */}
          <IndividualUserProfileCard userStats={data?.data?.user_stats} />

          {/* Profiles from user and Tab */}
          <div className="col-span-3">
            <IndividualUserProfileTab
              premiumProfilesRemaining={data?.data?.remaining_premium_profiles}
              favouritesProfiles={data?.data?.favorites}
              profiles={data?.data?.remembered}
              isPending={isPending}
              handleSubmit={handleSubmit}
              slug={slug}
              setSlug={setSlug}
              isPendingCreateProfile={createProfileMutation?.isPending}
              setStatusPlan={setStatusPlan}
              statusPlan={statusPlan}
              setOpenPremiumModal={setOpenPremiumModal}
              openPremiumModal={openPremiumModal}
              isPendingFavouritesProfiles={isPending}
              openTab={openTab}
              setOpenTab={setOpenTab}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default MyProfiles;

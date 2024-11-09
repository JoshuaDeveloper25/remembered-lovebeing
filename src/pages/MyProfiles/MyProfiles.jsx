import ResponsiveMoreInfoRememberedAdmin from "./components/ResponsiveMoreInfoRememberedAdmin";
import IndividualUserProfileCard from "./components/IndividualUserProfileCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import IndividualUserProfileTab from "./components/IndividualUserProfileTab";
import UploadUserProfileImage from "../../components/UploadUserProfileImage";
import FormCreateProfile from "./components/FormCreateProfile";
import getFastApiErrors from "../../utils/getFastApiErrors";
import AppContext from "../../context/AppProvider";
import cloudsVideo from "../../assets/clouds.mp4";
import { useContext, useState } from "react";
import Modal from "../../components/Modal";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import axios from "axios";

const MyProfiles = () => {
  const { userInfo } = useContext(AppContext);
  const [openPremiumModal, setOpenPremiumModal] = useState(false);
  const [openFreeModal, setOpenFreeModal] = useState(false);
  const [statusPlan, setStatusPlan] = useState("");
  const [slug, setSlug] = useState("");
  const queryClient = useQueryClient();
  const [openTab, setOpenTab] = useState(1);

  const { data, isPending } = useQuery({
    queryKey: ["ownProfiles"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/get-own-profiles`
      ),
  });

  const userStatsQuery = useQuery({
    queryKey: ["userStats"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/user-stats`
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

  // Get favourites of remembereds profiles
  const favouritesRememberedsQuery = useQuery({
    queryKey: ["favouritesProfiles"],
    queryFn: () => {
      return axios.get(`${import.meta.env.VITE_BASE_URL}/favorites`);
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

  return (
    <>
      {/* Sky Video */}
      <video
        className="md:block hidden w-full h-60 object-cover"
        loop
        autoPlay
        muted
      >
        <source src={cloudsVideo} type="video/mp4" />
        Your browser does not support HTML video.
      </video>

      {/* Profiles */}
      <section className="container-page md:px-1 md:my-3">
        <div className="md:hidden sticky h-[56px] top-0 z-[9999] bg-slate-100 border shadow-lg">
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
                <div className="lg:block hidden absolute -bottom-3 left-[55%] z-[100] cursor-pointer">
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
                setStatusPlan={setStatusPlan}
                setOpenTab={setOpenTab}
                handleCreateFreeProfile={handleCreateFreeProfile}
                isPending={createProfileMutation?.isPending}
                userStats={userStatsQuery?.data?.data}
                setOpenFreeModal={setOpenFreeModal}
                openFreeModal={openFreeModal}
                handleSubmit={handleSubmit}
                setSlug={setSlug}
                slug={slug}
              />
            </div>
          </div>
        </div>

        {/* 768px to up */}
        <article className="md:block hidden mb-8 md:text-end text-start">
          <div className="inline-block">
            <button onClick={handleCreateFreeProfile} className="btn btn-blue">
              <GoPlus className="size-5 inline" /> Create Free Profile
            </button>
          </div>

          <Modal
            titleModal={"New Profile"}
            handleSubmit={handleSubmit}
            setOpenModal={setOpenFreeModal}
            openModal={openFreeModal}
            modalForm={true}
            editableWidth={"max-w-[700px] px-8"}
          >
            <FormCreateProfile
              slug={slug}
              setSlug={setSlug}
              isPending={createProfileMutation?.isPending}
              setOpenFreeModal={setOpenFreeModal}
            />
          </Modal>
        </article>

        <div className="grid md:grid-cols-4 grid-cols-1 items-start min-[1150px]:gap-3 sm:gap-1 gap-0">
          {/* User Profile - 768 to up */}
          <IndividualUserProfileCard userStats={userStatsQuery?.data?.data} />

          {/* Profiles from user and Tab */}
          <div className="col-span-3">
            <IndividualUserProfileTab
              favouritesProfiles={favouritesRememberedsQuery?.data?.data}
              profiles={data?.data}
              isPending={isPending}
              handleSubmit={handleSubmit}
              slug={slug}
              setSlug={setSlug}
              isPendingCreateProfile={createProfileMutation?.isPending}
              setStatusPlan={setStatusPlan}
              statusPlan={statusPlan}
              setOpenPremiumModal={setOpenPremiumModal}
              openPremiumModal={openPremiumModal}
              isPendingFavouritesProfiles={
                favouritesRememberedsQuery?.isPending
              }
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

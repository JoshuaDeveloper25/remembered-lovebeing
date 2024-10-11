import IndividualUserProfileCard from "./components/IndividualUserProfileCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import IndividualUserProfileTab from "./components/IndividualUserProfileTab";
import FormCreateProfile from "./components/FormCreateProfile";
import getFastApiErrors from "../../utils/getFastApiErrors";
import cloudsVideo from "../../assets/clouds.mp4";
import Modal from "../../components/Modal";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const MyProfiles = () => {
  const [openFreeModal, setOpenFreeModal] = useState(false);
  const [statusPlan, setStatusPlan] = useState("");
  const [slug, setSlug] = useState("");
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
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
      <video className="w-full h-60 object-cover" loop autoPlay muted>
        <source src={cloudsVideo} type="video/mp4" />
        Your browser does not support HTML video.
      </video>

      {/* Profiles */}
      <section className="container-page px-1 my-3">
        {/* Create Profile Button */}
        <article className="mb-8 md:text-end text-start">
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
          {/* User Profile */}
          <IndividualUserProfileCard />

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
              isPendingFavouritesProfiles={
                favouritesRememberedsQuery?.isPending
              }
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default MyProfiles;

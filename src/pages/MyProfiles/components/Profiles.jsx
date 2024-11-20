import FormCreateProfile from "./FormCreateProfile";
import { useQuery } from "@tanstack/react-query";
import Modal from "../../../components/Modal";
import Profile from "./Profile";
import axios from "axios";

const Profiles = ({
  handleSubmit,
  profiles,
  setOpenPremiumModal,
  openPremiumModal,
  isPending,
  slug,
  setSlug,
  setStatusPlan,
  isPendingCreateProfile,
}) => {
  const getPremiumProfilesRemaining = useQuery({
    queryKey: ["premiumProfilesRemaining"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/get-premium-remaining`
      ),
  });

  const handleCreatePremiumProfile = () => {
    setOpenPremiumModal(true);
    setStatusPlan(true);
  };

  return (
    <>
      {getPremiumProfilesRemaining?.data?.data !== null &&
        getPremiumProfilesRemaining?.data?.data !== 0 &&
        getPremiumProfilesRemaining?.data?.data !== undefined &&
        getPremiumProfilesRemaining?.data?.data?.remaining_profiles !== 0 && (
          <>
            <div className="md:flex hidden flex-col gap-6 sm:flex-row justify-between items-center mb-7 bg-white shadow-lg rounded-lg p-3">
              <h2 className="font-sans font-medium text-muted-color italic">
                “Thank you for your purchase! You now have{" "}
                <span className="font-bold">
                  ({getPremiumProfilesRemaining?.data?.data?.remaining_profiles}
                  )
                </span>{" "}
                new{" "}
                {getPremiumProfilesRemaining?.data?.data?.remaining_profiles ===
                1
                  ? "profile"
                  : "profiles"}{" "}
                available, click “Start” to begin{" "}
                <span className="block">
                  {getPremiumProfilesRemaining?.data?.data
                    ?.remaining_profiles === 1
                    ? "customizing it"
                    : "customizing them"}{" "}
                  and sharing the memories that matter most.”
                </span>
              </h2>

              <button
                onClick={handleCreatePremiumProfile}
                type="button"
                className="btn btn-blue w-auto"
              >
                Start
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
                  isPending={isPendingCreateProfile}
                  setOpenPremiumModal={setOpenPremiumModal}
                />
              </Modal>
            </div>
          </>
        )}

      {profiles?.length !== 0 ? (
        <div>
          <div className="border-b-2 pb-8">
            <div className="mb-3">
              <h2 className="font-light text-base text-yellow-500 tracking-wider font-mono">
                <span className="text-2xl">My</span>{" "}
                <span className="text-primary-color-light tracking-tighter">
                  Profiles
                </span>
              </h2>

              <div className="h-1 w-28 bg-yellow-500 rounded-sm"></div>
            </div>

            <article className="grid min-[1043px]:grid-cols-2 grid-cols-1 gap-4 col-span-3">
              {profiles?.map((item) => {
                return (
                  <Profile isPending={isPending} item={item} key={item?.id} />
                );
              })}
            </article>
          </div>
        </div>
      ) : (
        <article className="text-center  py-8">
          <h2 className="text-primary-color/85 text-2xl uppercase">
            There's no profiles yet...
          </h2>
        </article>
      )}
    </>
  );
};

export default Profiles;

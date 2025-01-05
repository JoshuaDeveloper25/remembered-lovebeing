import FormCreateProfile from "./FormCreateProfile";
import { useTranslation } from "react-i18next";
import Modal from "../../../components/Modal";
import Profile from "./Profile";

const Profiles = ({
  isPendingFavouritesProfiles,
  premiumProfilesRemaining,
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
  const { t } = useTranslation();

  const handleCreatePremiumProfile = () => {
    setOpenPremiumModal(true);
    setStatusPlan(true);
  };

  return (
    <>
      {/* <div className="flex items-center gap-2 justify-center">
        <button className="btn btn-blue w-fit  text-base mb-3" type="button">
          Crear Perfil Gratis
        </button>
        <button className="btn btn-blue w-fit  text-base mb-3" type="button">
          See Plans
        </button>
      </div> */}
      <div className="bg-white shadow-lg px-2 py-2 border-2 rounded-md">
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
              {t("There's no profiles yet...")}
            </h2>
          </article>
        )}
      </div>
    </>
  );
};

export default Profiles;

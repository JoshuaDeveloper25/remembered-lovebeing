import FavouritesRememberedsProfile from "./FavouritesRememberedsProfile";
import { FaCross, FaHeart } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import TabLinkContent from "./TabLinkContent";
import Profiles from "./Profiles";
import TabLink from "./TabLink";

const IndividualUserProfileTab = ({
  handleCreateFreeProfile,
  premiumProfilesRemaining,
  handleSubmit,
  slug,
  setSlug,
  isPendingCreateProfile,
  profiles,
  isPending,
  setStatusPlan,
  statusPlan,
  favouritesProfiles,
  isPendingFavouritesProfiles,
  setOpenPremiumModal,
  openPremiumModal,
  openTab,
  setOpenTab,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <ul
        className="md:flex hidden gap-3 list-none flex-wrap my-3 py-2.5 px-1 bg-white/80 flex-row border-2 border-tertiary-color/10 rounded shadow-lg"
        role="tablist"
      >
        <TabLink
          setOpenTab={setOpenTab}
          textTab={t("Profiles")}
          linkTab={"#profiles"}
          iconTab={<FaCross className="text-primary-color" />}
          openTab={openTab}
          numberTab={1}
          countTab={profiles?.length}
        />

        <TabLink
          setOpenTab={setOpenTab}
          linkTab={"#favourites"}
          textTab={t("Favourites")}
          iconTab={<FaHeart className="text-red-500" />}
          openTab={openTab}
          numberTab={2}
          countTab={favouritesProfiles?.length}
        />
      </ul>

      <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
        <div className="py-5 flex-auto">
          <div className="tab-content tab-space">
            <TabLinkContent openTab={openTab} numberTab={1} idTab={"#profiles"}>
              <Profiles
                handleSubmit={handleSubmit}
                profiles={profiles}
                isPending={isPending}
                slug={slug}
                setSlug={setSlug}
                isPendingCreateProfile={isPendingCreateProfile}
                setStatusPlan={setStatusPlan}
                statusPlan={statusPlan}
                setOpenPremiumModal={setOpenPremiumModal}
                openPremiumModal={openPremiumModal}
                premiumProfilesRemaining={premiumProfilesRemaining}
                isPendingFavouritesProfiles={isPendingFavouritesProfiles}
                handleCreateFreeProfile={handleCreateFreeProfile}
              />
            </TabLinkContent>

            <TabLinkContent
              openTab={openTab}
              numberTab={2}
              idTab={"#favourites"}
            >
              <FavouritesRememberedsProfile
                t={t}
                favouritesProfiles={favouritesProfiles}
                isPendingFavouritesProfiles={isPendingFavouritesProfiles}
              />
            </TabLinkContent>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualUserProfileTab;

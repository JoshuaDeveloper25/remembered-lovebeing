import FavouritesRememberedsProfile from "./FavouritesRememberedsProfile";
import { FaCross, FaHeart } from "react-icons/fa";
import TabLinkContent from "./TabLinkContent";
import Profiles from "./Profiles";
import { useState } from "react";
import TabLink from "./TabLink";

const IndividualUserProfileTab = ({
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
}) => {
  const [openTab, setOpenTab] = useState(1);

  return (
    <>
      <ul
        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
        role="tablist"
      >
        <TabLink
          setOpenTab={setOpenTab}
          textTab={"Profiles"}
          linkTab={"#profiles"}
          iconTab={<FaCross className="text-primary-color" />}
          openTab={openTab}
          numberTab={1}
          countTab={profiles?.length}
        />

        <TabLink
          setOpenTab={setOpenTab}
          linkTab={"#favourites"}
          textTab={"Favourites"}
          iconTab={<FaHeart className="text-red-500" />}
          openTab={openTab}
          numberTab={2}
          countTab={favouritesProfiles?.length}
        />
      </ul>

      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
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
              />
            </TabLinkContent>

            <TabLinkContent
              openTab={openTab}
              numberTab={2}
              idTab={"#favourites"}
            >
              <FavouritesRememberedsProfile
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

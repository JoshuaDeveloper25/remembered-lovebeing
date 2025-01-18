import { useTranslation } from "react-i18next";
import { IoCartOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import SortSelect from "./SortSelect";
import Profile from "./Profile";

const Profiles = ({
  handleCreateFreeProfile,
  premiumProfilesRemaining,
  profiles,
  setOpenPremiumModal,
  isPending,
  setStatusPlan,
}) => {
  const { t } = useTranslation();

  const handleCreatePremiumProfile = () => {
    setOpenPremiumModal(true);
    setStatusPlan(true);
  };

  return (
    <>
      <div className="md:hidden flex items-center gap-2 mb-5">
        {premiumProfilesRemaining ? (
          <>
            <div className="flex gap-2.5 items-center w-full">
              <div className="flex-[20%]">
                {" "}
                <button
                  onClick={handleCreatePremiumProfile}
                  className="btn text-sm px-3 text-primary-color border-primary-color hover:text-white hover:bg-primary-color"
                >
                  <GoPlus className="size-5 inline" /> {t("Create Pro Profile")}
                </button>
              </div>

              <div className="flex-1">
                <p className="flex text-[#fab818 border font-mono tracking-tighter text-sm py-2.5  px-3 rounded-md">
                  <div className="flex items-center text-sm justify-center text-[#fab818] w-fit px-1.5 mx-auto">
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

                    <h2
                      className={`ms-1.5 rounded text-center font-semibold uppercase font-[poppins] me-1`}
                    >
                      PRO
                    </h2>

                    <span className="font-bold me-1 text-black">
                      ({premiumProfilesRemaining})
                    </span>
                    <span className="text-black">{t("remaining")}</span>
                  </div>
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="inline-block">
              <Link className="btn btn-blue border-2 block" to={"/prices"}>
                <IoCartOutline className="size-5 inline" /> {t("See Plans")}
              </Link>
            </div>

            <div className="inline-block">
              <button
                onClick={handleCreateFreeProfile}
                className="btn px-3 text-primary-color border-primary-color hover:text-white hover:bg-primary-color"
              >
                <GoPlus className="size-5 inline" /> {t("Create Free Profile")}
              </button>
            </div>
          </>
        )}
      </div>

      <div className="bg-white shadow-lg px-2 py-2 border-2 rounded-md">
        {profiles?.length !== 0 ? (
          <div>
            <div className="border-b-2 pb-8">
              <div>
                <h2 className="font-light text-base text-yellow-500 tracking-wider font-mono">
                  <span className="text-2xl">{t("My")}</span>{" "}
                  <span className="text-primary-color-light tracking-tighter">
                    {t("Profiles")}
                  </span>
                </h2>

                <div className="h-1 w-28 bg-yellow-500 rounded-sm"></div>
              </div>

              <div className="my-3">
                <SortSelect />
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

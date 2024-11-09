import UploadUserProfileImage from "../../../components/UploadUserProfileImage";
import { Dropdown, DropdownItem } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import FormCreateProfile from "./FormCreateProfile";
import { useQuery } from "@tanstack/react-query";
import { HiDotsVertical } from "react-icons/hi";
import Modal from "../../../components/Modal";
import { CgProfile } from "react-icons/cg";
import { IoMdHeart } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

const ResponsiveMoreInfoRememberedAdmin = ({
  totalFavoritesProfiles,
  totalOwnProfiles,
  setOpenPremiumModal,
  openPremiumModal,
  setOpenFreeModal,
  openFreeModal,
  setStatusPlan,
  handleSubmit,
  setOpenTab,
  userStats,
  isPending,
  setSlug,
  slug,
}) => {
  const navigate = useNavigate();

  const getPremiumProfilesRemaining = useQuery({
    queryKey: ["premiumProfilesRemaining"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/get-premium-remaining`
      ),
  });

  const totalPremiumProfilesRemaining =
    getPremiumProfilesRemaining?.data?.data?.remaining_profiles;

  return (
    <div className="flex dropdownResponsiveProfile">
      {/* Dropdown Content */}
      <Dropdown
        label={""}
        renderTrigger={() => (
          <span className="cursor-pointer">
            <HiDotsVertical size={23} />
          </span>
        )}
        className="max-w-sm"
        inline
      >
        <h2 className="font-medium py-2.5 px-5 border-b border-gray-400 text-gray-700">
          Settings
        </h2>

        {/* Create Pro Profile OR Go tu buy it */}
        {/* If there's premium profiles */}
        {totalPremiumProfilesRemaining >= 1 ? (
          <DropdownItem className="p-0">
            <li
              className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
              onClick={() => {
                setOpenPremiumModal(true);
                setStatusPlan(true);
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
                  Create a full-featured memorial profile with no limits. Pro
                  profiles remaining:{" "}
                  <span className="font-bold">
                    ({totalPremiumProfilesRemaining})
                  </span>
                </p>
              </div>
            </li>
          </DropdownItem>
        ) : (
          // If there's no premium profiles
          <DropdownItem className="p-0">
            <li
              className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
              onClick={() => {
                setOpenPremiumModal(true);
                setStatusPlan(true);
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
                  Create a full-featured memorial profile with no limits. Pro
                  profiles remaining:{" "}
                  <span className="font-bold">
                    ({totalPremiumProfilesRemaining})
                  </span>
                </p>
              </div>
            </li>
          </DropdownItem>
        )}

        {/* Create Free Profile */}
        <DropdownItem className="p-0">
          <li
            className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
            onClick={() => {
              setOpenFreeModal(true);
              setStatusPlan(false);
            }}
          >
            <FaPlus className="h-[23px] w-[23px]" />

            <div>
              <Link className="block">Create Free Profile</Link>

              <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                Create a memorial profile at no cost, with some feature limits.
              </p>
            </div>
          </li>

          {/* MODAL of Create Free Profile */}
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
        </DropdownItem>

        {/* Change Profile Photo */}
        <DropdownItem className="p-0">
          <UploadUserProfileImage
            iconClassname={"h-[19px] w-[19px]"}
            iconChoosen={2}
          />
        </DropdownItem>

        {/* Navigation */}
        <h2 className="font-medium py-2.5 px-5 border-b border-gray-400 text-gray-700">
          Navigation
        </h2>

        {/* Profiles */}
        <DropdownItem className="p-0">
          <li
            className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
            onClick={() => setOpenTab(1)}
          >
            <CgProfile className="h-[28px] w-[28px]" />

            <div>
              <Link className="block">Profiles ({totalOwnProfiles})</Link>

              <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                Create a memorial profile at no cost, with some feature limits.
              </p>
            </div>
          </li>
        </DropdownItem>

        {/* Favourites */}
        <DropdownItem className="p-0">
          <li
            className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
            onClick={() => setOpenTab(2)}
          >
            <IoMdHeart className="text-red-500 h-[28px] w-[28px]" />

            <div>
              <Link className="block">
                Favourites ({totalFavoritesProfiles})
              </Link>

              <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                Create a memorial profile at no cost, with some feature limits.
              </p>
            </div>
          </li>
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

export default ResponsiveMoreInfoRememberedAdmin;

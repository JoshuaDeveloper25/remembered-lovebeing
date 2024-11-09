import UploadUserProfileImage from "../../../components/UploadUserProfileImage";
import NavbarDropdownLink from "../../../components/NavbarDropdownLink";
import { FaCameraRetro, FaPlus } from "react-icons/fa";
import FormCreateProfile from "./FormCreateProfile";
import { HiDotsVertical } from "react-icons/hi";
import Modal from "../../../components/Modal";
import { CgProfile } from "react-icons/cg";
import { IoMdHeart } from "react-icons/io";
import { createPortal } from "react-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownItem } from "flowbite-react";

const ResponsiveMoreInfoRememberedAdmin = ({
  handleCreateFreeProfile,
  handleSubmit,
  setOpenFreeModal,
  openFreeModal,
  setStatusPlan,
  userStats,
  setOpenTab,
  isPending,
  setSlug,
  slug,
}) => {
  return (
    // {/* Vertical Dots Dropdown */}
    <div className="dropdownResponsiveProfile flex">
      <button
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className="animation-fade text-xl hover:rounded-full  hover:bg-white/20"
        onClick={() => setOpenVerticalDots(!openVerticalDots)}
        type="button"
      ></button>

      {/* Dropdown Content */}
      <Dropdown
        className="max-w-sm"
        label={<HiDotsVertical size={23} />}
        dismissOnClick={true}
      >
        {/* Create Pro Profile OR Go tu buy it */}
        <DropdownItem className="p-0">
          <li
            className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white last:rounded-b font-bold animation-fade text-black text-sm cursor-pointer`}
            // onClick={}
          >
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
                profiles remaining: 1
              </p>
            </div>
          </li>
        </DropdownItem>

        {/* Create Free Profile */}
        <DropdownItem className="p-0">
          <li
            className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white last:rounded-b font-bold animation-fade text-black text-sm cursor-pointer`}
            onClick={() => {
              setOpenFreeModal(true);
              setStatusPlan(false);
            }}
          >
            <FaPlus className="h-[19px] w-[19px]" />

            <div>
              <Link className="block">
                Create Free Profile
              </Link>

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
        <UploadUserProfileImage
          iconClassname={"h-[19px] w-[19px]"}
          iconChoosen={2}
        />
      </Dropdown>

      {/* <UploadUserProfileImage
              setOpenVerticalDots={setOpenVerticalDots}
              iconClassname={"h-[19px] w-[19px]"}
              iconChoosen={2}
            /> */}

      {/* Navigation section */}
      {/* <h2 className="font-medium py-2.5 px-5 border-b border-gray-400 text-gray-700">
              Navigation
            </h2>

            <NavbarDropdownLink
              hoverBgLink={"hover:bg-secondary-color"}
              linkText={"Profiles"}
              dropDownVersion={2}
              dropdownDesc={
                "Create a memorial profile at no cost, with some feature limits."
              }
              dropdownIcon={<CgProfile className="h-[19px] w-[19px]" />}
              setOpenTab={1}
              onClick={() => {
                setOpenTab(1);
                setOpenVerticalDots(false);
              }}
            />

            <NavbarDropdownLink
              hoverBgLink={"hover:bg-secondary-color"}
              linkText={"Favourites"}
              dropDownVersion={2}
              dropdownDesc={"Update your profile image with a new photo."}
              dropdownIcon={
                <IoMdHeart className="text-red-500 h-[19px] w-[19px]" />
              }
              onClick={() => {
                setOpenTab(2);
                setOpenVerticalDots(false);
              }}
            /> */}

      {/* <div className="flex justify-center  items-center my-6">
              <div className="border-r border-tertiary-color/50 px-2">
                <h3 className="text-sm text-tertiary-color font-bold">
                  {userStats?.posts_count}
                </h3>
                <h2 className="text-xs text-tertiary-color">Posts</h2>
              </div>

              <div className="border-r border-tertiary-color/50 px-2">
                <h3 className="text-sm text-tertiary-color font-bold">
                  {userStats?.gallery_images_count}
                </h3>
                <h2 className="text-xs text-tertiary-color">Media</h2>
              </div>

              <div className="border-r border-tertiary-color/50 px-2">
                <h3 className="text-sm text-tertiary-color font-bold">
                  {userStats?.tributes_count}
                </h3>
                <h2 className="text-xs text-tertiary-color">Tributes</h2>
              </div>

              <div className="px-2">
                <h3 className="text-sm text-tertiary-color font-bold">
                  {userStats?.condolences_count}
                </h3>

                <div className="relative group cursor-pointer">
                  <span className="text-sm text-tertiary-color block overflow-hidden text-ellipsis whitespace-nowrap max-w-[80px]">
                    Con...
                  </span>
                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden w-max px-2 py-1 text-white bg-black rounded-md text-sm group-hover:block">
                    Condolences
                  </span>
                </div>
              </div>
            </div> */}
      {/* </ul> */}
      {/* </> */}
      {/* )} */}
    </div>
  );
};

export default ResponsiveMoreInfoRememberedAdmin;

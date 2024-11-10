import UploadUserProfileImageResponsive from "../../../components/UploadUserProfileImageResponsive";
import { BsInfoCircleFill, BsQrCode } from "react-icons/bs";
import { CgFileDocument, CgProfile } from "react-icons/cg";
import { Dropdown, DropdownItem } from "flowbite-react";
import { FaRegImage, FaRibbon } from "react-icons/fa";
import FormChangeStatus from "./FormChangeStatus";
import { MdChangeCircle } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import Modal from "../../../components/Modal";
import { GiFlowerPot } from "react-icons/gi";
import { GrNavigate } from "react-icons/gr";
import { DiAptana } from "react-icons/di";
import { Link } from "react-router-dom";

const ResponsiveMoreInfoRemembered = ({
  setEditRememberedProfile,
  setStatusOptionSelected,
  totalProfileCountTabs,
  setChangeStatusModal,
  statusOptionSelected,
  changeStatusMutation,
  handleChangeStatus,
  changeStatusModal,
  totalLengthPosts,
  setOpenTab,
  status,
  isOwner,
}) => {
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
        className="max-w-sm max-h-[28rem] overflow-y-auto border-2 border-[#fab818]"
        inline
      >
        {/* Actions that only the owner can do */}
        {isOwner && (
          <>
            <h2 className="flex items-center gap-1.5 bg-gray-200 font-bold py-2.5 px-5 text-gray-700">
              <DiAptana size={20} /> My Settings
            </h2>

            {/* Edit Profile */}
            <DropdownItem className="p-0">
              <li
                className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
                onClick={() => setEditRememberedProfile(true)}
              >
                <CgProfile className="h-[23px] w-[23px]" />

                <div>
                  <Link className="block">Edit Profile</Link>

                  <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                    Edit your remembered profile as photo, and other special
                    things.
                  </p>
                </div>
              </li>
            </DropdownItem>

            {/* Change Profile Photo */}
            <UploadUserProfileImageResponsive
              iconClassname={"h-[19px] w-[19px]"}
            />

            {/* Memorial Status Options */}
            <DropdownItem className="p-0">
              <li
                className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
                onClick={() => setChangeStatusModal(true)}
              >
                <MdChangeCircle className="h-[23px] w-[23px]" />

                <div>
                  <Link className="block">Change Status</Link>

                  <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                    Edit your remembered profile as photo, and other special
                    things.
                  </p>
                </div>

                <Modal
                  titleModal={"Memorial Status Options..."}
                  handleSubmit={handleChangeStatus}
                  setOpenModal={setChangeStatusModal}
                  openModal={changeStatusModal}
                  modalForm={true}
                  editableWidth={"max-w-xl"}
                >
                  <FormChangeStatus
                    setChangeStatusModal={setChangeStatusModal}
                    setStatusOptionSelected={setStatusOptionSelected}
                    statusOptionSelected={statusOptionSelected}
                    isPending={changeStatusMutation?.isPending}
                    status={status}
                  />
                </Modal>
              </li>
            </DropdownItem>
          </>
        )}

        {/* Navigation */}
        <h2 className="flex items-center gap-3 bg-gray-200 font-bold py-2.5 px-5 text-gray-700">
          <GrNavigate size={20} /> Navigation
        </h2>

        {/* About */}
        <DropdownItem className="p-0">
          <li
            className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
            onClick={() => setOpenTab(1)}
          >
            <BsInfoCircleFill className="h-[20px] w-[20px]" />

            <div>
              <Link className="block">About</Link>

              <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                Discover more about this person in common.
              </p>
            </div>
          </li>
        </DropdownItem>

        {/* Media */}
        <DropdownItem className="p-0">
          <li
            className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
            onClick={() => setOpenTab(3)}
          >
            <FaRegImage className="h-[20px] w-[20px]" />

            <div>
              <Link className="block">
                Media ({totalProfileCountTabs?.gallery_images?.length})
              </Link>

              <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                Pictures from this remembered and its family.
              </p>
            </div>
          </li>
        </DropdownItem>

        {/* Tributes */}
        <DropdownItem className="p-0">
          <li
            className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
            onClick={() => setOpenTab(5)}
          >
            <GiFlowerPot className="h-[20px] w-[20px]" />

            <div>
              <Link className="block">
                Tributes ({totalProfileCountTabs?.tributes?.length})
              </Link>

              <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                Tributes from this remembered and its family.
              </p>
            </div>
          </li>
        </DropdownItem>

        {/* Condolences */}
        <DropdownItem className="p-0">
          <li
            className={`text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
            onClick={() => setOpenTab(4)}
          >
            <FaRibbon className="h-[20px] w-[20px]" />

            <div>
              <Link className="block">
                Condolences ({totalProfileCountTabs?.condolences?.length})
              </Link>

              <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                Tributes from this remembered and its family.
              </p>
            </div>
          </li>
        </DropdownItem>

        {/* Posts */}
        <DropdownItem className="p-0">
          <li
            className={`${
              !isOwner ? "rounded-b" : ""
            } text-start hover:bg-secondary-color group py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
            onClick={() => setOpenTab(2)}
          >
            <CgFileDocument className="h-[23px] w-[23px]" />

            <div>
              <Link className="block">Posts ({totalLengthPosts})</Link>

              <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                Posts uploaded from this remembered to share memories.
              </p>
            </div>
          </li>
        </DropdownItem>

        {/* QR Code */}
        {isOwner && (
          <DropdownItem className="p-0">
            <li
              className={`text-start hover:bg-secondary-color group rounded-b py-2.5 px-5 flex gap-2 items-start hover:text-white font-bold animation-fade text-black text-sm cursor-pointer`}
              onClick={() => setOpenTab(6)}
            >
              <BsQrCode className="h-[20px] w-[20px]" />

              <div>
                <Link className="block">QR Code</Link>

                <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
                  Generate a QR Code to have more accessibility from other
                  devices!
                </p>
              </div>
            </li>
          </DropdownItem>
        )}
      </Dropdown>
    </div>
  );
};

export default ResponsiveMoreInfoRemembered;

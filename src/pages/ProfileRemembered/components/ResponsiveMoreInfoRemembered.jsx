import NavbarDropdownLink from "../../../components/NavbarDropdownLink";
import FormChangeStatus from "./FormChangeStatus";
import { HiDotsVertical } from "react-icons/hi";
import Modal from "../../../components/Modal";
import { createPortal } from "react-dom";
import { useState } from "react";

const ResponsiveMoreInfoRemembered = ({
  isOwner,
  setChangeStatusModal,
  changeStatusModal,
  handleChangeStatus,
  setStatusOptionSelected,
  setEditRememberedProfile,
  statusOptionSelected,
  changeStatusMutation,
  status,
}) => {
  const [openVerticalDots, setOpenVerticalDots] = useState(false);

  return (
    // {/* Vertical Dots Dropdown */}
    <div className="relative">
      <button
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className="animation-fade text-xl hover:rounded-full  hover:bg-white/20"
        onClick={() => setOpenVerticalDots(!openVerticalDots)}
        type="button"
      >
        <HiDotsVertical size={23} />
      </button>

      {openVerticalDots && (
        <>
          {createPortal(
            <div
              onClick={() => setOpenVerticalDots(!openVerticalDots)}
              className="h-[100vh] fixed top-0 w-full"
            ></div>,
            document.body
          )}

          <ul className="absolute right-5 shadow-lg bg-gray-200 py-2 w-max rounded max-h-96 z-50">
            {!isOwner ? null : (
              <>
                <NavbarDropdownLink
                  hoverBgLink={"hover:bg-secondary-color"}
                  linkText={"Edit Profile"}
                  onClick={() => setEditRememberedProfile(true)}
                />

                {/* Memorial Status Options */}
                <NavbarDropdownLink
                  hoverBgLink={"hover:bg-secondary-color"}
                  linkText={"Change Status"}
                  onClick={() => setChangeStatusModal(true)}
                />

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
              </>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default ResponsiveMoreInfoRemembered;

import { useState } from "react";
import { createPortal } from "react-dom";
import { FaFolderOpen } from "react-icons/fa";

const Modal = ({
  handleSubmit,
  children,
  titleModal,
  openModal,
  setOpenModal,
  editableWidth,
  modalForm,
  iconTitle = false,
}) => {
  const [closing, setClosing] = useState(false);

  const handleCloseModal = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setOpenModal(false);
    }, 300);
  };

  return (
    openModal &&
    createPortal(
      <div
        // onClick={handleCloseModal}
        className="h-[100vh] fixed top-0 w-full z-[999999]"
      >
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={`overflow-x-hidden fixed top-0 right-0 left-0 z-[2000] flex justify-center items-center w-full min-h-full bg-black/50 overflow-y-hidden`}
        >
          <div
            className={`relative w-full ${
              editableWidth ? editableWidth : "max-w-md"
            } mx-auto h-full animate-slide-up`}
          >
            {/* Modal content */}
            <div
              className={`relative top-4 bottom-10 rounded-lg shadow bg-white min-h-full `}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-300">
                <h3 className="flex  items-center gap-2 text-lg font-semibold text-fourth-color">
                  {iconTitle ? (
                    <FaFolderOpen className="text-primary-color-light size-7 " />
                  ) : (
                    ""
                  )}
                  {titleModal}
                </h3>

                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-fourth-color rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal"
                  onClick={handleCloseModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {modalForm === false ? (
                <div className="p-4 md:p-5">{children}</div>
              ) : (
                <>
                  <form
                    onSubmit={handleSubmit}
                    className="p-4 md:p-5 min-h-full"
                  >
                    {children}
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
  );
};

export default Modal;

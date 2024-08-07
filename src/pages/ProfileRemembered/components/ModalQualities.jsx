import { createPortal } from "react-dom";

const ModalQualities = ({
  children,
  titleModal,
  openModal,
  setOpenModal,
  editableWidth,
}) => {
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    openModal &&
    createPortal(
      <div
        // onClick={handleCloseModal}
        className="h-[100vh] fixed top-0 w-full z-[9999]"
      >
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[2000] flex justify-center items-center w-full min-h-full bg-black/50`}
        >
          <div
            className={`relative w-full ${
              editableWidth ? editableWidth : "max-w-md"
            } mx-auto h-full`}
          >
            {/* Modal content */}
            <div
              className={`relative top-4 bottom-10 rounded-lg shadow bg-white min-h-full overflow-y-auto`}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-fourth-color">
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

              <div className="p-4 md:p-5 min-h-full">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
  );
};

export default ModalQualities;

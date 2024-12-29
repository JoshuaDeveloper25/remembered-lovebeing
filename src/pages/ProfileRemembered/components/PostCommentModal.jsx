import { useEffect } from "react";

const PostCommentModal = ({ children, openModal, setOpenModal }) => {
  useEffect(() => {
    if (openModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up to ensure overflow is removed if modal is closed
    return () => document.body.classList.remove("overflow-hidden");
  }, [openModal]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    openModal && (
      <>
        {/* Main modal */}
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={`overflow-hidden fixed top-0 right-0 left-0 z-[9999999999999999999999999] flex justify-center items-center w-full h-[100vh] bg-black/80`}
        >
          {/* Close button */}
          <div className="absolute flex left-7 top-5 z-[999] bg-black rounded-full px-2 py-2">
            <button
              type="button"
              className="text-white hover:rotate-180 animation-fade"
              data-modal-toggle="crud-modal"
              onClick={handleCloseModal}
            >
              <svg
                className="w-4 h-4"
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

          <div
            className={`relative w-full max-w-[1200px] lg:h-[80%] h-[99%] top-0 rounded-lg shadow bg-white overflow-y-hidden xl:mx-auto mx-4`}
          >
            {children}
          </div>
        </div>
      </>
    )
  );
};

export default PostCommentModal;

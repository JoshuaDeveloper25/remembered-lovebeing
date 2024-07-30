const PostCommentModal = ({ children, openModal, setOpenModal }) => {
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
          className={`overflow-hidden fixed top-0 right-0 left-0 z-[100] flex justify-center items-center w-full h-[100vh] bg-black/50`}
        >
          {/* Close button */}
          <div className="absolute right-7 top-5 z-[999]">
            <button
              type="button"
              className="text-white hover:rotate-180 animation-fade"
              data-modal-toggle="crud-modal"
              onClick={handleCloseModal}
            >
              <svg
                className="w-6 h-6"
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
            className={`relative w-full max-w-[1200px] mx-auto h-[90%] top-0 rounded-lg shadow bg-white overflow-y-hidden`}
          >
            {children}
          </div>
        </div>
      </>
    )
  );
};

export default PostCommentModal;

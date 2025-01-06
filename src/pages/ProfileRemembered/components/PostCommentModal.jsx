import { useEffect } from "react";

const PostCommentModal = ({ children, openModal, setOpenModal }) => {
  useEffect(() => {
    // Añadir o quitar la clase 'overflow-hidden' en el body
    if (openModal) {
      document.body.classList.add("overflow-hidden");

      // Obtener el iframe y acceder a su contenido
      const iframe = document.querySelector("iframe"); // Suponiendo que solo hay uno
      if (iframe && iframe.contentWindow) {
        const iframeDocument = iframe.contentWindow.document;
        const tawkContainer = iframeDocument.querySelector(
          ".tawk-min-container"
        );

        if (tawkContainer) {
          tawkContainer.style.display = "none";
        }
      }
    } else {
      document.body.classList.remove("overflow-hidden");

      const iframe = document.querySelector("iframe");
      if (iframe && iframe.contentWindow) {
        const iframeDocument = iframe.contentWindow.document;
        const tawkContainer = iframeDocument.querySelector(
          ".tawk-min-container"
        );

        if (tawkContainer) {
          tawkContainer.style.display = "block";
        }
      }
    }

    // Limpiar el efecto cuando el modal se cierre
    return () => {
      document.body.classList.remove("overflow-hidden");
      const iframe = document.querySelector("iframe");
      if (iframe && iframe.contentWindow) {
        const iframeDocument = iframe.contentWindow.document;
        const tawkContainer = iframeDocument.querySelector(
          ".tawk-min-container"
        );

        if (tawkContainer) {
          tawkContainer.style.display = "block"; // Asegurar que Tawk se muestre
        }
      }
    };
  }, [openModal]);

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
          className={`overflow-hidden  fixed top-0 right-0 left-0 z-[214748363] flex justify-center items-center w-full h-full`}
        >
          <div
            className={`relative w-full max-w-[1200px] h-full top-0 rounded-lg shadow bg-white overflow-y-hidden xl:mx-auto mx-4`}
          >
            {/* Close button */}
            <div
              className="absolute flex left-2 top-2 z-[999] bg-black rounded-full px-3 py-3"
              onClick={handleCloseModal}
            >
              <button
                type="button"
                className="text-white hover:rotate-180 animation-fade"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-5 h-5"
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

            {children}
          </div>
        </div>

        <div className="bg-black/50 fixed w-full h-full inset-0 backdrop-modal z-[999] backdrop-blur-lg"></div>
      </>
    )
  );
};

export default PostCommentModal;

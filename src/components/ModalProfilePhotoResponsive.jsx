import { FaFolderOpen } from "react-icons/fa";
import { useEffect, useState } from "react";

const ModalProfilePhotoResponsive = ({
  handleSubmit,
  children,
  titleModal,
  openModal,
  setOpenModal,
  editableWidth,
  modalForm,
  iconTitle = false,
  setClearCache = () => {},
}) => {
  const [closing, setClosing] = useState(false);
  
  useEffect(() => {
    // Añadir o quitar la clase 'overflow-hidden' en el body
    if (openModal) {
      document.body.classList.add("overflow-hidden");

      // Obtener el iframe y acceder a su contenido
      const iframe = document.querySelector("iframe"); // Suponiendo que solo hay uno
      if (iframe && iframe.contentWindow) {
        const iframeDocument = iframe.contentWindow.document;
        const tawkContainer = iframeDocument.querySelector(".tawk-min-container");

        if (tawkContainer) {
          tawkContainer.style.display = "none";
        }
      }
    } else {
      document.body.classList.remove("overflow-hidden");

      const iframe = document.querySelector("iframe");
      if (iframe && iframe.contentWindow) {
        const iframeDocument = iframe.contentWindow.document;
        const tawkContainer = iframeDocument.querySelector(".tawk-min-container");

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
        const tawkContainer = iframeDocument.querySelector(".tawk-min-container");

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
    setClosing(false);
    setOpenModal(false);
    setClearCache([]);
  };

  return (
    openModal && (
      <div className="flex absolute inset-0 z-[2000] items-center justify-center">
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={`overflow-x-hidden fixed px-4 top-0  right-0 left-0 z-[2000] flex justify-center items-center w-full min-h-full bg-black/50 overflow-y-hidden`}
        >
          <div
            className={`relative w-full ${
              editableWidth ? editableWidth : "max-w-md"
            } mx-auto h-full animate-slide-up`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal content */}
            <div
              className={`relative top-4 bottom-10 rounded-lg shadow bg-white min-h-full `}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-tertiary-color/15 dark:border-gray-300">
                <div>
                  <h3 className="flex  items-center gap-2 text-xl font-semibold text-fourth-color">
                    {iconTitle ? (
                      <FaFolderOpen className="text-primary-color-light size-7 " />
                    ) : (
                      ""
                    )}
                    {titleModal}
                  </h3>
                  <div className="block bg-primary-color h-1 w-8"></div>
                </div>

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
                    className="max-h-[35rem] overflow-y-auto"
                  >
                    {children}
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalProfilePhotoResponsive;

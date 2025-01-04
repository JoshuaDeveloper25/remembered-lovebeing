import { FaFolderOpen } from "react-icons/fa";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

const ModalCreateFreeProfileResponsive = ({
  handleSubmit,
  children,
  titleModal,
  openModal,
  setOpenModal,
  editableWidth,
  modalForm,
  iconTitle = false,
  crudModalClassName,
  setClearCache = () => {},
  formContainerClassName,
  modalContentClassNames
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
    setClosing(false);
    setOpenModal(false);
    setClearCache([]);
  };

  return (
    openModal &&
    createPortal(
      <div
        // onClick={handleCloseModal}
        id="responsive-modal"
        className="h-[100vh] fixed top-0 w-full z-[99999999] backdrop-modal"
      >
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={twMerge(`overflow-x-hidden fixed top-0  right-0 left-0 z-[99999999] flex justify-center items-center w-full min-h-full bg-black/50 overflow-y-hidden`, crudModalClassName)}
        >
          <div
            className={`relative w-full ${
              editableWidth ? editableWidth : "max-w-md h-full"
            } mx-auto animate-slide-up`}
          >
            {/* Modal content */}
            <div
              className={twMerge(`relative top-4 bottom-10 rounded-lg shadow bg-white min-h-full`, modalContentClassNames)}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-tertiary-color/15 dark:border-gray-300">
                <div>
                  <h3 className="flex  items-center gap-2 text-xl font-semibold text-fourth-color">
                    {iconTitle && (
                      <FaFolderOpen className="text-primary-color-light size-7 " />
                    )}
                    {titleModal}
                  </h3>
                  <div className="block bg-primary-color-light h-1 w-8"></div>
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

              <div className={twMerge("max-h-[34rem] overflow-y-auto", formContainerClassName)}>
                {modalForm === false ? (
                  <div className="p-4 md:p-5">{children}</div>
                ) : (
                  <>
                    <form
                      onSubmit={handleSubmit}
                      // className="max-h-[80vh] overflow-y-auto"
                    >
                      {children}
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
  );
};

export default ModalCreateFreeProfileResponsive;

import ButtonForm from "../../../components/ButtonForm";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const FormChangeStatus = ({
  setChangeStatusModal,
  statusOptionSelected,
  setStatusOptionSelected,
  isPending,
  status,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    setStatusOptionSelected(status);
  }, []);

  return (
    <>
      <div className="p-4">
        <div
          className={`${
            statusOptionSelected === "public"
              ? "bg-primary-color text-white"
              : "hover:bg-primary-color/20"
          }  rounded-md animation-fade border`}
        >
          <label className="text-sm px-2.5 py-4 block cursor-pointer">
            <div className="flex items-center mb-1">
              <input
                onChange={(e) => setStatusOptionSelected(e?.target?.value)}
                checked={statusOptionSelected === "public"}
                value={"public"}
                className="me-2"
                type="radio"
              />

              <span className="font-semibold align-top">
                {t("All visitors can view and contribute")}{" "}
                <span className="font-semibold text-green-500">
                  *({t("Public")})
                </span>
              </span>
            </div>

            <span className="block text-xs">
              {t(
                "Recommended for most memorials. This option allows easy access to the website and facilitates collaboration."
              )}
            </span>
          </label>
        </div>

        <div
          className={`${
            statusOptionSelected === "private"
              ? "bg-primary-color text-white"
              : "hover:bg-primary-color/20"
          }  rounded-md animation-fade border  mt-3`}
        >
          <label className="text-sm px-2.5 py-4 block cursor-pointer">
            <div className="flex items-center mb-1">
              <input
                onChange={(e) => setStatusOptionSelected(e?.target?.value)}
                checked={statusOptionSelected === "private"}
                value={"private"}
                className="me-2"
                type="radio"
              />

              <span className="font-semibold align-top">
                {t("Visible only to me")}{" "}
                <span className="font-semibold text-red-500">
                  *({t("Private")})
                </span>
              </span>
            </div>

            <span className="block text-xs">
              {t(
                "Choose this option if you do not want the memorial to be visible to others at this time."
              )}
            </span>
          </label>
        </div>
      </div>

      <ButtonForm
        setOpenModal={setChangeStatusModal}
        isPending={isPending}
        buttonClassName={"mt-0"}
        statusOff={t("Save changes")}
        statusOn={t("Saving...")}
      />
    </>
  );
};

export default FormChangeStatus;

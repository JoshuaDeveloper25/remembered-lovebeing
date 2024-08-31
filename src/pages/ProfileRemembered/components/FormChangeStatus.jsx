import ButtonForm from "../../../components/ButtonForm";
import { useEffect } from "react";

const FormChangeStatus = ({
  statusOptionSelected,
  setStatusOptionSelected,
  isPending,
  status,
}) => {
  useEffect(() => {
    setStatusOptionSelected(status);
  }, []);

  return (
    <>
      <div>
        <div
          className={`${
            statusOptionSelected === "public"
              ? "bg-primary-color text-white"
              : "hover:bg-primary-color/20"
          }  rounded-md animation-fade px-2.5 border py-2.5`}
        >
          <label className="text-sm">
            <input
              onChange={(e) => setStatusOptionSelected(e?.target?.value)}
              checked={statusOptionSelected === "public"}
              value={"public"}
              className="me-2"
              type="radio"
            />

            <span className="font-semibold align-top">
              All visitors can view and contribute{" "}
              <span className="font-semibold text-green-500">*(Public)</span>
            </span>

            <span className="block text-xs">
              Recommended for most memorials. This option allows easy access to
              the website and facilitates collaboration.
            </span>
          </label>
        </div>

        <div
          className={`${
            statusOptionSelected === "private"
              ? "bg-primary-color text-white"
              : "hover:bg-primary-color/20"
          }  rounded-md animation-fade px-2.5 border py-2 mt-3`}
        >
          <label className="text-sm">
            <input
              onChange={(e) => setStatusOptionSelected(e?.target?.value)}
              checked={statusOptionSelected === "private"}
              value={"private"}
              className="me-2"
              type="radio"
            />

            <span className="font-semibold align-top">
              Visible only to me{" "}
              <span className="font-semibold text-red-500">*(Private)</span>
            </span>

            <span className="block text-xs">
              Choose this option if you do not want the memorial to be visible
              to others at this time.
            </span>
          </label>
        </div>
      </div>

      <ButtonForm
        isPending={isPending}
        buttonClassName={"mt-0"}
        statusOff={"Save changes"}
        statusOn={"Saving..."}
      />
    </>
  );
};

export default FormChangeStatus;

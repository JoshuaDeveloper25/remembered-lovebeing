import { InputForm } from "../../../components/InputForm";
import ButtonForm from "../../../components/ButtonForm";
import { useEffect, useState } from "react";
import { causeOfDeaths, relationships } from "../../../db/data";
import { useTranslation } from "react-i18next";

const FormCreateProfile = ({
  statusPlan,
  slug,
  setSlug,
  isPending,
  setOpenFreeModal,
  setOpenPremiumModal,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const { t } = useTranslation();

  const splittedLastName = lastName.split(" ");

  useEffect(() => {
    setSlug(
      firstName?.toLowerCase() +
        (lastName !== "" ? "-" : "") +
        splittedLastName[0]?.toLowerCase()
    );
  }, [firstName, lastName]);

  const handleFirstName = (e) => {
    setFirstName(e?.target?.value.replace(/\s/g, ""));
  };

  const handleMiddleName = (e) => {
    setMiddleName(e?.target?.value.replace(/\s/g, ""));
  };

  const handleLastName = (e) => {
    setLastName(e?.target?.value);
  };

  return (
    <>
      <div className="">
        <div className="p-4 md:p-5">
          <div className="flex flex-col sm:flex-row gap-6 mb-3">
            <div className="flex-1">
              <InputForm
                inputLabel={t("First Name")}
                inputClassNameAdd={"mb-1"}
                inputType="text"
                inputName="first_name"
                labelClassNameAdd={"mb-0"}
                inputPlaceholder={t("Input First Name")}
                required={true}
                inputProps={{ value: firstName, onChange: handleFirstName }}
              />
            </div>

            <div className="flex-1">
              <InputForm
                inputLabel={t("Middle Name (Optional)")}
                inputClassNameAdd={"mb-1"}
                inputType="text"
                inputName="middle_name"
                inputPlaceholder={t("Input Middle Name")}
                labelClassNameAdd={"mb-0"}
                inputProps={{ value: middleName, onChange: handleMiddleName }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mb-3">
            <div className="flex-1">
              <InputForm
                inputLabel={t("Last Name")}
                inputClassNameAdd={"mb-1"}
                inputType="text"
                inputPlaceholder={t("Input Last Name")}
                inputName="last_name"
                labelClassNameAdd={"mb-0"}
                required={true}
                inputProps={{ value: lastName, onChange: handleLastName }}
              />
            </div>

            <div className="flex-1">
              <label>
                <span className="w-full inline-block text-start font-medium ">
                  {t("Relationship")}
                </span>

                <select
                  className="form-input border border-gray-300"
                  placeholder={t("-- Select --")}
                  name="user_relationship"
                  required={true}
                >
                  {relationships?.map((item, index) => (
                    <option value={item?.value} key={index}>
                      {t(item?.relationship)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6 mb-3">
            <div className="flex-1">
              <h3 className="w-full inline-block text-start font-medium">
                {t("Gender")}
              </h3>

              <div className=" border border-gray-300 flex mt-[.36rem] gap-5 py-1.5 px-1.5 rounded-md ">
                <label>
                  {t("Male")}
                  <input
                    className="ms-2"
                    type="radio"
                    value="male"
                    name="gender"
                    required={true}
                  />
                </label>

                <label>
                  {t("Female")}
                  <input
                    className="ms-2"
                    type="radio"
                    value="female"
                    name="gender"
                    required={true}
                  />
                </label>
              </div>
            </div>

            <div className="flex-1">
              <label>
                <span className="w-full inline-block text-start font-medium">
                  {t("Cause of Death")}
                </span>
                <select
                  className="form-input border border-gray-300"
                  placeholder={t("-- Select --")}
                  name="designation"
                  required={true}
                >
                  <option>{t("-- Select --")}</option>
                  {causeOfDeaths?.map((item, index) => (
                    <option value={item?.value} key={index}>
                      {t(item?.causeDeath)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-green-700 text-white p-4 md:p-5 mb-7">
          <h3 className="w-full inline-block text-xl text-start font-semibold mb-2.5">
            {t("Memorial web address")}:
          </h3>
          <label className="flex flex-col sm:flex-row gap-1 sm:items-center">
            <span className="">https://www.remembered.com/</span>
            <input
              className="form-input py-1 sm:w-52"
              type={"text"}
              name={"slug"}
              value={slug}
              onChange={(e) => setSlug(e?.target?.value)}
              placeholder={t("Example: Jennifer Ramírez")}
            />
          </label>
          <p className="font-semibold pt-2">
            {t("Preview")}:{" "}
            <span className="text-primary-color-light/75 font-medium underline">{`  https://www.remembered.com/${slug?.replace(
              / /g,
              "-"
            )}`}</span>
          </p>
        </div>
      </div>

      <div className="sticky bottom-0 z-50 bg-gray-200 rounded-b-sm">
        <ButtonForm
          isPending={isPending}
          statusOff={t("Add")}
          statusOn={t("Adding...")}
          buttonClassName={"mt-0"}
          setOpenModal={setOpenFreeModal}
          setOpenModalAlt={setOpenPremiumModal}
        />
      </div>
    </>
  );
};

export default FormCreateProfile;

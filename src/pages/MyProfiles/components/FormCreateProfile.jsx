import { InputForm } from "../../../components/InputForm";
import ButtonForm from "../../../components/ButtonForm";
import { useEffect, useState } from "react";

const FormCreateProfile = ({
  slug,
  setSlug,
  isPending,
  setOpenFreeModal,
  setOpenPremiumModal,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const splittedLastName = lastName.split(" ");

  useEffect(() => {
    setSlug(
      firstName?.toLowerCase() +
        (lastName !== "" ? "-" : "") +
        splittedLastName[0]?.toLowerCase()
    );
  }, [firstName, lastName]);

  const handleFirstName = (e) => {
    setFirstName(e?.target?.value);
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
                inputLabel="First Name"
                inputClassNameAdd={"mb-1"}
                inputType="text"
                inputName="first_name"
                labelClassNameAdd={"mb-0"}
                inputPlaceholder={"Input First Name"}
                required={true}
                inputProps={{ value: firstName, onChange: handleFirstName }}
              />
            </div>

            <div className="flex-1">
              <InputForm
                inputLabel="Middle Name (Optional)"
                inputClassNameAdd={"mb-1"}
                inputType="text"
                inputName="middle_name"
                inputPlaceholder={"Input Middle Name"}
                labelClassNameAdd={"mb-0"}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mb-3">
            <div className="flex-1">
              <InputForm
                inputLabel="Last Name"
                inputClassNameAdd={"mb-1"}
                inputType="text"
                inputPlaceholder={"Input Last Name"}
                inputName="last_name"
                labelClassNameAdd={"mb-0"}
                required={true}
                inputProps={{ value: lastName, onChange: handleLastName }}
              />
            </div>

            <div className="flex-1">
              <label>
                <span className="w-full inline-block text-start font-medium ">
                  Relationship
                </span>
                <select
                  className="form-input border border-gray-300"
                  placeholder="-- Select --"
                  name="user_relationship"
                  required={true}
                >
                  <option value="">-- Select --</option>
                  <option value="none">Prefer not to say</option>
                  <option value="dad">Dad</option>
                  <option value="mom">Mom</option>
                  <option value="son">Son</option>
                  <option value="sister">Sister</option>
                  <option value="stepsister">Stepsister</option>
                  <option value="brother">Brother</option>
                  <option value="stepbrother">Sterbrother</option>
                  <option value="daughter">Daughter</option>
                  <option value="grandmother">Grandmother</option>
                  <option value="grandfather">Grandfather</option>
                </select>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6 mb-3">
            <div className="flex-1">
              <h3 className="w-full inline-block text-start font-medium">
                Gender
              </h3>

              <div className=" border border-gray-300 flex mt-[.36rem] gap-5 py-1.5 px-1.5 rounded-md ">
                <label>
                  Male
                  <input
                    className="ms-2"
                    type="radio"
                    value="male"
                    name="gender"
                    required={true}
                  />
                </label>

                <label>
                  Female
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
                  Cause of Death
                </span>
                <select
                  className="form-input border border-gray-300"
                  placeholder="-- Select --"
                  name="designation"
                  required={true}
                >
                  <option value="">-- Select --</option>
                  <option value="not_to_say">Prefer not to say</option>
                  <option value="covid19_victim">COVID-19 victim</option>
                  <option value="substance_victim">
                    Substance abuse victim
                  </option>
                  <option value="cancer_victim">Cancer victim</option>
                  <option value="accident_victim">Victim of an accident</option>
                  <option value="crime_victim">Crime victim</option>
                  <option value="heart_attack">Heart attack</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-red-100 px-5 md:px-4 py-1.5 font-mono">
          <h2>
            <span className="text-primary-color-light font-bold">Note:</span>{" "}
            <span className="text-yellow-500 font-semibold">
              Premium Profiles can't be{" "}
              <span className="font-extrabold uppercase text-red-500">
                deleted
              </span>
              !
            </span>
          </h2>
        </div>

        <div className="bg-green-700 text-white p-4 md:p-5 mb-7">
          <h3 className="w-full inline-block text-xl text-start font-semibold mb-2.5">
            Memorial web address:
          </h3>
          <label className="flex flex-col sm:flex-row gap-1 sm:items-center">
            <span className="">https://www.remembered.com/</span>
            <input
              className="form-input py-1 sm:w-52"
              type={"text"}
              name={"slug"}
              value={slug}
              onChange={(e) => setSlug(e?.target?.value)}
              placeholder="Example: John Doe"
            />
          </label>
          <p className="font-semibold pt-2">
            Preview:{" "}
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
          statusOff={"Add"}
          statusOn={"Adding..."}
          buttonClassName={"mt-0"}
          setOpenModal={setOpenFreeModal}
          setOpenModalAlt={setOpenPremiumModal}
        />
      </div>
    </>
  );
};

export default FormCreateProfile;

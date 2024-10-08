import { InputForm } from "../../../components/InputForm";
import ButtonForm from "../../../components/ButtonForm";

const FormCreateProfile = ({ slug, setSlug, isPending }) => {
  return (
    <>
      <div className="mb-2">
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
            />
          </div>

          <div className="flex-1">
            <InputForm
              inputLabel="Middle Name"
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
            />
          </div>

          <div className="flex-1">
            <label>
              <span className="w-full inline-block text-start font-medium">
                Relationship
              </span>
              <select
                className="form-input"
                placeholder="-- Select --"
                name="user_relationship"
              >
                <option value="">-- Select --</option>
                <option value="none">Prefer not to say</option>
                <option value="dad">Dad</option>
                <option value="mom">Mom</option>
                <option value="son">Son</option>
                <option value="sister">Sister</option>
                <option value="brother">Brother</option>
                <option value="daughter">Daughter</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-6 mb-3">
          <div className="flex-1">
            <h3 className="w-full inline-block text-start font-medium">
              Gender
            </h3>

            <div className="flex mt-[.36rem] gap-5 pb-1 rounded-md ">
              <label>
                Male
                <input
                  className="ms-2"
                  type="radio"
                  value="male"
                  name="gender"
                />
              </label>

              <label>
                Female
                <input
                  className="ms-2"
                  type="radio"
                  value="female"
                  name="gender"
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
                className="form-input"
                placeholder="-- Select --"
                name="designation"
              >
                <option value="">-- Select --</option>
                <option value="covid19_victim">COVID-19 victim</option>
                <option value="substance_victim">Substance abuse victim</option>
                <option value="cancer_victim">Cancer victim</option>
                <option value="accident_victim">Victim of an accident</option>
                <option value="crime_victim">Crime victim</option>
              </select>
            </label>
          </div>
        </div>

        <h3 className="w-full inline-block text-xl text-start font-semibold mb-2.5">
          Memorial web address:
        </h3>
        <label className="flex gap-6 items-center">
          <span className="w-full inline-block">
            https://www.remembered.com/
          </span>
          <input
            className="form-input"
            type={"text"}
            name={"slug"}
            value={slug}
            onChange={(e) => setSlug(e?.target?.value)}
            placeholder="Example: John Doe"
          />
        </label>
        <p className="font-semibold pt-2">
          Preview:{" "}
          <span className="text-primary-color-light font-normal underline">{`  https://www.remembered.com/${slug?.replace(
            / /g,
            "-"
          )}`}</span>
        </p>

        {/* <div>
          <label>
            <span className="w-full inline-block text-start font-semibold">
              Profile Web Address{" "}
              <span className="text-xs text-yellow-500 font-semibold align-super">
                {" "}
                * (Tip: You can use your names or nickname)
              </span>
            </span>
            <input
              className=" form-input"
              type={"text"}
              name={"slug"}
              value={slug}
              onChange={(e) => setSlug(e?.target?.value)}
              placeholder="Example: John Doe"
            />
          </label>
          <p className="text-[13px] text-red-500 font-semibold rounded-sm">
            * Take your time on the name as you can't change it later!
          </p>
          <p className="bg-primary-color text-white mt-2 rounded px-2 py-2">
            <span className="block font-semibold text-sm">
              This is how people will find you:
            </span>
            <span className="text-center block">
              Link:{" "}
              <span className="text-primary-color-light underline">
                {`  https://www.remembered.com/${slug?.replace(/ /g, "-")}`}
              </span>
            </span>
          </p>
        </div> */}
      </div>

      <ButtonForm
        isPending={isPending}
        statusOff={"Add"}
        statusOn={"Adding..."}
        buttonClassName={"mt-0"}
      />
    </>
  );
};

export default FormCreateProfile;

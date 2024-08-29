import { InputForm } from "../../../components/InputForm";
import ButtonForm from "../../../components/ButtonForm";

const FormCreateProfile = ({ slug, setSlug, isPending }) => {
  return (
    <>
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <InputForm
              inputLabel="First Name"
              inputClassNameAdd={"mb-1"}
              inputType="text"
              inputName="first_name"
              labelClassNameAdd={"mb-0"}
              required={true}
            />
          </div>

          <div className="flex-1">
            <InputForm
              inputLabel="Middle Name"
              inputClassNameAdd={"mb-1"}
              inputType="text"
              inputName="middle_name"
              labelClassNameAdd={"mb-0"}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mt-6">
          <div className="flex-1">
            <InputForm
              inputLabel="Last Name"
              inputClassNameAdd={"mb-1"}
              inputType="text"
              inputName="last_name"
              labelClassNameAdd={"mb-0"}
              required={true}
            />
          </div>

          <div className="flex-1">
            <label>
              <span className="w-full inline-block text-start">
                Relationship
              </span>
              <select
                className="form-input-focus form-input-normal"
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

        <div className="my-6 block">
          <h3 className="w-full inline-block text-start">Gender</h3>

          <div className="flex gap-5">
            <label>
              Male
              <input className="ms-2" type="radio" value="male" name="gender" />
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

        <div className="flex gap-6 mb-3">
          <div className="flex-1">
            <label>
              <span className="w-full inline-block text-start">Caused</span>
              <select
                className="form-input-focus form-input-normal"
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

          <div className="flex-1">
            <label>
              <span className="w-full inline-block text-start">Slug</span>
              <input
                className="form-input-focus form-input-normal"
                type={"text"}
                name={"slug"}
                required
                value={slug}
                onChange={(e) => setSlug(e?.target?.value)}
              />
            </label>
            <p className="bg-primary-color text-white mt-2 rounded px-2 py-2">
              Link:{" "}
              <span className="font-semibold">{slug?.replace(/ /g, "-")}</span>
            </p>
          </div>
        </div>
      </div>

      <ButtonForm
        isPending={isPending}
        statusOff={"Add"}
        statusOn={"Adding..."}
      />
    </>
  );
};

export default FormCreateProfile;

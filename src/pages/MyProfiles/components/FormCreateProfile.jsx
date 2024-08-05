import { InputForm } from "../../../components/InputForm";
import ButtonForm from "../../../components/ButtonForm";

const FormCreateProfile = ({ isPending }) => {
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

        <div className="mt-6">
          <InputForm
            inputLabel="Last Name"
            inputClassNameAdd={"mb-1"}
            inputType="text"
            inputName="last_name"
            labelClassNameAdd={"mb-0"}
          />
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

        <div className="mb-6">
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

        {/* <div className="col-span-2">
          <InputForm
            inputLabel={"Birth Date"}
            inputClassNameAdd={"mb-1"}
            inputType="date"
            inputName="birth_date"
            labelClassNameAdd={"mb-0"}
          />
        </div>

        <div className="col-span-2">
          <InputForm
            inputLabel={"Death Date"}
            inputClassNameAdd={"mb-1"}
            inputType="date"
            inputName="death_date"
            labelClassNameAdd={"mb-0"}
          />
        </div> */}
        {/* 
        <div className="col-span-2">
          <InputForm
            inputLabel="Epitaph (Optional)"
            inputClassNameAdd={"mb-1"}
            inputType="text"
            inputName="epitaph"
            labelClassNameAdd={"mb-0"}
          />
        </div>  */}
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

import getDaysInMonth from "../../../helpers/getDaysInMonth";
import { InputForm } from "../../../components/InputForm";
import ButtonForm from "../../../components/ButtonForm";
import { useEffect, useState } from "react";

const FormEditProfile = ({
  setEditRememberedProfile,
  rememberedProfileInfo,
  isPending,
  bornYear,
  setBornYear,
  bornMonth,
  setBornMonth,
  bornDay,
  setBornDay,
  passedYear,
  setPassedYear,
  passedMonth,
  setPassedMonth,
  passedDay,
  setPassedDay,
  currentYear,
  months,
}) => {
  const [gender, setGender] = useState("");
  const [bornDays, setBornDays] = useState([]);
  const [passedDays, setPassedDays] = useState([]);
  const years = [];

  useEffect(() => {
    if (rememberedProfileInfo) {
      const birthDate = new Date(
        `${rememberedProfileInfo.remembered_profile.birth_date}T00:00:00Z`
      );
      const deathDate = new Date(
        `${rememberedProfileInfo.remembered_profile.death_date}T00:00:00Z`
      );

      setBornYear(birthDate.getUTCFullYear());
      setBornMonth(months[birthDate.getUTCMonth()]);
      setBornDay(birthDate.getUTCDate());

      setPassedYear(deathDate.getUTCFullYear());
      setPassedMonth(months[deathDate.getUTCMonth()]);
      setPassedDay(deathDate.getUTCDate());

      setGender(rememberedProfileInfo.remembered_profile.gender);
    }
  }, [rememberedProfileInfo]);

  // Get years from 1800 to now
  for (let year = 1800; year <= currentYear; year++) {
    years.push(year);
  }

  useEffect(() => {
    const daysInBornMonth = getDaysInMonth(bornMonth, bornYear);
    const newBornDays = Array.from(
      { length: daysInBornMonth },
      (_, i) => i + 1
    );
    setBornDays(newBornDays);
  }, [bornMonth, bornYear]);

  useEffect(() => {
    const daysInPassedMonth = getDaysInMonth(passedMonth, passedYear);
    const newPassedDays = Array.from(
      { length: daysInPassedMonth },
      (_, i) => i + 1
    );
    setPassedDays(newPassedDays);
  }, [passedMonth, passedYear]);

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-6 mb-3">
          <div className="flex-1">
            <InputForm
              inputLabel="First Name"
              inputClassNameAdd={"mb-1"}
              inputType="text"
              inputName="first_name"
              labelClassNameAdd={"mb-0"}
              required={true}
              defaultValue={
                rememberedProfileInfo?.remembered_profile?.first_name
              }
            />
          </div>

          <div className="flex-1">
            <InputForm
              inputLabel="Middle Name (Optional)"
              inputClassNameAdd={"mb-1"}
              inputType="text"
              inputName="middle_name"
              labelClassNameAdd={"mb-0"}
              defaultValue={
                rememberedProfileInfo?.remembered_profile?.middle_name
              }
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mb-3">
          <div className="flex-1">
            <InputForm
              inputLabel="Last Name"
              inputClassNameAdd={"mb-1"}
              inputType="text"
              inputName="last_name"
              labelClassNameAdd={"mb-0"}
              required={true}
              defaultValue={
                rememberedProfileInfo?.remembered_profile?.last_name
              }
            />
          </div>

          <div className="flex-1">
            <label>
              <span className="w-full inline-block text-start font-medium">
                Relationship
              </span>
              <select
                className=" form-input"
                placeholder="-- Select --"
                name="user_relationship"
                required={true}
                defaultValue={
                  rememberedProfileInfo?.remembered_profile?.user_relationship
                }
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
            <h3 className="w-full inline-block text-start font-semibold">
              Gender
            </h3>

            <div className="flex mt-[.36rem] gap-5 border-b-2 pb-1 rounded-md border-primary-color">
              <label>
                Male
                <input
                  className="ms-2"
                  type="radio"
                  value="male"
                  required={true}
                  name="gender"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
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
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
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
                className=" form-input"
                placeholder="-- Select --"
                name="designation"
                required={true}
                defaultValue={
                  rememberedProfileInfo?.remembered_profile?.designation
                }
              >
                <option value="">-- Select --</option>
                <option value="not_to_say">Prefer not to say</option>
                <option value="covid19_victim">COVID-19 victim</option>
                <option value="substance_victim">Substance abuse victim</option>
                <option value="cancer_victim">Cancer victim</option>
                <option value="accident_victim">Victim of an accident</option>
                <option value="crime_victim">Crime victim</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex flex-col md:flex-row gap-4">
            <h4 className="font-semibold">Born:</h4>

            <select
              className="border border-tertiary-color rounded pe-4"
              value={bornYear}
              onChange={(e) => setBornYear(parseInt(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              className="border border-tertiary-color rounded pe-4"
              value={bornMonth}
              onChange={(e) => setBornMonth(e.target.value)}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>

            <select
              className="border border-tertiary-color rounded pe-4"
              value={bornDay}
              onChange={(e) => setBornDay(parseInt(e.target.value))}
            >
              {bornDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <h4 className="font-semibold">Passed Away:</h4>

            <select
              className="border border-tertiary-color rounded pe-4"
              value={passedYear}
              onChange={(e) => setPassedYear(parseInt(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              className="border border-tertiary-color rounded pe-4"
              value={passedMonth}
              onChange={(e) => setPassedMonth(e.target.value)}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>

            <select
              className="border border-tertiary-color rounded pe-4"
              value={passedDay}
              onChange={(e) => setPassedDay(parseInt(e.target.value))}
            >
              {passedDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>

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
              required
              placeholder="Example: John Doe"
            />
          </label>
          <p className="text-[13px] text-red-500 font-semibold rounded-sm">
            * Take your time on the name as you can't change it later!
          </p>
          <p className="bg-primary-color text-white mt-2 rounded px-2 py-2">
            <span className="block font-semibold text-sm">This is how people will find you:</span>
            <span className="text-center block">
              Link: <span className="text-primary-color-light underline">{"  https://www.remembered.com/albert-einstein"}</span>
            </span>
          </p>
        </div> */}
      </div>

      <ButtonForm
        setOpenModal={setEditRememberedProfile}
        isPending={isPending}
        buttonClassName={"mt-0"}
        statusOff={"Save changes"}
        statusOn={"Saving..."}
      />
    </>
  );
};

export default FormEditProfile;

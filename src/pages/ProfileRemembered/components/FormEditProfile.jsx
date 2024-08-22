import getDaysInMonth from "../../../helpers/getDaysInMonth";
import { InputForm } from "../../../components/InputForm";
import ButtonForm from "../../../components/ButtonForm";
import { useEffect, useState } from "react";

const FormEditProfile = ({
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
              defaultValue={
                rememberedProfileInfo?.remembered_profile?.first_name
              }
            />
          </div>

          <div className="flex-1">
            <InputForm
              inputLabel="Middle Name"
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

        <div className="flex flex-col sm:flex-row gap-6 mt-5">
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
              <span className="w-full inline-block text-start">
                Relationship
              </span>
              <select
                className="form-input-focus form-input-normal"
                placeholder="-- Select --"
                name="user_relationship"
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

        <div className="my-5">
          <div className="flex flex-col md:flex-row gap-4">
            <h4>Born:</h4>

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
            <h4>Passed Away:</h4>

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

        <div className="mb-6 block">
          <h3 className="w-full inline-block text-start">Gender</h3>

          <div className="flex gap-5">
            <label>
              Male
              <input
                className="ms-2"
                type="radio"
                value="male"
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
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
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
              defaultValue={
                rememberedProfileInfo?.remembered_profile?.designation
              }
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

      <ButtonForm
        isPending={isPending}
        statusOff={"Save changes"}
        statusOn={"Saving..."}
      />
    </>
  );
};

export default FormEditProfile;

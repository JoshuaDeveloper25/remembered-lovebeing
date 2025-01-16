import getDaysInMonth from "../../../helpers/getDaysInMonth";
import ButtonForm from "../../../components/ButtonForm";
import { useState, useEffect } from "react";

const FormLifeTime = ({
  t,
  setOpenLifeTimeModal,
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
  isPending,
  currentYear,
  months,
}) => {
  const [bornDays, setBornDays] = useState([]);
  const [passedDays, setPassedDays] = useState([]);
  const years = [];

  // Get years from 1800 to now
  for (let year = 1800; year <= currentYear; year++) {
    years.push(year);
  }

  useEffect(() => {
    const daysInBornMonth = getDaysInMonth(bornMonth, bornYear);
    const newBornDays = [];
    for (let day = 1; day <= daysInBornMonth; day++) {
      newBornDays.push(day);
    }
    setBornDays(newBornDays);
  }, [bornMonth, bornYear]);

  useEffect(() => {
    const daysInPassedMonth = getDaysInMonth(passedMonth, passedYear);
    const newPassedDays = [];

    for (let day = 1; day <= daysInPassedMonth; day++) {
      newPassedDays.push(day);
    }

    setPassedDays(newPassedDays);
  }, [passedMonth, passedYear]);

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <h4>{t("Born")}:</h4>

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
                {t(month)}
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

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <h4>{t("Passed Away")}:</h4>

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
                {t(month)}
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

      <ButtonForm
        setOpenModal={setOpenLifeTimeModal}
        isPending={isPending}
        statusOff={t("Add")}
        statusOn={t("Adding...")}
      />
    </>
  );
};

export default FormLifeTime;

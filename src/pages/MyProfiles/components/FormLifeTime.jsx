import { useState, useEffect } from "react";
import ButtonForm from "../../../components/ButtonForm";

const FormLifeTime = ({
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
  const years = [];
  for (let year = 1900; year <= currentYear; year++) {
    years.push(year);
  }

  const [bornDays, setBornDays] = useState([]);
  const [passedDays, setPassedDays] = useState([]);

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const getDaysInMonth = (month, year) => {
    switch (month) {
      case "January":
      case "March":
      case "May":
      case "July":
      case "August":
      case "October":
      case "December":
        return 31;
      case "April":
      case "June":
      case "September":
      case "November":
        return 30;
      case "February":
        return isLeapYear(year) ? 29 : 28;
      default:
        return 30;
    }
  };

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

      <div className="flex flex-col md:flex-row gap-4 mt-4">
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

      <ButtonForm
        isPending={isPending}
        statusOff={"Add"}
        statusOn={"Adding..."}
      />
    </>
  );
};

export default FormLifeTime;

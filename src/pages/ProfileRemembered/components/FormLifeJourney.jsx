import ErrorValidation from "../../../components/ErrorValidation";
import getDaysInMonth from "../../../helpers/getDaysInMonth";
import getNameOfMonth from "../../../helpers/getNameOfMonth";
import ButtonForm from "../../../components/ButtonForm";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";

const FormLifeJourney = ({
  setOpenLifeJourneyModal,
  errorCountryDeath,
  errorCountryBorn,
  errorDeathValidation,
  errorBornValidation,
  rememberedProfileInfo,
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
  const { t } = useTranslation();
  const birthDate = rememberedProfileInfo?.birth_date;
  const deathDate = rememberedProfileInfo?.death_date;

  const [birthCountry, setBirthCountry] = useState(
    rememberedProfileInfo?.birth_country
  );

  const [deathCountry, setDeathCountry] = useState(
    rememberedProfileInfo?.death_country
  );

  // Get all information about countries from public API
  const countriesApiQuery = useQuery({
    queryKey: ["countries"],
    queryFn: async () => await axios.get(`https://restcountries.com/v3.1/all`),
  });

  useEffect(() => {
    if (birthDate) {
      const [year, month, day] = birthDate.split("-");
      setBornYear(parseInt(year));
      setBornMonth(getNameOfMonth(parseInt(month)));
      setBornDay(parseInt(day));
    }
  }, [birthDate, setBornYear, setBornMonth, setBornDay]);

  useEffect(() => {
    if (deathDate) {
      const [year, month, day] = deathDate.split("-");
      setPassedYear(parseInt(year));
      setPassedMonth(getNameOfMonth(parseInt(month)));
      setPassedDay(parseInt(day));
    }
  }, [deathDate, setBornYear, setPassedMonth, setPassedDay]);

  // Get years from 1800 to now
  const years = [];

  for (let year = 1800; year <= currentYear; year++) {
    years.push(year);
  }

  const [bornDays, setBornDays] = useState([]);
  const [passedDays, setPassedDays] = useState([]);

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
      <main className="p-5">
        {/* Born */}
        <article className="border-b border-tertiary-color pb-8 mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <h4 className="font-semibold">{t("Born")}:</h4>

            <select
              className="border border-muted-color/20 rounded pe-4 py-1.5 "
              value={bornYear}
              onChange={(e) => setBornYear(parseInt(e.target.value))}
              name="born_year"
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              className="border border-muted-color/20 rounded pe-4 py-1.5 "
              value={bornMonth}
              name="born_month"
              onChange={(e) => setBornMonth(e.target.value)}
            >
              <option value="">Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {t(month)}
                </option>
              ))}
            </select>

            <select
              className="border border-muted-color/20 rounded pe-4 py-1.5 "
              value={bornDay}
              name="born_day"
              onChange={(e) => setBornDay(parseInt(e.target.value))}
            >
              <option value="">Day</option>
              {bornDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {errorBornValidation && (
            <ErrorValidation>{errorBornValidation}</ErrorValidation>
          )}

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 my-3">
            <label>
              <span className="font-semibold">{t("City or town")}:</span>
              <input
                className="outline-none border border-muted-color/20 rounded px-2 py-1.5 block w-full"
                name="born_city_or_town"
                defaultValue={rememberedProfileInfo?.birth_city}
              />
            </label>

            <label>
              <span className="font-semibold">{t("State or area")}:</span>
              <input
                className="outline-none border border-muted-color/20 rounded px-2 py-1.5 block w-full"
                name="born_state_or_area"
                defaultValue={rememberedProfileInfo?.birth_state}
              />
            </label>

            <label>
              <span className="font-semibold">{t("Country")}:</span>
              <select
                className="border border-muted-color/20 rounded pe-4 py-1.5 w-full  "
                name="born_country"
                value={birthCountry}
                onChange={(e) => setBirthCountry(e?.target?.value)}
              >
                <option className="" value={""}>
                  {t("-- Select --")}
                </option>

                {countriesApiQuery?.data?.data?.map((countryName, index) => {
                  return (
                    <option key={index} value={countryName?.name?.common}>
                      {countryName?.name?.common}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>

          {errorCountryBorn ? (
            <ErrorValidation>{errorCountryBorn}</ErrorValidation>
          ) : null}
        </article>

        {/* Passed Away */}
        <article className="border-b border-tertiary-color pb-8 mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <h4 className="font-semibold">{t("Passed Away")}:</h4>

            <select
              className="border border-muted-color/20 rounded pe-4 py-1.5 "
              value={passedYear}
              name="death_year"
              onChange={(e) => setPassedYear(parseInt(e.target.value))}
            >
              <option value="">Year</option>

              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              className="border border-muted-color/20 rounded pe-4 py-1.5 "
              value={passedMonth}
              name="death_month"
              onChange={(e) => setPassedMonth(e.target.value)}
            >
              <option value="">Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {t(month)}
                </option>
              ))}
            </select>

            <select
              className="border border-muted-color/20 rounded pe-4 py-1.5 "
              value={passedDay}
              name="death_day"
              onChange={(e) => setPassedDay(parseInt(e.target.value))}
            >
              <option value="">Day</option>
              {passedDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {errorDeathValidation && (
            <ErrorValidation>{errorDeathValidation}</ErrorValidation>
          )}

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 my-3">
            <label>
              <span className="font-semibold">{t("City or town")}:</span>
              <input
                className="outline-none border border-muted-color/20 rounded px-2 py-1.5 block w-full"
                defaultValue={rememberedProfileInfo?.death_city}
                name="passed_away_city_or_town"
              />
            </label>

            <label>
              <span className="font-semibold">{t("State or area")}:</span>
              <input
                className="outline-none border border-muted-color/20 rounded px-2 py-1.5 block w-full"
                defaultValue={rememberedProfileInfo?.death_state}
                name="passed_away_state_or_area"
              />
            </label>

            <label>
              <span className="font-semibold">{t("Country")}:</span>
              <select
                className="border border-muted-color/20 rounded pe-4 py-1.5 w-full "
                value={deathCountry}
                onChange={(e) => setDeathCountry(e?.target?.value)}
                name="passed_away_country"
              >
                <option className="" value={""}>
                  {t("-- Select --")}
                </option>

                {countriesApiQuery?.data?.data?.map((countryName, index) => {
                  return (
                    <option key={index} value={countryName?.name?.common}>
                      {countryName?.name?.common}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>

          {errorCountryDeath ? (
            <ErrorValidation>{errorCountryDeath}</ErrorValidation>
          ) : null}
        </article>

        {/* Parent Names */}
        <article>
          <h4 className="font-semibold text-lg">{t("Parent Names")}</h4>

          <div className="flex flex-col md:flex-row gap-4">
            <label>
              <span className="font-semibold">{t("Mother")}:</span>
              <input
                className="outline-none border border-muted-color/20 rounded px-2 py-1.5 block w-full"
                name="mom_name"
                defaultValue={rememberedProfileInfo?.mom_name}
              />
            </label>

            <label>
              <span className="font-semibold">{t("Father")}:</span>
              <input
                className="outline-none border border-muted-color/20 rounded px-2 py-1.5 block w-full"
                name="dad_name"
                defaultValue={rememberedProfileInfo?.dad_name}
              />
            </label>
          </div>
        </article>
      </main>

      {/* Submit changes */}
      <div className="sticky bottom-0 z-50 bg-gray-200 rounded-b-sm">
        <ButtonForm
          setOpenModal={setOpenLifeJourneyModal}
          isPending={isPending}
          statusOff={t("Save changes")}
          statusOn={t("Saving...")}
        />
      </div>
    </>
  );
};

export default FormLifeJourney;

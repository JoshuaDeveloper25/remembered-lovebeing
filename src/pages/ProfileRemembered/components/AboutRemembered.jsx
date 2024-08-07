import { useMutation, useQueryClient } from "@tanstack/react-query";
import formatDateJourney from "../../../helpers/formatDateJourney";
import FormLifeJourney from "./FormLifeJourney";
import { TfiPencilAlt } from "react-icons/tfi";
import Modal from "../../../components/Modal";
import { useParams } from "react-router-dom";
import FormKnownFor from "./FormKnownFor";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const AboutRemembered = ({ rememberedProfile }) => {
  const rememberedProfileInfo = rememberedProfile?.remembered_profile;
  const [openAddKnownModal, setOpenAddKnownModal] = useState(false);
  const [openLifeJourneyModal, setOpenLifeJourneyModal] = useState();
  const currentYear = new Date().getFullYear();
  const [bornYear, setBornYear] = useState(currentYear);
  const [bornMonth, setBornMonth] = useState("January");
  const [bornDay, setBornDay] = useState(1);
  const [passedYear, setPassedYear] = useState(currentYear);
  const [passedMonth, setPassedMonth] = useState("January");
  const [passedDay, setPassedDay] = useState(1);
  const [errorBornValidation, setErrorBornValidation] = useState(false);
  const [errorDeathValidation, setErrorDeathValidation] = useState(false);
  const [errorCountryDeath, setErrorCountryDeath] = useState(false);
  const [errorCountryBorn, setErrorCountryBorn] = useState(false);
  const queryClient = useQueryClient();
  const params = useParams();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const editLifeJourneyMutation = useMutation({
    mutationFn: async (journeyInfo) =>
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/about/add-life-journey/${params?.id}`,
        journeyInfo
      ),
    onSuccess: (res) => {
      toast.success("Successfully journey life edited!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setOpenLifeJourneyModal(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const createKnownForMutation = useMutation({
    mutationFn: async (knownForInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/about/add-best-known-for/${
          params?.id
        }`,
        knownForInfo
      ),
    onSuccess: (res) => {
      toast.success("Successfully quality created!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      [
        e?.target?.born_year?.value,
        e?.target?.born_month?.value,
        e?.target?.born_day?.value,
      ].includes("")
    ) {
      return setErrorBornValidation(
        `Please, don't leave empty blanks on the born inputs!`
      );
    } else if (
      [
        e?.target?.death_year?.value,
        e?.target?.death_month?.value,
        e?.target?.death_day?.value,
      ].includes("")
    ) {
      return setErrorDeathValidation(
        `Please, don't leave empty blanks on the death inputs!`
      );
    } else if (
      (e?.target?.born_city_or_town?.value ||
        e?.target?.born_state_or_area?.value) &&
      e?.target?.born_country?.value === ""
    ) {
      return setErrorCountryBorn("Country is required!");
    } else if (
      (e?.target?.passed_away_city_or_town?.value ||
        e?.target?.passed_away_state_or_area?.value) &&
      e?.target?.passed_away_country?.value === ""
    ) {
      return setErrorCountryDeath("Country is required!");
    }

    setErrorCountryDeath(false);
    setErrorCountryBorn(false);
    setErrorDeathValidation(false);
    setErrorBornValidation(false);

    const birthDate = `${bornYear}-${String(
      months.indexOf(bornMonth) + 1
    ).padStart(2, "0")}-${String(bornDay).padStart(2, "0")}`;

    const deathDate = `${passedYear}-${String(
      months.indexOf(passedMonth) + 1
    ).padStart(2, "0")}-${String(passedDay).padStart(2, "0")}`;

    const lifeJourneyInfo = {
      birth_date: birthDate,
      death_date: deathDate,
      birth_city: e?.target?.born_city_or_town?.value,
      birth_state: e?.target?.born_state_or_area?.value,
      birth_country: e?.target?.born_country?.value,
      death_city: e?.target?.passed_away_city_or_town?.value,
      death_state: e?.target?.passed_away_state_or_area?.value,
      death_country: e?.target?.passed_away_country?.value,
      mom_name: e?.target?.mom_name?.value,
      dad_name: e?.target?.dad_name?.value,
    };

    editLifeJourneyMutation?.mutate(lifeJourneyInfo);
  };

  const handleSubmitAddKownFor = (e) => {
    e.preventDefault();

    const knownForInfo = {
      description: e?.target?.quality?.value,
    };

    createKnownForMutation?.mutate(knownForInfo);
    e?.target?.reset();
  };

  return (
    <section className="bg-white rounded-md p-8">
      <div className="text-center mt-4 mb-8">
        <h2>
          <span className="font-bold text-5xl">Who Was</span>{" "}
          <span className="font-medium  block">my dad Albert Einstein?</span>
        </h2>
        <h3 className="font-bold">Let me tell you!</h3>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Life Journey */}
        <article className="flex-1">
          <fieldset className="relative border-2 border-black p-3 rounded-md bg-white">
            <legend className="text-xl font-bold ps-1 pe-2">
              Life Journey:
            </legend>

            <div className="absolute right-5 bottom-5">
              <TfiPencilAlt
                onClick={() => setOpenLifeJourneyModal(!openLifeJourneyModal)}
                className="text-secondary-color cursor-pointer hover:scale-105 animation-fade"
                size={28}
              />
            </div>

            <div className="mb-3">
              <h3 className="font-bold">Where and when born:</h3>
              <p>
                {rememberedProfileInfo?.first_name}{" "}
                {rememberedProfileInfo?.last_name} was born in{" "}
                {rememberedProfileInfo?.birth_city},{" "}
                {rememberedProfileInfo?.birth_state},{" "}
                {rememberedProfileInfo?.birth_country} on{" "}
                {formatDateJourney(rememberedProfileInfo?.birth_date)}.
              </p>
            </div>

            <div className="mb-3">
              <h3 className="font-bold">Where and when passed away:</h3>
              <p>
                {rememberedProfileInfo?.first_name}{" "}
                {rememberedProfileInfo?.last_name} passed away in{" "}
                {rememberedProfileInfo?.death_city},{" "}
                {rememberedProfileInfo?.death_state},{" "}
                {rememberedProfileInfo?.death_country} on{" "}
                {formatDateJourney(rememberedProfileInfo?.death_date)}.
              </p>
            </div>

            {!rememberedProfileInfo?.dad_name &&
            !rememberedProfileInfo?.mom_name ? null : (
              <div>
                <h3 className="font-bold">Parent names:</h3>

                {rememberedProfileInfo?.dad_name ? (
                  <>
                    <p>
                      <span className="font-bold">Dad:</span>{" "}
                      {rememberedProfileInfo?.dad_name}
                    </p>
                  </>
                ) : null}

                {rememberedProfileInfo?.mom_name ? (
                  <p>
                    <span className="font-bold">Mom:</span>{" "}
                    {rememberedProfileInfo?.mom_name}
                  </p>
                ) : null}
              </div>
            )}

            <Modal
              titleModal={"Life journey of your lovebeing..."}
              handleSubmit={handleSubmit}
              setOpenModal={setOpenLifeJourneyModal}
              openModal={openLifeJourneyModal}
              modalForm={true}
              editableWidth={"max-w-2xl"}
            >
              <FormLifeJourney
                rememberedProfileInfo={rememberedProfileInfo}
                errorBornValidation={errorBornValidation}
                errorDeathValidation={errorDeathValidation}
                errorCountryBorn={errorCountryBorn}
                errorCountryDeath={errorCountryDeath}
                currentYear={currentYear}
                bornYear={bornYear}
                setBornYear={setBornYear}
                bornMonth={bornMonth}
                setBornMonth={setBornMonth}
                bornDay={bornDay}
                setBornDay={setBornDay}
                passedYear={passedYear}
                setPassedYear={setPassedYear}
                passedMonth={passedMonth}
                setPassedMonth={setPassedMonth}
                passedDay={passedDay}
                setPassedDay={setPassedDay}
                isPending={editLifeJourneyMutation?.isPending}
                months={months}
              />
            </Modal>
          </fieldset>
        </article>

        {/* Best Known for... */}
        <article className="flex-1">
          <div className="border-2 border-black rounded-full h-72 w-72 mx-auto">
            <div className="flex flex-col justify-center  h-full mx-12">
              <h3 className="font-bold text-xl">Best Known for...</h3>

              <button
                className="border border-secondary-color rounded-md font-semibold py-1 mt-3"
                onClick={() => setOpenAddKnownModal(!openAddKnownModal)}
                type="button"
              >
                Add
              </button>

              <Modal
                titleModal={"Add the qualities of your lovebeing..."}
                handleSubmit={handleSubmitAddKownFor}
                setOpenModal={setOpenAddKnownModal}
                openModal={openAddKnownModal}
                editableWidth={"max-w-2xl"}
                modalForm={true}
              >
                <FormKnownFor
                  isPending={createKnownForMutation?.isPending}
                  bestKnownFor={
                    rememberedProfile?.remembered_profile?.best_known_for
                  }
                />
              </Modal>

              <ul className="list-disc mt-3">
                {rememberedProfile?.remembered_profile?.best_known_for?.map(
                  (knownFor) => (
                    <li key={knownFor?.id}>{knownFor?.description}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default AboutRemembered;

import AboutRememberedProfileModal from "./AboutRememberedProfileModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import formatDateJourney from "../../../helpers/formatDateJourney";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import ReactQuillAbout from "./ReactQuillAbout";
import FormLifeJourney from "./FormLifeJourney";
import { TfiPencilAlt } from "react-icons/tfi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const AboutRemembered = ({ owner, rememberedProfile, idRemembered }) => {
  const rememberedProfileInfo = rememberedProfile?.remembered_profile;
  const [openLifeJourneyModal, setOpenLifeJourneyModal] = useState(false);
  const currentYear = new Date().getFullYear();
  const [bornYear, setBornYear] = useState(1900 || currentYear);
  const [bornMonth, setBornMonth] = useState("January");
  const [bornDay, setBornDay] = useState(1);
  const [passedYear, setPassedYear] = useState(1900 || currentYear);
  const [passedMonth, setPassedMonth] = useState("January");
  const [passedDay, setPassedDay] = useState(1);
  const [errorBornValidation, setErrorBornValidation] = useState(false);
  const [errorDeathValidation, setErrorDeathValidation] = useState(false);
  const [errorCountryDeath, setErrorCountryDeath] = useState(false);
  const [errorCountryBorn, setErrorCountryBorn] = useState(false);
  const [errorLength, setErrorLength] = useState(false);
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
        `${
          import.meta.env.VITE_BASE_URL
        }/about/add-life-journey/${idRemembered}`,
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

  // This is for edit life journey of the remembered
  const handleSubmitEditLifeJourney = (e) => {
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

  // This is for add a quality or best known for the rembered
  const handleSubmitAddKnownFor = (e) => {
    e.preventDefault();

    const knownForInfo = {
      description: e?.target?.quality?.value,
    };

    if (knownForInfo?.description?.length > 14) {
      return setErrorLength("The length should be equal or less then 14!");
    }

    setErrorLength(false);

    createKnownForMutation?.mutate(knownForInfo);
    e?.target?.reset();
  };

  return (
    <section className="bg-white shadow-2xl rounded-md media-spacing px-8 py-1">
      <div className="text-center mt-2 mb-5">
        <h2>
          <span className="font-bold text-5xl">Who Was</span>{" "}
          <span className="font-medium block">
            {rememberedProfileInfo?.user_relationship === "none" ||
            rememberedProfileInfo?.user_relationship === null
              ? null
              : `my ${rememberedProfileInfo?.user_relationship}`}{" "}
            {rememberedProfileInfo?.first_name}{" "}
            {rememberedProfileInfo?.last_name}?
          </span>
        </h2>
        <h3 className="font-bold">Let me tell you!</h3>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Life Journey */}
        <article className="flex-[55%]">
          <fieldset className="relative border-2 border-black pt-2 pb-8 px-3 rounded-md bg-white">
            <legend className="text-xl font-bold ps-1 pe-2">
              Life Journey:
            </legend>

            {owner && (
              // <div className="absolute right-5 bottom-3">
              //   <TfiPencilAlt
              //     onClick={() => setOpenLifeJourneyModal(!openLifeJourneyModal)}
              //     className="text-secondary-color cursor-pointer hover:scale-105 animation-fade"
              //     size={28}
              //   />
              // </div>

              <div className="absolute min-[870px]:left-auto left-2.5 min-[870px]:right-2.5 right-0 bottom-1">
                <button
                  className="px-3.5 py-1 transparent bg-primary-color text-white text-base rounded-md mt-3 hover:bg-primary-color hover:text-white animation-fade"
                  onClick={() => setOpenLifeJourneyModal(!openLifeJourneyModal)}
                >
                  <TfiPencilAlt className="inline align-sub size-5" /> Edit
                  Profile
                </button>
              </div>
            )}

            <div className="mb-2">
              <h3 className="font-bold">Where and when born:</h3>
              <p>
                {!rememberedProfileInfo?.birth_date ? (
                  `${rememberedProfileInfo?.first_name} ${rememberedProfileInfo?.last_name} hasn't input a born date yet...`
                ) : (
                  <>
                    {rememberedProfileInfo?.first_name}{" "}
                    {rememberedProfileInfo?.last_name} was born{" "}
                    {rememberedProfileInfo?.birth_country && "in"}{" "}
                    {rememberedProfileInfo?.birth_city &&
                      `${rememberedProfileInfo?.birth_city}, `}
                    {rememberedProfileInfo?.birth_state &&
                      `${rememberedProfileInfo?.birth_state}, `}
                    {rememberedProfileInfo?.birth_country} on{" "}
                    {formatDateJourney(rememberedProfileInfo?.birth_date)}.
                  </>
                )}
              </p>
            </div>

            <div className="mb-3">
              <h3 className="font-bold">Where and when passed away:</h3>
              <p>
                {!rememberedProfileInfo?.death_date ? (
                  `${rememberedProfileInfo?.first_name} ${rememberedProfileInfo?.last_name} hasn't input a death date yet...`
                ) : (
                  <>
                    {rememberedProfileInfo?.first_name}{" "}
                    {rememberedProfileInfo?.last_name} passed away{" "}
                    {rememberedProfileInfo?.death_country && "in"}{" "}
                    {rememberedProfileInfo?.death_city &&
                      `${rememberedProfileInfo?.death_city}, `}
                    {rememberedProfileInfo?.death_state &&
                      `${rememberedProfileInfo?.death_state}, `}
                    {rememberedProfileInfo?.death_country} on{" "}
                    {formatDateJourney(rememberedProfileInfo?.death_date)}.
                  </>
                )}
              </p>
            </div>

            {/* {!rememberedProfileInfo?.dad_name &&
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
            )} */}

            <AboutRememberedProfileModal
              titleModal={"Edit life journey profile"}
              handleSubmit={handleSubmitEditLifeJourney}
              setOpenModal={setOpenLifeJourneyModal}
              openModal={openLifeJourneyModal}
              modalForm={true}
              crudModalClassName={"sm:px-4 px-0 "}
          
              modalContentClassNames={"relative"}
            >
              <FormLifeJourney
                setOpenLifeJourneyModal={setOpenLifeJourneyModal}
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
            </AboutRememberedProfileModal>
          </fieldset>
        </article>

        {/* Best Known for... */}
        {/* {(owner && !rememberedProfileInfo?.best_known_for?.length) ||
        rememberedProfileInfo?.best_known_for?.length ? (
          <article className="flex-1">
            <div className="flex justify-center mt-3">
              <div className="border-2 border-black inline-block mb-3 px-5 rounded-sm">
                <h3 className="font-bold text-xl text-center inline-block">
                  Best Known for...
                </h3>
              </div>
            </div>

            <div className="border-2 border-black rounded-full h-[15.2rem] w-[15.2rem] mx-auto">
              <div className="flex flex-col justify-center relative h-full ms-[3.8rem]">
                <ModalQualities
                  titleModal={"Add the qualities of your lovebeing..."}
                  setOpenModal={setOpenAddKnownModal}
                  openModal={openAddKnownModal}
                  editableWidth={"max-w-2xl"}
                >
                  <FormKnownFor
                    errorLength={errorLength}
                    isPending={createKnownForMutation?.isPending}
                    bestKnownFor={
                      rememberedProfile?.remembered_profile?.best_known_for
                    }
                    handleSubmitAddKnownFor={handleSubmitAddKnownFor}
                  />
                </ModalQualities>

                <ul className="list-disc mb-4">
                  <h2 className="font-bold text-xl">Being:</h2>
                  {rememberedProfile?.remembered_profile?.best_known_for?.map(
                    (knownFor) => (
                      <div key={knownFor?.id} className="ms-5">
                        <li>
                          <span className="font-[400] font-sans">
                            {knownFor?.description}
                          </span>
                        </li>
                      </div>
                    )
                  )}
                </ul>

                {owner && (
                  <button
                    onClick={() => setOpenAddKnownModal(!openAddKnownModal)}
                    type="button"
                    className="absolute bottom-1 right-[6.5rem] cursor-pointer hover:scale-105 animation-fade"
                  >
                    <TfiPencilAlt className="size-6 mx-auto text-secondary-color my-1" />
                  </button>
                )}
              </div>
            </div>
          </article>
        ) : null} */}
      </div>

      {/* My lovebeing quotes 
      <article className=" mx-0 mt-6">
        <fieldset className="relative border-2 border-black p-3 rounded-md bg-white">
          <legend className="text-xl font-bold ps-1 pe-2">
            {rememberedProfileInfo?.user_relationship === "none" ||
            rememberedProfileInfo?.user_relationship === null
              ? `${rememberedProfileInfo?.first_name} ${rememberedProfileInfo?.last_name}`
              : `My ${rememberedProfileInfo?.user_relationship}`}{" "}
            Quotes <BsChatLeftQuote className="inline-block size-6 rotate-12" />
          </legend>

          <ul className="relative list-disc marker:text-gray-700/50 px-5">
            <BsChatLeftQuote className="absolute mt-2 top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 size-20 text-gray-600/20 rotate-12" />

            <li>
              <div className="mb-3 pb-3 border-b border-tertiary-color/50">
                <h3 className="italic font-semibold">
                  "Two things are infinite: the universe and human stupidity;
                  and I'm not sure about the universe"
                </h3>
                {/* <p className="text-sm text-gray-700/95">
                  The vastness of human folly seems boundless, often surpassing
                  even the immense, possibly limitless, universe.
                </p> 
              </div>
            </li>
            {/* 
            <li>
              <div className="mb-3 pb-3 border-b border-tertiary-color/50">
                <h3 className="italic font-semibold">
                  "In the middle of difficulty lies opportunity"
                </h3>
                <p></p>
              </div>
            </li> 

            <li>
              <div className="mb-3">
                <h3 className="italic font-semibold">
                  "Imagination is more important than knowledge"
                </h3>
                <p className="text-sm text-gray-700/95">
                  <span className="font-bold">Meaning:</span> Imagination allows
                  us to think beyond the current limits of knowledge and
                  innovate, driving progress and evolution in society and
                  science.
                </p>
              </div>
            </li>
          </ul>
        </fieldset>
      </article>
      */}

      <ReactQuillAbout rememberedProfile={rememberedProfile} owner={owner} />
    </section>
  );
};

export default AboutRemembered;

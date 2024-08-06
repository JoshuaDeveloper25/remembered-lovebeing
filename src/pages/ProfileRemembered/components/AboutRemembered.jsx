import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TfiPencilAlt } from "react-icons/tfi";
import Modal from "../../../components/Modal";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import FormLifeJourney from "./FormLifeJourney";

const AboutRemembered = () => {
  const currentYear = new Date().getFullYear();
  const [openLifeJourneyModal, setOpenLifeJourneyModal] = useState();
  const [bornYear, setBornYear] = useState(currentYear);
  const [bornMonth, setBornMonth] = useState("January");
  const [bornDay, setBornDay] = useState(1);
  const [passedYear, setPassedYear] = useState(currentYear);
  const [passedMonth, setPassedMonth] = useState("January");
  const [passedDay, setPassedDay] = useState(1);
  const [selectCountry, setSelectCountry] = useState("");
  const queryClient = useQueryClient();

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

  const createLifeTimeMutation = useMutation({
    mutationFn: async (profileInfo) =>
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/remembereds/life-journey/${item?.id}`,
        profileInfo
      ),
    onSuccess: (res) => {
      toast.success("Successfully lifetime edited!");
      queryClient.invalidateQueries({ queryKey: ["ownProfiles"] });
      setOpenLifeJourneyModal(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const birthDate = `${bornYear}-${String(
      months.indexOf(bornMonth) + 1
    ).padStart(2, "0")}-${String(bornDay).padStart(2, "0")}`;

    const deathDate = `${passedYear}-${String(
      months.indexOf(passedMonth) + 1
    ).padStart(2, "0")}-${String(passedDay).padStart(2, "0")}`;

    const profileInfo = {
      birth_date: birthDate,
      death_date: deathDate,
    };

    if (profileInfo?.birth_date > profileInfo?.death_date) {
      return toast.error(`Birth can't be higher than death date!`);
    }

    createLifeTimeMutation?.mutate(profileInfo);
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
        <article className="flex-1">
          <fieldset className="border-2 border-black p-3 rounded-md bg-white">
            <legend className="text-xl font-bold ps-1 pe-2">
              Life Journey:
            </legend>

            <div className="mb-3">
              <h3 className="font-bold">Where and when born:</h3>
              <p>
                Albert Einstein was born in Germany, Ulm, Württemberg on March
                14th, 1879.
              </p>
            </div>

            <div className="mb-3">
              <h3 className="font-bold">Where and when passed away:</h3>
              <p>
                Albert Einstein passed away in Princeton, New Jersey, USA, on
                April 18th, 1955.
              </p>
            </div>

            <div>
              <h3 className="font-bold">Parent names:</h3>
              <p>
                <span className="font-bold">Dad:</span> Hermann Einstein
              </p>
              <p>
                <span className="font-bold">Mom:</span> Pauline Koch
              </p>
            </div>

            <TfiPencilAlt
              onClick={() => setOpenLifeJourneyModal(!openLifeJourneyModal)}
              className="mt-4 cursor-pointer"
              size={28}
            />

            <Modal
              titleModal={"Life journey of your lovebeing..."}
              handleSubmit={handleSubmit}
              setOpenModal={setOpenLifeJourneyModal}
              openModal={openLifeJourneyModal}
              modalForm={true}
              editableWidth={"max-w-2xl"}
            >
              <FormLifeJourney
                setSelectCountry={setSelectCountry}
                selectCountry={selectCountry}
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
                isPending={createLifeTimeMutation?.isPending}
                months={months}
              />
            </Modal>
          </fieldset>
        </article>

        <article className="flex-1">
          <div className="border-2 border-black rounded-full h-72 w-72 mx-auto">
            <div className="flex flex-col justify-center  h-full ms-16">
              <h3 className="font-bold text-xl">Famous for...</h3>
              <ul className="list-disc">
                <li>Being happy</li>
                <li>Being one of the most intelligent scientists</li>
                <li>Being humble</li>
                <li>Being generous</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default AboutRemembered;

import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { InputForm } from "../../components/InputForm";
import peaceDove from "../../assets/peace-dove.png";
import { IoLocationSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import cloud from "../../assets/cloud.png";
import Form from "../../components/Form";
import axios from "axios";

import contactImage from "../../assets/contact.png";
import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userCountry, setUserCountry] = useState("");
  const { t } = useTranslation();

  // Get all information about countries from public API
  const countriesApiQuery = useQuery({
    queryKey: ["countries"],
    queryFn: async () => await axios.get(`https://restcountries.com/v3.1/all`),
  });

  // Get user's country based on their IP
  const userCountryQuery = useQuery({
    queryKey: ["userCountry"],
    queryFn: async () => {
      const response = await axios.get(`https://ipapi.co/json/`);
      return response.data.country_name;
    },
  });

  // Set the user's country once the query is successful
  useEffect(() => {
    if (userCountryQuery.isSuccess) {
      setUserCountry(userCountryQuery.data);
    }
  }, [userCountryQuery.isSuccess, userCountryQuery.data]);

  return (
    <main className="relative">
      <div className="md:block hidden fixed top-18 right-8  -z-[1]">
        <img className="w-32 rotate-[90]" src={peaceDove} />
      </div>

      <div className="md:block hidden fixed top-18 left-8 -z-[1]">
        <img className="w-32 [transform:rotateY(180deg)]" src={peaceDove} />
      </div>

      <div className="fixed top-[20rem] left-1/2 transform translate-x-1/2 -translate-y-1/2 -z-[1]">
        <img className="w-[100rem] rotate-[20deg]" src={cloud} alt="cloud" />
      </div>

      <div className="fixed top-[20rem] right-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-[1]">
        <img className="w-[100rem] rotate-[-20deg]" src={cloud} alt="cloud" />
      </div>

      <section className="max-w-4xl mx-auto px-2 my-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="font-mono tracking-wider text-4xl text-primary-color uppercase font-semibold">
            {t("Contact Us")}
          </h2>
          <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
        </div>

        <div className="flex">
          <setion className="relative lg:block hidden max-w-[18rem] rounded-2xl shadow-xl">
            <img
              src={contactImage}
              className="rounded-s-2xl h-full w-full object-cover"
              alt="Contact Form Image"
            />

            <div className="bg-white py-3 px-4 rounded-md shadow-2xl absolute top-1/2 -left-12 transform -translate-y-1/2">
              <div>
                <div className="flex items-center gap-1.5">
                  <IoLocationSharp className="text-primary-color-light" />
                  <h3 className="font-semibold text-primary-color-light">
                    {t("Location")}
                  </h3>
                </div>

                <h4 className="text-primary-color font-medium text-sm">
                  Honduras, El Progreso, Yoro.
                </h4>
              </div>

              <div className="my-2.5">
                <div className="flex items-center gap-1.5">
                  <FaPhoneAlt className="text-primary-color-light" />
                  <h3 className="font-semibold text-primary-color-light">
                    Phone
                  </h3>
                </div>

                <h4 className="text-primary-color font-medium text-sm">
                  +504 8945 8498
                </h4>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <MdOutlineAccessTimeFilled className="text-primary-color-light" />
                  <h3 className="font-semibold text-primary-color-light">
                    {t("Hours")}
                  </h3>
                </div>

                <h4 className="text-primary-color font-medium text-sm">
                  {t("Live Support")} - 24/7
                </h4>
              </div>
            </div>
          </setion>

          <section className="sticky z-[9999] px-6 py-6 text-primary-color bg-white shadow-xl lg:mx-0 mx-auto rounded-e-2xl">
            <h2 className="font-sans text-2xl text-primary-color capitalize font-semibold mb-4">
              {t("Contact Form")}
            </h2>

            {/* Form of contact us */}
            <Form setIsLoading={setIsLoading}>
              <InputForm
                inputLabel={`${t("Name")} *`}
                inputLabelClassName={"block"}
                additionalInputClassnames={"border border-gray-200"}
                inputProps={{ type: "text", placeholder: "John Doe" }}
                inputName={"user_name"}
                required={true}
              />

              <InputForm
                inputLabel={`${t("Email")} *`}
                inputLabelClassName={"block"}
                additionalInputClassnames={"border border-gray-200"}
                inputProps={{ type: "email", placeholder: "johndoe@gmail.com" }}
                inputName={"email_id"}
                required={true}
              />

              {/* Country and Phone */}
              <div className="flex items-center gap-3">
                <label className={`flex-1 block relative`}>
                  <span className="w-full inline-block text-start font-medium">
                    {`${t("Country")} *`}
                  </span>

                  <select
                    className={`form-input focus:shadow-xl border border-gray-200 resize-none`}
                    name={"user_country"}
                    required={true}
                    value={userCountry}
                    onChange={(e) => setUserCountry(e.target.value)}
                  >
                    <option value="">-- {t("Country")} --</option>
                    {countriesApiQuery?.data?.data?.map((country, index) => (
                      <option key={index} value={country?.name?.common}>
                        {country?.name?.common}
                      </option>
                    ))}
                  </select>
                </label>

                <InputForm
                  inputLabel={t("Phone (Optional)")}
                  inputLabelClassName={"flex-1 block"}
                  additionalInputClassnames={"border border-gray-200"}
                  inputProps={{
                    type: "tel",
                    placeholder: t("Enter your phone number"),
                  }}
                  inputName={"user_phone"}
                  required={false}
                />
              </div>

              <label className={`block relative`}>
                <span className="w-full inline-block text-start font-medium">
                  {`${t("Message")} *`}
                </span>

                <textarea
                  className={`form-input focus:shadow-xl border border-gray-200 resize-none h-32`}
                  placeholder={t("Enter your message here...")}
                  name={"user_message"}
                  required={true}
                />
              </label>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-blue w-full text-lg rounded-full disabled:bg-primary-color/50 disabled:pointer-events-none"
                >
                  {isLoading ? t("Sending...") : t("Send")}
                </button>
              </div>
            </Form>

            <div className="lg:hidden block">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-5 items-center justify-between py-3 px-4 rounded-md shadow-lg">
                <div>
                  <div className="flex items-center gap-1.5">
                    <IoLocationSharp className="text-primary-color-light" />
                    <h3 className="font-semibold text-primary-color-light">
                      {t("Location")}
                    </h3>
                  </div>

                  <h4 className="text-primary-color font-medium text-sm">
                    Honduras, El Progreso, Yoro.
                  </h4>
                </div>

                <div className="my-2.5">
                  <div className="flex items-center gap-1.5">
                    <FaPhoneAlt className="text-primary-color-light" />
                    <h3 className="font-semibold text-primary-color-light">
                      {t("Phone")}
                    </h3>
                  </div>

                  <h4 className="text-primary-color font-medium text-sm">
                    +504 8945 8498
                  </h4>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <MdOutlineAccessTimeFilled className="text-primary-color-light" />
                    <h3 className="font-semibold text-primary-color-light">
                      {t("Hours")}
                    </h3>
                  </div>

                  <h4 className="text-primary-color font-medium text-sm">
                    {t("Live Support")} - 24/7
                  </h4>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Contact;

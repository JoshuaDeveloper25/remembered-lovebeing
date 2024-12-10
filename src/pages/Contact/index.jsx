import { InputForm } from "../../components/InputForm";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import axios from "axios";
import Form from "../../components/Form";

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
    <section className="max-w-2xl mx-auto px-6 py-6 text-primary-color bg-white shadow-xl rounded-lg my-12">
      {/* Title */}
      <div className="text-center">
        <h2 className="font-mono tracking-wider text-4xl text-primary-color uppercase font-semibold">
          {t("Contact Us")}
        </h2>
        <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
      </div>

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

        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-blue w-fit disabled:bg-primary-color/50 disabled:pointer-events-none"
          >
            {isLoading ? t("Sending...") : t("Send")}
          </button>
        </div>
      </Form>
    </section>
  );
};

export default Contact;

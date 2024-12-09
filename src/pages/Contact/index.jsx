import { InputForm } from "../../components/InputForm";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from "axios";
import Form from "../../components/Form";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  // Get all information about countries from public API
  const countriesApiQuery = useQuery({
    queryKey: ["countries"],
    queryFn: async () => await axios.get(`https://restcountries.com/v3.1/all`),
  });

  return (
    <section className="max-w-2xl mx-auto px-4 py-10">
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
            >
              <option value="">-- {t("Country")} --</option>
              {countriesApiQuery?.data?.data?.map((countryName, index) => {
                return (
                  <option key={index} value={countryName?.name?.common}>
                    {countryName?.name?.common}
                  </option>
                );
              })}
            </select>
          </label>

          <InputForm
            inputLabel={t("Phone (Optional)")}
            inputLabelClassName={"flex-1 block"}
            additionalInputClassnames={"border border-gray-200"}
            inputProps={{ type: "tel", placeholder: "Enter your phone number" }}
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
          <button type="submit" className="btn btn-blue w-fit">
            {isLoading ? t("Sending...") : t("Send")}
          </button>
        </div>
      </Form>
    </section>
  );
};

export default Contact;

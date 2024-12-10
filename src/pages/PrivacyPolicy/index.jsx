import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <main className="max-w-3xl mx-auto px-6 py-6 text-primary-color bg-white shadow-xl rounded-lg my-12">
      <div className="mb-8">
        <h2 className="font-mono tracking-wider text-4xl uppercase font-semibold text-center">
          {t("Privacy Policy")}
        </h2>

        <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
      </div>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-primary-color-light">
          1. {t("Introduction")}
        </h2>
        <p className="mt-2 text-lg">
          {t(
            "At Eternal MemoriesX, we are committed to protecting your privacy and ensuring that your personal data is handled securely and responsibly. By using our platform, you agree to this Privacy Policy, which explains how we collect, use, protect, and share your information."
          )}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-primary-color-light">
          2. {t("Information We Collect")}
        </h2>
        <p className="mt-2 text-lg">
          {t(
            "When you use our application, we may collect the following categories of data"
          )}
          :
        </p>
        <ul className="list-disc pl-8 mt-2 text-lg">
          <li>
            {t(
              "Personal Information: Name, email, contact details, and payment information (in case of subscriptions)."
            )}
          </li>
          <li>
            {t(
              "Memorial Profile Information: Names, birth and death dates, images, and tributes."
            )}
          </li>
          <li>
            {t(
              "Browsing Data: IP address, browser type, device used, and app usage statistics."
            )}
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-primary-color-light">
          3. {t("How We Use Your Information")}
        </h2>
        <p className="mt-2 text-lg">
          {t("The information we collect is used to:")}
        </p>
        <ul className="list-disc pl-8 mt-2 text-lg">
          <li>{t("Provide and improve the services offered in our app.")}</li>
          <li>
            {t(
              "Manage your account, subscriptions, and features such as uploading images or tributes."
            )}
          </li>
          <li>
            {t("Ensure the security of the platform and prevent misuse.")}
          </li>
          <li>
            {t(
              "Send important notifications, such as service updates or reminders."
            )}
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-primary-color-light">
          4. {t("Data Sharing")}
        </h2>
        <p className="mt-2 text-lg">
          {t(
            "We do not share your personal data with third parties, except in the following situations:"
          )}
        </p>
        <ul className="list-disc pl-8 mt-2 text-lg">
          <li>
            {t(
              "External Service Providers: We use services such as PayPal or Stripe to securely process payments."
            )}
          </li>
          <li>
            {t(
              "Legal Requirements: If requested by any authority in accordance with the law."
            )}
          </li>
          <li>
            {t(
              "User Consent: When you explicitly authorize us to share your information."
            )}
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-primary-color-light">
          5. {t("Data Security")}
        </h2>
        <p className="mt-2 text-lg">
          {t(
            "We have implemented technical and organizational measures to protect your personal information against unauthorized access, loss, alteration, or disclosure. However, no security system is completely infallible. We recommend using strong passwords and keeping your information confidential."
          )}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-primary-color-light">
          6. {t("Data Retention")}
        </h2>
        <p className="mt-2 text-lg">
          {t(
            "We will retain your data while your account is active or as necessary to provide you with our services. If you wish to delete your information, you can request it by emailing us at [email]."
          )}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-primary-color-light">
          7. {t("User Rights")}
        </h2>
        <p className="mt-2 text-lg">
          {t("As a user of Eternal MemoriesX, you have the following rights:")}
        </p>
        <ul className="list-disc pl-8 mt-2 text-lg">
          <li>{t("Access: You can request a copy of your personal data.")}</li>
          <li>
            {t(
              "Correction: You have the right to correct inaccurate or incomplete information."
            )}
          </li>
          <li>
            {t("Deletion: You can ask us to delete your personal information.")}
          </li>
          <li>
            {t(
              "Restriction: You can request that we limit the use of your data in certain situations."
            )}
          </li>
        </ul>
        <p className="mt-2 text-lg">
          {t("To exercise these rights, contact us at [email].")}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-primary-color-light">
          8. {t("Memorial Profile Privacy")}
        </h2>
        <p className="mt-2 text-lg">
          {t(
            "The memorial profiles you create can be set as public or private:"
          )}
        </p>
        <ul className="list-disc pl-8 mt-2 text-lg">
          <li>
            {t(
              "Public profiles will be visible to anyone who accesses the app."
            )}
          </li>
          <li>
            {t(
              "Private profiles will be restricted and accessible only to those you authorize."
            )}
          </li>
        </ul>
        <p className="mt-2 text-lg">
          {t(
            "We recommend not including sensitive information in public profiles."
          )}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-primary-color-light">
          9. {t("Use of Cookies")}
        </h2>
        <p className="mt-2 text-lg">
          {t(
            "Our application uses cookies to enhance your user experience. Cookies are small files stored on your device that help us analyze app usage. You can disable cookies in your browser settings, although some features may be affected."
          )}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-primary-color-light">
          10. {t("Changes to this Policy")}
        </h2>
        <p className="mt-2 text-lg">
          {t(
            "We may update this Privacy Policy occasionally. We will notify you of any changes by posting them in our app and, if necessary, sending you a notice by email. The last update date will appear at the end of this document."
          )}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-primary-color-light">
          11. {t("Contact")}
        </h2>
        <p className="mt-2 text-lg">
          {t(
            "If you have any questions, concerns, or wish to exercise your privacy rights, you can contact us at:"
          )}
        </p>
        <ul className="list-disc pl-8 mt-2 text-lg">
          <li>{t("Email: [email]")}</li>
          <li>{t("Phone: [contact number, optional]")}</li>
        </ul>
        <p className="mt-2 text-lg">{t("Last updated:")} <span className="font-semibold">12/09/2024</span></p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-primary-color-light">
          12. {t("Additional Notes")}
        </h2>
        <p className="mt-2 text-lg">
          {t(
            "If you plan to expand internationally or include users outside of Honduras, you may add a specific section on international data transfers."
          )}
        </p>
        <p className="mt-2 text-lg">
          {t(
            "If you use a hosting provider (such as AWS or Azure), mention that data is stored on secure servers, possibly located outside of Honduras."
          )}
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicy;

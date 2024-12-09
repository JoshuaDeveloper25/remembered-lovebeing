import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary-color text-white">
      <div className="mx-auto w-full container-page sm:pb-4 pb-12 py-4 px-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <img className="w-72 rounded" src={logo} alt={"Logo"} />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-base font-semibold uppercase text-primary-color-light border-b inline-block border-b-primary-color-light">
                {t("Pages")}
              </h2>

              <ul className="space-y-3 font-medium">
                <li>
                  <NavLink
                    to="/memorials#top"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary-color-light/60 font-bold"
                        : "hover:text-primary-color-light animation-fade"
                    }
                  >
                    {t("Memorials")}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/posts#top"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary-color-light/60 font-bold"
                        : "hover:text-primary-color-light animation-fade"
                    }
                  >
                    {t("Posts")}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/news#top"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary-color-light/60 font-bold"
                        : "hover:text-primary-color-light animation-fade"
                    }
                  >
                    {t("News")}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/prices#top"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary-color-light/60 font-bold"
                        : "hover:text-primary-color-light animation-fade"
                    }
                  >
                    {t("Prices")}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/contact#top"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary-color-light/60 font-bold"
                        : "hover:text-primary-color-light animation-fade"
                    }
                  >
                    {t("Contact")}
                  </NavLink>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-base font-semibold  uppercase text-primary-color-light border-b inline-block border-b-primary-color-light">
                {t("Legal")}
              </h2>

              <ul className="space-y-3 font-medium">
                <li>
                  <Link
                    to="#"
                    className="hover:text-primary-color-light animation-fade"
                  >
                    {t("Terms & Conditions")}
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="hover:text-primary-color-light animation-fade"
                  >
                    {t("Privacy Policy")}
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="hover:text-primary-color-light animation-fade"
                  >
                    {t("Cookies Policy")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        <p className="text-sm dark:text-gray-400">
          © 2024 Eternal MemoriesX . {t("All Rights Reserved")}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

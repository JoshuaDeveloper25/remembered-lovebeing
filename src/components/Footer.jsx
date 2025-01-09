import { Accordion, AccordionItem } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary-color text-white">
      <div className="w-full max-w-[1200px] mx-auto sm:px-2 px-6 sm:pb-4 pb-12 py-4 lg:py-8">
        <div className="flex flex-col md:flex-row justify-between gap-2 sm:gap-6">
          <div className="mb-6 md:mb-0">
            <img className="w-72 rounded" src={logo} alt={"Logo"} />
          </div>

          {/* SM TO TOP */}
          <div className="sm:grid hidden grid-cols-3 gap-8">
            {/* Discover Us */}
            <div>
              <h2 className="mb-6 text-base font-semibold uppercase text-primary-color-light border-b inline-block border-b-primary-color-light">
                {t("Discover Us")}
              </h2>

              <ul className="space-y-3 font-medium">
                <li>
                  <NavLink
                    to="/about-us#top"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary-color-light/60 font-bold"
                        : "hover:text-primary-color-light animation-fade"
                    }
                  >
                    {t("About Us")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/updates#top"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary-color-light/60 font-bold"
                        : "hover:text-primary-color-light animation-fade"
                    }
                  >
                    {t("Updates")}
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

            {/* Pages */}
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
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="mb-6 text-base font-semibold  uppercase text-primary-color-light border-b inline-block border-b-primary-color-light">
                {t("Legal")}
              </h2>

              <ul className="space-y-3 font-medium">
                <li>
                  <NavLink
                    to="/terms-and-conditions#top"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary-color-light/60 font-bold"
                        : "hover:text-primary-color-light animation-fade"
                    }
                  >
                    {t("Terms & Conditions")}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/privacy-policy#top"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary-color-light/60 font-bold"
                        : "hover:text-primary-color-light animation-fade"
                    }
                  >
                    {t("Privacy Policy")}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* SM TO BOTTOM */}
          <div className="sm:hidden block">
            <Accordion
              classNames={{
                base: "bg-red-500 text-red-500",
                title: "text-white",
                content: "text-white",
              }}
            >
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title={`${t("Discover Us")}`}
                classNames={{
                  title: "text-primary-color-light font-bold",
                  content: "text-white text-sm",
                  indicator: "text-primary-color-light text-2xl",
                }}
              >
                {/* Discover Us */}
                <div>
                  <ul className="space-y-3 font-medium">
                    <li>
                      <NavLink
                        to="/about-us#top"
                        className={({ isActive }) =>
                          isActive
                            ? "text-primary-color-light/60 font-bold"
                            : "hover:text-primary-color-light animation-fade"
                        }
                      >
                        {t("About Us")}
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/updates#top"
                        className={({ isActive }) =>
                          isActive
                            ? "text-primary-color-light/60 font-bold"
                            : "hover:text-primary-color-light animation-fade"
                        }
                      >
                        {t("Updates")}
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
              </AccordionItem>

              <AccordionItem
                key="2"
                aria-label="Accordion 2"
                title={`${t("Pages")}`}
                classNames={{
                  title: "text-primary-color-light font-bold",
                  content: "text-white text-sm",
                  indicator: "text-primary-color-light text-2xl",
                }}
              >
                {/* Pages */}
                <div>
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
                  </ul>
                </div>
              </AccordionItem>

              <AccordionItem
                key="3"
                aria-label="Accordion 3"
                title={`${t("Legal")}`}
                classNames={{
                  title: "text-primary-color-light font-bold",
                  content: "text-white text-sm",
                  indicator: "text-primary-color-light text-2xl",
                }}
              >
                {/* Legal */}
                <div>
                  <ul className="space-y-3 font-medium">
                    <li>
                      <NavLink
                        to="/terms-and-conditions#top"
                        className={({ isActive }) =>
                          isActive
                            ? "text-primary-color-light/60 font-bold"
                            : "hover:text-primary-color-light animation-fade"
                        }
                      >
                        {t("Terms & Conditions")}
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/privacy-policy#top"
                        className={({ isActive }) =>
                          isActive
                            ? "text-primary-color-light/60 font-bold"
                            : "hover:text-primary-color-light animation-fade"
                        }
                      >
                        {t("Privacy Policy")}
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        <p className="text-sm dark:text-gray-400">
          © 2024 - 2025 Eternal MemoriesX . {t("All Rights Reserved")}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

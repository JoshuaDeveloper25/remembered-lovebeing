import NavbarDropdownLink from "./NavbarDropdownLink";
import spainFlag from "../assets/spain-flag.webp";
import { Link, NavLink } from "react-router-dom";
import usaFlag from "../assets/usa-flag.webp";
import { createPortal } from "react-dom";

const NavbarDesktop = ({
  setOpenDropDown,
  openDropDown,
  handleChange,
  handleLogOut,
  language,
  userInfo,
  t,
}) => {
  return (
    <nav className="sm:block hidden bg-white/50 py-2 px-2">
      <div className="container-page">
        <div className="flex justify-between items-center">
          <div>
            <Link to={"/"}>
              <h1 className="italic tracking-widest text-xl">Logo</h1>
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <NavLink
              className={({ isActive }) =>
                isActive ? `nav-active` : `nav-inactive`
              }
              to={"/memorials"}
            >
              {t("Memorials")}
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? `nav-active` : `nav-inactive`
              }
              to={"/posts"}
            >
              {t("Posts")}
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? `nav-active` : `nav-inactive`
              }
              to={"/news"}
            >
              {t("News")}
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? `nav-active` : `nav-inactive`
              }
              to={"/prices"}
            >
              {t("Prices")}
            </NavLink>

            {/* Language Switcher */}
            <div className="relative inline-block">
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white cursor-pointer">
                <img
                  src={language === "en" ? usaFlag : spainFlag}
                  alt={language}
                  className="w-6 h-6 object-contain mr-2"
                />
                <span>{language === "en" ? "English" : "Español"}</span>
                <select
                  value={language}
                  onChange={(e) => handleChange(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full bg-gray-100 font-sans p-3"
                >
                  <option value="en" className="font-medium tracking-widest">
                    English
                  </option>
                  <option value="es" className="font-medium tracking-widest">
                    Español
                  </option>
                </select>
              </div>
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <button
                id="dropdownDividerButton"
                data-dropdown-toggle="dropdownDivider"
                className="animation-fade text-xl hover:rounded-full hover:bg-white/20 p-2"
                onClick={() => setOpenDropDown(!openDropDown)}
                type="button"
              >
                <img
                  className="w-12 object-cover mx-auto rounded-full shadow-lg"
                  src={
                    userInfo?.profile_image
                      ? `${userInfo?.profile_image?.cloud_front_domain}/${userInfo?.profile_image?.aws_file_name}`
                      : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                  }
                />
              </button>

              {openDropDown && (
                <>
                  {createPortal(
                    <div
                      onClick={() => setOpenDropDown(!openDropDown)}
                      className="h-[100vh] fixed top-0 w-full"
                    ></div>,
                    document.body
                  )}

                  {userInfo?.access_token ? (
                    <ul className="absolute right-5 shadow-lg border bg-white pt-2 z-[1000] w-max rounded max-h-96 overflow-auto">
                      <div className="border-b pb-1.5 px-5">
                        <h2 className="block font-medium">{userInfo?.name}</h2>
                        <h2 className="block font-medium">{userInfo?.email}</h2>
                      </div>

                      <NavbarDropdownLink
                        hoverBgLink={"hover:bg-primary-color"}
                        linkText={t("My Profiles")}
                        onClick={() => setOpenDropDown(false)}
                        linkTo={"/my-profiles/"}
                      />

                      <NavbarDropdownLink
                        hoverBgLink={"hover:bg-primary-color"}
                        linkText={t("Settings")}
                        onClick={() => setOpenDropDown(false)}
                        linkTo={"#"}
                      />

                      <NavbarDropdownLink
                        hoverBgLink={"hover:bg-red-500"}
                        linkText={t("Log Out")}
                        onClick={handleLogOut}
                      />
                    </ul>
                  ) : (
                    <ul className="absolute right-5 shadow-lg bg-white py-2 z-[1000] w-max rounded max-h-96 overflow-auto">
                      <NavbarDropdownLink
                        hoverBgLink={"text-black hover:text-secondary-color"}
                        onClick={() => setOpenDropDown(false)}
                        linkText={t("Sign In")}
                        linkTo={"/sign-in"}
                      />
                    </ul>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDesktop;

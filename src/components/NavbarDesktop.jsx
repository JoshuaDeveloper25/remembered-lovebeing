import { availableLanguages, navbarLinks } from "../db/data";
import NavbarDropdownLink from "./NavbarDropdownLink";
import spainFlag from "../assets/spain-flag.webp";
import { Link, NavLink } from "react-router-dom";
import usaFlag from "../assets/usa-flag.webp";
// import logo from "../assets/logo.png";
// import logo from "../assets/logo-alt.png";
// import logo from "../assets/logo-done.png";
// import logo from "../assets/logo-better.png";
// import logo from "../assets/logo-alt-done.png";
// import logo from "../assets/logodd.png";
// import logo from "../assets/logoo.png";
import logo from "../assets/lgo.png";
// import logo from "../assets/logo-white.png";
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
    <nav className="sm:block hidden bg-primary-color text-white py-2 px-2">
      <div className="container-page">
        <div className="flex justify-between items-center">
          <div>
            <Link to={"/"}>
              <img
                className="w-72 rounded"
                src={logo}
                alt={"Logo"}
              />
            </Link>
          </div>

          <div className="flex items-center gap-5">
            {navbarLinks?.map((navLink, index) => {
              const { to, text } = navLink;

              return (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-active" : "nav-inactive"
                  }
                  key={index}
                  to={to}
                >
                  {t(text)}
                </NavLink>
              );
            })}

            {/* Language Switcher */}
            <div className="relative inline-block">
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white cursor-pointer">
                <img
                  src={language === "en" ? usaFlag : spainFlag}
                  className="w-6 h-6 object-contain mr-2"
                  alt={language}
                />

                <span>{language === "en" ? "English" : "Español"}</span>

                <select
                  value={language}
                  onChange={(e) => handleChange(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full bg-gray-100 font-sans p-3"
                >
                  {availableLanguages?.map((availableLanguage, index) => {
                    return (
                      <option
                        className="font-medium tracking-widest"
                        value={availableLanguage?.value}
                        key={index}
                      >
                        {availableLanguage?.language}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <button
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
                    <ul className="absolute right-5 shadow-lg border bg-white pt-2 z-[9999999] w-max rounded max-h-96 overflow-auto">
                      <div className="border-b pb-1.5 px-5">
                        <h2 className="block font-medium">{userInfo?.name}</h2>
                        <h2 className="block font-medium">{userInfo?.email}</h2>
                      </div>

                      <NavbarDropdownLink
                        hoverBgLink={"hover:bg-primary-color hover:text-white"}
                        linkText={t("My Profiles")}
                        onClick={() => setOpenDropDown(false)}
                        linkTo={"/my-profiles/"}
                      />

                      <NavbarDropdownLink
                        hoverBgLink={"hover:bg-red-500 hover:text-white"}
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

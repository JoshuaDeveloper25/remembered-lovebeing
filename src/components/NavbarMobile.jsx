import NavbarDropdownLink from "./NavbarDropdownLink";
import spainFlag from "../assets/spain-flag.webp";
import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import usaFlag from "../assets/usa-flag.webp";
import { FaAngleUp } from "react-icons/fa6";
import { navbarLinks } from "../db/data";
import { CiLogin } from "react-icons/ci";
import { createPortal } from "react-dom";

const NavbarMobile = ({
  setOpenDropDown,
  openDropDown,
  language,
  setNavbarOpen,
  handleChange,
  handleLogOut,
  navbarOpen,
  userInfo,
  t,
}) => {
  return (
    <>
      {/* <!-- drawer init and toggle --> */}
      <div className="sm:hidden flex items-center justify-between text-center py-2 px-5">
        <Link to={"/"}>
          <h1 className="italic tracking-widest text-xl">Logo</h1>
        </Link>

        <button
          onClick={() => setNavbarOpen(true)}
          className="font-medium text-2xl"
          type="button"
        >
          <GiHamburgerMenu />
        </button>
      </div>

      {/* <!-- drawer component --> */}
      {navbarOpen && (
        <>
          {createPortal(
            <div
              onClick={() => setNavbarOpen(!navbarOpen)}
              className={`sm:hidden bg-black/50 h-[100vh] z-[999999999] fixed top-0 w-full`}
            ></div>,
            document.body
          )}
        </>
      )}

      {/* This is the offcanvas when it's opened */}
      <div
        className={`flex flex-col justify-between sm:hidden right-0 w-72 fixed top-0 left-0 z-[9999999999999999999] h-screen p-4 overflow-y-auto transition-transform duration-500 bg-white ${
          !navbarOpen ? "-translate-x-full" : null
        }`}
      >
        <article>
          <div>
            <Link className="inline" to={`/`}>
              Logo
            </Link>
          </div>

          <button
            type="button"
            className="text-black bg-transparent hover:bg-primary-color hover:text-white rounded-lg text-sm w-8 h-8 absolute top-5 end-2.5 flex items-center justify-center"
            onClick={() => setNavbarOpen(false)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>

          <div className="flex flex-col mt-10 gap-6">
            {navbarLinks?.map((navLink, index) => {
              const {
                to,
                text,
                isDropdown = false,
                dropdownLinks,
                dropdownTitle,
              } = navLink;

              return !isDropdown ? (
                <NavLink
                  key={index}
                  onClick={() => setNavbarOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-color font-extrabold border-b-primary-color border-b pb-1 family-nunito-black"
                      : "text-secondary-color border-b-secondary-color/15 hover:text-primary-color pb-1 hover:border-b-primary-color transition-all duration-200 border-b font-extrabold family-nunito-black"
                  }
                  to={to}
                >
                  {text}
                </NavLink>
              ) : (
                <div key={index} className="group relative cursor-pointer">
                  <div className="hover:text-primary-color flex items-center justify-between gap-4">
                    <NavLink
                      className={
                        "text-secondary-color font-extrabold hover:text-primary-color transition-all duration-300 family-nunito-black "
                      }
                      to={"#"}
                    >
                      {dropdownTitle}
                    </NavLink>

                    <span className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={`h-6 w-6`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </div>

                  <div className="invisible absolute z-[9999] flex w-full right-0 flex-col rounded-md bg-primary-color py-1 px-4 text-white shadow-xl group-hover:visible">
                    {dropdownLinks?.map((dropdownLinks, index) => {
                      const { text, to } = dropdownLinks;
                      return (
                        <NavLink
                          key={index}
                          onClick={() => setNavbarOpen(false)}
                          className={({ isActive }) =>
                            isActive
                              ? "my-2 block text-sm py-1 family-nunito-black text-[.9rem] font-semibold text-white/50 shadow-md leading-4"
                              : "my-2 block text-sm py-1 family-nunito-black text-[.9rem] font-semibold text-white hover:text-white/50 leading-4"
                          }
                          to={to}
                        >
                          {text}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article>
          <h2 className="font-semibold mb-4 mt-8 border-b pb-1">
            Adittional Settings
          </h2>

          {/* Language Switcher */}
          <label>
            <span className="font-semibold mb-1 block text-sm">Languagues</span>
            <div className="relative inline-block mb-2.5">
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
          </label>

          {/* User Dropdown */}
          {userInfo?.access_token ? (
            <div className="flex gap-1.5 items-center relative">
              <button
                id="dropdownDividerButton"
                data-dropdown-toggle="dropdownDivider"
                className="cursor-default flex items-center animation-fade text-xl hover:rounded-full hover:bg-white/20 p-2"
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

              {userInfo?.access_token && (
                <>
                  {/* This is the dropdown info */}
                  {openDropDown && (
                    <>
                      {createPortal(
                        <div
                          onClick={() => setOpenDropDown(!openDropDown)}
                          className="h-[100vh] z-[] fixed top-0 w-full"
                        ></div>,
                        document.body
                      )}

                      <ul className="absolute -top-16 left-16 shadow-lg border bg-white w-40 rounded max-h-96 overflow-auto">
                        <NavbarDropdownLink
                          hoverBgLink={"hover:bg-primary-color"}
                          linkText={t("My Profiles")}
                          onClick={() => setNavbarOpen(false)}
                          linkTo={"/my-profiles/"}
                        />

                        <NavbarDropdownLink
                          hoverBgLink={"hover:bg-red-500"}
                          linkText={t("Log Out")}
                          onClick={handleLogOut}
                        />
                      </ul>
                    </>
                  )}

                  <div
                    onClick={() => setOpenDropDown(!openDropDown)}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <FaAngleUp className="text-gray-500" />

                    <h2 className="block font-bold">{userInfo?.name}</h2>
                  </div>
                </>
              )}
            </div>
          ) : (
            // Where the user is not logged in
            <NavLink
              className="border-b-2 hover:border-secondary-color hover:text-secondary-color group animation-fade flex items-center gap-1.5 w-fit mt-2"
              onClick={() => setNavbarOpen(false)}
              to={"/sign-in"}
            >
              Sign In{" "}
              <CiLogin
                size={18}
                className="group-hover:translate-x-2 animation-fade"
              />
            </NavLink>
          )}
        </article>
      </div>
    </>
  );
};

export default NavbarMobile;

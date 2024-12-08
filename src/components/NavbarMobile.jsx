import NavbarDropdownLink from "./NavbarDropdownLink";
import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import ToggleLanguage from "./ToggleLanguage";
import { FaAngleUp } from "react-icons/fa6";
import { navbarLinks } from "../db/data";
import { CiLogin } from "react-icons/ci";
import { createPortal } from "react-dom";

// Images && icons
import logo from "../assets/logo.png";

const NavbarMobile = ({
  setOpenDropDown,
  setNavbarOpen,
  openDropDown,
  handleChange,
  handleLogOut,
  navbarOpen,
  language,
  userInfo,
  t,
}) => {
  return (
    <>
      {/* <!-- drawer init and toggle --> */}
      <div className="lg:hidden bg-primary-color text-white flex items-center justify-between text-center py-2 px-5">
        <Link to={"/"}>
          <img className="w-72 rounded" src={logo} alt={"Logo"} />
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
              className={`lg:hidden bg-black/50 h-[100vh] z-[999999999] fixed top-0 w-full`}
            ></div>,
            document.body
          )}
        </>
      )}

      {/* This is the offcanvas when it's opened */}
      <div
        className={`flex flex-col justify-between lg:hidden right-0 w-80 fixed top-0 left-0 z-[9999999999999999999] h-screen p-4 overflow-y-auto transition-transform duration-500 bg-primary-color text-white ${
          !navbarOpen ? "-translate-x-full" : null
        }`}
      >
        <article>
          <div>
            <Link className="inline" to={`/`}>
              <img className="w-56 rounded" src={logo} alt={"Logo"} />
            </Link>
          </div>

          <button
            type="button"
            className="text-white bg-transparent hover:bg-primary-color-light animation-fade hover:text-white rounded-lg text-sm w-8 h-8 absolute top-5 end-2.5 flex items-center justify-center"
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
              const { to, text } = navLink;

              return (
                <NavLink
                  onClick={() => setNavbarOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-color-light font-extrabold border-b-primary-color-light border-b pb-1 family-nunito-black"
                      : "text-white border-b-white hover:text-primary-color-light pb-1 hover:border-b-primary-color-light transition-all duration-200 border-b font-extrabold family-nunito-black"
                  }
                  key={index}
                  to={to}
                >
                  {t(text)}
                </NavLink>
              );
            })}
          </div>
        </article>

        <article>
          <h2 className="text-primary-color-light border-b border-b-primary-color-light font-semibold mb-4 mt-8 pb-1">
            Adittional Settings
          </h2>

          {/* Language Switcher */}
          <div className="my-4">
            <ToggleLanguage handleChange={handleChange} language={language} />
          </div>

          {/* User Dropdown */}
          {userInfo?.access_token ? (
            <div className="flex gap-1.5 items-center relative">
              <button
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

              {/* This is the dropdown info */}
              {openDropDown && (
                <>
                  {createPortal(
                    <div
                      onClick={() => setOpenDropDown(!openDropDown)}
                      className="h-[100vh]  fixed top-0 w-full"
                    ></div>,
                    document.body
                  )}

                  <ul className="absolute -top-16 left-16 shadow-md shadow-primary-color-light  bg-primary-color w-40 rounded max-h-96 overflow-auto z-[9999]">
                    <NavbarDropdownLink
                      hoverBgLink={"text-white hover:bg-primary-color-light"}
                      onClick={() => setNavbarOpen(false)}
                      linkText={t("My Profiles")}
                      linkTo={"/my-profiles/"}
                    />

                    <NavbarDropdownLink
                      hoverBgLink={"text-white hover:bg-red-500"}
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

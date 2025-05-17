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
  setNavbarOpen,
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
      <div
        id="navbar"
        className="lg:hidden bg-primary-color text-white flex items-center justify-between text-center py-2 px-5"
      >
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
              className={`lg:hidden bg-black/50 h-[100vh] z-[50] fixed top-0 w-full`}
            ></div>,
            document.body
          )}
        </>
      )}

      {/* This is the offcanvas when it's opened */}
      <div
        className={`flex flex-col justify-between lg:hidden right-0 w-80 fixed top-0 left-0 z-[99] h-screen p-4 overflow-y-auto transition-transform duration-500 bg-primary-color text-white ${
          !navbarOpen ? "-translate-x-full" : null
        }`}
      >
        <article>
          <div>
            <Link
              className="inline"
              to={`/`}
              onClick={() => setNavbarOpen(false)}
            >
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

          {userInfo?.access_token && (
            <div className="flex flex-col justify-start text-start items-start mt-5">
              <button
                className="cursor-default flex items-center text-start gap-2.5 animation-fade text-xl hover:rounded-full hover:bg-primary-color-light/40"
                type="button"
              >
                <img
                  className="w-14 h-14 border-4 border-green-500  object-cover mx-auto rounded-full shadow-lg"
                  src={
                    userInfo?.profile_image
                      ? `${userInfo?.profile_image?.cloud_front_domain}/${userInfo?.profile_image?.aws_file_name}`
                      : `https://i.pinimg.com/474x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg`
                  }
                />

                  <h3 className="text-base font-semibold text-white pe-2">
                    {userInfo?.name} 
                  </h3>
              </button>
            </div>
          )}

          <h2 className="text-green-500 uppercase font-extrabold pb-1 mt-9 mb-1.5">
            {t("Pages")}
          </h2>

          <div className="flex flex-col gap-6">
            {navbarLinks?.map((navLink, index) => {
              const { to, text } = navLink;

              return (
                <NavLink
                  onClick={() => setNavbarOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "w-fit text-primary-color-light font-extrabold border-b-primary-color-light border-b pb-1 family-nunito-black"
                      : "w-fit text-white border-b-white hover:text-primary-color-light pb-1 hover:border-b-primary-color-light transition-all duration-200 border-b font-extrabold family-nunito-black"
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

        <article className={"pb-16"}>
          <h2 className="text-green-500 uppercase font-semibold pb-1">
            {t("Adittional Settings")}
          </h2>

          {/* Language Switcher */}
          <div className="mt-2 mb-3">
            <ToggleLanguage handleChange={handleChange} language={language} />
          </div>

          {/* User Dropdown */}
          {userInfo?.access_token ? (
            <>
              <NavLink
                className="border-b-2 w-fit hover:border-secondary-color hover:text-secondary-color group animation-fade flex items-center gap-1.5 mt-2.5"
                onClick={() => setNavbarOpen(false)}
                to={"/my-profiles"}
              >
                {t("My Profiles")}{" "}
              </NavLink>

              <NavLink
                className="border-b-2 w-fit mt-4 border-b-red-500 text-red-500 hover:border-red-500 hover:text-red-500 group animation-fade flex items-center gap-1.5"
                onClick={handleLogOut}
              >
                {t("Sign out")}{" "}
                <CiLogin
                  size={18}
                  className="group-hover:translate-x-2 animation-fade"
                />
              </NavLink>
            </>
          ) : (
            // Where the user is not logged in
            <NavLink
              className="border-b-2 hover:border-secondary-color hover:text-secondary-color group animation-fade flex items-center gap-1.5 w-fit mt-2"
              onClick={() => setNavbarOpen(false)}
              to={"/sign-in"}
            >
              {t("Sign in")}{" "}
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

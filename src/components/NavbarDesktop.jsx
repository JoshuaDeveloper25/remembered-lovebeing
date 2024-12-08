import { navbarLinks } from "../db/data";
import NavbarDropdownLink from "./NavbarDropdownLink";
import { Link, NavLink } from "react-router-dom";
import ToggleLanguage from "./ToggleLanguage";
import { createPortal } from "react-dom";

// Images && icons
import logo from "../assets/logo.png";

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
    <nav className="lg:block hidden bg-primary-color text-white py-2 px-2">
      <div className="container-page">
        <div className="flex justify-between items-center">
          <div>
            <Link to={"/"}>
              <img className="w-72 rounded" src={logo} alt={"Logo"} />
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
            <ToggleLanguage handleChange={handleChange} language={language} />

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
                      className="h-[100vh] fixed top-0 w-full z-[9999]"
                    ></div>,
                    document.body
                  )}

                  {userInfo?.access_token ? (
                    <ul className="absolute right-5 shadow-lg shadow-primary-color bg-primary-color text-white pt-2 z-[9999999] w-max rounded max-h-96 overflow-auto">
                      <div className="border-b pb-1.5 px-5">
                        <h2 className="block font-medium">👋 {userInfo?.name}</h2>
                        <h2 className="block text-sm font-medium">{userInfo?.email}</h2>
                      </div>

                      <NavbarDropdownLink
                        hoverBgLink={"text-white hover:bg-primary-color-light"}
                        linkText={t("My Profiles")}
                        onClick={() => setOpenDropDown(false)}
                        linkTo={"/my-profiles/"}
                      />

                      <NavbarDropdownLink
                        hoverBgLink={"text-white hover:bg-red-500"}
                        linkText={t("Log Out")}
                        onClick={handleLogOut}
                      />
                    </ul>
                  ) : (
                    <ul className="absolute right-5 shadow-lg bg-white py-2 z-[1000] w-max rounded max-h-96 overflow-auto">
                      <NavbarDropdownLink
                        hoverBgLink={"text-white hover:text-secondary-color"}
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

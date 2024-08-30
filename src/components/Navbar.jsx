import NavbarDropdownLink from "./NavbarDropdownLink";
import { Link, NavLink } from "react-router-dom";
import AppContext from "../context/AppProvider";
import { LiaCrossSolid } from "react-icons/lia";
import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(AppContext);
  const [openDropDown, setOpenDropDown] = useState(false);

  const handleLogOut = () => {
    toast.success("¡Successfully logged out!");
    localStorage.removeItem("userInfo");
    setUserInfo({});
  };

  return (
    <>
      <nav className="bg-white/50 py-2">
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
                Memorials
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive ? `nav-active` : `nav-inactive`
                }
                to={"/news"}
              >
                News
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive ? `nav-active` : `nav-inactive`
                }
                to={"/prices"}
              >
                Prices
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive ? `nav-active` : `nav-inactive`
                }
                to={"/posts"}
              >
                Posts
              </NavLink>

              <div className="relative">
                <button
                  id="dropdownDividerButton"
                  data-dropdown-toggle="dropdownDivider"
                  className="animation-fade text-xl hover:rounded-full  hover:bg-white/20 p-2"
                  onClick={() => setOpenDropDown(!openDropDown)}
                  type="button"
                >
                  <LiaCrossSolid size={28} className="text-white-500" />
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
                      <ul className="absolute right-5 shadow-lg bg-white py-2 z-[1000] w-max rounded max-h-96 overflow-auto">
                        <NavbarDropdownLink
                          hoverBgLink={"hover:bg-primary-color"}
                          linkText={"My Profiles"}
                          onClick={() => setOpenDropDown(false)}
                          linkTo={"/my-profiles/"}
                        />

                        <NavbarDropdownLink
                          hoverBgLink={"hover:bg-primary-color"}
                          linkText={"Settings"}
                          onClick={() => setOpenDropDown(false)}
                          linkTo={"#"}
                        />

                        <NavbarDropdownLink
                          hoverBgLink={"hover:bg-red-500"}
                          linkText={"Log Out"}
                          onClick={handleLogOut}
                        />
                      </ul>
                    ) : (
                      <ul className="absolute right-5 shadow-lg bg-white py-2 z-[1000] w-max rounded max-h-96 overflow-auto">
                        <NavbarDropdownLink
                          hoverBgLink={"text-black hover:text-secondary-color"}
                          onClick={() => setOpenDropDown(false)}
                          linkText={"Sign In"}
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
    </>
  );
};

export default Navbar;

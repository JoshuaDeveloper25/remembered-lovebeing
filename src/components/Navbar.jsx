import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppProvider";
import { useTranslation } from "react-i18next";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import { toast } from "react-toastify";

const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(AppContext);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [language, setLanguage] = useState("es");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (navbarOpen) {
      document.body.classList.add("overflow-hidden-media");
    } else {
      document.body.classList.remove("overflow-hidden-media");
    }

    // Clean up to ensure overflow is removed if modal is closed
    return () => document.body.classList.remove("overflow-hidden-media");
  }, [navbarOpen]);

  const handleChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const handleLogOut = () => {
    toast.success("¡Successfully logged out!");
    localStorage.removeItem("userInfo");
    setOpenDropDown(false);
    setUserInfo({});
  };

  return (
    <>
      {/* Menu on Desktop */}
      <NavbarDesktop
        setOpenDropDown={setOpenDropDown}
        openDropDown={openDropDown}
        handleChange={handleChange}
        handleLogOut={handleLogOut}
        language={language}
        userInfo={userInfo}
        t={t}
      />

      {/* Menu on Mobile */}
      <NavbarMobile
        setOpenDropDown={setOpenDropDown}
        setNavbarOpen={setNavbarOpen}
        openDropDown={openDropDown}
        handleChange={handleChange}
        handleLogOut={handleLogOut}
        navbarOpen={navbarOpen}
        language={language}
        userInfo={userInfo}
        t={t}
      />
    </>
  );
};

export default Navbar;

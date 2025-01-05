import spainFlag from "../assets/spain-flag.webp";
import { availableLanguages } from "../db/data";
import usaFlag from "../assets/usa-flag.webp";
import { createPortal } from "react-dom";
import { useState } from "react";

const ToggleLanguage = ({ language, handleChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectLanguage = (value) => {
    handleChange(value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Botón que abre el dropdown */}
      <div
        className=" flex items-center justify-between transition-all duration-500 shadow shadow-primary-color-light hover:shadow-primary-color-light hover:shadow-md sm:rounded-full rounded-md px-4 py-2 bg-primary-color text-white cursor-pointer"
        onClick={toggleDropdown}
      >
        <img
          src={language === "en" ? usaFlag : spainFlag}
          className="w-6 h-6 object-contain mr-2"
          alt={language}
        />
        <span>{language === "en" ? "Eng" : "Esp"}</span>
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform duration-300 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown con las opciones */}
      {isDropdownOpen && (
        <>
          {createPortal(
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="h-[100vh] fixed top-0 w-full"
            ></div>,
            document.body
          )}

          <div className="absolute left-0 right-0 mt-2 bg-primary-color text-white shadow-primary-color-light shadow-md rounded-lg z-[20]">
            {availableLanguages.map((availableLanguage, index) => (
              <div
                key={index}
                onClick={() => selectLanguage(availableLanguage.value)}
                className={`${
                  availableLanguage.value === language &&
                  "first:rounded-t-lg last:rounded-b-lg bg-primary-color-light/25 pointer-events-none"
                } animation-fade flex items-center px-4 py-2 cursor-pointer hover:first:rounded-t-lg  last:rounded-b-lg hover:last:rounded-b-lg hover:bg-primary-color-light`}
              >
                <img
                  src={availableLanguage.value === "en" ? usaFlag : spainFlag}
                  className="w-6 h-6 object-contain mr-2"
                  alt={availableLanguage.value}
                />
                <span>{availableLanguage.language}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ToggleLanguage;

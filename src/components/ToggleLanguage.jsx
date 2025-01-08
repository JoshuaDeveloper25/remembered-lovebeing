import spainFlag from "../assets/spain-flag.webp";
import { availableLanguages } from "../db/data";
import usaFlag from "../assets/usa-flag.webp";
import { useState } from "react";

// Nextui imports
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from "@nextui-org/react";

const ToggleLanguage = ({ language, handleChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectLanguage = (language) => {
    handleChange(language);
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Dropdown
      showArrow
      backdrop="blur"
      classNames={{
        base: "before:bg-white w-fit ", // change arrow background
        content: "p-0 min-w-fit",
        backdrop: "custom-z-index",
      }}
      isOpen={isDropdownOpen}
      onOpenChange={(open) => setIsDropdownOpen(open)}
    >
      <DropdownTrigger>
        <Button className="w-fit flex gap-0 items-center justify-between transition-all duration-500 shadow shadow-primary-color-light hover:shadow-primary-color-light hover:shadow-md sm:rounded-full rounded-md px-4 py-2 bg-primary-color text-white cursor-pointer">
          <img
            src={language === "en" ? usaFlag : spainFlag}
            className="w-6 h-6 object-contain mr-2"
            alt={language}
          />
          <span>{language === "en" ? "Eng" : "Esp"}</span>
          <svg
            className={`w-4 h-4 ml-2 transform transition-transform duration-300 ${
              isDropdownOpen ? "rotate-180" : "rotate-360"
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
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        className="p-0 rounded-xl"
        itemClasses={{
          base: [
            "rounded-md",
            "text-inherit",
            "transition-opacity",
            "data-[hover=true]:text-transparent",
            "data-[hover=true]:bg-transparent",
            "dark:data-[hover=true]:bg-transparent",
            "data-[selectable=true]:focus:bg-transparent",
            "data-[pressed=true]:opacity-100",
            "data-[focus-visible=true]:ring-transparent0",
            "w-fit",
            "p-0",
            "custom-z-index",
          ],
        }}
      >
        <DropdownItem key="languages">
          <div className=" bg-primary-color text-white shadow-md rounded-lg">
            {availableLanguages.map((availableLanguage, index) => (
              <Button
                key={availableLanguage.value}
                onPress={() => selectLanguage(availableLanguage.value)}
                className={`${
                  availableLanguage.value === language ?
                  "bg-primary-color-light pointer-events-none" : "bg-primary-color-light/25"
                } rounded-none text-white animation-fade w-full flex items-center justify-start gap-0 text-start px-4 py-2 cursor-pointer hover:first:rounded-t-lg hover:last:rounded-b-lg hover:bg-primary-color-light`}
              >
                <img
                  src={availableLanguage.value === "en" ? usaFlag : spainFlag}
                  className="w-6 h-6 object-contain mr-2"
                  alt={availableLanguage.value}
                />
                <span>{availableLanguage.language}</span>
              </Button>
            ))}
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ToggleLanguage;

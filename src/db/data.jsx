// Imports
import rememberedTributePrev from "../assets/rememberedTributePrev.png";
import rememberedAboutPrev from "../assets/rememberedAboutPrev.png";
import rememberedMediaPrev from "../assets/rememberedMediaPrev.png";
import { GiCandleHolder, GiFlowerPot } from "react-icons/gi";
import { MdEditDocument } from "react-icons/md";
import { LiaUsersSolid } from "react-icons/lia";

export const packages = {
  singlePackage: {
    name: "Single Package",
    price: 20,
  },

  tertiaryPackage: {
    name: "Tertiary Package",
    price: 50,
  },
};

export const navbarLinks = [
  {
    to: "/memorials",
    text: `Memorials`,
  },

  {
    to: "/posts",
    text: "Posts",
  },

  {
    to: "/news",
    text: "News",
  },

  {
    to: "/prices",
    text: "Prices",
  },
];

// Steps app
export const stepsApp = [
  {
    numberStep: 1,
    descStep: "RegisterAndLogin",
  },

  {
    numberStep: 2,
    descStep: "CreateAProfile",
  },

  {
    numberStep: 3,
    descStep: "GenerateQRCode",
  },

  {
    numberStep: 4,
    descStep: "ShareWithLovedOnes",
  },
];

export const availableLanguages = [
  { value: "es", language: "Español" },
  { value: "en", language: "English" },
];

export const authCarouselPreviews = [
  rememberedAboutPrev,
  rememberedMediaPrev,
  rememberedTributePrev,
];

export const websiteAnalytics = [
  {
    analyticIcon: (
      <GiCandleHolder className="text-yellow-400 mx-auto my-3" size={40} />
    ),
    analyticNumber: "50",
    analyticName: "Memorials",
  },

  {
    analyticIcon: (
      <GiFlowerPot className="text-red-400 mx-auto my-3" size={40} />
    ),
    analyticNumber: "120",
    analyticName: "Tributes",
  },

  {
    analyticIcon: (
      <MdEditDocument
        className="text-primary-color-light mx-auto my-3"
        size={40}
      />
    ),
    analyticNumber: 100,
    analyticName: "Posts",
  },

  {
    analyticIcon: (
      <LiaUsersSolid className="text-primary-color mx-auto my-3" size={40} />
    ),
    analyticNumber: "1,000",
    analyticName: "Visitors",
  },
];

export const causeOfDeaths = [
  {
    value: "prefer_not_to_say_or_other",
    causeDeath: "Prefer not to say or other",
  },

  {
    value: "covid19_victim",
    causeDeath: "COVID-19 victim",
  },

  {
    value: "substance_victim",
    causeDeath: "Substance abuse victim",
  },

  {
    value: "cancer_victim",
    causeDeath: "Cancer victim",
  },

  {
    value: "accident_victim",
    causeDeath: "Victim of an accident",
  },

  {
    value: "crime_victim",
    causeDeath: "Crime victim",
  },

  {
    value: "heart_attack",
    causeDeath: "Heart attack",
  },
];

export const genres = [
  {
    value: "",
    type: "Both",
  },

  {
    value: "female",
    type: "Female",
  },

  {
    value: "male",
    type: "Male",
  },
];

export const relationships = [
  {
    value: "",
    relationship: "-- Select --",
  },

  {
    value: "prefer_not_to_say_or_other",
    relationship: "Prefer not to say or other",
  },

  {
    value: "Dad",
    relationship: "Dad",
  },

  {
    value: "Mom",
    relationship: "Mom",
  },

  {
    value: "Son",
    relationship: "Son",
  },

  {
    value: "Sister",
    relationship: "Sister",
  },

  {
    value: "Stepsister",
    relationship: "Stepsister",
  },

  {
    value: "Brother",
    relationship: "Brother",
  },

  {
    value: "Stepbrother",
    relationship: "Stepbrother",
  },

  {
    value: "Daughter",
    relationship: "Daughter",
  },

  {
    value: "Grandmother",
    relationship: "Grandmother",
  },

  {
    value: "Friends",
    relationship: "Friends",
  },
];

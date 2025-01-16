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
  }
}

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
    analyticNumber: "1,384",
    analyticName: "Memorials",
  },

  {
    analyticIcon: (
      <GiFlowerPot className="text-red-400 mx-auto my-3" size={40} />
    ),
    analyticNumber: "1,542",
    analyticName: "Tributes",
  },

  {
    analyticIcon: (
      <MdEditDocument
        className="text-primary-color-light mx-auto my-3"
        size={40}
      />
    ),
    analyticNumber: 845,
    analyticName: "Posts",
  },

  {
    analyticIcon: (
      <LiaUsersSolid className="text-primary-color mx-auto my-3" size={40} />
    ),
    analyticNumber: "35,879",
    analyticName: "Visitors",
  },
];

export const causeOfDeaths = [
  {
    value: "prefer_not_to_say",
    causeDeath: "Prefer not to say",
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
    value: "prefer_not_to_say",
    relationship: "Prefer not to say",
  },

  {
    value: "dad",
    relationship: "Dad",
  },

  {
    value: "mom",
    relationship: "Mom",
  },

  {
    value: "son",
    relationship: "Son",
  },

  {
    value: "sister",
    relationship: "Sister",
  },

  {
    value: "stepsister",
    relationship: "Stepsister",
  },

  {
    value: "brother",
    relationship: "Brother",
  },

  {
    value: "stepbrother",
    relationship: "Stepbrother",
  },

  {
    value: "daughter",
    relationship: "Daughter",
  },

  {
    value: "grandmother",
    relationship: "Grandmother",
  },

  {
    value: "grandfather",
    relationship: "Grandfather",
  },
];
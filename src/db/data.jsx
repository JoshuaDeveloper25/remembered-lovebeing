// Imports
import rememberedTributePrev from "../assets/rememberedTributePrev.png";
import rememberedAboutPrev from "../assets/rememberedAboutPrev.png";
import rememberedMediaPrev from "../assets/rememberedMediaPrev.png";
import { GiCandleHolder, GiFlowerPot } from "react-icons/gi";
import { MdEditDocument } from "react-icons/md";
import { LiaUsersSolid } from "react-icons/lia";
import { Trans } from "react-i18next";

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

// Imports
import rememberedTributePrev from "../assets/rememberedTributePrev.png";
import rememberedAboutPrev from "../assets/rememberedAboutPrev.png";
import rememberedMediaPrev from "../assets/rememberedMediaPrev.png";
import { GiCandleHolder, GiFlowerPot } from "react-icons/gi";
import { MdEditDocument } from "react-icons/md";
import { LiaUsersSolid } from "react-icons/lia";
import { Trans } from "react-i18next";
import { t } from "i18next";

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
    descStep: (
      <>
        <Trans i18nKey="RegisterAndLogIn">
          Register <span className="sm:block">and Log In</span>
        </Trans>
      </>
    ),
  },

  {
    numberStep: 2,
    descStep: (
      <>
        Create a <span className="sm:block">Profile</span>
      </>
    ),
  },

  {
    numberStep: 3,
    descStep: (
      <>
        Generate <span className="sm:block">QR Code</span>
      </>
    ),
  },

  {
    numberStep: 4,
    descStep: (
      <>
        Share with <span className="sm:block">loved ones</span>
      </>
    ),
  },
];

export const availableLanguages = [
  { value: "en", language: "English" },
  { value: "es", language: "Español" },
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

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

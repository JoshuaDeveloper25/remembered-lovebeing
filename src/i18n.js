import { initReactI18next } from "react-i18next";
import i18n from "i18next";

const resources = {
  en: {
    translation: {
      Memorials: "Memorials",
      Posts: "Posts",
      News: "News",
      Prices: "Prices",
      "My Profiles": "My Profiles",
      Settings: "Settings",
      "Log Out": "Log Out",
      "Preserve the memories of those you love":
        "Preserve the memories of those you love",
      "Create a profile for your loved one, upload photos, share memories through posts and allow others to leave tributes and condolences. Generate a QR code.":
        "Create a profile for your loved one, upload photos, share memories through posts and allow others to leave tributes and condolences. Generate a QR code.",
      "Get Started": "Get Started",
      "See An Example Memorial": "See An Example Memorial",
      RegisterAndLogIn: "Register <1>and Log In</1>",
    },
  },
  es: {
    translation: {
      Memorials: "Memoriales",
      Posts: "Publicaciones",
      News: "Noticias",
      Prices: "Precios",
      "My Profiles": "Mis Perfiles",
      Settings: "Ajustes",
      "Log Out": "Cerrar Sesión",
      "Preserve the memories of those you love":
        "Preserva los recuerdos de quienes amas",
      "Create a profile for your loved one, upload photos, share memories through posts and allow others to leave tributes and condolences. Generate a QR code.":
        "Crea un perfil para tu ser querido, sube fotos, comparte recuerdos a través de publicaciones y permite que otros dejen tributos y condolencias. Genera un código QR.",
      "Get Started": "Empezar",
      "See An Example Memorial": "Ver Ejemplo de Memorial",
      RegisterAndLogIn: "Registrarse <1>e Iniciar Sesión</1>",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // idioma por defecto
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

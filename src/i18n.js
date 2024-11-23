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
      "Log Out": "Log Out",
      "Preserve the memories of those you love":
        "Preserve the memories of those you love",
      "Create a profile for your loved one, upload photos, share memories through posts and allow others to leave tributes and condolences. Generate a QR code.":
        "Create a profile for your loved one, upload photos, share memories through posts and allow others to leave tributes and condolences. Generate a QR code.",
      "Get Started": "Get Started",
      "See An Example Memorial": "See An Example Memorial",
      RegisterAndLogIn: "Register <1>and Log In</1>",
      "Our Community Today": "Our Community Today",
      "Discover the number of memorials, tributes and active posts, and how our community keep growing up and remembering.":
        "Discover the number of memorials, tributes and active posts, and how our community keep growing up and remembering.",
      Tributes: "Tributes",
      Visitors: "Visitors",
      CREATE: "CREATE",
      "Create an online memorial": "Create an online memorial",
      "Share your loved one's story": "Share your loved one's story",
      "Create an online memorial. Add photos, videos, messages, gifs, or links. Gift cards can also be attached.":
        "Create an online memorial. Add photos, videos, messages, gifs, or links. Gift cards can also be attached.",
      "Create a Memorial": "Create a Memorial",
      "Recent online memorials": "Recent online memorials",
      "There's no recent memorials for the moment...":
        "There's no recent memorials for the moment...",
      "No Date...": "No Date...",
      "Looking for a loved one? Search now!":
        "Looking for a loved one? Search now!",
      "Find a Memorial": "Find a Memorial",
      "Find the memorial of a family member or friend. Leave memories or send flowers.":
        "Find the memorial of a family member or friend. Leave memories or send flowers.",
      "Memorial Name": "Memorial Name",
      Example: "Example",
      "Ways to use your QR code": "Ways to use your QR code",
      "We offer modern designs.": "We offer modern designs.",
      "Modern, beautiful design": "Modern, beautiful design",
      "Memorial Source memorial pages are built with elegant, modern design that looks good on all devices.":
        "Memorial Source memorial pages are built with elegant, modern design that looks good on all devices.",
      "Preview Memorials": "Preview Memorials",
    },
  },
  es: {
    translation: {
      Memorials: "Memoriales",
      Posts: "Publicaciones",
      News: "Noticias",
      Prices: "Precios",
      "My Profiles": "Mis Perfiles",
      "Log Out": "Cerrar Sesión",
      "Preserve the memories of those you love":
        "Preserva los recuerdos de quienes amas",
      "Create a profile for your loved one, upload photos, share memories through posts and allow others to leave tributes and condolences. Generate a QR code.":
        "Crea un perfil para tu ser querido, sube fotos, comparte recuerdos a través de publicaciones y permite que otros dejen tributos y condolencias. Genera un código QR.",
      "Get Started": "Empezar",
      "See An Example Memorial": "Ver Ejemplo de Memorial",
      RegisterAndLogIn: "Registrarse <1>e Iniciar Sesión</1>",
      "Our Community Today": "Nuestra Comunidad Hoy",
      "Discover the number of memorials, tributes and active posts, and how our community keep growing up and remembering.":
        "Descubre la cantidad de memoriales, tributos y publicaciones activas, y cómo nuestra comunidad sigue creciendo y recordando.",
      Tributes: "Tributos",
      Visitors: "Visitantes",
      CREATE: "CREAR",
      "Create an online memorial": "Crea un memorial en línea",
      "Share your loved one's story": "Comparte la historia de tu ser querido",
      "Create an online memorial. Add photos, videos, messages, gifs, or links. Gift cards can also be attached.":
        "Crea un memorial en línea. Agrega fotos, videos, mensajes, gifs o enlaces. También se pueden adjuntar tarjetas de regalo.",
      "Create a Memorial": "Crear un Memorial",
      "Recent online memorials": "Memoriales en línea recientes",
      "There's no recent memorials for the moment...":
        "No hay memoriales recientes por el momento...",
      "No Date...": "Sin Fecha...",
      "Looking for a loved one? Search now!":
        "¿Buscas a un ser querido? ¡Búscalo ahora!",
      "Find a Memorial": "Encuentra un Memorial",
      "Find the memorial of a family member or friend. Leave memories or send flowers.":
        "Encuentra el memorial de un familiar o amigo. Deja recuerdos o envía flores.",
      "Memorial Name": "Nombre del Memorial",
      Example: "Ejemplo",
      "Ways to use your QR code": "Formas de usar tu código QR",
      "We offer modern designs.": "Ofrecemos diseños modernos.",
      "Modern, beautiful design": "Diseño moderno y hermoso",
      "Memorial Source memorial pages are built with elegant, modern design that looks good on all devices.":
        "Las páginas de memoriales de Memorial Source están diseñadas con elegancia y modernidad, adaptándose a todos los dispositivos.",
      "Preview Memorials": "Previsualizar Memoriales",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // language by default
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

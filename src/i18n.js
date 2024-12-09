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
      RegisterAndLogin: "Register and login",
      CreateAProfile: "Create a profile",
      GenerateQrCode: "Generate QR Code",
      ShareWithLovedOnes: "Share with loved ones",
      "Our Community Today": "Our Community Today",
      "Discover the number of memorials, tributes and active posts, and how our community keep growing up and remembering.":
        "Discover the number of memorials, tributes and active posts, and how our community keep growing up and remembering.",
      Tributes: "Tributes",
      Visitors: "Visitors",
      CREATE: "CREATE",
      "Create an online memorial": "Create an online memorial",
      "Share your loved one's story": "Share your loved one's story",
      "Create a meaningful online memorial to celebrate your loved one’s life. Share stories, upload photos, receive condolences, post tributes, and keep their memory alive.":
        "Create a meaningful online memorial to celebrate your loved one’s life. Share stories, upload photos, receive condolences, post tributes, and keep their memory alive.",
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
      SHARE: "SHARE",
      "Keep their memory close in unique and meaningful ways":
        "Keep their memory close in unique and meaningful ways",
      "Generate a QR code to link to your memorial. Place it on headstones, urns, keepsakes, or remembrance cards to share their story with friends and family.":
        "Generate a QR code to link to your memorial. Place it on headstones, urns, keepsakes, or remembrance cards to share their story with friends and family.",
      "Memorial pages are thoughtfully designed with a modern and elegant style, ensuring they look beautiful and function perfectly on any device.":
        "Memorial pages are thoughtfully designed with a modern and elegant style, ensuring they look beautiful and function perfectly on any device.",
      "Share the site with friends": "Share the site with friends",
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
      RegisterAndLogin: "Registrarse e Iniciar Sesión",
      CreateAProfile: "Crear un perfil",
      GenerateQRCode: "Generar Código QR",
      ShareWithLovedOnes: "Compartir con seres queridos",
      "Our Community Today": "Nuestra Comunidad Hoy",
      "Discover the number of memorials, tributes and active posts, and how our community keep growing up and remembering.":
        "Descubre la cantidad de memoriales, tributos y publicaciones activas, y cómo nuestra comunidad sigue creciendo y recordando.",
      Tributes: "Tributos",
      Visitors: "Visitantes",
      CREATE: "CREAR",
      "Create an online memorial": "Crea un memorial en línea",
      "Share your loved one's story": "Comparte la historia de tu ser querido",
      "Create a meaningful online memorial to celebrate your loved one’s life. Share stories, upload photos, receive condolences, post tributes, and keep their memory alive.":
        "Crea un homenaje en línea significativo para celebrar la vida de tu ser querido. Comparte historias, sube fotos, recibe condolencias, publica tributos y mantén viva su memoria.",
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
      SHARE: "COMPARTIR",
      "Keep their memory close in unique and meaningful ways":
        "Mantén su memoria cerca de formas únicas y significativas.",
      "Generate a QR code to link to your memorial. Place it on headstones, urns, keepsakes, or remembrance cards to share their story with friends and family.":
        "Genera un código QR para vincular a tu memorial. Colócalo en lápidas, urnas, recuerdos o tarjetas conmemorativas para compartir su historia con amigos y familiares.",
      "Memorial pages are thoughtfully designed with a modern and elegant style, ensuring they look beautiful and function perfectly on any device.":
        "Las páginas conmemorativas están diseñadas cuidadosamente con un estilo moderno y elegante, asegurando que se vean hermosas y funcionen perfectamente en cualquier dispositivo.",
      "Share the site with friends": "Comparte el sitio con amigos",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

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
      "All Rights Reserved": "All Rights Reserved",
      Pages: "Pages",
      "Terms & Conditions": "Terms & Conditions",
      "Privacy Policy": "Privacy Policy",
      "Cookies Policy": "Cookies Policy",
      Contact: "Contact",
      "Terms & Conditions": "Terms & Conditions",
      Introduction: "Introduction",
      "Welcome to our memorial platform. By using our application, you agree to comply with the terms and conditions outlined in this document. If you do not agree with any of these conditions, you will not be able to use our services.":
        "Welcome to our memorial platform. By using our application, you agree to comply with the terms and conditions outlined in this document. If you do not agree with any of these conditions, you will not be able to use our services.",
      "Service Description": "Service Description",
      "Our platform allows users to:": "Our platform allows users to:",
      "Create memorial profiles to honor deceased people.":
        "Create memorial profiles to honor deceased people.",
      "Upload images, write tributes, and offer condolences.":
        "Upload images, write tributes, and offer condolences.",
      "Access different functionalities based on the selected plan.":
        "Access different functionalities based on the selected plan.",
      "Plans and Features": "Plans and Features",
      "Free Plan": "Free Plan",
      "Allows the creation of memorial profiles.":
        "Allows the creation of memorial profiles.",
      "Ability to upload up to 5 images in the gallery.":
        "Ability to upload up to 5 images in the gallery.",
      "Does not include the option to create posts.":
        "Does not include the option to create posts.",
      "Pro Plan": "Pro Plan",
      "Ability to upload an unlimited number of images.":
        "Ability to upload an unlimited number of images.",
      "Access to the posts functionality.":
        "Access to the posts functionality.",
      "Other exclusive features specified in the plan description.":
        "Other exclusive features specified in the plan description.",
      "Responsible Use": "Responsible Use",
      "Users agree to:": "Users agree to:",
      "Use the platform respectfully and ethically.":
        "Use the platform respectfully and ethically.",
      "Not upload offensive, illegal content, or content that violates the rights of third parties.":
        "Not upload offensive, illegal content, or content that violates the rights of third parties.",
      "Ensure all information provided is truthful.":
        "Ensure all information provided is truthful.",
      "We reserve the right to remove content or profiles that violate these rules without prior notice.":
        "We reserve the right to remove content or profiles that violate these rules without prior notice.",
      "Intellectual Property": "Intellectual Property",
      "All rights to the design, content, and functionality of the platform are owned by EternalMemoriesX.":
        "All rights to the design, content, and functionality of the platform are owned by EternalMemoriesX.",
      "Users retain the rights to the content they upload, but grant the platform a limited license to display it within the services.":
        "Users retain the rights to the content they upload, but grant the platform a limited license to display it within the services.",
      "Liability Limitations": "Liability Limitations",
      "The platform is not responsible for:":
        "The platform is not responsible for:",
      "The accuracy or veracity of content uploaded by users.":
        "The accuracy or veracity of content uploaded by users.",
      "Technical failures, data loss, or service interruptions.":
        "Technical failures, data loss, or service interruptions.",
      "Account Cancellation": "Account Cancellation",
      "We reserve the right to suspend or delete accounts that violate the terms of use or remain inactive for an extended period.":
        "We reserve the right to suspend or delete accounts that violate the terms of use or remain inactive for an extended period.",
      "Changes to Terms": "Changes to Terms",
      "These terms may be modified at any time. Changes will be notified to users via the application and will take effect immediately.":
        "These terms may be modified at any time. Changes will be notified to users via the application and will take effect immediately.",
      "Applicable Law and Jurisdiction": "Applicable Law and Jurisdiction",
      "These terms will be governed by the laws of [Country/Region], and any disputes will be resolved in the courts of [City/Region].":
        "These terms will be governed by the laws of [Country/Region], and any disputes will be resolved in the courts of [City/Region].",
      Contact: "Contact",
      "If you have any questions or concerns about these terms, you can contact us at [email address].":
        "If you have any questions or concerns about these terms, you can contact us at [email address].",
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
        "Crea un honor en línea significativo para celebrar la vida de tu ser querido. Comparte historias, sube fotos, recibe condolencias, publica tributos y mantén viva su memoria.",
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
      "All Rights Reserved": "Todos los Derechos Reservados",
      Pages: "Páginas",
      "Terms & Conditions": "Términos y Condiciones",
      "Privacy Policy": "Política de Privacidad",
      "Cookies Policy": "Política de Cookies",
      Contact: "Contacto",
      "Terms & Conditions": "Términos y Condiciones",
      Introduction: "Introducción",
      "Welcome to our memorial platform. By using our application, you agree to comply with the terms and conditions outlined in this document. If you do not agree with any of these conditions, you will not be able to use our services.":
        "Bienvenido(a) a nuestra plataforma de memoriales. Al usar nuestra aplicación, aceptas cumplir con los términos y condiciones descritos en este documento. Si no estás de acuerdo con alguna de estas condiciones, no podrás usar nuestros servicios.",
      "Service Description": "Descripción del Servicio",
      "Our platform allows users to:":
        "Nuestra plataforma permite a los usuarios:",
      "Create memorial profiles to honor deceased people.":
        "Crear perfiles memoriales para honrar a personas fallecidas.",
      "Upload images, write tributes, and offer condolences.":
        "Subir imágenes, escribir tributos, y ofrecer condolencias.",
      "Access different functionalities based on the selected plan.":
        "Acceder a diferentes funcionalidades según el plan seleccionado.",
      "Plans and Features": "Planes y Funcionalidades",
      "Free Plan": "Plan Gratuito",
      "Allows the creation of memorial profiles.":
        "Permite la creación de perfiles memoriales.",
      "Ability to upload up to 5 images in the gallery.":
        "Capacidad para subir hasta 5 imágenes en la galería.",
      "Does not include the option to create posts.":
        "No incluye la opción de crear publicaciones.",
      "Pro Plan": "Plan Pro",
      "Ability to upload an unlimited number of images.":
        "Capacidad para subir un número ilimitado de imágenes.",
      "Access to the posts functionality.":
        "Acceso a la funcionalidad de publicaciones.",
      "Other exclusive features specified in the plan description.":
        "Otras características exclusivas especificadas en la descripción del plan.",
      "Responsible Use": "Uso Responsable",
      "Users agree to:": "Los usuarios se comprometen a:",
      "Use the platform respectfully and ethically.":
        "Usar la plataforma de manera respetuosa y ética.",
      "Not upload offensive, illegal content, or content that violates the rights of third parties.":
        "No subir contenido ofensivo, ilegal, o que viole derechos de terceros.",
      "Ensure all information provided is truthful.":
        "Garantizar que toda la información proporcionada sea verídica.",
      "We reserve the right to remove content or profiles that violate these rules without prior notice.":
        "Nos reservamos el derecho de eliminar contenido o perfiles que infrinjan estas normas sin previo aviso.",
      "Intellectual Property": "Propiedad Intelectual",
      "All rights to the design, content, and functionality of the platform are owned by EternalMemoriesX. Users retain rights to the content they upload, but grant the platform a limited license to display it within the services.":
        " Todos los derechos sobre el diseño, contenido, y funcionalidad de la plataforma son propiedad de EternalMemoriesX. Los usuarios conservan los derechos sobre el contenido que suban, pero otorgan a la plataforma una licencia limitada para mostrarlo dentro de los servicios.",
      "Liability Limitations": "Limitaciones de Responsabilidad",
      "The platform is not responsible for:":
        "La plataforma no se hace responsable por:",
      "The accuracy or veracity of content uploaded by users.":
        "La veracidad o exactitud del contenido subido por los usuarios.",
      "Technical failures, data loss, or service interruptions.":
        "Fallos técnicos, pérdida de datos o interrupciones en el servicio.",
      "Account Cancellation": "Cancelación de Cuentas",
      "We reserve the right to suspend or delete accounts that violate the terms of use or remain inactive for an extended period.":
        "Nos reservamos el derecho de suspender o eliminar cuentas que violen los términos de uso o que permanezcan inactivas durante un periodo prolongado.",
      "Changes to Terms": "Modificaciones a los Términos",
      "These terms may be modified at any time. Changes will be notified to users via the application and will take effect immediately.":
        "Estos términos pueden ser modificados en cualquier momento. Los cambios serán notificados a los usuarios a través de la aplicación y entrarán en vigencia inmediatamente.",
      "Applicable Law and Jurisdiction": "Ley Aplicable y Jurisdicción",
      "These terms will be governed by the laws of [Country/Region], and any disputes will be resolved in the courts of [City/Region].":
        "Estos términos se regirán por las leyes de [País/Región] y cualquier disputa será resuelta en los tribunales de [Ciudad/Región].",
      Contact: "Contacto",
      "If you have any questions or concerns about these terms, you can contact us at [email address].":
        "Si tienes alguna pregunta o inquietud sobre estos términos, puedes contactarnos en [correo electrónico].",
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

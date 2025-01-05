import { initReactI18next } from "react-i18next";
import i18n from "i18next";

const resources = {
  en: {
    translation: {
      Condolences: "Condolences",
      Memorials: "Memorials",
      Posts: "Posts",
      News: "News",
      "Stay updated with the latest news of the users!":
        "Stay updated with the latest news of the users!",
      Prices: "Prices",
      "My Profiles": "My Profiles",
      "Log Out": "Log Out",
      "Sign in": "Sign in",
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
      "All rights to the design, content, and functionality of the platform are owned by Eternal MemoriesX. Users retain rights to the content they upload, but grant the platform a limited license to display it within the services.":
        "All rights to the design, content, and functionality of the platform are owned by Eternal MemoriesX. Users retain rights to the content they upload, but grant the platform a limited license to display it within the services.",
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
      "These terms will be governed by the laws of Honduras, and any disputes will be resolved in the courts of El Progreso, Yoro.":
        "These terms will be governed by the laws of Honduras, and any disputes will be resolved in the courts of El Progreso, Yoro.",
      "If you have any questions or concerns about these terms, you can contact us at [email address].":
        "If you have any questions or concerns about these terms, you can contact us at [email address].",
      "Discover Us": "Discover Us",
      "About Us": "Abous Us",
      "Privacy Policy": "Privacy Policy",
      Introduction: "Introduction",
      "Intro Text":
        "At Eternal MemoriesX, we are committed to protecting your privacy and ensuring that your personal data is handled securely and responsibly. By using our platform, you agree to this Privacy Policy, which explains how we collect, use, protect, and share your information.",
      "Information We Collect": "Information We Collect",
      "Data Categories":
        "When you use our application, we may collect the following categories of data:",
      "Personal Information":
        "Personal information: Name, email address, contact details, and payment details (for subscriptions).",
      "Memorial Profile Information":
        "Memorial profile information: Names, dates of birth and death, images, and tributes.",
      "Navigation Data":
        "Navigation data: IP address, browser type, device used, and application usage statistics.",
      "How We Use Your Information": "How We Use Your Information",
      "Usage Explanation": "The information we collect is used to:",
      "Provide Services":
        "Provide and improve the services offered on our application.",
      "Manage Account":
        "Manage your account, subscriptions, and features, such as uploading images or tributes.",
      "Ensure Security": "Ensure platform security and prevent misuse.",
      "Send Notifications":
        "Send important notifications, such as service updates or reminders.",
      "Data Sharing": "Data Sharing",
      "Sharing Conditions":
        "We do not share your personal data with third parties, except in the following situations:",
      "External Providers":
        "External service providers: We use services like PayPal or Stripe to securely process payments.",
      "Legal Requirements":
        "Legal requirements: If requested by authorities in accordance with the law.",
      "User Consent":
        "User consent: When you explicitly authorize us to share your information.",
      "Data Security": "Data Security",
      "Security Measures":
        "We have implemented technical and organizational measures to protect your personal information from unauthorized access, loss, alteration, or disclosure. However, no security system is completely infallible. We recommend using strong passwords and keeping your information confidential.",
      "Data Retention": "Data Retention",
      "Retention Policy":
        "We will retain your data while your account is active or as necessary to provide our services. If you want to delete your information, you can request it by emailing us at [email address].",
      "User Rights": "User Rights",
      "Rights List":
        "As a user of Eternal MemoriesX, you have the following rights:",
      Access: "Access: You can request a copy of your personal data.",
      Correction:
        "Correction: You have the right to correct inaccurate or incomplete information.",
      Deletion: "Deletion: You can ask us to delete your personal information.",
      Restriction:
        "Restriction: You can request that we limit the use of your data in certain situations.",
      "Exercise Rights":
        "To exercise these rights, contact us at [email address].",
      "Memorial Privacy": "Memorial Profile Privacy",
      "Memorial Privacy Text":
        "The memorial profiles you create can be set as public or private:",
      "Public Profiles":
        "Public profiles will be visible to anyone who accesses the application.",
      "Private Profiles":
        "Private profiles will be restricted and accessible only to people you authorize.",
      "Sensitive Info Warning":
        "We recommend not including sensitive information in public profiles.",
      Cookies: "Cookies",
      "Cookies Text":
        "Our application uses cookies to enhance your user experience. Cookies are small files stored on your device that help us analyze application usage. You can disable cookies in your browser settings, though some features may be affected.",
      "Policy Changes": "Changes to this Policy",
      "Policy Changes Text":
        "We may update this Privacy Policy occasionally. We will notify you of any changes by posting them in our application and, if necessary, sending you an email notification. The date of the last update will appear at the end of this document.",
      Contact: "Contact",
      "Contact Info":
        "If you have questions, concerns, or want to exercise your privacy rights, you can contact us at:",
      Email: "Email: [email address]",
      Phone: "Phone: [contact number, optional]",
      "Last Update": "Last updated:",
      "Privacy Policy": "Privacy Policy",
      "At Eternal MemoriesX, we are committed to protecting your privacy and ensuring that your personal data is handled securely and responsibly. By using our platform, you agree to this Privacy Policy, which explains how we collect, use, protect, and share your information.":
        "At Eternal MemoriesX, we are committed to protecting your privacy and ensuring that your personal data is handled securely and responsibly. By using our platform, you agree to this Privacy Policy, which explains how we collect, use, protect, and share your information.",
      "Information We Collect": "Information We Collect",
      "When you use our application, we may collect the following categories of data":
        "When you use our application, we may collect the following categories of data",
      "Personal Information: Name, email, contact details, and payment information (in case of subscriptions).":
        "Personal Information: Name, email, contact details, and payment information (in case of subscriptions).",
      "Memorial Profile Information: Names, birth and death dates, images, and tributes.":
        "Memorial Profile Information: Names, birth and death dates, images, and tributes.",
      "Browsing Data: IP address, browser type, device used, and app usage statistics.":
        "Browsing Data: IP address, browser type, device used, and app usage statistics.",
      "How We Use Your Information": "How We Use Your Information",
      "The information we collect is used to:":
        "The information we collect is used to:",
      "Provide and improve the services offered in our app.":
        "Provide and improve the services offered in our app.",
      "Manage your account, subscriptions, and features such as uploading images or tributes.":
        "Manage your account, subscriptions, and features such as uploading images or tributes.",
      "Ensure the security of the platform and prevent misuse.":
        "Ensure the security of the platform and prevent misuse.",
      "Send important notifications, such as service updates or reminders.":
        "Send important notifications, such as service updates or reminders.",
      "Data Sharing": "Data Sharing",
      "We do not share your personal data with third parties, except in the following situations:":
        "We do not share your personal data with third parties, except in the following situations:",
      "External Service Providers: We use services such as PayPal or Stripe to securely process payments.":
        "External Service Providers: We use services such as PayPal or Stripe to securely process payments.",
      "Legal Requirements: If requested by any authority in accordance with the law.":
        "Legal Requirements: If requested by any authority in accordance with the law.",
      "User Consent: When you explicitly authorize us to share your information.":
        "User Consent: When you explicitly authorize us to share your information.",
      "Data Security": "Data Security",
      "We have implemented technical and organizational measures to protect your personal information against unauthorized access, loss, alteration, or disclosure. However, no security system is completely infallible. We recommend using strong passwords and keeping your information confidential.":
        "We have implemented technical and organizational measures to protect your personal information against unauthorized access, loss, alteration, or disclosure. However, no security system is completely infallible. We recommend using strong passwords and keeping your information confidential.",
      "Data Retention": "Data Retention",
      "We will retain your data while your account is active or as necessary to provide you with our services. If you wish to delete your information, you can request it by emailing us at support@eternalmemoriesx.com.":
        "We will retain your data while your account is active or as necessary to provide you with our services. If you wish to delete your information, you can request it by emailing us at support@eternalmemoriesx.com.",
      "User Rights": "User Rights",
      "As a user of Eternal MemoriesX, you have the following rights:":
        "As a user of Eternal MemoriesX, you have the following rights:",
      "Access: You can request a copy of your personal data.":
        "Access: You can request a copy of your personal data.",
      "Correction: You have the right to correct inaccurate or incomplete information.":
        "Correction: You have the right to correct inaccurate or incomplete information.",
      "Deletion: You can ask us to delete your personal information.":
        "Deletion: You can ask us to delete your personal information.",
      "Restriction: You can request that we limit the use of your data in certain situations.":
        "Restriction: You can request that we limit the use of your data in certain situations.",
      "To exercise these rights, contact us at support@eternalmemoriesx.com.":
        "To exercise these rights, contact us at support@eternalmemoriesx.com.",
      "Memorial Profile Privacy": "Memorial Profile Privacy",
      "The memorial profiles you create can be set as public or private:":
        "The memorial profiles you create can be set as public or private:",
      "Public profiles will be visible to anyone who accesses the app.":
        "Public profiles will be visible to anyone who accesses the app.",
      "Private profiles will be restricted and accessible only to those you authorize.":
        "Private profiles will be restricted and accessible only to those you authorize.",
      "We recommend not including sensitive information in public profiles.":
        "We recommend not including sensitive information in public profiles.",
      "Use of Cookies": "Use of Cookies",
      "Our application uses cookies to enhance your user experience. Cookies are small files stored on your device that help us analyze app usage. You can disable cookies in your browser settings, although some features may be affected.":
        "Our application uses cookies to enhance your user experience. Cookies are small files stored on your device that help us analyze app usage. You can disable cookies in your browser settings, although some features may be affected.",
      "Changes to this Policy": "Changes to this Policy",
      "We may update this Privacy Policy occasionally. We will notify you of any changes by posting them in our app and, if necessary, sending you a notice by email. The last update date will appear at the end of this document.":
        "We may update this Privacy Policy occasionally. We will notify you of any changes by posting them in our app and, if necessary, sending you a notice by email. The last update date will appear at the end of this document.",
      Contact: "Contact",
      "If you have any questions, concerns, or wish to exercise your privacy rights, you can contact us at:":
        "If you have any questions, concerns, or wish to exercise your privacy rights, you can contact us at:",
      "Email: support@eternalmemoriesx.com":
        "Email: support@eternalmemoriesx.com",
      "Phone: [contact number, optional]": "Phone: [contact number, optional]",
      "Last updated:": "Last updated:",
      "Additional Notes": "Additional Notes",
      "If you plan to expand internationally or include users outside of Honduras, you may add a specific section on international data transfers.":
        "If you plan to expand internationally or include users outside of Honduras, you may add a specific section on international data transfers.",
      "If you use a hosting provider (such as AWS or Azure), mention that data is stored on secure servers, possibly located outside of Honduras.":
        "If you use a hosting provider (such as AWS or Azure), mention that data is stored on secure servers, possibly located outside of Honduras.",
      Name: "Name",
      Email: "Email",
      Country: "Country",
      "Phone (Optional)": "Phone (Optional)",
      "Enter your phone number": "Enter your phone number",
      "Enter your message here...": "Enter your message here...",
      Message: "Message",
      "Contact Us": "Contact Us",
      Send: "Send",
      "Sending...": "Sending...",
      "Adittional Settings": "Adittional Settings",
      "Contact Form": "Contact Form",
      Invoice: "Invoice",
      "Approval Number": "Approval Number",
      Date: "Date",
      "Cust. Email": "Cust. Email",
      "Invoice Number": "Invoice Number",
      Price: "Price",
      Description: "Description",
      "Type Plan": "Type Plan",
      "This transaction has expired.": "This transaction has expired.",
      "View Profiles": "View Profiles",
      "View Plans": "View Plans",
      "Checking the transaction status, please wait...":
        "Checking the transaction status, please wait...",
      "Loading...": "Loading...",
      Search: "Search",
      All: "All",
      "Full Name": "Full Name",
      Both: "Both",
      Gender: "Gender",
      Male: "Male",
      Female: "Female",
      "Cause of Death": "Cause of Death",
      "In Memory of Our Loved Ones": "In Memory of Our Loved Ones",
      "This page is dedicated to honoring and remembering those who have left an indelible mark on our lives.":
        "This page is dedicated to honoring and remembering those who have left an indelible mark on our lives.",
      "There's no results about this memorial...":
        "There's no results about this memorial...",
      "Load More": "Load More",
      "No remembered has made a post...": "No remembered has made a post...",
      "Discover the latest updates and stories shared by our users!":
        "Discover the latest updates and stories shared by our users!",
      "There's no news about the users for the moment...":
        "There's no news about the users for the moment...",
      "Select Plan": "Select Plan",
      "Pricing Plans": "Pricing Plans",
      Free: "Free",
      "Unlimited images": "Unlimited images",
      "Unlimited posts": "Unlimited posts",
      "Generate QR Code": "Generate QR Code",
      "for life": "for life",
      "Up to 6 images": "Up to 6 images",
      "Most Popular!": "Most Popular!",
      "No posts": "No posts",
      "Explore our flexible pricing options and find the plan that best suits your needs and budget.":
        "Explore our flexible pricing options and find the plan that best suits your needs and budget.",
      "N° of Premium Profiles": "N° of Premium Profiles",
      "The token provided is invalid. Please check and try again.":
        "The token provided is invalid. Please check and try again.",
      "Invalid Token": "Invalid Token",
      "Sign Up": "Sign Up",
      "Verifying your account, please wait...":
        "Verifying your account, please wait...",
      "We are processing your information to verify your account. This may take a few moments. Please do not close this window.":
        "We are processing your information to verify your account. This may take a few moments. Please do not close this window.",
      "Log In": "Log In",
      "Your account has been verified.": "Your account has been verified.",
      "Your account has been successfully verified. You can now access all available features.":
        "Your account has been successfully verified. You can now access all available features.",
      "Check your mailbox!": "Check your mailbox!",
      "We sent you a link to verify your email. Check your spam folder if you do not hear from us after a while.":
        "We sent you a link to verify your email. Check your spam folder if you do not hear from us after a while.",
      Location: "Location",
      Phone: "Phone",
      Hours: "Hours",
      "Live Support": "Live Support",
      "Not a member?": "Not a member?",
      "Register now": "Register now",
      "Hello Again!": "Hello Again!",
      "Enter username": "Enter username",
      "Enter email": "Enter email",
      Password: "Password",
      "Sign In": "Sign In",
      "Or continue with": "Or continue with",
      "Recovery Password": "Recovery Password",
      "Welcome back you've been missed!": "Welcome back you've been missed!",
      "Sign in with Google": "Sign in with Google",
      "Already a member?": "Already a member?",
      "Sign in now": "Sign in now",
      "Repeat Password": "Repeat Password",
      "Welcome to Eternal MemoriesX - Let's create your account":
        "Welcome to Eternal MemoriesX - Let's create your account",
      "Sign up with Google": "Sign up with Google",
      "Thank you for your purchase! You now have":
        "Thank you for your purchase! You now have",
      "available. Click “Start” to begin": "available. Click “Start” to begin",
      "and sharing the memories that matter most.":
        "and sharing the memories that matter most.",
      "customizing it": "customizing it",
      "customizing them": "customizing them",
      profiles: "profiles",
      profile: "profile",
      new: "new",
      Start: "Start",
      "There's no profiles yet...": "There's no profiles yet...",
      "About us": "About us",
      "At Eternal MemoriesX, we are a team of four developers passionate about creating meaningful digital solutions.":
        "At Eternal MemoriesX, we are a team of four developers passionate about creating meaningful digital solutions.",
      "Our story began while working on independent projects for clients, where we were often asked for examples of our work or a personal portfolio. Although we had experience and achievements to showcase, we realized we didn’t have a project of our own that fully reflected our skills and creativity.":
        "Our story began while working on independent projects for clients, where we were often asked for examples of our work or a personal portfolio. Although we had experience and achievements to showcase, we realized we didn’t have a project of our own that fully reflected our skills and creativity.",
      "That search led us to reflect on what we could create that would not only be useful but also have a positive impact on people. This is how the idea for Eternal Memories was born—a platform to preserve and honor the memories of those who have passed away. We believe every story deserves to be remembered and shared, and our goal is to provide a space where memories can transcend time.":
        "That search led us to reflect on what we could create that would not only be useful but also have a positive impact on people. This is how the idea for Eternal Memories was born—a platform to preserve and honor the memories of those who have passed away. We believe every story deserves to be remembered and shared, and our goal is to provide a space where memories can transcend time.",
      "Our commitment is to combine technology and innovation to deliver an intuitive and meaningful experience. Eternal Memories is more than just an app; it is a tribute to human legacy, created from the heart by people who understand the importance of keeping memories alive.":
        "Our commitment is to combine technology and innovation to deliver an intuitive and meaningful experience. Eternal Memories is more than just an app; it is a tribute to human legacy, created from the heart by people who understand the importance of keeping memories alive.",
      "Sign out": "Sign out",
      "Create memorial": "Create memorial",
      GenerateQRCode: "Generate QR Code",
      "Honor and preserve the memories of your loved ones who have passed away": "Honor and preserve the memories of your loved ones who have passed away",
    },
  },
  es: {
    translation: {
      "Honor and preserve the memories of your loved ones who have passed away": "Honra y preserva los recuerdos de tus seres queridos que han partido",
      "Create memorial": "Crear memorial",
      "Sign out": "Cerrar sesión",
      "Our commitment is to combine technology and innovation to deliver an intuitive and meaningful experience. Eternal Memories is more than just an app; it is a tribute to human legacy, created from the heart by people who understand the importance of keeping memories alive.":
        "Nuestro compromiso es combinar tecnología e innovación para ofrecer una experiencia intuitiva y significativa. Eternal Memories es más que una aplicación; es un homenaje al legado humano, creado desde el corazón por personas que entienden la importancia de mantener vivos los recuerdos.",
      "That search led us to reflect on what we could create that would not only be useful but also have a positive impact on people. This is how the idea for Eternal Memories was born—a platform to preserve and honor the memories of those who have passed away. We believe every story deserves to be remembered and shared, and our goal is to provide a space where memories can transcend time.":
        "Esa búsqueda nos llevó a reflexionar sobre qué podríamos construir que no solo fuera útil, sino que también tuviera un impacto positivo en las personas. Así nació la idea de Eternal Memories, una plataforma para preservar y honrar los recuerdos de quienes han partido. Creemos que cada historia merece ser recordada y compartida, y nuestro objetivo es proporcionar un espacio donde las memorias trasciendan el tiempo.",
      "Our story began while working on independent projects for clients, where we were often asked for examples of our work or a personal portfolio. Although we had experience and achievements to showcase, we realized we didn’t have a project of our own that fully reflected our skills and creativity.":
        "Nuestra historia comenzó mientras trabajábamos en proyectos independientes para clientes, donde nos pedían con frecuencia ejemplos de nuestro trabajo o un portafolio personal. Aunque teníamos experiencia y logros para mostrar, notamos que no contábamos con un proyecto propio que reflejara plenamente nuestras habilidades y creatividad.",
      "At Eternal MemoriesX, we are a team of four developers passionate about creating meaningful digital solutions.":
        "En Eternal MemoriesX, somos un equipo de cuatro desarrolladores apasionados por crear soluciones digitales significativas.",
      "About us": "Sobre nosotros",
      Start: "Empezar",
      "There's no profiles yet...": "Aún no hay perfiles...",
      new: "nuevos",
      profiles: "perfiles",
      profile: "perfil",
      "customizing them": "personalizarlos",
      "customizing it": "personalizarlo",
      "and sharing the memories that matter most.":
        "y compartir los recuerdos que más importan.",
      "available. Click “Start” to begin":
        "disponibles. Haz clic en “Comenzar” para empezar a",
      "Thank you for your purchase! You now have":
        "¡Gracias por tu compra! Ahora tienes",
      "Sign up with Google": "Registrarse con Google",
      "Repeat Password": "Repetir Contraseña",
      "Enter email": "Introduce el correo electrónico",
      "Welcome to Eternal MemoriesX - Let's create your account":
        "Bienvenido a Eternal MemoriesX - Vamos a crear tu cuenta",
      "Sign in now": "Iniciar sesión ahora",
      "Already a member?": "¿Ya eres miembro?",
      "Sign in with Google": "Iniciar sesión con Google",
      "Or continue with": "O continúa con",
      "Sign In": "Iniciar Sesión",
      "Recovery Password": "Recuperar Contraseña",
      Password: "Contraseña",
      "Enter username": "Introduce el nombre del usuario",
      "Welcome back you've been missed!":
        "¡Bienvenido de nuevo, te extrañamos!",
      "Hello Again!": "¡Hola De Nuevo!",
      "Register now": "Regístrate ahora",
      "Not a member?": "¿No eres miembro?",
      "Live Support": "Atención al Cliente",
      Hours: "Horarios",
      Phone: "Teléfono",
      Location: "Ubicación",
      "We sent you a link to verify your email. Check your spam folder if you do not hear from us after a while.":
        "Te enviamos un enlace para verificar tu correo electrónico. Si no recibes noticias nuestras después de un tiempo, revisa tu carpeta de spam.",
      "Check your mailbox!": "¡Revisa tu correo!",
      "Your account has been verified.": "Tu cuenta ha sido verificada.",
      "Your account has been successfully verified. You can now access all available features.":
        "Tu cuenta se ha verificado exitosamente. Ahora puedes acceder a todas las funciones disponibles.",
      "Log In": "Iniciar Sesión",
      "We are processing your information to verify your account. This may take a few moments. Please do not close this window.":
        "Estamos procesando la información para verificar tu cuenta. Esto puede tomar unos momentos. Por favor, no cierres esta ventana.",
      "Verifying your account, please wait...":
        "Verificando tu cuenta, espera por favor...",
      "Sign Up": "Registrarse",
      "Invalid Token": "Token Inválido",
      "The token provided is invalid. Please check and try again.":
        "El token proporcionado no es válido. Por favor, verifica e inténtalo de nuevo.",
      "N° of Premium Profiles": "Nº de Perfiles Premium",
      "No posts": "Sin publicaciones",
      "Up to 6 images": "Hasta 6 imágenes",
      "Generate QR Code": "Generar Código QR",
      "Unlimited posts": "Publicaciones ilimitadas",
      "Unlimited images": "Imágenes ilimitadas",
      Condolences: "Condolencias",
      "Most Popular!": "¡Más Popular!",
      "for life": "de por vida",
      Free: "Gratis",
      "Pricing Plans": "Planes de Precios",
      "Explore our flexible pricing options and find the plan that best suits your needs and budget.":
        "Explora nuestras opciones de precios flexibles y encuentra el plan que mejor se adapte a tus necesidades y presupuesto.",
      "Select Plan": "Seleccionar Plan",
      "There's no news about the users for the moment...":
        "No hay noticias de los usuarios por el momento...",
      "Load More": "Cargar Más",
      "Discover the latest updates and stories shared by our users!":
        "¡Descubre las últimas actualizaciones e historias compartidas por nuestros usuarios!",
      "No remembered has made a post...":
        "No se ha realizado ninguna publicación por parte de los recordados...",
      "Stay updated with the latest news of the users!":
        "¡Mantente actualizado con las últimas noticias de los usuarios!",
      "There's no results about this memorial...":
        "No hay resultados sobre este memorial...",
      Male: "Masculino",
      Female: "Femenino",
      "Cause of Death": "Causa de Muerte",
      Both: "Ambos",
      Gender: "Género",
      "Full Name": "Nombre Completo",
      Search: "Buscar",
      All: "Todos",
      "This page is dedicated to honoring and remembering those who have left an indelible mark on our lives.":
        "Esta página está dedicada a honrar y recordar a aquellos que han dejado una huella imborrable en nuestras vidas.",
      "In Memory of Our Loved Ones": "En Memoria de Nuestros Seres Queridos",
      "Loading...": "Cargando...",
      "Checking the transaction status, please wait...":
        "Comprobando el estado de la transacción, por favor, espere...",
      "View Plans": "Ver Planes",
      "View Profiles": "Ver Perfiles",
      "This transaction has expired.": "Esta transacción ha expirado.",
      "Type Plan": "Tipo de Plan",
      Description: "Descripción",
      Price: "Precio",
      "Invoice Number": "N° Comprobante",
      "Cust. Email": "Email",
      Date: "Fecha",
      "Approval Number": "N° Aprobación",
      Invoice: "Factura",
      "Contact Form": "Formulario de Contacto",
      "Adittional Settings": "Ajustes Adicionales",
      "Sign in": "Iniciar sesión",
      "Enter your message here...": "Ingresa tu mensaje aquí...",
      Message: "Mensaje",
      "Contact Us": "Contáctanos",
      Send: "Enviar",
      "Sending...": "Enviando...",
      "Enter your phone number": "Ingresa tu número de teléfono",
      Name: "Nombre",
      Email: "Correo Electrónico",
      Country: "País",
      "Phone (Optional)": "Teléfono (Opcional)",
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
      "All rights to the design, content, and functionality of the platform are owned by Eternal MemoriesX. Users retain rights to the content they upload, but grant the platform a limited license to display it within the services.":
        " Todos los derechos sobre el diseño, contenido, y funcionalidad de la plataforma son propiedad de Eternal MemoriesX. Los usuarios conservan los derechos sobre el contenido que suban, pero otorgan a la plataforma una licencia limitada para mostrarlo dentro de los servicios.",
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
      "These terms will be governed by the laws of Honduras, and any disputes will be resolved in the courts of El Progreso, Yoro.":
        "Estos términos se regirán por las leyes de Honduras y cualquier disputa será resuelta en los tribunales de El Progreso, Yoro.",
      "If you have any questions or concerns about these terms, you can contact us at [email address].":
        "Si tienes alguna pregunta o inquietud sobre estos términos, puedes contactarnos en support@eternalmemoriesx.com.",
      "Discover Us": "Descubrénos",
      "About Us": "Sobre Nosotros",
      "Privacy Policy": "Política de Privacidad",
      "At Eternal MemoriesX, we are committed to protecting your privacy and ensuring that your personal data is handled securely and responsibly. By using our platform, you agree to this Privacy Policy, which explains how we collect, use, protect, and share your information.":
        "En Eternal MemoriesX, nos comprometemos a proteger tu privacidad y garantizar que tus datos personales sean tratados de manera segura y responsable. Al usar nuestra plataforma, aceptas esta Política de Privacidad, la cual explica cómo recopilamos, usamos, protegemos y compartimos tu información.",
      "Information We Collect": "Información que Recopilamos",
      "When you use our application, we may collect the following categories of data":
        "Cuando usas nuestra aplicación, podemos recopilar las siguientes categorías de datos",
      "Personal Information: Name, email, contact details, and payment information (in case of subscriptions).":
        "Información Personal: Nombre, correo electrónico, datos de contacto y detalles de pago (en caso de suscripciones).",
      "Memorial Profile Information: Names, birth and death dates, images, and tributes.":
        "Información de los Perfiles Memoriales: Nombres, fechas de nacimiento y fallecimiento, imágenes, y tributos.",
      "Browsing Data: IP address, browser type, device used, and app usage statistics.":
        "Datos de navegación: Dirección IP, tipo de navegador, dispositivo utilizado y estadísticas de uso de la aplicación.",
      "How We Use Your Information": "Cómo Usamos Tu Información",
      "The information we collect is used to:":
        "La información que recopilamos se utiliza para:",
      "Provide and improve the services offered in our app.":
        "Proporcionar y mejorar los servicios ofrecidos en nuestra aplicación.",
      "Manage your account, subscriptions, and features such as uploading images or tributes.":
        "Gestionar tu cuenta, suscripciones y funcionalidades, como subir imágenes o tributos.",
      "Ensure the security of the platform and prevent misuse.":
        "Garantizar la seguridad de la plataforma y prevenir usos indebidos.",
      "Send important notifications, such as service updates or reminders.":
        "Enviar notificaciones importantes, como actualizaciones del servicio o recordatorios.",
      "Data Sharing": "Compartición de Datos",
      "We do not share your personal data with third parties, except in the following situations:":
        "No compartimos tus datos personales con terceros, excepto en las siguientes situaciones:",
      "External Service Providers: We use services such as PayPal or Stripe to securely process payments.":
        "Proveedores de servicios externos: Utilizamos servicios como PayPal o Stripe para procesar pagos de manera segura.",
      "Legal Requirements: If requested by any authority in accordance with the law.":
        "Requerimientos legales: Si alguna autoridad lo solicita conforme a la ley.",
      "User Consent: When you explicitly authorize us to share your information.":
        "Consentimiento del usuario: Cuando nos autorizas explícitamente a compartir tu información.",
      "Data Security": "Seguridad de los Datos",
      "We have implemented technical and organizational measures to protect your personal information against unauthorized access, loss, alteration, or disclosure. However, no security system is completely infallible. We recommend using strong passwords and keeping your information confidential.":
        "Hemos implementado medidas técnicas y organizativas para proteger tu información personal contra accesos no autorizados, pérdida, alteración o divulgación. Sin embargo, ningún sistema de seguridad es completamente infalible. Te recomendamos usar contraseñas seguras y mantener tu información confidencial.",
      "Data Retention": "Retención de Datos",
      "We will retain your data while your account is active or as necessary to provide you with our services. If you wish to delete your information, you can request it by emailing us at support@eternalmemoriesx.com.":
        "Mantendremos tus datos mientras tu cuenta esté activa o mientras sea necesario para proporcionarte nuestros servicios. Si deseas eliminar tu información, puedes solicitarlo enviándonos un correo a support@eternalmemoriesx.com.",
      "User Rights": "Derechos del Usuario",
      "As a user of Eternal MemoriesX, you have the following rights:":
        "Como usuario de Eternal MemoriesX, tienes los siguientes derechos:",
      "Access: You can request a copy of your personal data.":
        "Acceso: Puedes solicitar una copia de tus datos personales.",
      "Correction: You have the right to correct inaccurate or incomplete information.":
        "Corrección: Tienes derecho a corregir información inexacta o incompleta.",
      "Deletion: You can ask us to delete your personal information.":
        "Eliminación: Puedes pedirnos que eliminemos tu información personal.",
      "Restriction: You can request that we limit the use of your data in certain situations.":
        "Restricción: Puedes solicitar que limitemos el uso de tus datos en ciertas situaciones.",
      "To exercise these rights, contact us at support@eternalmemoriesx.com.":
        "Para ejercer estos derechos, contáctanos en support@eternalmemoriesx.com.",
      "Memorial Profile Privacy": "Privacidad en Perfiles Memoriales",
      "The memorial profiles you create can be set as public or private:":
        "Los perfiles memoriales que creas pueden configurarse como públicos o privados:",
      "Public profiles will be visible to anyone who accesses the app.":
        "Los perfiles públicos estarán visibles para cualquier persona que acceda a la aplicación.",
      "Private profiles will be restricted and accessible only to those you authorize.":
        "Los perfiles privados estarán restringidos y solo accesibles a las personas que tú autorices.",
      "We recommend not including sensitive information in public profiles.":
        "Te recomendamos no incluir información sensible en perfiles públicos.",
      "Use of Cookies": "Uso de Cookies",
      "Our application uses cookies to enhance your user experience. Cookies are small files stored on your device that help us analyze app usage. You can disable cookies in your browser settings, although some features may be affected.":
        "Nuestra aplicación utiliza cookies para mejorar tu experiencia de usuario. Las cookies son pequeños archivos que se almacenan en tu dispositivo y nos ayudan a analizar el uso de la aplicación. Puedes desactivar las cookies desde la configuración de tu navegador, aunque algunas funciones podrían verse afectadas.",
      "Changes to this Policy": "Cambios en esta Política",
      "We may update this Privacy Policy occasionally. We will notify you of any changes by posting them in our app and, if necessary, sending you a notice by email. The last update date will appear at the end of this document.":
        "Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos cualquier cambio publicándolo en nuestra aplicación y, si es necesario, enviándote un aviso por correo electrónico. La fecha de la última actualización aparecerá al final de este documento.",
      "If you have any questions, concerns, or wish to exercise your privacy rights, you can contact us at:":
        "Si tienes preguntas, inquietudes o deseas ejercer tus derechos relacionados con la privacidad, puedes contactarnos en:",
      "Email: support@eternalmemoriesx.com":
        "Correo Electrónico: support@eternalmemoriesx.com",
      "Phone: [contact number, optional]":
        "Teléfono: [número de contacto, opcional]",
      "Last updated:": "Última actualización:",
      "Additional Notes": "Notas Adicionales",
      "If you plan to expand internationally or include users outside of Honduras, you may add a specific section on international data transfers.":
        "Si planeas expandirte internacionalmente o incluir usuarios de fuera de Honduras, puedes agregar una sección específica sobre transferencias internacionales de datos.",
      "If you use a hosting provider (such as AWS or Azure), mention that data is stored on secure servers, possibly located outside of Honduras.":
        "Si usas un proveedor de alojamiento (como AWS o Azure), menciona que los datos se almacenan en servidores seguros, posiblemente ubicados fuera de Honduras.",
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

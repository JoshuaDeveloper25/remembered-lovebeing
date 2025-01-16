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
      "Find the memorial of a family member or friend. Leave memories or comments.":
        "Find the memorial of a family member or friend. Leave memories or comments.",
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
      "Ability to upload up to 6 images in the gallery.":
        "Ability to upload up to 6 images in the gallery.",
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
      "We reserve the right to suspend or delete accounts that violate the application's terms of use.":
        "We reserve the right to suspend or delete accounts that violate the application's terms of use.",
      "Changes to Terms": "Changes to Terms",
      "These terms may be modified at any time. Changes will be notified to users via the application and will take effect immediately.":
        "These terms may be modified at any time. Changes will be notified to users via the application and will take effect immediately.",
      "Applicable Law and Jurisdiction": "Applicable Law and Jurisdiction",
      "These terms will be governed by the laws of Honduras, and any disputes will be resolved in the courts of El Progreso, Yoro.":
        "These terms will be governed by the laws of Honduras, and any disputes will be resolved in the courts of El Progreso, Yoro.",
      "If you have any questions or concerns about these terms, you can contact us at support@eternalmemoriesx.com.":
        "If you have any questions or concerns about these terms, you can contact us at support@eternalmemoriesx.com.",
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
        "We will retain your data while your account is active or as necessary to provide our services. If you want to delete your information, you can request it by emailing us at support@eternalmemoriesx.com.",
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
        "To exercise these rights, contact us at support@eternalmemoriesx.com.",
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
      Email: "Email: support@eternalmemoriesx.com",
      Phone: "Phone: [contact number, optional]",
      "Last Update": "Last updated:",
      "Privacy Policy": "Privacy Policy",
      "At Eternal MemoriesX, we are committed to protecting your privacy and ensuring that your personal data is handled securely and responsibly. By using our platform, you agree to this Privacy Policy, which explains how we collect, use, protect, and share your information.":
        "At Eternal MemoriesX, we are committed to protecting your privacy and ensuring that your personal data is handled securely and responsibly. By using our platform, you agree to this Privacy Policy, which explains how we collect, use, protect, and share your information.",
      "Information We Collect": "Information We Collect",
      "When you use our application, we may collect the following categories of data":
        "When you use our application, we may collect the following categories of data",
      "Personal Information: Name, email, and contact details.":
        "Personal Information: Name, email, and contact details.",
      "Memorial Profile Information: Names, birth and death dates, images, and tributes.":
        "Memorial Profile Information: Names, birth and death dates, images, and tributes.",
      "Browsing Data: Browser type, device used, and app usage statistics.":
        "Browsing Data: Browser type, device used, and app usage statistics.",
      "How We Use Your Information": "How We Use Your Information",
      "The information we collect is used to:":
        "The information we collect is used to:",
      "Provide and improve the services offered in our app.":
        "Provide and improve the services offered in our app.",
      "Manage your account, features such as uploading images or tributes.":
        "Manage your account, features such as uploading images or tributes.",
      "Ensure the security of the platform and prevent misuse.":
        "Ensure the security of the platform and prevent misuse.",
      "Send important notifications, such as service updates or reminders.":
        "Send important notifications, such as service updates or reminders.",
      "Data Sharing": "Data Sharing",
      "We do not share your personal data with third parties, except in the following situations:":
        "We do not share your personal data with third parties, except in the following situations:",
      "External Service Providers: We use services such as PayPal or Pagadito to securely process payments.":
        "External Service Providers: We use services such as PayPal or Pagadito to securely process payments.",
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
      "Honor and preserve the memories of your loved ones who have passed away":
        "Honor and preserve the memories of your loved ones who have passed away",
      "Your invoice has been sent by email. If you can't find it in your inbox, please check your spam.":
        "Your invoice has been sent by email. If you can't find it in your inbox, please check your spam.",
      Updates: "Updates",
      "Copied to clipboard!": "Copied to clipboard!",
      "In loving memory of...": "In loving memory of...",
      View: "View",
      "Select country": "Select country",
      "Select cause of death": "Select cause of death",
      "Select a gender": "Select a gender",
      "Prefer not to say": "Prefer not to say",
      "COVID-19 victim": "COVID-19 victim",
      "Substance abuse victim": "Substance abuse victim",
      "Cancer victim": "Cancer victim",
      "Victim of an accident": "Victim of an accident",
      "Crime victim": "Crime victim",
      "Heart attack": "Heart attack",
      "No options available...": "No options available...",
      "Data and Image Storage": "Data and Image Storage",
      "Photos and other files uploaded to our application are securely stored on Amazon Web Services (AWS) servers, a platform recognized for its high security and international standards. These servers may be located outside of Honduras, ensuring the protection and accessibility of your data at all times.":
        "Photos and other files uploaded to our application are securely stored on Amazon Web Services (AWS) servers, a platform recognized for its high security and international standards. These servers may be located outside of Honduras, ensuring the protection and accessibility of your data at all times.",
      Email: "Email",
      Created: "Created",
      "No Image Available": "No Image Available",
      "See more...": "See more...",
      "Users that liked this post...": "Users that liked this post...",
      "Leave a heart": "Leave a heart",
      "You left a heart": "You left a heart",
      "Leave a comment": "Leave a comment",
      "Comment something...": "Comment something...",
      "Want to comment something?": "Want to comment something?",
      Please: "Please",
      "log in": "log in",
      "to leave one!": "to leave one!",
      "No comments added yet...": "No comments added yet...",
      Save: "Save",
      "Saving...": "Saving...",
      Edit: "Edit",
      Delete: "Delete",
      Comments: "Comments",
      "comment updated": "comment updated",
      "new comment": "new comment",
      "post created": "post created",
      "image added": "image added",
      "image updated": "image updated",
      "profile created": "profile created",
      "post updated": "post updated",
      "tribute created": "tribute created",
      Posts: "Posts",
      "Create special posts with meaningful images of your loved ones, allowing others to leave comments and hearts as a token of affection and support.":
        "Create special posts with meaningful images of your loved ones, allowing others to leave comments and hearts as a token of affection and support.",
      "QR Code": "QR Code",
      "Generate a unique QR code for easy access to the memorial profile, perfect for placing on meaningful objects such as:":
        "Generate a unique QR code for easy access to the memorial profile, perfect for placing on meaningful objects such as:",
      "T-shirts": "T-shirts",
      Urn: "Urn",
      Headstone: "Headstone",
      "Single Package": "Single Package",
      "Tertiary Package": "Tertiary Package",
      "Birth Place": "Birth Place",
      "No Country": "No Country",
      "No Country...": "No Country...",
      "Select currency": "Select currency",
      "Not Found": "Not Found",
      "Page Not Found": "Page Not Found",
      "Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or never existed in the first place. Please check the URL or go back to the homepage.":
        "Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or never existed in the first place. Please check the URL or go back to the homepage.",
      "The URL has been altered!": "The URL has been altered!",
      "Go Prices": "Go Prices",
      "New Updates": "New Updates",
      "Keep up with the latest changes and what's coming next!":
        "Keep up with the latest changes and what's coming next!",
      "Future Mobile App Transition: Android & iOS":
        "Future Mobile App Transition: Android & iOS",
      "If you’re a mobile phone user, you’ll soon be able to enjoy the full experience of our app on your Android and iOS devices. Stay tuned for a seamless and smooth transition to your favorite platform, featuring enhanced features and optimized performance for mobile.":
        "If you’re a mobile phone user, you’ll soon be able to enjoy the full experience of our app on your Android and iOS devices. Stay tuned for a seamless and smooth transition to your favorite platform, featuring enhanced features and optimized performance for mobile.",
      Profiles: "Profiles",
      "Invite your loved ones to manage this memorial profile":
        "Invite your loved ones to manage this memorial profile",
      "Allow your loved ones to help manage and keep the memorial profile alive.":
        "Allow your loved ones to help manage and keep the memorial profile alive.",
      "Reminder on their death anniversary for profile followers":
        "Reminder on their death anniversary for profile followers",
      "Receive an email message on their death anniversary to remember and honor their memory in a special way.":
        "Receive an email message on their death anniversary to remember and honor their memory in a special way.",
      "Profiles Management": "Profiles Management",
      "Upgrade your profile to PRO for FREE using your purchased Premium packages":
        "Upgrade your profile to PRO for FREE using your purchased Premium packages",
      "If you’ve already purchased Premium packages, you can use those benefits to upgrade your free profile to Pro without making an additional purchase. Make the most of your purchases and enhance your experience.":
        "If you’ve already purchased Premium packages, you can use those benefits to upgrade your free profile to Pro without making an additional purchase. Make the most of your purchases and enhance your experience.",
      Phone: "Phone",
      "Check Mail Box": "Check Mail Box",
      "Pagadito Status": "Pagadito Status",
      "Go to My Profiles": "Go to My Profiles",
      Description: "Description",
      "Type Plan": "Type Plan",
      Price: "Price",
      "Making FREE profile to PRO": "Making FREE profile to PRO",
      Single: "Single",
      Tertiary: "Tertiary",
      "TertiaryPackage Premium": "TertiaryPackage Premium",
      "SinglePackage Premium": "SinglePackage Premium",
      "The transaction has not been completed.":
        "The transaction has not been completed.",
      "Transaction completed successfully.":
        "Transaction completed successfully.",
      "The transaction has expired.": "The transaction has expired.",
      "Check Out": "Check Out",
      "Purchase of SinglePackage (Includes 1 Premium Profile)":
        "Purchase of SinglePackage (Includes 1 Premium Profile)",
      "Purchase of TertiaryPackage (Includes 3 Premium Profiles)":
        "Purchase of TertiaryPackage (Includes 3 Premium Profiles)",
      "Select a payment method": "Select a payment method",
      "Pay with a card": "Pay with a card",
      "Continue With A Card": "Continue With A Card",
      "Pay with Paypal": "Pay with Paypal",
      "Paying in Eternal MemoriesX": "Paying in Eternal MemoriesX",
      "Upgrading FREE profile to PRO": "Upgrading FREE profile to PRO",
      "In Loving Memory Of": " In Loving Memory Of",
      "User hasn't input a date...": "User hasn't input a date...",
      Lived: "Lived",
      Verified: "Verified",
      "Paypal Payment Success": "Paypal Payment Success",
      Home: "Home",
      "Remembered Profile": "Remembered Profile",
      "Terms & Conditions": "Terms & Conditions",
      "Your browser does not support HTML video.":
        "Your browser does not support HTML video.",
      "Profile Settings": "Profile Settings",
      "My Settings": "My Settings",
      "Create Pro Profile": "Create Pro Profile",
      "Create a full-featured memorial profile with no limits. Pro profiles remaining:":
        "Create a full-featured memorial profile with no limits. Pro profiles remaining:",
      "See Plans": "See Plans",
      "Premium profiles available": "Premium profiles available",
      "Create Free Profile": "Create Free Profile",
      "Create a memorial profile at no cost, with some feature limits.":
        "Create a memorial profile at no cost, with some feature limits.",
      "Input First Name": "Input First Name",
      "Middle Name (Optional)": "Middle Name (Optional)",
      "Input Middle Name": "Input Middle Name",
      "Last Name": "Last Name",
      "Input Last Name": "Input Last Name",
      Relationship: "Relationship",
      "-- Select --": "-- Select --",
      "First Name": "First Name",
      "New Profile": "New Profile",
      Dad: "Dad",
      Mom: "Mom",
      Son: "Son",
      Sister: "Sister",
      Stepsister: "Stepsister",
      Stepbrother: "Stepbrother",
      Brother: "Brother",
      Daughter: "Daughter",
      Grandmother: "Grandmother",
      Grandfather: "Grandfather",
      "Memorial web address": "Memorial web address",
      "Example: Jennifer Ramírez": "Example: Jennifer Ramírez",
      Preview: "Preview",
      Add: "Add",
      "Adding...": "Adding...",
      Cancel: "Cancel",
      "Change Your Profile Photo": "Change Your Profile Photo",
      "Update your profile image with a new photo.":
        "Update your profile image with a new photo.",
      Navigation: "Navigation",
      "Explore all your profiles.": "Explore all your profiles.",
      Favourites: "Favourites",
      "Find your favorites quickly.": "Find your favorites quickly.",
      "Change Profile Image": "Change Profile Image",
      "Uploading Files...": "Uploading Files...",
      "Upload File": "Upload File",
      "Change Cover Image": "Change Cover Image",
      "Upload a file": "Upload a file",
      "Attach the file below": "Attach the file below",
      "Choose photo": "Choose photo",
      "Drag file(s) here to upload": "Drag file(s) here to upload",
      "Alternatively, you can select a file by":
        "Alternatively, you can select a file by",
      "Browse a file": "Browse a file",
      "Change Image": "Change Image",
      "Premium profiles": "Premium profiles",
      remaining: "remaining",
      available: "available",
      Media: "Media",
      "SEE PLANS": "SEE PLANS",
      "Member since": "Member since",
      Pos: "Pos",
    },
  },
  es: {
    translation: {
      Pos: "Publi",
      "Member since": "Miembro desde",
      Media: "Medios",
      "SEE PLANS": "VER PLANES",
      available: "disponibles",
      remaining: "restantes",
      "Premium profiles": "Perfiles Premium",
      "Change Image": "Cambiar Imagen",
      "Browse a file": "Buscar un archivo",
      "Alternatively, you can select a file by":
        "Alternativamente, puedes seleccionar un archivo haciendo clic en",
      "Drag file(s) here to upload":
        "Arrastra el/los archivo(s) aquí para subir",
      "Choose photo": "Selecciona una foto",
      "Attach the file below": "Adjunta el archivo abajo",
      "Upload a file": "Sube un archivo",
      "Change Cover Image": "Cambiar Imagen de Portada",
      "Upload File": "Subir Archivo",
      "Uploading Files...": "Subiendo Archivos...",
      "Change Profile Image": "Cambiar Imagen de Perfil",
      "Find your favorites quickly.": "Encuentra tus favoritos rápidamente.",
      Favourites: "Favoritos",
      "Explore all your profiles.": "Explora todos tus perfiles.",
      Navigation: "Navegación",
      "Update your profile image with a new photo.":
        "Actualiza la imagen de tu perfil con una nueva foto.",
      "Change Your Profile Photo": "Cambia Tu Foto de Perfil",
      Cancel: "Cancelar",
      Add: "Agregar",
      "Adding...": "Agregándose...",
      Preview: "Vista Previa",
      "Example: Jennifer Ramírez": "Ejemplo: Jennifer Ramírez",
      "Memorial web address": "Dirección web del memorial",
      Dad: "Papa",
      Mom: "Mama",
      Son: "Hijo",
      Sister: "Hermana",
      Stepsister: "Hermanastra",
      Stepbrother: "Hermanastro",
      Brother: "Hermano",
      Daughter: "Hija",
      Grandmother: "Abuela",
      Grandfather: "Abuelo",
      "New Profile": "Nuevo Perfil",
      "First Name": "Primer Nombre",
      "-- Select --": "-- Seleccione --",
      Relationship: "Relación",
      "Input Last Name": "Ingresa el Apellido",
      "Last Name": "Apellido",
      "Input Middle Name": "Ingresa el Segundo Nombre",
      "Middle Name (Optional)": "Segundo Nombre (Opcional)",
      "Input First Name": "Ingresa el Primer Nombre",
      "Create a memorial profile at no cost, with some feature limits.":
        "Crea un perfil memorial sin costo, con algunos límites en las funciones.",
      "Create Free Profile": "Crear Perfil Gratis",
      "Premium profiles available": "Perfiles Premium disponibles",
      "See Plans": "Ver Planes",
      "Create a full-featured memorial profile with no limits. Pro profiles remaining:":
        "Crea un perfil memorial completo con todas las funciones y sin límites. Perfiles PRO restantes:",
      "Create Pro Profile": "Crear Perfil Pro",
      "My Settings": "Mis Ajustes",
      "Profile Settings": "Ajustes de Perfil",
      "Your browser does not support HTML video.":
        "Tu navegador no soporta video HTML",
      "Terms & Conditions": "Términos y Condiciones",
      "Remembered Profile": "Perfil de Recordado",
      Home: "Inicio",
      "Paypal Payment Success": "Pago de PayPal Exitoso",
      Verified: "Verificado",
      Lived: "Vivió",
      "User hasn't input a date...":
        "El usuario no ha introducido una fecha...",
      "In Loving Memory Of": " Con Amor Y Respeto Hacia",
      "Upgrading FREE profile to PRO": "Actualizando perfil GRATIS a PRO",
      "Paying in Eternal MemoriesX": "Pagando en Eternal MemoriesX",
      "Pay with Paypal": "Pagar con Paypal",
      "Continue With A Card": "Continuar Con Una Tarjeta",
      "Pay with a card": "Pagar con una tarjeta",
      "Select a payment method": "Selecciona un método de pago",
      "Purchase of TertiaryPackage (Includes 3 Premium Profiles)":
        "Compra De PaqueteDe3 (Incluye 3 Perfiles Premium)",
      "Purchase of SinglePackage (Includes 1 Premium Profile)":
        "Compra De PaqueteDe1 (Incluye 1 Perfil Premium)",
      "Check Out": "Proceso de Pago",
      "The transaction has expired.": "La transacción ha expirado.",
      "Transaction completed successfully.":
        "Transacción realizada correctamente.",
      "The transaction has not been completed.":
        "La transacción no se ha completado.",
      "TertiaryPackage Premium": "PaqueteDe3 Premium",
      "SinglePackage Premium": "PaqueteDe1 Premium",
      Single: "De 1",
      Tertiary: "De 3",
      "Making FREE profile to PRO": "Pasando perfil GRATIS a PRO",
      Description: "Descripción",
      "Type Plan": "Tipo de Plan",
      Price: "Precio",
      "Go to My Profiles": "Ve a Mis Perfiles",
      "Pagadito Status": "Estado de Pagadito",
      "Check Mail Box": "Revisa tu correo",
      Phone: "Teléfono",
      "If you’ve already purchased Premium packages, you can use those benefits to upgrade your free profile to Pro without making an additional purchase. Make the most of your purchases and enhance your experience.":
        "Si ya has adquirido paquetes Premium, puedes usar esos beneficios para actualizar tu perfil gratuito a Pro, sin necesidad de realizar una compra adicional. Aprovecha al máximo tus compras y mejora tu experiencia.",
      "Upgrade your profile to PRO for FREE using your purchased Premium packages":
        "Actualiza tu perfil GRATIS a PRO usando tus paquetes Premium adquiridos",
      "Profiles Management": "Gestión de Perfiles",
      "Receive an email message on their death anniversary to remember and honor their memory in a special way.":
        "Recibe un mensaje por correo electrónico en el aniversario de su fallecimiento, para recordar y honrar su memoria de una forma especial.",
      "Reminder on their death anniversary for profile followers":
        "Recordatorio en su aniversario de fallecimiento para seguidores del perfil",
      "Allow your loved ones to help manage and keep the memorial profile alive.":
        "Permite que tus seres queridos ayuden a gestionar y mantener vivo el perfil conmemorativo.",
      "Invite your loved ones to manage this memorial profile":
        "Invita a tus seres queridos a gestionar este perfil conmemorativo",
      Profiles: "Perfiles",
      "If you’re a mobile phone user, you’ll soon be able to enjoy the full experience of our app on your Android and iOS devices. Stay tuned for a seamless and smooth transition to your favorite platform, featuring enhanced features and optimized performance for mobile.":
        "Si eres usuario de teléfonos móviles, muy pronto podrás disfrutar de la experiencia completa de nuestra app en tus dispositivos Android e iOS. Mantente atento a una transición fácil y fluida hacia tu plataforma favorita, con características mejoradas y un rendimiento optimizado para móviles.",
      "Future Mobile App Transition: Android & iOS":
        "Transición Futuro de la App a Móviles: Android e iOS",
      "Keep up with the latest changes and what's coming next!":
        "¡Mantente al día con los últimos cambios y lo que está por venir!",
      "New Updates": "Nuevas Novedades",
      "Go Prices": "Ir a Precios",
      "The URL has been altered!": "¡La URL ha sido modificada!",
      "Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or never existed in the first place. Please check the URL or go back to the homepage.":
        "¡Ups! La página que estás buscando no existe. Es posible que haya sido movida, eliminada o que nunca haya existido. Por favor, verifica la URL o regresa a la página de inicio.",
      "Page Not Found": "Página No Encontrada",
      "Not Found": "No Encontrada",
      "Select currency": "Selecciona tu moneda",
      "No Country...": "Sin País...",
      "No Country": "Sin País",
      "Birth Place": "Lugar de Nacimiento",
      "Single Package": "Paquete de 1",
      "Tertiary Package": "Paquete de 3",
      Headstone: "Lápida",
      Urn: "Urna",
      "T-shirts": "Camisetas",
      "Generate a unique QR code for easy access to the memorial profile, perfect for placing on meaningful objects such as:":
        "Genera un QR único para acceder fácilmente al perfil conmemorativo, ideal para colocarlo en objetos significativos, como:",
      "QR Code": "Código QR",
      "Create special posts with meaningful images of your loved ones, allowing others to leave comments and hearts as a token of affection and support.":
        "Crea publicaciones especiales con imágenes significativas de tus seres queridos, permitiendo a otros dejar comentarios y corazones como muestra de cariño y apoyo.",
      Posts: "Publicaciones",
      "tribute created": "tributo creado",
      "post updated": "publicación actualizada",
      "profile created": "perfil creado",
      "image updated": "imagen actualizada",
      "image added": "imagen agregada",
      "post created": "publicación creada",
      "new comment": "nuevo comentario",
      "comment updated": "comentario actualizado",
      Comments: "Comentarios",
      Delete: "Eliminar",
      Edit: "Editar",
      "Saving...": "Guardando...",
      Save: "Guardar",
      "No comments added yet...": "Aún no se han agregado comentarios...",
      "to leave one!": "para dejar uno!",
      "log in": "inicia sesión",
      Please: "¡Por favor",
      "Want to comment something?": "¿Quieres comentar algo?",
      "Comment something...": "Comenta algo...",
      "Leave a comment": "Dejar un comentario",
      "You left a heart": "Dejaste un corazón",
      "Leave a heart": "Dejar un corazón",
      "Users that liked this post...":
        "Usuarios que les gustaron esta publicación...",
      "See more...": "Ver más...",
      "No Image Available": "Imagen No Disponible",
      Created: "Creado",
      Email: "Correo Electrónico",
      "Photos and other files uploaded to our application are securely stored on Amazon Web Services (AWS) servers, a platform recognized for its high security and international standards. These servers may be located outside of Honduras, ensuring the protection and accessibility of your data at all times.":
        "Las fotos y demás archivos subidos a nuestra aplicación se almacenan de forma segura en servidores de Amazon Web Services (AWS), una plataforma reconocida por su alta seguridad y estándares internacionales. Estos servidores pueden estar ubicados fuera de Honduras, garantizando la protección y accesibilidad de tus datos en todo momento.",
      "Data and Image Storage": "Almacenamiento de Datos e Imágenes",
      "No options available...": "Sin opciones disponibles...",
      "Heart attack": "Ataque al corazón",
      "Crime victim": "Víctima de crimen",
      "Victim of an accident": "Víctima de accidente",
      "Cancer victim": "Víctima de cáncer",
      "Substance abuse victim": "Víctima del abuso de sustancias",
      "COVID-19 victim": "Víctima del COVID-19",
      "Prefer not to say": "Preferir no decirlo",
      "Select a gender": "Seleccionar género",
      "Select cause of death": "Seleccionar causa de muerte",
      "Select country": "Seleccionar país",
      View: "Ver",
      "In loving memory of...": "Con amor y respeto hacia...",
      "Copied to clipboard!": "¡Copiado al portapapeles!",
      Updates: "Novedades",
      "Your invoice has been sent by email. If you can't find it in your inbox, please check your spam.":
        "Tu factura ha sido enviada por email. Si no la encuentras revisa la carpeta de spam.",
      "Honor and preserve the memories of your loved ones who have passed away":
        "Honra y preserva los recuerdos de tus seres queridos que han partido",
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
      "Find the memorial of a family member or friend. Leave memories or comments.":
        "Encuentra el memorial de un familiar o amigo. Deja recuerdos o comentarios.",
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
      "Ability to upload up to 6 images in the gallery.":
        "Capacidad para subir hasta 6 imágenes en la galería.",
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
      "We reserve the right to suspend or delete accounts that violate the application's terms of use.":
        "Nos reservamos el derecho de suspender o eliminar cuentas que violen los términos de uso de la aplicación.",
      "Changes to Terms": "Modificaciones a los Términos",
      "These terms may be modified at any time. Changes will be notified to users via the application and will take effect immediately.":
        "Estos términos pueden ser modificados en cualquier momento. Los cambios serán notificados a los usuarios a través de la aplicación y entrarán en vigencia inmediatamente.",
      "Applicable Law and Jurisdiction": "Ley Aplicable y Jurisdicción",
      "These terms will be governed by the laws of Honduras, and any disputes will be resolved in the courts of El Progreso, Yoro.":
        "Estos términos se regirán por las leyes de Honduras y cualquier disputa será resuelta en los tribunales de El Progreso, Yoro.",
      "If you have any questions or concerns about these terms, you can contact us at support@eternalmemoriesx.com.":
        "Si tienes alguna pregunta o inquietud sobre estos términos, puedes contactarnos en support@eternalmemoriesx.com.",
      "Discover Us": "Descubrénos",
      "About Us": "Sobre Nosotros",
      "Privacy Policy": "Política de Privacidad",
      "At Eternal MemoriesX, we are committed to protecting your privacy and ensuring that your personal data is handled securely and responsibly. By using our platform, you agree to this Privacy Policy, which explains how we collect, use, protect, and share your information.":
        "En Eternal MemoriesX, nos comprometemos a proteger tu privacidad y garantizar que tus datos personales sean tratados de manera segura y responsable. Al usar nuestra plataforma, aceptas esta Política de Privacidad, la cual explica cómo recopilamos, usamos, protegemos y compartimos tu información.",
      "Information We Collect": "Información que Recopilamos",
      "When you use our application, we may collect the following categories of data":
        "Cuando usas nuestra aplicación, podemos recopilar las siguientes categorías de datos",
      "Personal Information: Name, email, and contact details.":
        "Información Personal: Nombre, correo electrónico y datos de contacto.",
      "Memorial Profile Information: Names, birth and death dates, images, and tributes.":
        "Información de los Perfiles Memoriales: Nombres, fechas de nacimiento y fallecimiento, imágenes, y tributos.",
      "Browsing Data: Browser type, device used, and app usage statistics.":
        "Datos de navegación: Tipo de navegador, dispositivo utilizado y estadísticas de uso de la aplicación.",
      "How We Use Your Information": "Cómo Usamos Tu Información",
      "The information we collect is used to:":
        "La información que recopilamos se utiliza para:",
      "Provide and improve the services offered in our app.":
        "Proporcionar y mejorar los servicios ofrecidos en nuestra aplicación.",
      "Manage your account, features such as uploading images or tributes.":
        "Gestionar tu cuenta, funcionalidades, como subir imágenes o tributos.",
      "Ensure the security of the platform and prevent misuse.":
        "Garantizar la seguridad de la plataforma y prevenir usos indebidos.",
      "Send important notifications, such as service updates or reminders.":
        "Enviar notificaciones importantes, como actualizaciones del servicio o recordatorios.",
      "Data Sharing": "Compartición de Datos",
      "We do not share your personal data with third parties, except in the following situations:":
        "No compartimos tus datos personales con terceros, excepto en las siguientes situaciones:",
      "External Service Providers: We use services such as PayPal or Pagadito to securely process payments.":
        "Proveedores de servicios externos: Utilizamos servicios como PayPal o Pagadito para procesar pagos de manera segura.",
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

// --> 🌐 External/Global Imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppProvider } from "./context/AppProvider";
import { ToastContainer } from "react-toastify";

// --> 🔗	Styles of css
import "react-image-crop/dist/ReactCrop.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";

// --> 📄 Pages
import Root from "./pages/Root";
import SignUp from "./pages/SignUp/SignUp";
import Verified from "./pages/Verified/Verified";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import ProfileRemembered from "./pages/ProfileRemembered/ProfileRemembered";
import MyProfiles from "./pages/MyProfiles/MyProfiles";
import Memorials from "./pages/Memorials/Memorials";
import Posts from "./pages/Posts/Posts";
import News from "./pages/News/News";
import Prices from "./pages/Prices/Prices";
import Checkout from "./pages/Checkout/Checkout";
import EmailSendSuccessfully from "./components/EmailSendSuccessfully";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CheckingStatusPagadito from "./pages/CheckingStatusPagadito";
import PaypalPaymentSuccess from "./pages/PaypalPaymentSuccess";
import CheckMailBox from "./pages/CheckMailBox/CheckMailBox";
import Updates from "./pages/Updates/index";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Page404 from "./pages/404";

import PublicRoutes from "./auth/PublicRoutes";
import PrivateRoutes from "./auth/PrivateRoutes";

const router = createBrowserRouter([
  //🔒 Public Routes - Cannot access if we're logged in...
  {
    element: <PublicRoutes />,
    children: [
      {
        element: <Root />,
        children: [
          {
            element: <SignUp />,
            path: "/sign-up",
          },

          {
            element: <SignIn />,
            path: "/sign-in",
          },

          {
            element: <CheckMailBox />,
            path: "/check-mailbox",
          },

          {
            element: <Verified />,
            path: "/verified/:tokenId",
          },
        ],
      },
    ],
  },

  // 🔐 Private Routes - Cannot access if we're NOT logged in...
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <Root />,
        children: [
          {
            element: <MyProfiles />,
            path: "/my-profiles/",
          },

          {
            element: <Checkout />,
            path: "/checkout/",
          },

          {
            element: <CheckingStatusPagadito />,
            path: "/checking-status-pagadito/",
          },

          {
            element: <PaypalPaymentSuccess />,
            path: "/paypal-payment-success/",
          },

          {
            element: <Page404 />,
            path: "/*",
          },
        ],
      },
    ],
  },

  // 🌐 EVERYBODY can get in...
  {
    element: <Root />,
    children: [
      {
        element: <Home />,
        index: true,
      },

      {
        element: <Memorials />,
        path: "/memorials",
      },

      {
        element: <ProfileRemembered />,
        path: "/remembered-profile/:slug",
      },

      {
        element: <Posts />,
        path: "/posts",
      },

      {
        element: <News />,
        path: "/news",
      },

      {
        element: <Prices />,
        path: "/prices",
      },

      {
        element: <AboutUs />,
        path: "/about-us",
      },

      {
        element: <TermsAndConditions />,
        path: "/terms-and-conditions",
      },

      {
        element: <PrivacyPolicy />,
        path: "/privacy-policy",
      },

      {
        element: <Updates />,
        path: "/updates",
      },
      {
        element: <Contact />,
        path: "/contact",
      },

      {
        element: <EmailSendSuccessfully />,
        path: "/email-sent-successfully",
      },
    ],
  },
]);

const App = () => {
  const queryClient = new QueryClient();

  return (
    <AppProvider>
      <GoogleOAuthProvider
        clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}
      >
        <PayPalScriptProvider
          deferLoading={true}
          options={{
            "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
            components: "buttons",
            currency: "USD",
          }}
        >
          <QueryClientProvider client={queryClient}>
            <ToastContainer
              style={{ zIndex: 999999999 }}
              pauseOnFocusLoss={false}
              hideProgressBar={true}
              position="top-center"
              autoClose={3000}
              theme="colored"
              draggable
              stacked
            />
            <RouterProvider router={router} />
          </QueryClientProvider>
        </PayPalScriptProvider>
      </GoogleOAuthProvider>
    </AppProvider>
  );
};

export default App;

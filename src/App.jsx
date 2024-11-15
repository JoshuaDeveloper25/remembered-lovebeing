// --> 🌐 External/Global Imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "./context/AppProvider";
import { ToastContainer } from "react-toastify";

// --> 🔗	Styles
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

import PublicRoutes from "./auth/PublicRoutes";
import PrivateRoutes from "./auth/PrivateRoutes";
import Checkout from "./pages/Checkout/Checkout";

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
        element: <ProfileRemembered />,
        path: "/remembered-profile/:slug",
      },
    ],
  },
]);

const App = () => {
  const queryClient = new QueryClient();

  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          style={{ zIndex: 999999999999999 }}
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
    </AppProvider>
  );
};

export default App;

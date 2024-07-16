// --> 🌐 External/Global Imports
import { Suspense, lazy } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "./context/AppProvider";
import { ToastContainer } from "react-toastify";
import Spinner from "./components/Spinner";

// --> 🔗	Styles
import "react-image-crop/dist/ReactCrop.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";

// --> 📄 Pages
const Root = lazy(() => import("./pages/Root"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const Verified = lazy(() => import("./pages/Verified/Verified"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const Home = lazy(() => import("./pages/Home/Home"));
const EditProfileRemembered = lazy(() =>
  import("./pages/EditProfileRemembered/EditProfileRemembered")
);
const MyProfiles = lazy(() => import("./pages/MyProfiles/MyProfiles"));
const PreviewProfileRemembered = lazy(() =>
  import("./pages/PreviewProfileRemembered/PreviewProfileRemembered")
);
const Memorials = lazy(() => import("./pages/Memorials/Memorials"));

const PublicRoutes = lazy(() => import("./auth/PublicRoutes"));
const PrivateRoutes = lazy(() => import("./auth/PrivateRoutes"));

const router = createBrowserRouter([
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

  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <Root />,
        children: [
          {
            element: <Home />,
            index: true,
          },

          {
            element: <MyProfiles />,
            path: "/my-profiles/",
          },

          {
            element: <EditProfileRemembered />,
            path: "/remembered-profile-edit/:id",
          },
        ],
      },
    ],
  },

  {
    element: <Root />,
    children: [
      {
        element: <PreviewProfileRemembered />,
        path: "/remembered-profile-preview/:id",
      },

      {
        element: <Memorials />,
        path: "/memorials",
      },
    ],
  },
]);

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Suspense fallback={<Spinner />}>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <ToastContainer
            pauseOnFocusLoss={false}
            hideProgressBar={true}
            position="top-center"
            autoClose={1500}
            theme="colored"
            draggable
            stacked
          />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AppProvider>
    </Suspense>
  );
};

export default App;

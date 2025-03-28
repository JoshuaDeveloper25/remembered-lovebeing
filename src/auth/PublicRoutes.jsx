import { Navigate, Outlet } from "react-router-dom";
import AppContext from "../context/AppProvider";
import { useContext } from "react";

// For global routes
const PublicRoutes = () => {
  const { userInfo } = useContext(AppContext);

  return userInfo?.access_token ? <Navigate to={"/"} /> : <Outlet />;
};

export default PublicRoutes;

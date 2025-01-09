import { createContext, useState } from "react";
import axios from "axios";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [languageSelected, setLanguageSelected] = useState("es");
  const [userInfo, setUserInfo] = useState(
    JSON?.parse(localStorage?.getItem("userInfo")) || {}
  );

  axios.defaults.headers.common["Authorization"] = userInfo?.access_token
    ? `Bearer ${userInfo?.access_token}`
    : null;

  return (
    <AppContext.Provider
      value={{
        userInfo,
        setUserInfo,
        languageSelected,
        setLanguageSelected
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };

export default AppContext;

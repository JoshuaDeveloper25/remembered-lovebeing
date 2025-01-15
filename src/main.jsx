// --> 🌐 Default imports from react and more...
import ReactDOM from "react-dom/client";
import React from "react";

// --> 🔗 Styles
import "react-advanced-cropper/dist/style.css";
import "./styles/index.css";
import App from "./App";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

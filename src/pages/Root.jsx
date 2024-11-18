import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/animations.css";

const Root = () => {
  return (
    <main>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer className="bg-white font-semibold text-center py-8">
        <h2>Todos los derechos reservados.</h2>
        <h2>Copyright 2024 &copy;</h2>
      </footer>
      {/* <ScrollRestoration /> */}
    </main>
  );
};

export default Root;

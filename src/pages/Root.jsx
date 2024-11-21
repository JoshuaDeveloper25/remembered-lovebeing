import { Outlet, ScrollRestoration } from "react-router-dom";
import BackToTop from "../components/BackToTop";
import Navbar from "../components/Navbar";
import "../styles/animations.css";

const Root = () => {
  return (
    <main className="flex flex-col min-h-screen relative">
      {/* Back to top button */}
      <BackToTop />

      <div id="top" className="flex-1 h-full">
        <Navbar />

        <Outlet />
      </div>

      {/* Footer */}
      <footer className="bg-white font-semibold text-center py-8">
        <h2>Todos los derechos reservados.</h2>
        <h2>Copyright 2024 &copy;</h2>
      </footer>
      {/* <ScrollRestoration /> */}
    </main>
  );
};

export default Root;

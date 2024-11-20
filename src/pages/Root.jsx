import { Outlet, ScrollRestoration } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import Navbar from "../components/Navbar";
import "../styles/animations.css";

const Root = () => {
  return (
    <main className="flex flex-col min-h-screen relative">
      {/* Back to top button */}
      <div className="fixed right-3 bottom-3 z-[9999]">
        <a
          className="bg-primary-color-light text-white shadow-primary-color-light rounded-full hover:opacity-55 hover:scale-105 animation-fade font-bold block px-3 py-3 shadow-md"
          type="button"
          href="#top"
        >
          <IoIosArrowUp size={24} />
        </a>
      </div>

      <div id="top" className="flex-1 h-full">
        <Navbar />

        <Outlet />
      </div>

      <footer className="bg-white font-semibold text-center py-8">
        <h2>Todos los derechos reservados.</h2>
        <h2>Copyright 2024 &copy;</h2>
      </footer>
      {/* <ScrollRestoration /> */}
    </main>
  );
};

export default Root;

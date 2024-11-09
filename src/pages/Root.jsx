import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../styles/animations.css'

const Root = () => {
  return (
    <main>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer className="bg-white text-black text-center py-8">FOOTER - TODOS LOS DERECHOS RESERVADOS</footer>
      {/* <ScrollRestoration /> */}
    </main>
  );
};

export default Root;

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../styles/animations.css'

const Root = () => {
  return (
    <section>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer className="bg-white text-black text-center py-8">FOOTER</footer>
    </section>
  );
};

export default Root;

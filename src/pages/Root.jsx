import { Outlet, ScrollRestoration } from "react-router-dom";
import BackToTop from "../components/BackToTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
      <Footer />
      {/* <ScrollRestoration /> */}
    </main>
  );
};

export default Root;

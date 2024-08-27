import CreateMemorial from "./components/CreateMemorial";
import FindMemorial from "./components/FindMemorial";
import Header from "./components/Header";
import ModernDesign from "./components/ModernDesign";
import RecentMemorialsCarousel from "./components/RecentMemorialsCarousel";
import ShareSite from "./components/ShareSite";
import StepsCarousel from "./components/StepsCarousel";
import WhatsHappening from "./components/WhatsHappening";

const Home = () => {
  return (
    <>
      {/* Header */}
      <Header />

      {/* What's happening with in our area? */}
      <WhatsHappening />

      {/* Create Memorial */}
      <CreateMemorial />

      {/* Modern, beautiful design */}
      <ModernDesign />

      {/* Recent Online Memorials */}
      <RecentMemorialsCarousel />

      {/* Steps to monetize your QR */}
      <StepsCarousel />

      {/* Find a Memorial */}
      <FindMemorial />

      {/* Share the site with friends... */}
      <ShareSite />
    </>
  );
};

export default Home;

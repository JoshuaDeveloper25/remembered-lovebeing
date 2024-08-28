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

      {/* Recent Online Memorials */}
      <RecentMemorialsCarousel />

      {/* Find a Memorial */}
      <FindMemorial />

      {/* Steps to monetize your QR */}
      <StepsCarousel />

      {/* Modern, beautiful design */}
      <ModernDesign />
      
      {/* Share the site with friends... */}
      <ShareSite />
    </>
  );
};

export default Home;

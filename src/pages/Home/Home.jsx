import CreateMemorial from "./components/CreateMemorial";
import FindMemorial from "./components/FindMemorial";
import HeaderCarousel from "./components/HeaderCarousel";
import ModernDesign from "./components/ModernDesign";
import ShareSite from "./components/ShareSite";

const Home = () => {
  return (
    <>
      {/* Header */}
      <HeaderCarousel />

      {/* Create Memorial */}
      <CreateMemorial />

      {/* Modern, beautiful design */}
      <ModernDesign />

      {/* Find a Memorial */}
      <FindMemorial />

      {/* Share the site with friends... */}
      <ShareSite />
    </>
  );
};

export default Home;

import RecentMemorialsCarousel from "./components/RecentMemorialsCarousel";
import WhatWeOfferResponsive from "./components/WhatWeOfferResponsive";
import CreateMemorial from "./components/CreateMemorial";
import WhatsHappening from "./components/WhatsHappening";
import StepsCarousel from "./components/StepsCarousel";
import ModernDesign from "./components/ModernDesign";
import FindMemorial from "./components/FindMemorial";
import ShareSite from "./components/ShareSite";
import Header from "./components/Header";

import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <Helmet>
        <title>Eternal MemoriesX | {t("Home")}</title>
      </Helmet>

      {/* Header */}
      <Header />

      {/* Responsive - What we offer */}
      <WhatWeOfferResponsive />

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

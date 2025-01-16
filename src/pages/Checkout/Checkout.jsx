import ProfilePlanStatus from "./components/ProfilePlanStatus";
import { useSearchParams } from "react-router-dom";
import PricesPlan from "./components/PricesPlan";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  return (
    <section className="container-page">
      <Helmet>
        <title>Eternal MemoriesX | {t("Check Out")}</title>
      </Helmet>

      <div className="flex items-center justify-center min-h-svh">
        <div className="w-full my-14">
          {searchParams?.get("packageName") ? (
            // Checkout of PACKAGES
            <PricesPlan packageName={searchParams?.get("packageName")} />
          ) : (
            // Checkout of REMEMBERED PROFILES
            <ProfilePlanStatus />
          )}
        </div>
      </div>
    </section>
  );
};

export default Checkout;

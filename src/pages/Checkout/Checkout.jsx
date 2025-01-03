import ProfilePlanStatus from "./components/ProfilePlanStatus";
import { useSearchParams } from "react-router-dom";
import PricesPlan from "./components/PricesPlan";

const Checkout = () => {
  const [searchParams] = useSearchParams();

  return (
    <section className="container-page">
      <div className="flex items-center justify-center min-h-svh">
        <div className="w-full">
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

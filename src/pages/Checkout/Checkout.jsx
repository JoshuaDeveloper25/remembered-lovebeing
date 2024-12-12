import ProfilePlanStatus from "./components/ProfilePlanStatus";
import { useSearchParams } from "react-router-dom";
import PricesPlan from "./components/PricesPlan";
import axios from "axios";

const Checkout = () => {
  const [searchParams, setSearchParams] = useSearchParams();


  return (
    <section className="container-page">
      <div className="flex items-center justify-center h-svh">
        <div className="w-full">
          {" "}
          {searchParams?.get("packageName") ? (
            <PricesPlan packageName={searchParams?.get("packageName")} />
          ) : (
            <ProfilePlanStatus />
          )}
        </div>
      </div>
    </section>
  );
};

export default Checkout;

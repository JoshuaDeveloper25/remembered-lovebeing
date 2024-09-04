import ProfilePlanStatus from "./components/ProfilePlanStatus";
import { useSearchParams } from "react-router-dom";
import PricesPlan from "./components/PricesPlan";

const Checkout = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <section className="container-page py-2 my-6">
      {searchParams?.get("packageName") ? (
        <PricesPlan packageName={searchParams?.get("packageName")} />
      ) : (
        <ProfilePlanStatus />
      )}
    </section>
  );
};

export default Checkout;

import { useQuery } from "@tanstack/react-query";
import Memorial from "./components/Memorial";
import axios from "axios";

const Memorials = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["memorials"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/get-remembereds?page=1&size=5`
      ),
  });

  return (
    <section className="container-page px-2">
      {/* Introduction */}
      <div className="text-center mt-9 mb-14">
        <h2 className=" text-primary-color/85 text-3xl font-bold mb-1">
          In Memory of Our Loved Ones
        </h2>
        <p className="text-sm max-w-md mx-auto text-tertiary-color">
          This page is dedicated to honoring and remembering those who have left
          an indelible mark on our lives.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-7 my-9">
        {data?.data?.items?.map((item) => {
          return <Memorial item={item} key={item?.id} />;
        })}
      </div>
    </section>
  );
};

export default Memorials;

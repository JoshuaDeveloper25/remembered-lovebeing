import { useInfiniteQuery } from "@tanstack/react-query";
import Memorial from "./components/Memorial";
import { useState } from "react";
import axios from "axios";

// import "../../styles/animations.css"

const Memorials = () => {
  const [nextPage, setNextPage] = useState(2);

  const memorialsQuery = useInfiniteQuery({
    queryKey: ["memorials"],
    queryFn: (data) => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/get-remembereds`,
        {
          params: {
            page: data?.pageParam || 1,
            size: 8,
          },
        }
      );
    },
    getNextPageParam: () => {
      return nextPage;
    },
  });

  if (memorialsQuery?.isLoading) return <p>Cargando..</p>;

  const flapMapeado = memorialsQuery?.data?.pages?.flatMap(
    (item) => item?.data?.items
  );

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
        {flapMapeado?.map((item) => {
          return <Memorial item={item} key={item?.id} />;
        })}
      </div>

      {flapMapeado?.length ===
      memorialsQuery?.data?.pages[0]?.data?.total ? null : (
        <div className="my-5 text-center">
          <button
            className="btn btn-blue w-auto"
            onClick={() => {
              setNextPage((prev) => prev + 1);
              memorialsQuery?.fetchNextPage();
            }}
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default Memorials;

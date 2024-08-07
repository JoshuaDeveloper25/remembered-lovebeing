import { useInfiniteQuery } from "@tanstack/react-query";
import New from "./components/New";
import { useState } from "react";
import axios from "axios";

const News = () => {
  const [nextPage, setNextPage] = useState(2);

  const newsQuery = useInfiniteQuery({
    queryKey: ["memorials"],
    queryFn: (data) => {
      return axios.get(`${import.meta.env.VITE_BASE_URL}/news/`, {
        params: {
          page: data?.pageParam || 1,
          size: 9,
        },
      });
    },
    getNextPageParam: () => {
      return nextPage;
    },
  });

  if (newsQuery?.isLoading) return <p>Cargando..</p>;

  const flapMapeado = newsQuery?.data?.pages?.flatMap(
    (item) => item?.data?.items
  );

  return (
    <section className="container-page px-4">
      {/* --> Introduction */}
      <div className="text-center mt-9 mb-14">
        <h2 className=" text-primary-color/85 text-3xl font-bold mb-1">News</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 place-content-center place-items-stretch">
        {flapMapeado?.map((item, index) => {
          return <New item={item} key={index} />;
        })}
      </div>

      {flapMapeado?.length === newsQuery?.data?.pages[0]?.data?.total ? null : (
        <div className="my-5 text-center">
          <button
            className="btn btn-blue w-auto"
            onClick={() => {
              setNextPage((prev) => prev + 1);
              newsQuery?.fetchNextPage();
            }}
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default News;

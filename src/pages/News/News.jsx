import { useInfiniteQuery } from "@tanstack/react-query";
import New from "./components/New";
import { useState } from "react";
import axios from "axios";

const News = () => {
  const [nextPage, setNextPage] = useState(2);

  const newsQuery = useInfiniteQuery({
    queryKey: ["news"],
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
    <section className="container-page py-16 px-4">
      {/* --> Introduction */}
      <div className="text-center mb-14">
        <h2 className="font-mono tracking-wider text-4xl text-primary-color uppercase font-semibold">
          News
        </h2>
        <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
        <p className="text-xl max-w-2xl mx-auto mt-2 mb-8 text-muted-color">
          Stay updated with the latest news of the users!
        </p>
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

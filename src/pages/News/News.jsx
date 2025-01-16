import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import New from "./components/New";
import { useState } from "react";
import axios from "axios";

const News = () => {
  const { t } = useTranslation();
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

  const flapMapeado = newsQuery?.data?.pages?.flatMap(
    (item) => item?.data?.items
  );

  return (
    <section className="container-page py-16 px-4">
      <Helmet>
        <title>Eternal MemoriesX | {t("News")}</title>
      </Helmet>

      {/* --> Introduction */}
      <div className="text-center mb-14">
        <h2 className="font-mono tracking-wider text-4xl text-primary-color uppercase font-semibold">
          {t("News")}
        </h2>
        <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
        <p className="text-xl max-w-2xl mx-auto mt-2 mb-8 text-muted-color">
          {t("Stay updated with the latest news of the users!")}
        </p>
      </div>

      {newsQuery?.isLoading ? (
        t("Loading...")
      ) : (
        <>
          {flapMapeado?.length ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 place-content-center place-items-stretch">
                {flapMapeado?.map((item, index) => {
                  return <New t={t} item={item} key={index} />;
                })}
              </div>

              {flapMapeado?.length ===
              newsQuery?.data?.pages[0]?.data?.total ? null : (
                <div className="my-5 text-center">
                  <button
                    className="btn btn-blue w-auto"
                    onClick={() => {
                      setNextPage((prev) => prev + 1);
                      newsQuery?.fetchNextPage();
                    }}
                  >
                    {t("Load More")}
                  </button>
                </div>
              )}
            </>
          ) : (
            <h2 className="text-primary-color text-2xl max-w-2xl mx-auto uppercase tracking-wider text-center my-5">
              {t("There's no news about the users for the moment...")}
            </h2>
          )}
        </>
      )}
    </section>
  );
};

export default News;

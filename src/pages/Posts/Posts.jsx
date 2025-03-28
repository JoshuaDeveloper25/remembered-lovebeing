import { useQuery } from "@tanstack/react-query";
import PublicPost from "./components/PublicPost";
import { useTranslation } from "react-i18next";
import axios from "axios";

// Images && icons
import peaceDove from "../../assets/peace-dove.png";
import cloud from "../../assets/cloud.png";
import { Helmet } from "react-helmet-async";

const Posts = () => {
  const { t } = useTranslation();

  // --> 📝 Get all posts of remembereds
  const allRememberedPostsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () =>
      await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/`),
  });

  return (
    <main className="relative z-[1]">
      {/* <div className="fixed top-18 right-8">
        <img className="w-[20rem] rotate-[20deg]" src={cloud} alt="cloud" />
      </div>

      <div className="fixed top-18 left-8">
        <img className="w-[20rem] rotate-[-20deg]" src={cloud} alt="cloud" />
      </div>

      <div className="fixed top-[16rem] left-0">
        <img className="w-32 [transform:rotateY(180deg)]" src={peaceDove} />
      </div>

      <div className="fixed top-[16rem] right-0">
        <img className="w-32 rotate-[90]" src={peaceDove} />
      </div> */}

      <Helmet>
        <title>Eternal MemoriesX | {t("Posts")}</title>
      </Helmet>

      <section
        className="container-page py-16 mx-auto sticky z-1"
        style={{ maxWidth: "800px" }}
      >
        {/* --> Introduction */}
        <div className="text-center mb-14">
          <h2 className="font-mono tracking-wider text-4xl text-primary-color uppercase font-semibold">
            {t("Posts")}
          </h2>
          <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
          <p className="text-xl max-w-2xl mx-auto mt-2 mb-8 text-muted-color">
            {t("Discover the latest updates and stories shared by our users!")}
          </p>
        </div>

        {allRememberedPostsQuery?.isLoading ? (
          t("Loading...")
        ) : (
          <>
            {!allRememberedPostsQuery?.data?.data?.length ? (
              <h2 className="text-primary-color text-2xl uppercase mx-auto max-w-2xl tracking-wider text-center my-5">
                {t("No remembered has made a post...")}
              </h2>
            ) : (
              allRememberedPostsQuery?.data?.data?.map((post, index) => (
                <PublicPost
                  ownerName={post?.owner?.name}
                  totalComments={post?.comments}
                  post={post}
                  key={index}
                />
              ))
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Posts;

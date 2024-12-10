import PublicPost from "./components/PublicPost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import cloud from "../../assets/cloud.png";
import sun from "../../assets/sun.png";

const Posts = () => {
  // --> 📝 Get all posts of remembereds
  const allRememberedPostsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () =>
      await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/`),
  });

  if (allRememberedPostsQuery?.isLoading) return <h2>Loading...</h2>;

  return (
    <main className="relative">
      <div className="absolute top-8 left-8">
        <img className="w-36 sm:opacity-85 opacity-20 animate-spin" src={sun} />
      </div>

      <div className="absolute top-16 left-16 -z-[1]">
        <img
          className="w-4/5 rotate-[-30deg] opacity-30"
          src={cloud}
          alt="cloud"
        />
      </div>

      <section
        className="container-page py-16 mx-auto sticky z-10"
        style={{ maxWidth: "800px" }}
      >
        {/* --> Introduction */}
        <div className="text-center mb-14">
          <h2 className="font-mono tracking-wider text-4xl text-primary-color uppercase font-semibold">
            Posts
          </h2>
          <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
          <p className="text-xl max-w-2xl mx-auto mt-2 mb-8 text-muted-color">
            Discover the latest updates and stories shared by our users!
          </p>
        </div>

        {!allRememberedPostsQuery?.data?.data?.length ? (
          <h2 className="text-primary-color text-2xl uppercase tracking-wider text-center my-5">
            No remembered has made a post....
          </h2>
        ) : (
          allRememberedPostsQuery?.data?.data?.map((post, index) => (
            <div key={index}>
              {index % 2 === 0 && (
                <div className="absolute top-16 left-16 -z-[1]">
                  <img
                    className="w-4/5 rotate-[-30deg] opacity-30"
                    src={cloud}
                    alt="cloud"
                  />
                </div>
              )}

              <PublicPost
                ownerName={post?.owner?.name}
                totalComments={post?.comments}
                post={post}
                key={index}
              />
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default Posts;

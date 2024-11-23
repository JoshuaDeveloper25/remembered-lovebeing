import PublicPost from "./components/PublicPost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Posts = () => {
  // --> 📝 Get all posts of remembereds
  const allRememberedPostsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () =>
      await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/`),
  });

  if (allRememberedPostsQuery?.isLoading) return <h2>Loading...</h2>;

  return (
    <section
      className="container-page py-16 mx-auto"
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
        allRememberedPostsQuery?.data?.data?.map((post) => {
          return (
            <PublicPost
              ownerName={post?.owner?.name}
              totalComments={post?.comments}
              post={post}
              key={post?.id}
            />
          );
        })
      )}
    </section>
  );
};

export default Posts;

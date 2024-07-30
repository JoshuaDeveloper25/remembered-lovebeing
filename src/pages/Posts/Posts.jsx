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
    <section className="container-page my-8 mx-auto" style={{maxWidth: '800px'}}>
      {!allRememberedPostsQuery?.data?.data?.length ? (
        <h2 className="text-center font-bold text-xl text-primary-color my-5">
          No remembered has made a post....
        </h2>
      ) : (
        allRememberedPostsQuery?.data?.data?.map((post) => {
          return (
            <PublicPost
              rememberName={post?.owner?.name}
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

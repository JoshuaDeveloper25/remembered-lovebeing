import PublishedPostsImages from "../pages/EditProfileRemembered/components/PublishedPostsImages";
import publishCommentPost from "../helpers/publishCommentPost";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../utils/getFastApiErrors";
import { toast } from "react-toastify";
import axios from "axios";

const Post = ({ post, rememberName }) => {
  const queryClient = useQueryClient();

  const publishCommentPostMutation = useMutation({
    mutationFn: async (commentInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/comment/${post?.id}`,
        commentInfo
      ),
    onSuccess: (res) => {
      toast.success("Comment published successfully!");
      queryClient.invalidateQueries(["postComments"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmitPublishComment = (e) => {
    e.preventDefault();

    const commentInfo = {
      content: e?.target?.content?.value,
    };

    // Form validation
    if (!commentInfo?.content) return toast.error(`Fill up the blank!`);

    publishCommentPostMutation.mutate(commentInfo);
  };

  return (
    <div className="border-b [&:not(:last-child)]:border-gray-400/50 py-3">
      <div className="flex items-center gap-3 pb-2">
        <img
          className="w-16 rounded-full"
          src={
            post?.profile_image
              ? `${post?.profile_image?.cloud_front_domain}/${post?.profile_image?.aws_file_name}`
              : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
          }
        />

        <h3 className="font-medium text-base">{rememberName}</h3>
      </div>

      <h2 className="mb-5 text-primary-color font-light">{post?.content}</h2>

      <PublishedPostsImages
        rememberName={rememberName}
        galleryImages={post?.gallery_images}
      />

      <form onSubmit={handleSubmitPublishComment}>
        <h2 className="mt-7 mb-4 text-primary-color text-2xl font-bold">
          Comments
        </h2>

        <label
          htmlFor="content"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Publish a comment!
        </label>
        <textarea
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
          placeholder="Comment right here."
          name="content"
          id="content"
          rows="4"
        ></textarea>

        <button type="submit" className="btn btn-blue md:w-auto inline mt-2">
          Publish
        </button>

        <p className="py-3">No comments added yet...</p>
      </form>
    </div>
  );
};

export default Post;

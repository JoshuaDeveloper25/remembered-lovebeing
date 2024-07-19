import PublishedPostsImages from "../pages/EditProfileRemembered/components/PublishedPostsImages";
import PostCommentModal from "../pages/EditProfileRemembered/components/PostCommentModal";
import publishCommentPost from "../helpers/publishCommentPost";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import CarouselCommentPosts from "./CarouselCommentPosts";
import getFastApiErrors from "../utils/getFastApiErrors";
import { FaQuoteLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const Post = ({ post, rememberName }) => {
  const [modalPostComments, setModalPostComments] = useState(false);
  const [comment, setComment] = useState("");
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

    // e?.target?.reset();
    setComment("");
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

      <div className="flex justify-between items-center my-5">
        <button
          onClick={() => setModalPostComments(!modalPostComments)}
          className="btn btn-blue w-auto"
        >
          Publish a Comment
        </button>

        <h3>
          Comments: <span className="font-bold">{post?.comments?.length}</span>
        </h3>
      </div>

      <PostCommentModal
        openModal={modalPostComments}
        setOpenModal={setModalPostComments}
      >
        <div className="flex min-h-full h-full">
          <article className="flex-[30%]">
            <CarouselCommentPosts commentImages={post?.gallery_images} />
          </article>

          <article
            className={`relative flex-1 flex flex-col justify-between ${!post?.comments?.length ? 'overflow-y-hidden' : 'overflow-y-auto'} max-h-[100%]`}
            onSubmit={handleSubmitPublishComment}
          >
            {!post?.comments?.length ? (
              <div className="flex justify-center items-center h-full">
                <p className="py-3 px-4 text-center text-xl font-bold">
                  No comments added yet...{" "}
                </p>
              </div>
            ) : (
              <div className="px-4">
                {post?.comments?.map((item, index) => (
                  <div
                    className="bg-primary-color/10 p-4 rounded-md my-4 relative"
                    key={index}
                  >
                    <div className="flex items-center gap-2 border-b border-tertiary-color/30 pb-3">
                      {" "}
                      <img
                        className="h-10 w-10 rounded-full border-2 border-primary-color/50"
                        src={
                          post?.profile_image
                            ? `${post?.profile_image?.cloud_front_domain}/${post?.profile_image?.aws_file_name}`
                            : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                        }
                      />
                      <h2 className="font-bold text-sm">{post?.owner?.name}</h2>
                    </div>

                    <div className="pt-3">
                      <p className="text-xs font-thin text-black">
                        {item?.content}
                      </p>
                      <FaQuoteLeft className="absolute top-3 right-5 size-5 text-primary-color/70" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <form
              className={`self-end w-full sticky bottom-0 bg-transparent z-50`}
            >
              <div className="relative">
                <textarea
                  rows="1"
                  cols="1"
                  wrap="soft"
                  name="content"
                  value={comment}
                  onChange={(e) => setComment(e?.target?.value)}
                  placeholder="Comment something..."
                  className="block ps-4 pe-16 py-2.5 w-full text-sm text-fourth-color bg-gray-50 resize-none outline-none"
                ></textarea>

                {comment === "" ? null : (
                  <button
                    disabled={publishCommentPostMutation?.isPending}
                    type="submit"
                    className="absolute top-2 right-6 text-sm text-secondary-color hover:text-secondary-color/70 animation-fade font-semibold"
                  >
                    {publishCommentPostMutation?.isPending
                      ? "Sending..."
                      : "Send"}
                  </button>
                )}
              </div>
            </form>
          </article>
        </div>
      </PostCommentModal>
    </div>
  );
};

export default Post;

import PublishedPostsImages from "../../ProfileRemembered/components/PublishedPostsImages";
import PostCommentModal from "../../ProfileRemembered/components/PostCommentModal";
import CarouselCommentPosts from "../../../components/CarouselCommentPosts";
import NavbarDropdownLink from "../../../components/NavbarDropdownLink";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import AppContext from "../../../context/AppProvider";
import formatDate from "../../../utils/formatDate";
import { Modal, Tooltip } from "flowbite-react";
import { FaRegMessage } from "react-icons/fa6";
import { BsThreeDots, BsHearts } from "react-icons/bs";
import { BiSolidQuoteRight } from "react-icons/bi";
import { useContext, useState } from "react";
import { IoMdHeart } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";

const PublicPost = ({ post, ownerName }) => {
  const postLikesMapeados = post?.post_likes?.map((item) => item?.owner?.name);
  const postLikesWithItsNames = postLikesMapeados?.map((item, index) => (
    <p key={index}>{item}</p>
  ));
  const { userInfo } = useContext(AppContext);
  const [modalPostComments, setModalPostComments] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  // Publish a comment
  const publishCommentPostMutation = useMutation({
    mutationFn: async (commentInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/comment/${post?.id}`,
        commentInfo
      ),
    onSuccess: (res) => {
      toast.success("Comment published successfully!");
      queryClient.invalidateQueries(["posts"]);
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
    if (!commentInfo?.content.trim(" "))
      return toast.error(`Fill up the blank!`);

    publishCommentPostMutation.mutate(commentInfo);

    // e?.target?.reset();
    setComment("");
  };

  // --> Like a POST
  const likePostMutation = useMutation({
    mutationFn: async (commentInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/likes/${post?.id}`,
        commentInfo
      ),
    onSuccess: (res) => {
      toast.success("Comment liked successfully!");
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleToggleLikePost = () => {
    likePostMutation?.mutate();
  };

  return (
    <>
      <div className="hover:shadow-2xl animation-fade  bg-white mb-5 p-3 shadow-lg rounded-lg border-b [&:not(:last-child)]:border-gray-400/50 py-3">
        {/* Header of the post */}
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <img
              className="w-16 rounded-full"
              src={
                post?.remembered?.profile_images
                  ? `${post?.remembered?.profile_images?.cloud_front_domain}/${post?.remembered?.profile_images?.aws_file_name}`
                  : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
              }
            />

            <div>
              <h3 className="font-medium text-base capitalize">
                {post?.owner?.name}
              </h3>
              <h4 className="text-xs text-tertiary-color">
                Created: {formatDate(post?.created_at)}
              </h4>
            </div>
          </div>
        </div>

        <div className="flex justify-between my-5 pb-2.5 border-b border-b-tertiary-color/20">
          <h2 className="text-primary-color font-light">{post?.content}</h2>
        </div>

        {/* Images Gallery Mansory */}
        <PublishedPostsImages
          setToggleModal={setModalPostComments}
          galleryImages={post?.gallery_images}
        />

        {/* Footer of the post */}
        <div className="my-5">
          {/* Descriptions of the post */}
          <div className="flex items-center justify-between text-gray-500">
            <Tooltip
              content={
                <>
                  <p>{postLikesWithItsNames}</p>

                  <button onClick={() => setOpenModal(true)}>
                    See more...
                  </button>

                  <Modal
                    dismissible
                    show={openModal}
                    onClose={() => setOpenModal(false)}
                  >
                    <Modal.Header>Users that liked this post...</Modal.Header>

                    <Modal.Body>
                      <div className="space-y-2 overflow-y-auto max-h-72">
                        {postLikesWithItsNames}
                      </div>
                    </Modal.Body>
                  </Modal>
                </>
              }
            >
              <div className="flex items-center gap-3 cursor-pointer">
                <h2 className="flex items-center gap-1">
                  <BsHearts size={22} className="text-red-500 animation-fade" />
                  <span className="font-semibold">
                    {post?.post_likes?.length}
                  </span>
                </h2>
              </div>
            </Tooltip>

            <h3>
              Comments:{" "}
              <span className="font-bold">{post?.comments?.length}</span>
            </h3>
          </div>

          {/* Actions of a post */}
          <div className="flex items-center gap-8 border-t pt-3 mt-3">
            <button
              className="flex items-center gap-2.5 text-gray-500 hover:text-red-500"
              onClick={handleToggleLikePost}
              type="button"
            >
              <IoMdHeart
                size={22}
                className="hover:text-red-500 animation-fade"
              />
              Leave a heart
            </button>

            <button
              onClick={() => setModalPostComments(!modalPostComments)}
              className="flex items-center gap-2.5 animation-fade text-gray-500 hover:text-primary-color"
            >
              <FaRegMessage size={20} /> Leave a comment
            </button>
          </div>
        </div>
      </div>

      {/* Modal to preview post with its comments and images */}
      <PostCommentModal
        openModal={modalPostComments}
        setOpenModal={setModalPostComments}
      >
        <div className="flex flex-col md:flex-row h-screen">
          <article className="md:flex-[30%] flex-grow-0">
            <CarouselCommentPosts
              ownerName={ownerName}
              commentImages={post?.gallery_images}
            />
          </article>

          <article className={`flex-1`}>
            <div className="flex flex-col justify-between h-full">
              {/* Input to leave a comment - LG TO TOP */}
              <div className="md:hidden block">
                {userInfo?.access_token ? (
                  <form
                    className={`self-end w-full sticky bottom-0 bg-gray-200 z-[9999]`}
                    onSubmit={handleSubmitPublishComment}
                  >
                    <div className="relative flex items-center">
                      <img
                        className="absolute top-1 left-1 transform w-8 rounded-full border-2 border-green-500"
                        src={
                          userInfo?.profile_image
                            ? `${userInfo?.profile_image?.cloud_front_domain}/${userInfo?.profile_image?.aws_file_name}`
                            : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                        }
                      />

                      <textarea
                        name="content"
                        rows={1}
                        value={comment}
                        onChange={(e) => {
                          setComment(e.target.value);
                          const target = e.target;
                          target.style.height = "auto"; // Restablece la altura
                          target.style.height = `${Math.min(
                            target.scrollHeight,
                            200
                          )}px`; // Ajusta la altura con un máximo de 200px
                        }}
                        placeholder="Comment something..."
                        ref={(textarea) => {
                          if (textarea && comment === "") {
                            textarea.style.height = "auto"; // Restablece la altura cuando el comentario se limpia
                          }
                        }}
                        className="textarea-post-comment block ps-12 pe-16 w-full text-base bg-white shadow-2xl text-black placeholder:text-black border-b-4 border-e-0 border-s-0 border-primary-color outline-none overflow-y-auto resize-none max-h-[500px]"
                      />

                      {comment === "" ? null : (
                        <button
                          disabled={publishCommentPostMutation?.isPending}
                          type="submit"
                          className="bg-secondary-color p-1 rounded-full absolute  right-5 text-md text-white animation-fade z-10 h-8 w-8 flex items-center justify-center"
                        >
                          <IoSend />
                        </button>
                      )}
                    </div>
                  </form>
                ) : (
                  <div className="text-center bg-muted-color/20 py-4">
                    <h2 className="text-lg font-semibold">
                      Want to comment something?
                    </h2>
                    <p>
                      Please,{" "}
                      <Link
                        className="text-primary-color-light underline font-bold"
                        to={"/sign-in?redirect=/posts"}
                      >
                        log in
                      </Link>{" "}
                      to leave one!
                    </p>
                  </div>
                )}
              </div>

              {/* If there's no posts, we show a message */}
              {!post?.comments?.length ? (
                <>
                  <div className="px-4 py-4 bg-gray-300 7">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-16 rounded-full"
                        src={
                          post?.remembered?.profile_images
                            ? `${post?.remembered?.profile_images?.cloud_front_domain}/${post?.remembered?.profile_images?.aws_file_name}`
                            : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                        }
                      />

                      <div>
                        <h3 className="font-medium text-base capitalize">
                          {post?.owner?.name}
                        </h3>
                        <h4 className="text-xs text-tertiary-color ">
                          Created: {formatDate(post?.created_at)}
                        </h4>
                      </div>
                    </div>

                    <h3 className="mt-1 text-tertiary-color ">
                      {post?.content}
                    </h3>
                  </div>
                  <div className="flex justify-center items-center h-full">
                    <p className="py-3 px-4 text-center text-xl font-bold">
                      No comments added yet...{" "}
                    </p>
                  </div>
                </>
              ) : (
                // We show comments
                <div className="overflow-y-auto md:max-h-none max-h-[75svh] md:pb-0 pb-24">
                  {/* Post Title Content */}
                  <div className="px-4 py-4 bg-gray-300 md:sticky static top-0 z-[9999]">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-16 rounded-full"
                        src={
                          post?.remembered?.profile_images
                            ? `${post?.remembered?.profile_images?.cloud_front_domain}/${post?.remembered?.profile_images?.aws_file_name}`
                            : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                        }
                      />

                      <div>
                        <h3 className="font-medium text-base capitalize">
                          {post?.owner?.name}
                        </h3>
                        <h4 className="text-xs text-tertiary-color ">
                          Created: {formatDate(post?.created_at)}
                        </h4>
                      </div>
                    </div>

                    <h3 className="mt-1 text-tertiary-color ">
                      {post?.content}
                    </h3>
                  </div>

                  {/* Post Comments */}
                  <div className={`px-4`}>
                    {post?.comments?.map((comment) => {
                      return (
                        <SingleComment
                          userInfo={userInfo}
                          key={comment?.id}
                          post={post}
                          comment={comment}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Input to leave a comment - LG TO TOP */}
              <div className="md:block hidden">
                {userInfo?.access_token ? (
                  <form
                    className={`self-end w-full sticky bottom-0 bg-gray-200 z-[9999]`}
                    onSubmit={handleSubmitPublishComment}
                  >
                    <div className="relative flex items-center">
                      <img
                        className="absolute top-1 left-1 transform w-8 rounded-full border-2 border-green-500"
                        src={
                          userInfo?.profile_image
                            ? `${userInfo?.profile_image?.cloud_front_domain}/${userInfo?.profile_image?.aws_file_name}`
                            : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                        }
                      />

                      <textarea
                        name="content"
                        rows={1}
                        value={comment}
                        onChange={(e) => {
                          setComment(e.target.value);
                          const target = e.target;
                          target.style.height = "auto"; // Restablece la altura
                          target.style.height = `${Math.min(
                            target.scrollHeight,
                            200
                          )}px`; // Ajusta la altura con un máximo de 200px
                        }}
                        placeholder="Comment something..."
                        ref={(textarea) => {
                          if (textarea && comment === "") {
                            textarea.style.height = "auto"; // Restablece la altura cuando el comentario se limpia
                          }
                        }}
                        className="textarea-post-comment py-2 block ps-12 pe-16 w-full text-base bg-white shadow-2xl text-black placeholder:text-black border-b-4 border-t-0 border-e-0 border-s-0 border-primary-color outline-none overflow-y-auto resize-none max-h-[500px]"
                      />

                      {comment === "" ? null : (
                        <button
                          disabled={publishCommentPostMutation?.isPending}
                          type="submit"
                          className="bg-secondary-color rounded-full absolute right-5 text-md text-white animation-fade z-10 h-7 w-7 flex items-center justify-center"
                        >
                          <IoSend size={16} />
                        </button>
                      )}
                    </div>
                  </form>
                ) : (
                  <div className="text-center bg-muted-color/20 py-4">
                    <h2 className="text-lg font-semibold">
                      Want to comment something?
                    </h2>
                    <p>
                      Please,{" "}
                      <Link
                        className="text-primary-color-light underline font-bold"
                        to={"/sign-in?redirect=/posts"}
                      >
                        log in
                      </Link>{" "}
                      to leave one!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      </PostCommentModal>
    </>
  );
};

export default PublicPost;

// Single Comment
const SingleComment = ({ post, comment, userInfo }) => {
  const [toggleComment, setToggleComment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  // Edit comment of a post
  const editCommentMutation = useMutation({
    mutationFn: async (commentInfo) =>
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/posts/comment/${comment?.id}`,
        commentInfo
      ),
    onSuccess: (res) => {
      toast.success("Comment edited successfully!");
      queryClient.invalidateQueries(["posts"]);
      setIsEditing(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleEditComment = (e) => {
    e.preventDefault();

    const commentInfo = {
      content: e?.target?.content?.value?.trim(),
    };

    // Form validation
    if (!commentInfo?.content)
      return toast.error(`Fill up the blanks available!`);

    editCommentMutation.mutate(commentInfo);
  };

  // Delete comment of a post
  const deleteCommentMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/posts/comment/${comment?.id}`
      ),
    onSuccess: (res) => {
      toast.success("Comment deleted successfully!");
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleDeleteComment = () => {
    setToggleComment(false);

    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this comment? This action cannot be undone.",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCommentMutation.mutate({
          onSuccess: () => {
            // Swal.fire({
            //   title: "Deleted!",
            //   text: "The comment has been successfully deleted.",
            //   icon: "success",
            // });
          },
          onError: () => {
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the comment.",
              icon: "error",
            });
          },
        });
      }
    });
  };

  return (
    <div className="bg-primary-color/10 p-4 rounded-md my-4 relative group">
      <div className="flex items-center gap-2 border-b border-tertiary-color/30 pb-3">
        {" "}
        <img
          className="h-10 w-10 rounded-full border-2 border-primary-color/50"
          src={
            comment?.owner?.user_profile_image
              ? `${comment?.owner?.user_profile_image?.cloud_front_domain}/${comment?.owner?.user_profile_image?.aws_file_name}`
              : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
          }
        />
        <div>
          <h2 className="font-bold text-sm">{comment?.owner?.name}</h2>
          <h2 className="text-xs text-green-500 font-semibold">
            {comment?.owner?.id === post?.owner?.id ? "Admin" : null}
          </h2>
        </div>
      </div>

      <div className="pt-3">
        {isEditing ? (
          <form className="flex gap-2" onSubmit={handleEditComment}>
            <textarea
              className="resize-none rounded-md outline-none p-2 text-xs w-full"
              defaultValue={comment?.content}
              name="content"
              rows={2}
              cols={0}
            />

            <button
              className="font-bold text-primary-color text-xs"
              disabled={editCommentMutation?.isPending}
              type="submit"
            >
              {editCommentMutation?.isPending ? "Saving..." : "Save"}
            </button>
          </form>
        ) : (
          <p className="text-xs font-thin text-black break-all ">
            {comment?.content}
          </p>
        )}

        <BiSolidQuoteRight className="absolute right-4 bottom-4 size-5 text-primary-color/70" />

        <div
          className={`absolute top-5 right-4 size-5  ${
            comment?.owner?.email === userInfo?.email
              ? "bg-primary-color h-7 w-7 flex items-center justify-center rounded-full cursor-pointer"
              : ""
          }`}
          onClick={() => setToggleComment(!toggleComment)}
        >
          <div className="relative">
            {comment?.owner?.email === userInfo?.email ? (
              <>
                {/* Three Vertical Dots */}
                <div className="text-white cursor-pointer transition-opacity">
                  <BsThreeDots size={18} />
                </div>

                {/* Comment Edit and Delete Options */}
                {toggleComment && (
                  <>
                    <ul className="absolute top-34 right-5 shadow-lg bg-white w-max rounded max-h-96 z-[9999999]">
                      <NavbarDropdownLink
                        hoverBgLink={
                          "hover:bg-secondary-color hover:text-white text-xs"
                        }
                        onClick={() => {
                          setIsEditing(!isEditing);
                          setToggleComment(!toggleComment);
                        }}
                        linkText={"Edit"}
                      />

                      <NavbarDropdownLink
                        hoverBgLink={
                          "hover:bg-red-500 hover:text-white text-xs"
                        }
                        onClick={handleDeleteComment}
                        linkText={"Delete"}
                      />
                    </ul>
                  </>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <h2 className="text-xs">{formatDate(comment?.created_at)}</h2>
      </div>
    </div>
  );
};

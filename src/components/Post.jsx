import PublishedPostsImages from "../pages/ProfileRemembered/components/PublishedPostsImages";
import PostCommentModal from "../pages/ProfileRemembered/components/PostCommentModal";
import EditPostForm from "../pages/ProfileRemembered/components/EditPostForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CarouselCommentPosts from "./CarouselCommentPosts";
import getFastApiErrors from "../utils/getFastApiErrors";
import NavbarDropdownLink from "./NavbarDropdownLink";
import Modal from "./Modal";
import AppContext from "../context/AppProvider";
import formatDate from "../utils/formatDate";
import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";

// Nextui imports
import { Button } from "@nextui-org/react";

// Flowbite imports
import { Modal as ModalFlowbite, Tooltip } from "flowbite-react";

// Icons
import { BsHearts, BsThreeDots } from "react-icons/bs";
import { BiSolidQuoteRight } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import { FaRegMessage } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import { IoSend } from "react-icons/io5";

export const HeartIcon = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill={filled ? fill : "none"}
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

const Post = ({ isOwner, post, rememberName }) => {
  const { userInfo } = useContext(AppContext);
  const postLikesMapeados = post?.post_likes?.map((item) => item?.owner?.name);
  const postLikesWithItsNames = postLikesMapeados?.map((item, index) => (
    <p key={index}>{item}</p>
  ));
  const alreadyLikedPost = post?.post_likes?.find(
    (item) => item?.owner?.email === userInfo?.email
  );
  const [openModal, setOpenModal] = useState(false);
  const [openModalEditPost, setOpenModalEditPost] = useState(false);
  const [modalPostComments, setModalPostComments] = useState(false);
  const [openPostDropDown, setOpenPostDropDown] = useState(false);
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

  // Delete post
  const deletePostMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${post?.id}`),
    onSuccess: (res) => {
      toast.success("Post deleted successfully!");
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleDeletePost = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePostMutation.mutate(null, {
          onSuccess: () => {
            // Swal.fire({
            //   title: "Deleted!",
            //   text: "Your post has been deleted.",
            //   icon: "success",
            // });
          },
          onError: () => {
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting your post.",
              icon: "error",
            });
          },
        });
      }
    });
  };

  // --> Like a POST
  const likePostMutation = useMutation({
    mutationFn: async (commentInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/likes/${post?.id}`,
        commentInfo
      ),
    onSuccess: (res) => {
      toast.success("Heart given successfully!");
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (err) => {
      console.log(err);
      // toast.error(getFastApiErrors(err));
    },
  });

  const handleToggleLikePost = () => {
    likePostMutation?.mutate();
  };

  return (
    <>
      <div className="hover:shadow-2xl animation-fade bg-white mb-5 p-3 shadow-lg rounded-lg border-b [&:not(:last-child)]:border-gray-400/50 py-3">
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

          {/* Vertical Dots Dropdown */}
          {isOwner && (
            <div className="relative">
              <button
                id="dropdownDividerButton"
                data-dropdown-toggle="dropdownDivider"
                className="animation-fade text-xl hover:rounded-full  hover:bg-white/20"
                onClick={() => setOpenPostDropDown(!openPostDropDown)}
                type="button"
              >
                <HiDotsVertical size={23} />
              </button>

              {openPostDropDown && (
                <>
                  {createPortal(
                    <div
                      onClick={() => setOpenPostDropDown(!openPostDropDown)}
                      className="h-[100vh] fixed top-0 w-full"
                    ></div>,
                    document.body
                  )}

                  <ul className="absolute right-5 shadow-lg bg-gray-200 w-max rounded max-h-96 z-50">
                    {/* Edit Post */}
                    <>
                      <NavbarDropdownLink
                        hoverBgLink={
                          "hover:bg-secondary-color hover:text-white"
                        }
                        linkText={"Edit Post"}
                        onClick={() => {
                          // setOpenPostDropDown(false);
                          setOpenModalEditPost(true);
                        }}
                      />

                      <EditPostLogic
                        setOpenModalEditPost={setOpenModalEditPost}
                        openModalEditPost={openModalEditPost}
                        post={post}
                      />

                      {/* Delete Post */}
                      <NavbarDropdownLink
                        hoverBgLink={"hover:bg-red-500 hover:text-white"}
                        linkText={"Delete Post"}
                        onClick={handleDeletePost}
                      />
                    </>
                  </ul>
                </>
              )}
            </div>
          )}
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
                  {postLikesWithItsNames}

                  <button onClick={() => setOpenModal(true)}>
                    See more...
                  </button>

                  <ModalFlowbite
                    dismissible
                    show={openModal}
                    onClose={() => setOpenModal(false)}
                  >
                    <ModalFlowbite.Header>
                      Users that liked this post...
                    </ModalFlowbite.Header>

                    <ModalFlowbite.Body>
                      <div className="space-y-2 overflow-y-auto max-h-72">
                        {postLikesWithItsNames}
                      </div>
                    </ModalFlowbite.Body>
                  </ModalFlowbite>
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
          <div className="flex items-center sm:justify-start justify-between gap-8 border-t pt-3 mt-3">
            {userInfo?.access_token ? (
              <button
                className={`flex items-center gap-2.5 text-gray-500 hover:text-red-500 ${
                  alreadyLikedPost && "opacity-40 hover:text-gray-500"
                }`}
                onClick={handleToggleLikePost}
                disabled={alreadyLikedPost}
                type="button"
              >
                {alreadyLikedPost ? (
                  <IoMdHeart
                    size={22}
                    className="text-red-500 animation-fade"
                  />
                ) : (
                  <div className="animation-fade flex items-center gap-3 group transition-all duration-250">
                    <Button
                      onPress={handleToggleLikePost}
                      isIconOnly
                      aria-label="Like"
                      color="danger"
                      className="sm:w-9 w-8 sm:h-9 h-8 sm:rounded-lg rounded-md group-hover:bg-opacity-60"
                    >
                      <HeartIcon />
                    </Button>

                    <p className="sm:block hidden group-hover:text-red-500">
                      Leave a heart
                    </p>
                  </div>
                )}

                {alreadyLikedPost && "You left a heart"}
              </button>
            ) : (
              <Link
                className={`flex items-center gap-2.5 text-gray-500 hover:text-red-500`}
                to={"/sign-in?redirect=/posts"}
              >
                <Button
                  onPress={(e) => e.preventDefault()}
                  type="button"
                  isIconOnly
                  aria-label="Like"
                  color="danger"
                  className="sm:w-9 w-8 sm:h-9 h-8 sm:rounded-lg rounded-md group-hover:bg-opacity-60"
                >
                  <HeartIcon />
                </Button>
                <span className="sm:block hidden">Leave a heart</span>
              </Link>
            )}

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
              ownerName={rememberName}
              commentImages={post?.gallery_images}
            />
          </article>

          <article className={`flex-1`}>
            <div className="flex flex-col md:justify-between justify-start  h-full">
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

export default Post;

// Edit Post
const EditPostLogic = ({ setOpenModalEditPost, openModalEditPost, post }) => {
  const queryClient = useQueryClient();

  const editPostMutation = useMutation({
    mutationFn: async (commentInfo) =>
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/posts/${post?.id}`,
        commentInfo
      ),
    onSuccess: (res) => {
      toast.success("Post edited successfully!");
      queryClient.invalidateQueries(["posts"]);
      setOpenModalEditPost(!openModalEditPost);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmitEditPost = (e) => {
    e.preventDefault();

    const commentInfo = {
      content: e?.target?.content?.value,
    };

    // Form validation
    if (!commentInfo?.content) return toast.error(`Fill up the blank!`);

    editPostMutation.mutate(commentInfo);
  };

  return (
    <>
      <Modal
        titleModal={"Edit Post"}
        handleSubmit={handleSubmitEditPost}
        setOpenModal={setOpenModalEditPost}
        openModal={openModalEditPost}
        modalForm={true}
      >
        <EditPostForm
          setOpenModalEditPost={setOpenModalEditPost}
          post={post}
          editPostMutation={editPostMutation}
        />
      </Modal>
    </>
  );
};

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

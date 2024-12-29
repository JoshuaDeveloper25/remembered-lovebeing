import PublishedPostsImages from "../pages/ProfileRemembered/components/PublishedPostsImages";
import PostCommentModal from "../pages/ProfileRemembered/components/PostCommentModal";
import EditPostForm from "../pages/ProfileRemembered/components/EditPostForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CarouselCommentPosts from "./CarouselCommentPosts";
import getFastApiErrors from "../utils/getFastApiErrors";
import NavbarDropdownLink from "./NavbarDropdownLink";
import { HiDotsVertical } from "react-icons/hi";
import AppContext from "../context/AppProvider";
import { FaRegMessage } from "react-icons/fa6";
import formatDate from "../utils/formatDate";
import { FaQuoteLeft } from "react-icons/fa";
import { useContext, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import Modal from "./Modal";
import axios from "axios";
import Swal from "sweetalert2";

const Post = ({ isOwner, post, rememberName }) => {
  const { userInfo } = useContext(AppContext);
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
          rememberName={rememberName}
          galleryImages={post?.gallery_images}
          setToggleModal={setModalPostComments}
        />

        {/* Footer of the post */}
        <div className="flex flex-col sm:flex-row gap-2 justify-between sm:items-center items-start my-5">
          <button
            onClick={() => setModalPostComments(!modalPostComments)}
            className="btn btn-blue w-auto flex items-center gap-2.5 font-semibold"
          >
            <FaRegMessage size={20} /> Comment
          </button>

          <h3>
            Comments:{" "}
            <span className="font-bold">{post?.comments?.length}</span>
          </h3>
        </div>
      </div>

      {/* Modal to preview post with its comments and images */}
      <PostCommentModal
        openModal={modalPostComments}
        setOpenModal={setModalPostComments}
      >
        <div className="flex flex-col lg:flex-row h-full">
          <article className="flex-[30%]">
            <CarouselCommentPosts
              ownerName={post?.owner?.name}
              commentImages={post?.gallery_images}
            />
          </article>

          <article className={`flex-1 flex flex-col justify-between`}>
            <div className="px-4 py-4 border-b border-b-tertiary-color/20">
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

              <h3 className="mt-1 text-tertiary-color">{post?.content}</h3>
            </div>

            <div className="overflow-y-auto lg:max-h-none max-h-[20rem] h-full">
              <article
                className={`relative flex-1 flex flex-col justify-between h-full`}
              >
                {/* If there's no comments we show a title */}
                {!post?.comments?.length ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="py-3 px-4 text-center text-xl font-bold">
                      No comments added yet...{" "}
                    </p>
                  </div>
                ) : (
                  <div className="px-4">
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
                )}

                {userInfo?.access_token ? (
                  <form
                    className={`self-end w-full sticky bottom-0 bg-transparent z-[9999]`}
                    onSubmit={handleSubmitPublishComment}
                  >
                    <div className="relative">
                      <img
                        className="absolute left-1 top-1.5 w-8 rounded-full"
                        src={
                          userInfo?.profile_image
                            ? `${userInfo?.profile_image?.cloud_front_domain}/${userInfo?.profile_image?.aws_file_name}`
                            : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                        }
                      />

                      <textarea
                        rows="1"
                        cols="1"
                        wrap="soft"
                        name="content"
                        value={comment}
                        onChange={(e) => setComment(e?.target?.value)}
                        placeholder="Comment something..."
                        className="block ps-11 pe-16 py-2.5 w-full text-base text-fourth-color bg-gray-50 resize-none outline-none"
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
              </article>
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
      customClass: {
        popup: "swal-custom-z-index",
      },
      title: "Are you sure?",
      text: "Do you really want to delete this comment?",
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
            //   text: "Your comment has been deleted.",
            //   icon: "success",
            // });
          },
          onError: () => {
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting your comment.",
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
          <h2 className="text-xs">
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
          <p className="text-xs font-thin text-black">{comment?.content}</p>
        )}

        <FaQuoteLeft className="absolute top-3 right-5 size-5 text-primary-color/70" />
      </div>

      <div className="flex justify-between items-center mt-2">
        <h2 className="text-xs">{formatDate(comment?.created_at)}</h2>

        <div className="relative">
          {comment?.owner?.email === userInfo?.email ? (
            <>
              {/* Three Vertical Dots */}
              <div className="text-primary-color cursor-pointer  transition-opacity">
                <BsThreeDots
                  onClick={() => setToggleComment(!toggleComment)}
                  size={18}
                />
              </div>

              {/* Comment Edit and Delete Options */}
              {toggleComment && (
                <>
                  {createPortal(
                    <div
                      onClick={() => setToggleComment(!toggleComment)}
                      className="h-[100vh] fixed top-0 w-full"
                    ></div>,
                    document.body
                  )}

                  <ul className="absolute top-34 right-5 shadow-lg bg-white w-max rounded max-h-96 z-50">
                    <NavbarDropdownLink
                      hoverBgLink={
                        "hover:bg-secondary-color hover:text-white text-xs"
                      }
                      onClick={() => {
                        setIsEditing(!isEditing);
                        setToggleComment(false);
                      }}
                      linkText={"Edit"}
                    />

                    <NavbarDropdownLink
                      hoverBgLink={"hover:bg-red-500 text-xs hover:text-white"}
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
  );
};

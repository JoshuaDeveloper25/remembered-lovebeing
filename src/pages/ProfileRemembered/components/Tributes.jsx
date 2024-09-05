import NavbarDropdownLink from "../../../components/NavbarDropdownLink";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import AppContext from "../../../context/AppProvider";
import { useContext, useState } from "react";
import formatDate from "../../../utils/formatDate";
import { createPortal } from "react-dom";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

// All Tributes
const Tributes = ({ tributes, isOwner }) => {
  return (
    <section className="bg-white mb-5 p-3 shadow-2xl rounded-lg border-b [&:not(:last-child)]:border-gray-400/50 py-3">
      <div className="grid grid-cols-1 gap-4">
        {tributes?.map((tribute) => {
          return (
            <Tribute isOwner={isOwner} tribute={tribute} key={tribute?.id} />
          );
        })}
      </div>
    </section>
  );
};

export default Tributes;

// Individual Tribute
const Tribute = ({ tribute, isOwner }) => {
  const [openTributeOptions, setOpenTributeOptions] = useState(false);
  const [commentingTribute, setCommentingTribute] = useState(false);
  const [edititingTribute, setEditingTribute] = useState(false);
  const [readMoreTribute, setReadMoreTribute] = useState(false);
  const { userInfo } = useContext(AppContext);
  const queryClient = useQueryClient();

  // Reply a Tribute Answer/Comment
  const replyTributeMutation = useMutation({
    mutationFn: async (commentInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/tributes/comment/${tribute?.id}`,
        commentInfo
      ),
    onSuccess: (res) => {
      toast.success("Replied to a tribute!");
      queryClient.invalidateQueries(["profile"]);
      setCommentingTribute(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmitReplyTribute = (e) => {
    e.preventDefault();

    const commentInfo = {
      content: e?.target?.content?.value,
    };

    // Form validation
    if (!commentInfo?.content) return toast.error(`Fill up the blank!`);

    replyTributeMutation.mutate(commentInfo);

    e?.target?.reset();
  };

  // Edit Tribute
  const editTributeMutation = useMutation({
    mutationFn: async (commentInfo) =>
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/tributes/${tribute?.id}`,
        commentInfo
      ),
    onSuccess: (res) => {
      toast.success("Tribute edited!");
      queryClient.invalidateQueries(["profile"]);
      setEditingTribute(!edititingTribute);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleEditTribute = (e) => {
    e.preventDefault();

    const commentInfo = {
      content: e?.target?.content?.value,
    };

    // Form validation
    if (!commentInfo?.content) return toast.error(`Fill up the blank!`);

    editTributeMutation.mutate(commentInfo);
  };

  // Delete Tribute
  const deleteTributeMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/tributes/${tribute?.id}`
      ),
    onSuccess: (res) => {
      toast.success("Tribute deleted successfully!");
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleDeleteTribute = () => {
    const user_request = confirm(
      `Are you sure you want to delete this tribute?`
    );

    if (!user_request) return;

    deleteTributeMutation.mutate();
  };

  return (
    <article className="shadow-[0_30px_40px_-20px_rgba(0,0,0,0.4)] py-10 px-6">
      {/* Header of the Tribute */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 mb-3">
          <div>
            <img
              src={
                tribute?.user_profile_image?.cloud_front_domain
                  ? `${tribute?.user_profile_image?.cloud_front_domain}/${tribute?.user_profile_image?.aws_file_name}`
                  : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
              }
              className="w-14 h-14 object-cover rounded-full"
            />
          </div>

          <div>
            <h2 className="text-md font-medium capitalize text-primary-color">
              {tribute?.owner?.name}
            </h2>

            <h4 className="text-tertiary-color text-[.7rem] font-medium">
              Created:{" "}
              <span className="font-bold">
                {" "}
                {formatDate(tribute?.created_at)}
              </span>
            </h4>
          </div>
        </div>

        {userInfo?.email === tribute?.owner?.email && (
          <div className="relative">
            <button
              id="dropdownDividerButton"
              data-dropdown-toggle="dropdownDivider"
              className="animation-fade text-xl hover:rounded-full  hover:bg-white/20 p-2"
              onClick={() => setOpenTributeOptions(!openTributeOptions)}
              type="button"
            >
              <FaEdit
                size={20}
                className="text-tertiary-color/80 animation-fade hover:text-tertiary-color"
              />
            </button>

            {openTributeOptions && (
              <>
                {createPortal(
                  <div
                    onClick={() => setOpenTributeOptions(!openTributeOptions)}
                    className="h-[100vh] fixed top-0 w-full"
                  ></div>,
                  document.body
                )}

                <ul className="absolute right-5 shadow-lg bg-white py-2 z-[1000] w-max rounded max-h-96 overflow-auto">
                  <NavbarDropdownLink
                    hoverBgLink={"hover:bg-secondary-color"}
                    linkText={"Edit"}
                    onClick={() => setEditingTribute(!edititingTribute)}
                  />

                  <NavbarDropdownLink
                    hoverBgLink={"hover:bg-red-500"}
                    linkText={"Delete"}
                    onClick={handleDeleteTribute}
                    linkTo={"#"}
                  />
                </ul>
              </>
            )}
          </div>
        )}
      </div>

      {/* Tribute Text */}
      {edititingTribute ? (
        <form onSubmit={handleEditTribute}>
          <textarea
            name="content"
            className="w-full border border-tertiary-color/30 px-2 py-2 resize-none text-tertiary-color text-sm my-1 outline-none"
            defaultValue={tribute?.content}
            rows={7}
          ></textarea>

          <button
            className="flex-1 animation-fade py-1 text-sm font-medium px-2 rounded text-white bg-secondary-color"
            disabled={editTributeMutation?.isPending}
            type="submit"
          >
            {editTributeMutation?.isPending
              ? "Saving Changes..."
              : "Save Changes"}
          </button>
        </form>
      ) : (
        <>
          {/* Tribute Desc */}
          {!readMoreTribute ? (
            <>
              <p className="text-tertiary-color text-sm my-1 md:line-clamp-3 mb-3">
                {tribute?.content}
              </p>

              {tribute?.content?.replace(/\s/g, "")?.length > 280 && (
                <div className="text-center">
                  <button
                    className="text-secondary-color outline-none font-medium"
                    onClick={() => setReadMoreTribute(!readMoreTribute)}
                    type="button"
                  >
                    Read More
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-tertiary-color text-sm my-1">
                {tribute?.content}
              </p>

              {tribute?.content?.replace(/\s/g, "")?.length > 280 && (
                <div className="text-center">
                  <button
                    className="text-red-500 border border-red-500 outline-none px-2 rounded-sm font-medium hover:bg-red-500 hover:text-white animation-fade"
                    onClick={() => setReadMoreTribute(!readMoreTribute)}
                    type="button"
                  >
                    Read Less
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Comment Section Tribute */}
      <h2 className="mb-2 font-semibold">Comments:</h2>

      <h3 className="font-medium text-sm">
        {!tribute.tribute_comments?.length &&
          `There's no comments in this tribute yet...`}
      </h3>

      {tribute.tribute_comments?.map((tributeComment) => {
        return (
          <TributeComment
            tributeComment={tributeComment}
            key={tributeComment?.id}
            userInfo={userInfo}
          />
        );
      })}

      <form onSubmit={handleSubmitReplyTribute} className="mt-4 mx-4">
        {!commentingTribute ? (
          <>
            <textarea
              name="content"
              placeholder="Comment on this memory..."
              className="w-full animation-fade rounded-sm border border-tertiary-color/30 px-2 py-2 resize-none text-tertiary-color text-sm my-1 outline-none"
              onClick={() => setCommentingTribute(true)}
              rows={0}
            ></textarea>
          </>
        ) : (
          <>
            <textarea
              name="content"
              placeholder="Comment on this memory..."
              className="w-full animation-fade rounded-sm border border-tertiary-color/30 px-2 py-2 resize-none text-tertiary-color text-sm my-1 outline-none"
              onClick={() => setCommentingTribute(true)}
              rows={5}
            ></textarea>

            <button
              className="flex-1 animation-fade py-1 text-sm font-medium px-2 rounded text-white bg-secondary-color"
              disabled={replyTributeMutation?.isPending}
              type="submit"
            >
              {replyTributeMutation?.isPending ? "Sending comment..." : "Send"}
            </button>
          </>
        )}
      </form>
    </article>
  );
};

// Individual tribute comment
const TributeComment = ({ tributeComment, userInfo }) => {
  const [openTributeCommentOptions, setOpenTributeCommentOptions] =
    useState(false);
  const [edititingTributeComment, setEditingTributeComment] = useState(false);
  const [readMoreTributeComment, setReadMoreTributeComment] = useState(false);
  const queryClient = useQueryClient();

  // Edit Tribute Comment
  const editTributeCommentMutation = useMutation({
    mutationFn: async (commentInfo) =>
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/tributescomment/${
          tributeComment?.id
        }`,
        commentInfo
      ),
    onSuccess: (res) => {
      toast.success("Tribute comment edited!");
      queryClient.invalidateQueries(["profile"]);
      setEditingTributeComment(!edititingTributeComment);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleEditTributeComment = (e) => {
    e.preventDefault();

    const commentInfo = {
      content: e?.target?.content?.value,
    };

    // Form validation
    if (!commentInfo?.content) return toast.error(`Fill up the blank!`);

    editTributeCommentMutation.mutate(commentInfo);
  };

  // Delete Tribute Comment
  const deleteTributeCommentMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/tributescomment/${tributeComment?.id}`
      ),
    onSuccess: (res) => {
      toast.success("Tribute comment deleted successfully!");
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleDeleteCommentTribute = () => {
    const user_request = confirm(
      `Are you sure you want to delete this tribute?`
    );

    if (!user_request) return;

    deleteTributeCommentMutation.mutate();
  };

  return (
    <div className="py-4 px-4 [&:not(:last-child)]:border-gray-400/50 border-l-2 bg-gray-400/25 mb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <img
              src={
                tributeComment?.owner?.user_profile_image?.cloud_front_domain
                  ? `${tributeComment?.owner?.user_profile_image?.cloud_front_domain}/${tributeComment?.owner?.user_profile_image?.aws_file_name}`
                  : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
              }
              className="w-12 h-12 object-cover rounded-full"
            />
          </div>

          <div>
            <h3 className="capitalize font-medium text-primary-color">
              {tributeComment?.owner?.name}
            </h3>
            <h4 className="text-[.7rem] text-tertiary-color">
              Created:{" "}
              <span className="font-bold">
                {formatDate(tributeComment?.created_at)}
              </span>
            </h4>
            <h5 className="text-[.7rem] text-tertiary-color font-semibold">
              {tributeComment?.owner?.email}
            </h5>
          </div>
        </div>

        {userInfo?.email === tributeComment?.owner?.email && (
          <div className="relative">
            <button
              id="dropdownDividerButton"
              data-dropdown-toggle="dropdownDivider"
              className="animation-fade text-xl hover:rounded-full  hover:bg-white/20 p-2"
              onClick={() =>
                setOpenTributeCommentOptions(!openTributeCommentOptions)
              }
              type="button"
            >
              <FaEdit
                size={20}
                className="text-tertiary-color/80 animation-fade hover:text-tertiary-color"
              />
            </button>

            {openTributeCommentOptions && (
              <>
                {createPortal(
                  <div
                    onClick={() =>
                      setOpenTributeCommentOptions(!openTributeCommentOptions)
                    }
                    className="h-[100vh] fixed top-0 w-full"
                  ></div>,
                  document.body
                )}

                <ul className="absolute right-5 shadow-lg bg-white py-2 z-[1000] w-max rounded max-h-96 overflow-auto">
                  <NavbarDropdownLink
                    hoverBgLink={"hover:bg-secondary-color"}
                    linkText={"Edit"}
                    onClick={() =>
                      setEditingTributeComment(!edititingTributeComment)
                    }
                  />

                  <NavbarDropdownLink
                    hoverBgLink={"hover:bg-red-500"}
                    linkText={"Delete"}
                    onClick={handleDeleteCommentTribute}
                    linkTo={"#"}
                  />
                </ul>
              </>
            )}
          </div>
        )}
      </div>

      {/* Tribute Text Comment When Editing */}
      {edititingTributeComment ? (
        <form onSubmit={handleEditTributeComment}>
          <textarea
            name="content"
            className="w-full border border-tertiary-color/30 px-2 py-2 resize-none text-tertiary-color text-sm my-1 outline-none"
            defaultValue={tributeComment?.content}
            rows={7}
          ></textarea>

          <button
            className="flex-1 animation-fade py-1 text-sm font-medium px-2 rounded text-white bg-secondary-color"
            disabled={editTributeCommentMutation?.isPending}
            type="submit"
          >
            {editTributeCommentMutation?.isPending
              ? "Saving Changes..."
              : "Save Changes"}
          </button>
        </form>
      ) : (
        <>
          {/* Tribute Text Comment When Normal State */}
          {!readMoreTributeComment ? (
            <>
              <p className="text-tertiary-color text-sm my-1 md:line-clamp-3">
                {tributeComment?.content}
              </p>

              {tributeComment?.content?.replace(/\s/g, "")?.length > 280 && (
                <div className="text-center">
                  <button
                    className="text-secondary-color outline-none font-medium"
                    onClick={() =>
                      setReadMoreTributeComment(!readMoreTributeComment)
                    }
                    type="button"
                  >
                    Read More
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-tertiary-color text-sm my-1">
                {tributeComment?.content}
              </p>

              {tributeComment?.content?.replace(/\s/g, "")?.length > 280 && (
                <div className="text-center">
                  <button
                    className="text-red-500 border border-red-500 outline-none px-2 rounded-sm font-medium hover:bg-red-500 hover:text-white animation-fade"
                    onClick={() =>
                      setReadMoreTributeComment(!readMoreTributeComment)
                    }
                    type="button"
                  >
                    Read Less
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

import NavbarDropdownLink from "../../../components/NavbarDropdownLink";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AlertUserExample from "../../../components/AlertUserExample";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import AppContext from "../../../context/AppProvider";
import formatDate from "../../../utils/formatDate";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";

// All Tributes
const Tributes = ({ isAlbertEinstein, tributes, isOwner }) => {
  return (
    <section className="bg-white mb-5 p-3 shadow-2xl rounded-lg border-b [&:not(:last-child)]:border-gray-400/50 py-3">
      <div className="grid grid-cols-1 gap-4">
        {tributes?.map((tribute) => {
          return (
            <Tribute
              isAlbertEinstein={isAlbertEinstein}
              isOwner={isOwner}
              tribute={tribute}
              key={tribute?.id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Tributes;

// Individual Tribute
const Tribute = ({ tribute, isOwner, isAlbertEinstein }) => {
  const [openTributeOptions, setOpenTributeOptions] = useState(false);
  const [commentingTribute, setCommentingTribute] = useState(false);
  const [edititingTribute, setEditingTribute] = useState(false);
  const [readMoreTribute, setReadMoreTribute] = useState(false);
  const { userInfo, languageSelected } = useContext(AppContext);
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  // Reply a Tribute Answer/Comment
  const replyTributeMutation = useMutation({
    mutationFn: async (commentInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/tributes/comment/${tribute?.id}`,
        commentInfo
      ),
    onSuccess: (res) => {
      toast.success(t("Replied to a tribute!"));
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
    if (!commentInfo?.content) return toast.error(t(`Fill up the blank!`));

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
      toast.success(t("Tribute edited!"));
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
    if (!commentInfo?.content) return toast.error(t(`Fill up the blank!`));

    editTributeMutation.mutate(commentInfo);
  };

  // Delete Tribute
  const deleteTributeMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/tributes/${tribute?.id}`
      ),
    onSuccess: (res) => {
      toast.success(t("Tribute deleted successfully!"));
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleDeleteTribute = () => {
    Swal.fire({
      title: t("Are you sure?"),
      text: t(
        "Do you really want to delete this tribute? This action cannot be undone."
      ),
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("Yes, delete it!"),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTributeMutation.mutate({
          onSuccess: () => {
            // Swal.fire({
            //   title: "¡Eliminado!",
            //   text: "El tributo ha sido eliminado correctamente.",
            //   icon: "success",
            // });
          },
          onError: () => {
            Swal.fire({
              title: t("Error!"),
              text: t("There was a problem trying to remove the tribute."),
              icon: "error",
            });
          },
        });
      }
    });
  };

  return (
    <article className="shadow-[0_30px_40px_-20px_rgba(0,0,0,0.4)] py-10 px-6">
      {/* Header of the Tribute */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 mb-3">
          <div>
            <img
              src={
                tribute?.owner?.user_profile_image?.cloud_front_domain
                  ? `${tribute?.owner?.user_profile_image?.cloud_front_domain}/${tribute?.owner?.user_profile_image?.aws_file_name}`
                  : `https://i.pinimg.com/474x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg`
              }
              className="w-12 h-12 object-cover rounded-full"
            />
          </div>

          <div>
            <h2 className="text-md font-medium capitalize text-primary-color">
              {tribute?.owner?.name}
            </h2>

            <h4 className="text-tertiary-color text-[.7rem] font-medium">
              {t("Created")}:{" "}
              <span className="font-bold">
                {" "}
                {formatDate(
                  tribute?.created_at,
                  languageSelected === "es" ? "spanish" : "english"
                )}
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

                <ul className="absolute right-5 shadow-lg bg-white z-[1000] w-max rounded max-h-96 overflow-auto">
                  <NavbarDropdownLink
                    hoverBgLink={"hover:bg-secondary-color hover:text-white"}
                    linkText={t("Edit")}
                    onClick={() => setEditingTribute(!edititingTribute)}
                  />

                  <NavbarDropdownLink
                    hoverBgLink={"hover:bg-red-500 hover:text-white"}
                    linkText={t("Delete")}
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
              ? t("Saving Changes...")
              : t("Save Changes")}
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
                    {t("Read More")}
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
                    {t("Read Less")}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Comment Section Tribute */}
      <h2 className="mb-2 font-semibold">{t("Comments")}:</h2>

      <h3 className="font-medium text-sm">
        {!tribute.tribute_comments?.length &&
          t(`There's no comments in this tribute yet...`)}
      </h3>

      {tribute.tribute_comments?.map((tributeComment) => {
        return (
          <TributeComment
            languageSelected={languageSelected}
            t={t}
            tributeComment={tributeComment}
            key={tributeComment?.id}
            userInfo={userInfo}
          />
        );
      })}

      <form onSubmit={handleSubmitReplyTribute} className="mt-4 mx-4">
        {!commentingTribute ? (
          <>
            {!userInfo?.access_token ? null : (
              <textarea
                name="content"
                placeholder={t("Comment on this tribute...")}
                className="w-full animation-fade rounded-sm border border-tertiary-color/30 px-2 py-2 resize-none text-tertiary-color text-sm my-1 outline-none"
                onClick={() => setCommentingTribute(true)}
                rows={0}
              ></textarea>
            )}
          </>
        ) : (
          <>
            {!userInfo?.access_token ? null : (
              <>
                <textarea
                  name="content"
                  placeholder={t("Comment on this tribute...")}
                  className="w-full animation-fade rounded-sm border border-tertiary-color/30 px-2 py-2 resize-none text-tertiary-color text-sm my-1 outline-none"
                  onClick={() => setCommentingTribute(true)}
                  rows={5}
                ></textarea>

                {isAlbertEinstein && !isOwner ? (
                  <AlertUserExample toolTipId={"addNewTributeComment"}>
                    <button
                      className="flex-1 animation-fade py-1 text-sm font-medium px-2 rounded text-white bg-secondary-color pointer-events-none"
                      type="button"
                    >
                      {t("Send")}
                    </button>
                  </AlertUserExample>
                ) : (
                  <button
                    className="flex-1 animation-fade py-1 text-sm font-medium px-2 rounded text-white bg-secondary-color"
                    disabled={replyTributeMutation?.isPending}
                    type="submit"
                  >
                    {replyTributeMutation?.isPending
                      ? t("Sending comment...")
                      : t("Send")}
                  </button>
                )}
              </>
            )}
          </>
        )}
      </form>
    </article>
  );
};

// Individual tribute comment
const TributeComment = ({ tributeComment, userInfo, t, languageSelected }) => {
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
      toast.success(t("Tribute comment edited!"));
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
    if (!commentInfo?.content) return toast.error(t(`Fill up the blank!`));

    editTributeCommentMutation.mutate(commentInfo);
  };

  // Delete Tribute Comment
  const deleteTributeCommentMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/tributescomment/${tributeComment?.id}`
      ),
    onSuccess: (res) => {
      toast.success(t("Tribute comment deleted successfully!"));
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleDeleteCommentTribute = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas eliminar este comentario del tributo? Esta acción no se puede deshacer.",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTributeCommentMutation.mutate({
          onSuccess: () => {
            // Swal.fire({
            //   title: "¡Eliminado!",
            //   text: "El comentario del tributo ha sido eliminado correctamente.",
            //   icon: "success",
            // });
          },
          onError: () => {
            Swal.fire({
              title: "¡Error!",
              text: "Hubo un problema al intentar eliminar el comentario del tributo.",
              icon: "error",
            });
          },
        });
      }
    });
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
                  : `https://i.pinimg.com/474x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg`
              }
              className="w-12 h-12 object-cover rounded-full"
            />
          </div>

          <div>
            <h3 className="capitalize font-medium text-primary-color">
              {tributeComment?.owner?.name}
            </h3>
            <h4 className="text-[.7rem] text-tertiary-color">
              {t("Created")}:{" "}
              <span className="font-bold">
                {formatDate(
                  tributeComment?.created_at,
                  languageSelected === "es" ? "spanish" : "english"
                )}
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

                <ul className="absolute right-5 shadow-lg bg-white z-[1000] w-max rounded max-h-96 overflow-auto">
                  <NavbarDropdownLink
                    hoverBgLink={"hover:bg-secondary-color hover:text-white"}
                    linkText={t("Edit")}
                    onClick={() =>
                      setEditingTributeComment(!edititingTributeComment)
                    }
                  />

                  <NavbarDropdownLink
                    hoverBgLink={"hover:bg-red-500 hover:text-white"}
                    linkText={t("Delete")}
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
              ? t("Saving Changes...")
              : t("Save Changes")}
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
                    {t("Read More")}
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
                    {t("Read Less")}
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

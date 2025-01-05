import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import AppContext from "../../../context/AppProvider";
import formatDate from "../../../utils/formatDate";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";

// All Condolences
const Condolences = ({ condolences, isOwner }) => {
  return (
    <section className="bg-white mb-5 p-3 shadow-lg rounded-lg border-b [&:not(:last-child)]:border-gray-400/50 py-3">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
        {condolences?.map((condolence) => {
          return (
            <Condolence
              isOwner={isOwner}
              condolence={condolence}
              key={condolence?.id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Condolences;

// Individual Condolence
const Condolence = ({ condolence, isOwner }) => {
  const [edititingCondolence, setEditingCondolence] = useState(false);
  const [showTooltipReply, setShowTooltipReply] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { userInfo } = useContext(AppContext);
  const [reply, setReply] = useState(false);
  const queryClient = useQueryClient();
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (
      (showTooltip && tooltipRef.current) ||
      (showTooltipReply && tooltipRef?.current)
    ) {
      const tooltip = tooltipRef.current;
      const tooltipRect = tooltip.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let left = 0;
      let top = 0;

      if (tooltipRect.right > windowWidth) {
        left = windowWidth - tooltipRect.width - 10;
      } else {
        left = 0;
      }

      if (tooltipRect.bottom > windowHeight) {
        top = -(tooltipRect.height + 10);
      } else {
        top = 10;
      }

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    }
  }, [showTooltip, showTooltipReply]);

  // Reply and Edit a Condolence Answer/Comment
  const replyCondolenceMutation = useMutation({
    mutationFn: async (commentInfo) =>
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/condolences/${condolence?.id}`,
        commentInfo
      ),
    onSuccess: (res) => {
      toast.success("Replied to a condolence!");
      queryClient.invalidateQueries(["profile"]);
      setReply(!reply);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmitReplyCondolence = (e) => {
    e.preventDefault();

    const commentInfo = {
      owner_reply: e?.target?.owner_reply?.value,
    };

    // Form validation
    if (!commentInfo?.owner_reply) return toast.error(`Fill up the blank!`);

    replyCondolenceMutation.mutate(commentInfo);
  };

  // Edit Condolence
  const editCondolenceMutation = useMutation({
    mutationFn: async (commentInfo) =>
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/condolences/${condolence?.id}`,
        commentInfo
      ),
    onSuccess: (res) => {
      toast.success("Condolence edited!");
      queryClient.invalidateQueries(["profile"]);
      setEditingCondolence(!edititingCondolence);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleEditCondolence = (e) => {
    e.preventDefault();

    const commentInfo = {
      content: e?.target?.content?.value,
    };

    // Form validation
    if (!commentInfo?.content) return toast.error(`Fill up the blank!`);

    editCondolenceMutation.mutate(commentInfo);
  };

  // Delete Condolence
  const deleteCondolenceMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/condolences/${condolence?.id}`
      ),
    onSuccess: (res) => {
      toast.success("Condolence deleted successfully!");
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleDeleteCondolence = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas eliminar este mensaje de condolencia? Esta acción no se puede deshacer.",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCondolenceMutation.mutate({
          onSuccess: () => {
            // Swal.fire({
            //   title: "¡Eliminado!",
            //   text: "El mensaje de condolencia ha sido eliminado correctamente.",
            //   icon: "success",
            // });
          },
          onError: () => {
            Swal.fire({
              title: "¡Error!",
              text: "Hubo un problema al intentar eliminar el mensaje de condolencia.",
              icon: "error",
            });
          },
        });
      }
    });
  };

  return (
    <article className=" shadow-[0_30px_40px_-20px_rgba(0,0,0,0.4)] py-10 px-6 border-t-2 border-red-500 rounded-t-[5px]">
      <h2 className="text-md font-medium capitalize">
        {condolence?.owner?.name}
      </h2>

      <h4 className="text-tertiary-color text-[.7rem] font-medium">
        Created:{" "}
        <span className="font-bold"> {formatDate(condolence?.created_at)}</span>
      </h4>

      <div className="inline-block">
        {edititingCondolence ? (
          <form onSubmit={handleEditCondolence}>
            <textarea
              name="content"
              className="w-full border border-tertiary-color/30 px-2 py-2 resize-none text-tertiary-color text-sm my-1 outline-none"
              defaultValue={condolence?.content}
              rows={3}
            ></textarea>

            <button
              className="flex-1 animation-fade py-1 text-sm font-medium px-2 rounded text-white bg-secondary-color"
              disabled={editCondolenceMutation?.isPending}
              type="submit"
            >
              {editCondolenceMutation?.isPending
                ? "Saving Changes..."
                : "Save Changes"}
            </button>
          </form>
        ) : (
          <>
            {/* Condolence Desc */}
            <p className="text-tertiary-color text-sm my-1 md:line-clamp-3">
              {condolence?.content}
            </p>

            {/* Read More */}
            {condolence?.content?.length > 10 && (
              <div
                className="relative md:flex hidden"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <button
                  className="text-secondary-color font-semibold tracking-wide cursor-pointer text-sm text-center w-full z-10 relative"
                  type="button"
                >
                  Read More
                </button>

                {showTooltip && (
                  <div
                    ref={tooltipRef}
                    className="absolute left-0 top-full w-max max-w-[16rem] mt-2 bg-gray-200 p-2 shadow-2xl border rounded z-20 tooltip tooltip-show"
                  >
                    <p className="text-black/70 text-sm">
                      {condolence?.content}
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      {/* Condolence Footer */}
      <div className="relative mt-4 mb-2">
        {condolence?.owner_reply ? (
          <>
            {/* Editing Reply Of A Condolence */}
            <div className="border-t border-tertiary-color/40 py-4">
              <h3 className="font-medium">Owner Reply</h3>

              {/* Condolence Desc */}
              <p className="text-tertiary-color text-sm my-1 md:line-clamp-1">
                {condolence?.owner_reply}
              </p>

              {/* See Reply */}
              {condolence?.content?.length > 15 && (
                <div
                  className="relative md:flex hidden"
                  onMouseEnter={() => setShowTooltipReply(true)}
                  onMouseLeave={() => setShowTooltipReply(false)}
                >
                  <button
                    className="text-secondary-color font-semibold tracking-wide cursor-pointer text-sm text-center w-full z-10 relative"
                    type="button"
                  >
                    Read More
                  </button>

                  {showTooltipReply && (
                    <div
                      ref={tooltipRef}
                      className="absolute left-0 top-full w-max max-w-[16rem] mt-2 bg-gray-200 p-2 shadow-2xl border rounded z-20 tooltip tooltip-show"
                    >
                      <p className="text-black/70 text-sm">
                        {condolence?.owner_reply}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Just Owner Can See Edit Condolence Reply */}
            {isOwner && (
              <>
                <Popover
                  isOpen={reply}
                  onOpenChange={setReply}
                  placement="bottom"
                  showArrow={true}
                  classNames={{
                    content: "p-0",
                  }}
                >
                  <PopoverTrigger>
                    <button
                      type="button"
                      className="animation-fade py-1 text-sm font-medium px-2 rounded text-white bg-secondary-color"
                    >
                      Edit Condolence Reply
                    </button>
                  </PopoverTrigger>

                  <PopoverContent>
                    <form
                      className="bg-gray-200 p-3 rounded-[14px]"
                      onSubmit={handleSubmitReplyCondolence}
                    >
                      <textarea
                        className="bg-gray-200 text-tertiary-color border border-black/20 py-2 px-2 rounded-sm text-sm outline-none resize-none"
                        placeholder="Write your condolence here..."
                        defaultValue={condolence?.owner_reply}
                        name="owner_reply"
                        rows={4}
                      />
                      <button
                        className=" block text-xs text-secondary-color font-bold"
                        disabled={replyCondolenceMutation?.isPending}
                        type="submit"
                      >
                        Send
                      </button>
                    </form>
                  </PopoverContent>
                </Popover>
              </>
            )}
          </>
        ) : (
          <>
            {/* Creating A Reply Of A Condolence || Just Owner Can See It*/}
            {isOwner && (
              <div className="border-t border-tertiary-color/40 py-4">
                <Popover
                  isOpen={reply}
                  onOpenChange={setReply}
                  placement="bottom"
                  showArrow={true}
                  classNames={{
                    content: "p-0",
                  }}
                >
                  <PopoverTrigger>
                    <button
                      type="button"
                      className="animation-fade py-1 text-sm font-medium px-2 rounded text-white bg-secondary-color"
                    >
                      Reply?
                    </button>
                  </PopoverTrigger>

                  <PopoverContent>
                    <form
                      className="bg-gray-200 p-3 rounded-[14px]"
                      onSubmit={handleSubmitReplyCondolence}
                    >
                      <textarea
                        className="bg-gray-200 text-tertiary-color border border-black/20 py-2 px-2 rounded-sm text-sm outline-none resize-none"
                        placeholder="Write your condolence here..."
                        name="owner_reply"
                        rows={4}
                      />

                      <button
                        className=" block pt-1 pb-1 text-xs text-secondary-color font-bold"
                        disabled={replyCondolenceMutation?.isPending}
                        type="submit"
                      >
                        Send
                      </button>
                    </form>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit and Delete Condolence  */}
      {userInfo?.email === condolence?.owner?.email && (
        <div className="flex flex-col sm:flex-row gap-3 border-t border-tertiary-color/40 pt-4">
          <button
            className="flex-1 animation-fade py-1 text-sm text-secondary-color border-b border-secondary-color hover:bg-secondary-color hover:text-white"
            onClick={() => setEditingCondolence(!edititingCondolence)}
            disabled={editCondolenceMutation?.isPending}
            type="button"
          >
            {edititingCondolence ? "Stop Editing" : "Edit"}
          </button>

          <button
            className="flex-1 animation-fade py-1 text-sm text-red-500 border-b border-red-500 hover:bg-red-500 hover:text-white"
            disabled={deleteCondolenceMutation?.isPending}
            onClick={handleDeleteCondolence}
            type="button"
          >
            Delete
          </button>
        </div>
      )}
    </article>
  );
};

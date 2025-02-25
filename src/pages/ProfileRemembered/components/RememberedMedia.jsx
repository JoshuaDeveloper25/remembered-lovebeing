import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";

import lgShare from "lightgallery/plugins/share";
import lgHash from "lightgallery/plugins/hash";
import lgZoom from "lightgallery/plugins/zoom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const RememberedMedia = ({
  onClickImage,
  refGallery,
  ownerName,
  idRemembered,
  item: galleryItem,
  isOwner,
}) => {
  const [selectedImageGallery, setSelectedImageGallery] = useState(null);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // Check if image is in a post
  const checkInImagePost = useQuery({
    queryKey: ["profile", selectedImageGallery],
    queryFn: () =>
      axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/remembereds/checking-image-in-post/${selectedImageGallery}`
      ),
    enabled: !!selectedImageGallery,
  });

  // If theres an image in post we send a different message
  useEffect(() => {
    if (checkInImagePost.isSuccess && selectedImageGallery) {
      const isInPost = checkInImagePost.data?.data;

      if (!isInPost) {
        Swal.fire({
          title: t("Are you sure?"),
          text: t("You won't be able to revert this!"),
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: t("Yes, delete it!"),
        }).then((result) => {
          if (result.isConfirmed) {
            deleteImageGalleryMutation.mutate();
          }
        });
      } else {
        Swal.fire({
          title: t("Are you sure?"),
          text: t("This image is in a post, you won't be able to revert this!"),
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: t("Yes, delete it!"),
        }).then((result) => {
          if (result.isConfirmed) {
            deleteImageGalleryMutation.mutate();
          }
        });
      }

      setSelectedImageGallery(null);
    }
  }, [selectedImageGallery, checkInImagePost.isSuccess]);

  // Delete image from media
  const deleteImageGalleryMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL
        }/remembereds/delete-gallery-image/${idRemembered}/${galleryItem?.id}`
      ),
    onSuccess: (res) => {
      toast.success(t("Successfully image gallery deleted!"));
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  return (
    <section
      className="relative pics"
      data-sub-html={`<h4>${t("Uploaded by")} - ${ownerName}</h4><p> ${t(
        "This is a souvenir from this lovebeing..."
      )}</p>`}
      data-src={`${galleryItem?.cloud_front_domain}/${galleryItem?.aws_file_name}`}
      plugins={[lgZoom, lgShare, lgHash]}
      ref={refGallery}
      speed={500}
    >
      <img
        src={`${galleryItem?.cloud_front_domain}/${galleryItem?.aws_file_name}`}
        className="w-full rounded-md z-[2000]"
        onClick={onClickImage}
        decoding="async"
        loading="lazy"
      />

      {isOwner ? (
        <div className="absolute right-0 top-0">
          <button
            className="rounded-tr-md text-red-500 hover:bg-red-500/50 border animation-fade  text-sm"
            onClick={() => setSelectedImageGallery(galleryItem?.id)}
            disabled={deleteImageGalleryMutation?.isPending}
          >
            {deleteImageGalleryMutation?.isPending ? (
              <div className=" bg-red-500/20 p-3" role="status">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-500"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              <p className="rounded-tr-lg bg-red-500/20 p-3">
                <FaTrashCan className="size-4 inline-block " />
              </p>
            )}
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default RememberedMedia;

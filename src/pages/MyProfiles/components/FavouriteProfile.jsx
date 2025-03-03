import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const FavouriteProfile = ({ item, isPending }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const queryClient = useQueryClient();

  // --> Unfollow remembered...
  const unfollowRememberedsMutation = useMutation({
    mutationFn: (favouriteInfo) =>
      axios.delete(
        `${import.meta.env.VITE_BASE_URL}/favorites/${item?.id}`,
        favouriteInfo
      ),
    onSuccess: (res) => {
      console.log(res);
      toast.success(t("You aren't following this user anymore..."));
      queryClient.invalidateQueries({ queryKey: ["ownProfiles"] });
    },
    onError: (err) => {
      console.log(getFastApiErrors(err));
      toast.error(getFastApiErrors(err));
      console.log(err);
    },
  });

  const handleUnfollowRemember = (e) => {
    e.preventDefault();

    unfollowRememberedsMutation.mutate();
  };

  return isPending ? (
    <div className="shadow-2xl rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse">
        <div className="bg-primary-color/45 h-32 rounded-t-lg w-full"></div>

        <div className="flex gap-3">
          <div className="h-20 w-20 -mt-14 object-cover rounded-full ms-3 bg-white border-4 border-black/35"></div>
          <div className="self-end h-2 w-14 bg-primary-color/45 rounded"></div>
        </div>

        <div className="flex justify-center mt-4 gap-3">
          <div className="h-2 w-14 bg-primary-color/45 rounded"></div>
          <div className="h-2 w-14 bg-primary-color/45 rounded"></div>
        </div>

        <div className="mt-3 h-8 w-full bg-primary-color/45 rounded"></div>

        <div className="flex justify-center mt-2 gap-3">
          <div className="h-8 w-full bg-primary-color/45 rounded"></div>
          <div className="h-8 w-full bg-primary-color/45 rounded"></div>
        </div>

        <div className="mt-2 h-8 w-full bg-primary-color/45 rounded"></div>

        <div className="flex justify-center mt-4 gap-3">
          <div className="h-6 w-6 bg-primary-color/45 rounded-full"></div>
          <div className="h-6 w-6 bg-primary-color/45 rounded-full"></div>
          <div className="h-6 w-6 bg-primary-color/45 rounded-full"></div>
          <div className="h-6 w-6 bg-primary-color/45 rounded-full"></div>
        </div>
      </div>
    </div>
  ) : (
    <form
      onSubmit={handleUnfollowRemember}
      className="relative shadow-2xl border rounded-sm p-4"
    >
      <div className="flex items-center gap-2">
        <img
          src={
            item?.profile_images?.cloud_front_domain
              ? `${item?.profile_images?.cloud_front_domain}/${item?.profile_images?.aws_file_name}`
              : "https://i.pinimg.com/474x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg"
          }
          className="h-20 w-20 object-cover rounded-full border"
          decoding="async"
          loading="lazy"
        />

        <div>
          <Link target="_blank" to={`/remembered-profile/${item?.slug}`}>
            <h2 className="capitalize font-bold text-xl leading-6 max-w-xs">
              {`${item?.first_name} ${item?.last_name}`}
            </h2>
          </Link>
          <p className="text-tertiary-color block text-sm">
            <span className="font-medium">{t("Lifetime")}:</span>{" "}
            {`${item?.birth_date ?? t("No Date...")} - ${
              item?.death_date ?? t("No Date...")
            }`}
          </p>
        </div>
      </div>

      <button
        className={`${
          isHovered
            ? "bg-red-100 text-red-500 hover:bg-red-500 hover:text-white"
            : "bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white"
        } flex items-center mt-3 justify-center gap-2 w-full py-1 rounded-sm font-medium transition-colors`}
        onClick={() => unfollowRememberedsMutation.mutate()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        type="submit"
      >
        {isHovered ? (
          <>
            {" "}
            <IoIosCloseCircleOutline size={20} className="inline" />{" "}
            {t("Stop Following")}
          </>
        ) : (
          <>
            <FaCheckCircle className="inline" /> {t("Following")}
          </>
        )}
      </button>
    </form>
  );
};

export default FavouriteProfile;

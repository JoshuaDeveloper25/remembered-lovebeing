import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import { useParams } from "react-router-dom";
import { FaMinus } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";

const FollowRemember = ({ idRemembered, t }) => {
  const queryClient = useQueryClient();
  const params = useParams();

  // Get favourites of remembereds profiles
  const favouritesRememberedsQuery = useQuery({
    queryKey: ["favouritesProfiles"],
    queryFn: async () =>
      await axios.get(`${import.meta.env.VITE_BASE_URL}/favorites`),
  });

  const isFollowing = favouritesRememberedsQuery?.data?.data?.some(
    (favorite) => favorite.slug === params.slug
  );

  // --> Follow Remembered Profile
  const followRememberProfile = useMutation({
    mutationFn: (favoriteInfo) =>
      axios.post(
        `${import.meta.env.VITE_BASE_URL}/favorites/${idRemembered}`,
        favoriteInfo
      ),
    onSuccess: (res) => {
      console.log(res);
      toast.success(t("Successfully profile followed!"));
      queryClient.invalidateQueries({ queryKey: ["favouritesProfiles"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  // --> Unfollow remembered
  const unfollowRememberedsMutation = useMutation({
    mutationFn: (favouriteInfo) =>
      axios.delete(
        `${import.meta.env.VITE_BASE_URL}/favorites/${idRemembered}`,
        favouriteInfo
      ),
    onSuccess: (res) => {
      console.log(res);
      toast.success(t("You aren't following this user anymore..."));
      queryClient.invalidateQueries({ queryKey: ["favouritesProfiles"] });
    },
    onError: (err) => {
      console.log(getFastApiErrors(err));
      toast.error(getFastApiErrors(err));
      console.log(err);
    },
  });

  const handleUnfollowRemember = (e) => {
    e.preventDefault();

    unfollowRememberedsMutation?.mutate({});
  };

  const handleFollowRemember = (e) => {
    e.preventDefault();

    followRememberProfile?.mutate({});
  };

  return isFollowing ? (
    <button
      className={
        "flex items-center justify-center border border-red-500 text-red-500 hover:bg-red-500 hover:text-white animation-fade w-full py-1 rounded-sm font-medium my-3"
      }
      onClick={handleUnfollowRemember}
      type="button"
    >
      <FaMinus size={20} className="me-1.5" /> {t("Unfollow")}
    </button>
  ) : (
    <button
      className={
        "flex items-center justify-center border border-red-500 text-red-500 hover:bg-red-500 hover:text-white animation-fade w-full py-1 rounded-sm font-medium my-3"
      }
      onClick={handleFollowRemember}
      type="button"
    >
      <BsPlus size={26} /> {t("Follow")}
    </button>
  );
};

export default FollowRemember;

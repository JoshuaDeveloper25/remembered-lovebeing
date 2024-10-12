import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import { useParams } from "react-router-dom";
import { BiMinus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";

const FollowRemember = ({ idRemembered }) => {
  const queryClient = useQueryClient();
  const params = useParams();

  // Get favourites of remembereds profiles
  const favouritesRememberedsQuery = useQuery({
    queryKey: ["favouritesProfiles"],
    queryFn: () => {
      return axios.get(`${import.meta.env.VITE_BASE_URL}/favorites`);
    },
  });

  const isFollowing = favouritesRememberedsQuery?.data?.data.find(
    (item) => item?.slug === params?.slug
  );

  // --> Follow Remembered Profile
  const followRememberProfile = useMutation({
    mutationFn: async (favoriteInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/favorites/${idRemembered}`,
        favoriteInfo
      ),
    onSuccess: (res) => {
      console.log(res);
      toast.success("Successfully profile followed!");
      queryClient.invalidateQueries({ queryKey: ["favouritesProfiles"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleFollowRemember = (e) => {
    e.preventDefault();

    followRememberProfile?.mutate({});
  };

  return (
    <button
      onClick={handleFollowRemember}
      disabled={isFollowing}
      type="button"
      className={`${
        isFollowing
          ? "flex items-center justify-center border border-red-300 text-red-300 w-full py-1 rounded-sm font-medium my-3"
          : "flex items-center justify-center border border-red-500 text-red-500 hover:bg-red-500 hover:text-white animation-fade w-full py-1 rounded-sm font-medium my-3"
      }`}
    >
      {isFollowing ? (
        <>Following</>
      ) : (
        <>
          <BsPlus size={26} /> Follow
        </>
      )}
    </button>
  );
};

export default FollowRemember;

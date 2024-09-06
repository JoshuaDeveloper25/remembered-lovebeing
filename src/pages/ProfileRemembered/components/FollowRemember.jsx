import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import { toast } from "react-toastify";
import axios from "axios";
import { BsPlus } from "react-icons/bs";

const FollowRemember = ({ idRemembered }) => {
  const queryClient = useQueryClient();

  // --> Follow Remembered Profile
  const followRememberProfile = useMutation({
    mutationFn: async (favoriteInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/favorites/${idRemembered}`,
        favoriteInfo
      ),
    onSuccess: (res) => {
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
      type="button"
      className="flex items-center justify-center border border-red-500 text-red-500 hover:bg-red-500 hover:text-white animation-fade w-full py-1 rounded-sm font-medium my-3"
    >
      <BsPlus size={26} /> Follow
    </button>
  );
};

export default FollowRemember;

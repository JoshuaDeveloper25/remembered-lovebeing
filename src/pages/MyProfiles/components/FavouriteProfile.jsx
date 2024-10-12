import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import { useEffect, useRef, useState } from "react";
import { LuHelpCircle } from "react-icons/lu";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const FavouriteProfile = ({ item, isPending }) => {
  console.log(item);
  const [showTooltip, setShowTooltip] = useState(false);
  const queryClient = useQueryClient();
  const tooltipRef = useRef(null);

  const deleteProfileMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL
        }/remembereds/delete-remembered-profile/${item?.id}`
      ),
    onSuccess: (res) => {
      toast.success("¡Successfully profile deleted!");
      queryClient.invalidateQueries({ queryKey: ["ownProfiles"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  useEffect(() => {
    if (showTooltip && tooltipRef.current) {
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
        top = 0;
      }

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    }
  }, [showTooltip]);

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
    <>
      <div className="relative shadow-2xl border rounded-sm pb-4">
        <div className="relative p-4 pb-0 rounded-b-lg">
          {showTooltip && (
            <div
              ref={tooltipRef}
              className="absolute right-0 top-0 border w-max max-w-[16rem] mx-auto bg-primary-color-light/95 p-2 shadow-2xl rounded rounded-t-none z-50 tooltip tooltip-show"
            >
              <p className="text-white text-sm font-semibold text-center cursor-pointer">
                {item?.status_privacy === "private"
                  ? `If your profile is private, only you can view it. To change the "Status" click on "Edit Profile" and then on "Change Status"`
                  : `If your profile is public, everybody can see it. To change the "Status" click on "Edit Profile" and then on "Change Status"`}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2">
            <img
              src={
                item?.profile_images?.cloud_front_domain
                  ? `${item?.profile_images?.cloud_front_domain}/${item?.profile_images?.aws_file_name}`
                  : "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
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
              <p className="text-tertiary-color block">
                <span className="font-medium">Lifetime:</span>{" "}
                {`${item?.birth_date ?? "No Date"} - ${
                  item?.death_date ?? "No Date"
                }`}
              </p>
            </div>
          </div>

          <button
            className="flex items-center mt-3 justify-center gap-2 w-full py-1 rounded-sm font-medium  bg-blue-100 text-blue-500  hover:bg-blue-500 hover:text-white transition-colors"
            type="button"
          >
            <FaCheckCircle className="inline " /> Following
          </button>
        </div>
      </div>
    </>
  );
};

export default FavouriteProfile;

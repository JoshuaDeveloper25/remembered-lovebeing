import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import { getLivedDays } from "../../../utils/getLivedDays";
import { MdWorkspacePremium } from "react-icons/md";
import Modal from "../../../components/Modal";
import { FaTrashCan } from "react-icons/fa6";
import FormLifeTime from "./FormLifeTime";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { LuHelpCircle } from "react-icons/lu";

const FavouriteProfile = ({ item, isPending }) => {
  const currentYear = new Date().getFullYear();
  const [openLifeTimeModal, setOpenLifeTimeModal] = useState();
  const [bornYear, setBornYear] = useState(currentYear);
  const [bornMonth, setBornMonth] = useState("January");
  const [showTooltip, setShowTooltip] = useState(false);
  const [bornDay, setBornDay] = useState(1);
  const [passedYear, setPassedYear] = useState(currentYear);
  const [passedMonth, setPassedMonth] = useState("January");
  const [passedDay, setPassedDay] = useState(1);
  const queryClient = useQueryClient();
  const tooltipRef = useRef(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProfileMutation.mutate(null, {
          onSuccess: () => {
            // Swal.fire({
            //   title: "Deleted!",
            //   text: "Your profile has been deleted.",
            //   icon: "success",
            // });
          },
          onError: () => {
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting your profile.",
              icon: "error",
            });
          },
        });
      }
    });
  };

  const createLifeTimeMutation = useMutation({
    mutationFn: async (profileInfo) =>
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/remembereds/add-lifetime/${item?.id}`,
        profileInfo
      ),
    onSuccess: (res) => {
      toast.success("Successfully lifetime created!");
      queryClient.invalidateQueries({ queryKey: ["ownProfiles"] });
      setOpenLifeTimeModal(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const birthDate = `${bornYear}-${String(
      months.indexOf(bornMonth) + 1
    ).padStart(2, "0")}-${String(bornDay).padStart(2, "0")}`;

    const deathDate = `${passedYear}-${String(
      months.indexOf(passedMonth) + 1
    ).padStart(2, "0")}-${String(passedDay).padStart(2, "0")}`;

    const profileInfo = {
      birth_date: birthDate,
      death_date: deathDate,
    };

    if (profileInfo?.birth_date > profileInfo?.death_date) {
      return toast.error(`Birth can't be higher than death date!`);
    }

    createLifeTimeMutation?.mutate(profileInfo);
  };

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
      <div className="relative shadow-2xl pb-4">
        <img
          src={
            item?.cover_images?.cloud_front_domain
              ? `${item?.cover_images?.cloud_front_domain}/${item?.cover_images?.aws_file_name}`
              : "https://images.unsplash.com/photo-1506353187171-d49740268889?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className="w-full h-32 object-cover rounded-t-lg"
          decoding="async"
          loading="lazy"
        />

        <div className="relative p-6 pb-0 rounded-b-lg">
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

          <div className="absolute top-2 right-2">
            <p
              className={`text-sm ${
                item?.status_privacy === "private"
                  ? "text-red-500 bg-red-500/20"
                  : "text-green-500 bg-green-500/20"
              } p-2`}
            >
              Status:{" "}
              <span className="font-semibold capitalize">
                {item?.status_privacy}
              </span>
            </p>

            <div
              ref={tooltipRef}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <LuHelpCircle className="bg-white rounded-full cursor-pointer absolute text-yellow-500 size-5 -top-1.5 -right-2 z-[9999]" />
            </div>
          </div>

          <div>
            <img
              src={
                item?.profile_images?.cloud_front_domain
                  ? `${item?.profile_images?.cloud_front_domain}/${item?.profile_images?.aws_file_name}`
                  : "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
              }
              className="h-24 w-24 -mt-20 object-cover rounded-full border-4 border-black/60"
              decoding="async"
              loading="lazy"
            />

            <h2 className="ms-8 mt-3 capitalize self-end font-bold text-xl leading-6">
              {`${item?.first_name} ${item?.last_name || ""}`}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default FavouriteProfile;

import FormChangeStatus from "../../ProfileRemembered/components/FormChangeStatus";
import NavbarDropdownLink from "../../../components/NavbarDropdownLink";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import { getLivedDays } from "../../../utils/getLivedDays";
import AppContext from "../../../context/AppProvider";
import { HiDotsVertical } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import Modal from "../../../components/Modal";
import { GiTombstone } from "react-icons/gi";
import { PiCakeFill } from "react-icons/pi";
import FormLifeTime from "./FormLifeTime";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";

const Profile = ({ item, isPending }) => {
  const { languageSelected } = useContext(AppContext);
  const { t } = useTranslation();
  const [openOptions, setOpenOptions] = useState(false);
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const currentYear = new Date().getFullYear();
  const [openLifeTimeModal, setOpenLifeTimeModal] = useState();
  const [bornYear, setBornYear] = useState(1900 || currentYear);
  const [bornMonth, setBornMonth] = useState("January");
  const [showTooltip, setShowTooltip] = useState(false);
  const [bornDay, setBornDay] = useState(1);
  const [passedYear, setPassedYear] = useState(1900 || currentYear);
  const [passedMonth, setPassedMonth] = useState("January");
  const [passedDay, setPassedDay] = useState(1);
  const [statusOptionSelected, setStatusOptionSelected] = useState("");
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

  // Change status memorial option
  const changeStatusMutation = useMutation({
    mutationFn: async (profileInfo) =>
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/remembereds/switch-status-privacy/${
          item?.id
        }`,
        profileInfo
      ),
    onSuccess: (res) => {
      toast.success(t("Successfully status changed!"));
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["ownProfiles"] });
      setChangeStatusModal(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleChangeStatus = (e) => {
    e.preventDefault();

    const profileInfo = {
      status_privacy: statusOptionSelected,
    };

    changeStatusMutation?.mutate(profileInfo);
  };

  const deleteProfileMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL
        }/remembereds/delete-remembered-profile/${item?.id}`
      ),
    onSuccess: (res) => {
      toast.success(t("Successfully profile deleted!"));
      queryClient.invalidateQueries({ queryKey: ["ownProfiles"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleDelete = () => {
    Swal.fire({
      title: t("Are you sure?"),
      text: t("You won't be able to revert this!"),
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("Yes, delete it!"),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProfileMutation.mutate(null, {
          onSuccess: () => {
            // Swal.fire({
            // title: "Deleted!",
            // text: "Your profile has been deleted.",
            // icon: "success",
            // });
          },
          onError: () => {
            Swal.fire({
              title: t("Error!"),
              text: t("There was an issue deleting your profile."),
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
      toast.success(t("Successfully lifetime created!"));
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
      return toast.error(t(`Birth can't be higher than death date!`));
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
      <div className="flex relative border shadow-2xl rounded-lg">
        <div className="flex-1 bg-gray-200 rounded-s-lg py-3 px-3">
          {item?.status_plan === "premium" ? (
            <div className="flex items-center text-sm justify-center bg-black/90 text-[#fab818] w-fit px-1.5 mx-auto">
              <svg
                className="fill-[#fab818] h-5 premium-filled-icon--nW2Vi header-svg-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                data-t="premium-filled-svg"
                aria-labelledby="premium-filled-svg"
                aria-hidden="true"
                role="img"
              >
                <title id="premium-filled-svg">Premium</title>
                <path d="M2.419 13L0 4.797 4.837 6.94 8 2l3.163 4.94L16 4.798 13.581 13z"></path>
              </svg>

              <h2
                className={`ms-1.5 rounded text-center font-semibold uppercase`}
              >
                {t(item?.status_plan)}
              </h2>
            </div>
          ) : (
            <>
              <h2
                className={`text-sm uppercase bg-[#94a4a8] text-white rounded w-fit px-3 mx-auto`}
              >
                {t(item?.status_plan)}
              </h2>
            </>
          )}

          <img
            src={
              item?.profile_images?.cloud_front_domain
                ? `${item?.profile_images?.cloud_front_domain}/${item?.profile_images?.aws_file_name}`
                : "https://i.pinimg.com/474x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg"
            }
            className="h-20 w-20 object-cover rounded-full mx-auto my-3"
            decoding="async"
            loading="lazy"
          />

          {/* Buttons */}
          <p
            className={`text-sm ${
              item?.status_privacy === "private"
                ? "text-red-500 bg-red-500/20"
                : "text-green-500 bg-green-500/20"
            } px-1 py-2 mt-3 text-center`}
          >
            {t("Status")}:{" "}
            <span className="font-semibold capitalize">
              {t(item?.status_privacy)}
            </span>
          </p>
        </div>

        <div className="flex-[25%] relative py-3 px-3">
          {/* Three Vertical Dots */}
          <div className="absolute right-0 text-primary-color cursor-pointer transition-opacity">
            <HiDotsVertical
              onClick={() => setOpenOptions(!openOptions)}
              size={18}
            />
          </div>

          {/* Dropdown on click to see more profile options */}
          {openOptions && (
            <>
              {createPortal(
                <div
                  onClick={() => setOpenOptions(!openOptions)}
                  className="h-[100vh] fixed top-0 w-full"
                ></div>,
                document.body
              )}

              <ul className="absolute top-8 right-3 z-50 shadow-lg border-2 bg-white w-max rounded  ">
                {item?.status_plan === "premium" ? null : (
                  <NavbarDropdownLink
                    hoverBgLink={
                      "hover:bg-[#fab818] text-xs hover:text-white border-b-2 border-[#fab818]"
                    }
                    linkTo={`/checkout/?slug=${item?.slug}`}
                    linkText={`${t("Go Pro")} / $4.99`}
                  />
                )}

                <NavbarDropdownLink
                  hoverBgLink={
                    "hover:bg-secondary-color hover:text-white text-xs"
                  }
                  linkTo={`/remembered-profile/${item?.slug}`}
                  linkText={t("Edit Profile")}
                />

                <NavbarDropdownLink
                  hoverBgLink={
                    "hover:bg-secondary-color hover:text-white text-xs"
                  }
                  onClick={() => setChangeStatusModal(true)}
                  linkText={t("Change Status")}
                />

                <Modal
                  titleModal={t("Memorial Status Options...")}
                  handleSubmit={handleChangeStatus}
                  setOpenModal={setChangeStatusModal}
                  openModal={changeStatusModal}
                  modalForm={true}
                  editableWidth={"max-w-xl"}
                >
                  <FormChangeStatus
                    setChangeStatusModal={setChangeStatusModal}
                    setStatusOptionSelected={setStatusOptionSelected}
                    statusOptionSelected={statusOptionSelected}
                    isPending={changeStatusMutation?.isPending}
                    status={item.status_privacy}
                  />
                </Modal>

                {item?.status_plan !== "premium" && (
                  <NavbarDropdownLink
                    hoverBgLink={"hover:bg-red-500 hover:text-white text-xs"}
                    onClick={handleDelete}
                    linkText={t("Delete")}
                  />
                )}
              </ul>
            </>
          )}

          <div className="flex flex-col items-center justify-end text-center w-full h-full  ">
            <div>
              <h2 className="capitalize text-lg block overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] self-end font-bold leading-6">
                {`${item?.first_name} ${item?.last_name || ""}`}
              </h2>
            </div>

            <div className="mt-4 text-center">
              <h4 className="text-gray-700 font-medium text-sm">
                {!item?.birth_date && !item?.death_date ? (
                  <>
                    {t("Would you like to add lifetime?")}{" "}
                    <button
                      onClick={() => setOpenLifeTimeModal(!openLifeTimeModal)}
                      className="inline-block text-center ms-0.5 underline text-secondary-color"
                    >
                      {t("Click here.")}
                    </button>
                    <Modal
                      titleModal={t("Lifetime of your lovebeing...")}
                      handleSubmit={handleSubmit}
                      setOpenModal={setOpenLifeTimeModal}
                      openModal={openLifeTimeModal}
                      modalForm={true}
                      editableWidth={"max-w-xl"}
                    >
                      <FormLifeTime
                        t={t}
                        setOpenLifeTimeModal={setOpenLifeTimeModal}
                        currentYear={currentYear}
                        bornYear={bornYear}
                        setBornYear={setBornYear}
                        bornMonth={bornMonth}
                        setBornMonth={setBornMonth}
                        bornDay={bornDay}
                        setBornDay={setBornDay}
                        passedYear={passedYear}
                        setPassedYear={setPassedYear}
                        passedMonth={passedMonth}
                        setPassedMonth={setPassedMonth}
                        passedDay={passedDay}
                        setPassedDay={setPassedDay}
                        isPending={createLifeTimeMutation?.isPending}
                        months={months}
                      />
                    </Modal>
                  </>
                ) : (
                  <>
                    <PiCakeFill className="inline-block size-5 align-bottom" />{" "}
                    <span className="text-[14px]">{item?.birth_date}</span>{" "}
                    <span className="min-[1201px]:hidden block"></span>
                    <span className="hidden"></span>
                    <span className="min-[1201px]:inline block">
                      {" "}
                      <GiTombstone className="inline-block size-5 align-bottom" />{" "}
                      <span className="text-[14px]">{item?.death_date}</span>
                    </span>
                  </>
                )}

                <span className="block text-[.7rem] font-bold">
                  {!item?.birth_date && !item?.death_date
                    ? null
                    : `${t("Lived")}: ${getLivedDays(
                        item?.birth_date,
                        item?.death_date,
                        languageSelected
                      )}`}
                </span>
              </h4>
            </div>

            <div className="w-full text-center mx-auto flex justify-end">
              <Link to={`/remembered-profile/${item?.slug}`}>
                <button
                  disabled={deleteProfileMutation?.isPending}
                  className={`btn flex text-sm items-center justify-center w-[90px] gap-2 px-1 py-1 mt-3 text-[#00A2B3] animation-fade  hover:bg-[#00A2B3] hover:text-white border border-[#00A2B3] rounded-sm ${
                    deleteProfileMutation?.isPending &&
                    "pointer-events-none opacity-75 cursor-wait"
                  }`}
                >
                  <FaEye size={18} /> {t("View")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

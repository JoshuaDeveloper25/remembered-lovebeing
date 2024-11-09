import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import { getLivedDays } from "../../../utils/getLivedDays";
import { MdWorkspacePremium } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import Modal from "../../../components/Modal";
import { LuHelpCircle } from "react-icons/lu";
import { FaTrashCan } from "react-icons/fa6";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { GiTombstone } from "react-icons/gi";
import { PiCakeFill } from "react-icons/pi";
import FormLifeTime from "./FormLifeTime";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import { createPortal } from "react-dom";
import NavbarDropdownLink from "../../../components/NavbarDropdownLink";
import { HiDotsVertical } from "react-icons/hi";
import FormChangeStatus from "../../ProfileRemembered/components/FormChangeStatus";

const Profile = ({ item, isPending }) => {
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

  // Change Status
  const changeStatusMutation = useMutation({
    mutationFn: async (profileInfo) =>
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/remembereds/switch-status-privacy/${
          item?.id
        }`,
        profileInfo
      ),
    onSuccess: (res) => {
      toast.success("Successfully status changed!");
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
            // title: "Deleted!",
            // text: "Your profile has been deleted.",
            // icon: "success",
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
                {item?.status_plan}
              </h2>
            </div>
          ) : (
            <>
              <h2
                className={`text-sm uppercase bg-[#94a4a8] text-white rounded w-fit px-3 mx-auto`}
              >
                {item?.status_plan}
              </h2>
            </>
          )}

          <img
            src={
              item?.profile_images?.cloud_front_domain
                ? `${item?.profile_images?.cloud_front_domain}/${item?.profile_images?.aws_file_name}`
                : "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
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
            Status:{" "}
            <span className="font-semibold capitalize">
              {item?.status_privacy}
            </span>
          </p>

          {/* {deleteProfileMutation?.isPending ? null : (
            <div className="flex flex-col mb-3 my-2">
              <Link to={`/remembered-profile/${item?.slug}`}>
                <button
                  disabled={deleteProfileMutation?.isPending}
                  className={`btn px-1 text-[#00A2B3] animation-fade  hover:bg-[#00A2B3] hover:text-white border border-[#00A2B3] rounded-sm text-sm ${
                    deleteProfileMutation?.isPending &&
                    "pointer-events-none opacity-75 cursor-wait"
                  }`}
                >
                  <FaPencilAlt className="inline-block me-1" /> Edit Profile
                </button>
              </Link> */}
          {/* {item?.status_plan === "premium" ? null : (
                <Link
                  to={`/checkout/?slug=${item?.slug}`}
                  className="relative premium-btn rounded-sm py-2  hover:bg-white/80 hover:text-[#fab818] animation-fade text-sm"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>{" "}
                  <MdWorkspacePremium className="inline-block size-6" /> Go Pro
                  / $22
                </Link>
              )} */}
          {/* </div>
          )} */}

          {/* Trash bin */}
          {/* <div className="absolute right-0 bottom-0 text-center z-50">
            <button
              disabled={deleteProfileMutation?.isPending}
              onClick={handleDelete}
              className="text-red-500 hover:bg-red-500/50 rounded-s-sm rounded-e-lg rounded-tr-none animation-fade  text-sm w-full"
            >
              {deleteProfileMutation?.isPending ? (
                <div className="rounded-full bg-red-500/20 p-3" role="status">
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
                <p className="w-full flex justify-center rounded-s-sm rounded-e-lg rounded-tr-none items-center gap-1.5 bg-red-500/20 px-3 py-2">
                  <FaTrashCan className="size-4 inline-block " />
                </p>
              )}
            </button>
          </div> */}
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
                      "hover:bg-[#fab818] text-xs border-b-2 border-[#fab818]"
                    }
                    linkTo={`/checkout/?slug=${item?.slug}`}
                    linkText={"Go Pro / $22"}
                  />
                )}

                <NavbarDropdownLink
                  hoverBgLink={"hover:bg-secondary-color text-xs"}
                  linkTo={`/remembered-profile/${item?.slug}`}
                  linkText={"Edit Profile"}
                />

                <NavbarDropdownLink
                  hoverBgLink={"hover:bg-secondary-color text-xs"}
                  onClick={() => setChangeStatusModal(true)}
                  linkText={"Change Status"}
                />

                <Modal
                  titleModal={"Memorial Status Options..."}
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

                <NavbarDropdownLink
                  hoverBgLink={"hover:bg-red-500 text-xs"}
                  onClick={handleDelete}
                  linkText={"Delete"}
                />
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
                    Would you like to add lifetime?
                    <button
                      onClick={() => setOpenLifeTimeModal(!openLifeTimeModal)}
                      className="inline-block text-center underline text-secondary-color"
                    >
                      Click here.
                    </button>
                    <Modal
                      titleModal={"Lifetime of your lovebeing..."}
                      handleSubmit={handleSubmit}
                      setOpenModal={setOpenLifeTimeModal}
                      openModal={openLifeTimeModal}
                      modalForm={true}
                      editableWidth={"max-w-xl"}
                    >
                      <FormLifeTime
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
                    : `Lived: ${getLivedDays(
                        item?.birth_date,
                        item?.death_date
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
                  <FaEye size={18} /> View
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

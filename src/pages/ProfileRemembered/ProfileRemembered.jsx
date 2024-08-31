import PublishedPostsImages from "../ProfileRemembered/components/PublishedPostsImages";
import CarouselProfiles from "../../pages/ProfileRemembered/components/CarouselProfiles";
import MansoryGallery from "../../pages/ProfileRemembered/components/MansoryGallery";
import TabLinkContent from "../../pages/MyProfiles/components/TabLinkContent";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import UploadProfileImage from "../../components/UploadProfileImage";
import UploadGalleryImage from "../../components/UploadGalleryImage";
import UploadCoverImage from "../../components/UploadCoverImage";
import TabLink from "../../pages/MyProfiles/components/TabLink";
import UploadCondolence from "./components/UploadCondolence";
import AboutRemembered from "./components/AboutRemembered";
import UploadTribute from "./components/UploadTribute";
import { getLivedDays } from "../../utils/getLivedDays";
import UploadPost from "../../components/UploadPost";
import AppContext from "../../context/AppProvider";
import { Link, useParams } from "react-router-dom";
import Condolences from "./components/Condolences";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TfiPencilAlt } from "react-icons/tfi";
import Tributes from "./components/Tributes";
import { useContext, useState } from "react";
import Post from "../../components/Post";
import axios from "axios";
import Modal from "../../components/Modal";
import FormEditProfile from "./components/FormEditProfile";
import getFastApiErrors from "../../utils/getFastApiErrors";
import { toast } from "react-toastify";
import { getHowLongDied } from "../../utils/getHowLongDied";
import { FaLock } from "react-icons/fa6";
import FormChangeStatus from "./components/FormChangeStatus";

const ProfileRemembered = () => {
  const currentYear = new Date().getFullYear();
  const [bornYear, setBornYear] = useState(currentYear);
  const [bornMonth, setBornMonth] = useState("January");
  const [bornDay, setBornDay] = useState(1);
  const [passedYear, setPassedYear] = useState(currentYear);
  const [passedMonth, setPassedMonth] = useState("January");
  const [passedDay, setPassedDay] = useState(1);

  const [showMembers, setShowMembers] = useState(false);
  const [editRememberedProfile, setEditRememberedProfile] = useState(false);
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [statusOptionSelected, setStatusOptionSelected] = useState("");
  const { userInfo } = useContext(AppContext);
  const [openTab, setOpenTab] = useState(1);
  const queryClient = useQueryClient();
  const params = useParams();

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

  // --> 🧓 Get certain profile by remember id
  const { data, isPending, error } = useQuery({
    queryKey: [`profile`, params?.slug],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/get-profile/${
          params?.slug
        }`
      ),
    //
    // await axios.get(
    //   `${import.meta.env.VITE_BASE_URL}/remembereds/get-profile-test/${5}`
    // ),
  });

  // --> 👪 Get all family members of a profile
  const ownProfilesQuery = useQuery({
    queryKey: ["ownProfiles"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/get-own-profiles`
      ),
  });

  // --> 📝 Get all posts of a remembered
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts/${
          data?.data?.remembered_profile?.id
        }`
      ),
  });

  // --> Edit Remembered Profile
  const editRememberedProfileMutation = useMutation({
    mutationFn: async (profileInfo) =>
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/remembereds/edit-profile/${
          data?.data?.remembered_profile?.id
        }`,
        profileInfo
      ),
    onSuccess: (res) => {
      toast.success("Successfully profile edited!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setEditRememberedProfile(false);
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
      first_name: e?.target?.first_name?.value,
      middle_name: e?.target?.middle_name?.value,
      last_name: e?.target?.last_name?.value,
      gender: e?.target?.gender?.value,
      designation: e?.target?.designation?.value,
      user_relationship: e?.target?.user_relationship?.value,
      birth_date: birthDate,
      death_date: deathDate,
    };

    console.log(profileInfo);

    if (profileInfo?.birth_date > profileInfo?.death_date) {
      return toast.error(`Birth can't be higher than death date!`);
    }

    editRememberedProfileMutation?.mutate(profileInfo);
  };

  // Change Status
  const changeStatusMutation = useMutation({
    mutationFn: async (profileInfo) =>
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/remembereds/switch-status-privacy/${
          data?.data?.remembered_profile?.id
        }`,
        profileInfo
      ),
    onSuccess: (res) => {
      toast.success("Successfully status changed!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
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

  if (isPending) {
    return (
      <div className="container-page">
        <div role="status" className="max-w-full animate-pulse">
          <div className="h-[24rem] bg-primary-color/50"></div>
          <div className="bg-primary-color/50 -mt-16 ms-5 sm:h-32 h-24 sm:w-32 w-24 rounded-full mb-2.5"></div>
          <div className="mt-3 ms-5">
            <div className="h-2 w-56 bg-primary-color/50 mb-2.5"></div>
            <div className="h-2 w-32 bg-primary-color/50 mb-2.5"></div>
            <div className="h-2 w-24 bg-primary-color/50 mb-2.5"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return console.log(error);
  }

  return (
    <section className="container-page my-10 ">
      <article className="rounded-lg">
        {/* Cover Image */}
        {!data?.data?.is_owner ? (
          <div>
            <img
              loading="lazy"
              decoding="async"
              src={
                data?.data?.remembered_profile?.cover_images
                  ? `${data?.data?.remembered_profile?.cover_images?.cloud_front_domain}/${data?.data?.remembered_profile?.cover_images?.aws_file_name}`
                  : `https://images.unsplash.com/photo-1506353187171-d49740268889?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
              }
              className="max-h-[24rem] w-full shadow-2xl min-[1200px]:rounded-t-lg rounded-t-none object-cover z-10"
            />
          </div>
        ) : (
          <div className="relative">
            <img
              loading="lazy"
              decoding="async"
              src={
                data?.data?.remembered_profile?.cover_images
                  ? `${data?.data?.remembered_profile?.cover_images?.cloud_front_domain}/${data?.data?.remembered_profile?.cover_images?.aws_file_name}`
                  : `https://images.unsplash.com/photo-1506353187171-d49740268889?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
              }
              className=" max-h-[24rem] w-full shadow-2xl min-[1200px]:rounded-t-lg rounded-t-none object-cover z-10"
            />

            <div className="absolute bottom-3 right-3 cursor-pointer">
              <UploadCoverImage
                idRemembered={data?.data?.remembered_profile?.id}
              />
            </div>
          </div>
        )}

        {/* User Image */}
        {/* Responsive - from 768px to bottom */}
        <div className="md:hidden flex sm:flex-col lg:flex-row items-start lg:items-start sm:items-center text-start lg:text-start sm:text-center gap-5 lg:px-10 px-5">
          <div className="sm:max-w-none max-w-[5rem] sm:-mt-20 -mt-10 sticky z-20">
            <img
              className="sm:h-[168px] w-full sm:w-[168px] h-full rounded-full"
              loading="lazy"
              decoding="async"
              src={
                data?.data?.remembered_profile?.profile_images
                  ? `${data?.data?.remembered_profile?.profile_images?.cloud_front_domain}/${data?.data?.remembered_profile?.profile_images?.aws_file_name}`
                  : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
              }
            />
            {!data?.data?.is_owner ? null : (
              <div className="absolute bottom-3 right-3 z-[100] cursor-pointer">
                <UploadProfileImage
                  idRemembered={data?.data?.remembered_profile?.id}
                />
              </div>
            )}
          </div>

          <div className="lg:self-end">
            <h2 className="font-semibold text-muted-color">
              {data?.data?.remembered_profile?.epitaph || "In loving memory of"}
            </h2>
            <h3 className="text-2xl font-bold mb-1">
              {data?.data?.remembered_profile?.first_name}{" "}
              {data?.data?.remembered_profile?.last_name}
            </h3>
            <h3 className="text-muted-color">
              <span className="font-bold">Lifetime</span>:{" "}
              {data?.data?.remembered_profile?.birth_date}{" "}
              <span className="font-bold">X</span>{" "}
              {data?.data?.remembered_profile?.death_date}
              <span className="block">
                {getLivedDays(
                  data?.data?.remembered_profile?.birth_date,
                  data?.data?.remembered_profile?.death_date
                )}{" "}
              </span>
            </h3>

            {data?.data?.is_owner && (
              <div>
                <button
                  className="btn btn-blue text-white text-base rounded-sm"
                  onClick={() => setEditRememberedProfile(true)}
                >
                  <TfiPencilAlt className="inline align-sub size-5" /> Edit
                  Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal to edit rememberedProfile */}
        <Modal
          titleModal={"Edit Remembered Profile..."}
          handleSubmit={handleSubmit}
          setOpenModal={setEditRememberedProfile}
          openModal={editRememberedProfile}
          modalForm={true}
          editableWidth={"max-w-xl"}
        >
          <FormEditProfile
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
            rememberedProfileInfo={data?.data}
            isPending={editRememberedProfileMutation?.isPending}
            months={months}
          />
        </Modal>

        {/* Desktop - from 768px to up */}
        <div className="grid md:grid-cols-4 grid-cols-1 items-start md:gap-8 px-5 mb-4">
          <article className="col-span-1 sticky top-11 min-w-[11rem] ">
            <div className="text-center border bg-white shadow-2xl rounded-xl md:-mt-12 py-5 px-4 md:block hidden">
              <div className="sticky z-20">
                {!data?.data?.is_owner ? (
                  <img
                    className="w-36 h-36 object-cover mx-auto rounded-full shadow-lg"
                    src={
                      data?.data?.remembered_profile?.profile_images
                        ? `${data?.data?.remembered_profile?.profile_images?.cloud_front_domain}/${data?.data?.remembered_profile?.profile_images?.aws_file_name}`
                        : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                    }
                  />
                ) : (
                  <>
                    <img
                      className="w-36 h-36 object-cover mx-auto rounded-full shadow-lg"
                      src={
                        data?.data?.remembered_profile?.profile_images
                          ? `${data?.data?.remembered_profile?.profile_images?.cloud_front_domain}/${data?.data?.remembered_profile?.profile_images?.aws_file_name}`
                          : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                      }
                    />
                    <div className="absolute bottom-3 right-14 z-[100]">
                      <UploadProfileImage
                        idRemembered={data?.data?.remembered_profile?.id}
                      />
                    </div>
                  </>
                )}
              </div>

              <h3 className="font-bold text-sm text-muted-color mt-3 capitalize">
                {data?.data?.remembered_profile?.epitaph ||
                  "In loving memory of"}
              </h3>
              <h3 className="font-bold capitalize text-xl">
                {data?.data?.remembered_profile?.first_name}{" "}
                {data?.data?.remembered_profile?.last_name}
              </h3>
              <p className="text-muted-color my-2 text-[13px] leading-4">
                <span className="block font-bold mb-1 text-sm"> Lifetime:</span>{" "}
                {data?.data?.remembered_profile?.birth_date}{" "}
                <span className="font-bold mx-1">X</span>{" "}
                {data?.data?.remembered_profile?.death_date}{" "}
                <span className="block font-bold">
                  Lived:{" "}
                  {getLivedDays(
                    data?.data?.remembered_profile?.birth_date,
                    data?.data?.remembered_profile?.death_date
                  )}{" "}
                </span>
                {/* <span className="block font-bold">
                  How Long Ago:{" "}
                  {getHowLongDied(data?.data?.remembered_profile?.death_date)}{" "}
                </span> */}
              </p>
              <div className="flex justify-center gap-5 mt-3 mb-3">
                <FaFacebookF
                  size={18}
                  className="hover:text-[#00A2B3] animation-fade cursor-pointer"
                />
                <FaInstagram
                  size={18}
                  className="hover:text-[#00A2B3] animation-fade cursor-pointer"
                />
                <FaTwitter
                  size={18}
                  className="hover:text-[#00A2B3] animation-fade cursor-pointer"
                />
              </div>

              <p className="text-muted-color text-xs font-bold mt-2 leading-4">
                Managed by:{" "}
                <span className="font-bold">
                  {data?.data?.remembered_profile?.owner?.name}
                </span>
              </p>

              {data?.data?.is_owner && (
                <div>
                  <button
                    className="btn btn-blue bg-transparent border border-primary-color text-primary-color text-base rounded-sm mt-3 hover:bg-primary-color hover:text-white animation-fade"
                    onClick={() => setEditRememberedProfile(true)}
                  >
                    <TfiPencilAlt className="inline align-sub size-5" /> Edit
                    Profile
                  </button>
                </div>
              )}
            </div>

            <div
              className={`border-s-8 ${
                data?.data?.remembered_profile?.status_privacy === "public"
                  ? "border-green-500"
                  : "border-red-500"
              } bg-white shadow-2xl rounded-s-none rounded-xl mt-4 py-5 px-4 md:block hidden`}
            >
              <h3 className="font-bold text-muted-color">Memorial Status:</h3>

              <div className="flex items-center justify-between my-2">
                <h2 className="font-semibold">Status:</h2>
                {data?.data?.remembered_profile?.status_privacy === "public" ? (
                  <h4 className="text-center rounded-sm inline-block font-semibold px-2 py-1 text-green-500 bg-green-200">
                    Public
                  </h4>
                ) : (
                  <h4 className="text-center rounded-sm inline-block font-semibold px-2 py-1 text-red-400 bg-red-200">
                    Private
                  </h4>
                )}
              </div>

              <button
                className="border border-yellow-500 hover:bg-yellow-500 hover:text-white animation-fade rounded-sm w-full font-semibold text-yellow-500 py-1 inline-block"
                onClick={() => setChangeStatusModal(true)}
                type="button"
              >
                Change Status
              </button>

              <Modal
                titleModal={"Memorial Status Options..."}
                handleSubmit={handleChangeStatus}
                setOpenModal={setChangeStatusModal}
                openModal={changeStatusModal}
                modalForm={true}
                editableWidth={"max-w-xl"}
              >
                <FormChangeStatus
                  setStatusOptionSelected={setStatusOptionSelected}
                  statusOptionSelected={statusOptionSelected}
                  isPending={changeStatusMutation?.isPending}
                  status={data?.data?.remembered_profile?.status_privacy}
                />
              </Modal>
            </div>
          </article>

          <article className="col-span-3 my-8">
            {/* <button
              type="button"
              onClick={() => setShowMembers(!showMembers)}
              className="btn btn-blue w-auto mb-3"
            >
              {showMembers
                ? "Hide My Family Members"
                : "Show My Family Members"}
            </button>

            {showMembers ? (
              <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                <h2 className="font-bold text-primary-color text-xl mb-2">
                  My family members...
                </h2>

                <CarouselProfiles
                  rememberedProfiles={ownProfilesQuery?.data?.data}
                />
              </div>
            ) : null} */}

            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row "
              role="tablist"
            >
              <TabLink
                setOpenTab={setOpenTab}
                linkTab={"#about"}
                textTab={"About"}
                // iconTab={<FaHeart className="text-red-500" />}
                openTab={openTab}
                numberTab={1}
                countTab={false}
                enableCountTab={false}
              />

              <TabLink
                setOpenTab={setOpenTab}
                linkTab={"#posts"}
                textTab={"Posts"}
                // iconTab={<FaHeart className="text-red-500" />}
                openTab={openTab}
                numberTab={2}
                countTab={postsQuery?.data?.data?.length}
              />

              <TabLink
                setOpenTab={setOpenTab}
                textTab={"Media"}
                linkTab={"#media"}
                // iconTab={<FaCross className="text-primary-color" />}
                openTab={openTab}
                numberTab={3}
                countTab={
                  data?.data?.remembered_profile?.gallery_images?.length
                }
              />

              <TabLink
                setOpenTab={setOpenTab}
                linkTab={"#condolences"}
                textTab={"Condolences"}
                // iconTab={<FaHeart className="text-red-500" />}
                openTab={openTab}
                numberTab={4}
                countTab={data?.data?.remembered_profile?.condolences?.length}
              />

              <TabLink
                setOpenTab={setOpenTab}
                linkTab={"#tributes"}
                textTab={"Tributes"}
                // iconTab={<FaHeart className="text-red-500" />}
                openTab={openTab}
                numberTab={5}
                countTab={data?.data?.remembered_profile?.tributes?.length}
              />
            </ul>

            <div className="flex flex-col min-w-0 break-words w-full">
              <div className="flex-auto">
                <div className="tab-content tab-space">
                  <TabLinkContent
                    openTab={openTab}
                    numberTab={1}
                    idTab={"#about"}
                  >
                    <AboutRemembered
                      idRemembered={data?.data?.remembered_profile?.id}
                      owner={data?.data?.is_owner}
                      rememberedProfile={data?.data}
                    />
                  </TabLinkContent>

                  <TabLinkContent
                    openTab={openTab}
                    numberTab={2}
                    idTab={"#posts"}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-7 bg-white shadow-lg rounded-lg p-3">
                      <h2 className="text-primary-color font-bold text-xl sm:my-0 my-3">
                        Posts{" "}
                      </h2>

                      <UploadPost
                        idRemembered={data?.data?.remembered_profile?.id}
                        isOwner={data?.data?.is_owner}
                        rememberedProfiles={ownProfilesQuery?.data}
                        galleryImages={
                          data?.data?.remembered_profile?.gallery_images
                        }
                      />
                    </div>

                    {!postsQuery?.data?.data?.length ? (
                      <h2 className="text-center font-bold text-xl text-primary-color my-5">
                        There's no posts in this profile yet...
                        <span className="block">
                          {data?.data?.remembered_profile?.status_plan ===
                          "free"
                            ? "Go to buy the Premium plan to publish posts and more!"
                            : null}
                        </span>
                      </h2>
                    ) : (
                      postsQuery?.data?.data?.map((post) => {
                        return (
                          <Post
                            isOwner={data?.data?.is_owner}
                            rememberName={
                              data?.data?.remembered_profile?.first_name
                            }
                            totalComments={postsQuery?.data?.data?.comments}
                            post={post}
                            key={post?.id}
                          />
                        );
                      })
                    )}
                  </TabLinkContent>

                  <TabLinkContent
                    openTab={openTab}
                    numberTab={3}
                    idTab={"#media"}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-3 rounded-lg shadow-lg mb-7">
                      <h2 className="text-primary-color font-bold text-xl sm:my-0 my-3">
                        Photos{" "}
                      </h2>

                      <UploadGalleryImage
                        params={params}
                        isOwner={data?.data?.is_owner}
                        idRemembered={data?.data?.remembered_profile?.id}
                      />
                    </div>

                    {/* Mansory Design */}
                    <MansoryGallery
                      galleryImages={
                        data?.data?.remembered_profile?.gallery_images
                      }
                      params={params}
                      idRemembered={data?.data?.remembered_profile?.id}
                    />
                  </TabLinkContent>

                  <TabLinkContent
                    openTab={openTab}
                    numberTab={4}
                    idTab={"#condolences"}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-7 bg-white shadow-lg rounded-lg p-3">
                      <h2 className="text-primary-color font-bold text-xl sm:my-0 my-3">
                        Condolences{" "}
                      </h2>

                      {!userInfo?.access_token && (
                        <h4 className="font-medium text-tertiary-color">
                          Please,{" "}
                          <span>
                            <Link
                              className="text-secondary-color underline"
                              to={"/sign-in"}
                            >
                              Log In
                            </Link>
                          </span>
                          , to leave a condolence.
                        </h4>
                      )}

                      <UploadCondolence
                        idRemembered={data?.data?.remembered_profile?.id}
                        isOwner={data?.data?.is_owner}
                      />
                    </div>

                    {!data?.data?.remembered_profile?.condolences?.length ? (
                      <h2 className="text-center font-bold text-xl text-primary-color my-5">
                        There's no condolences in this profile yet...
                      </h2>
                    ) : (
                      <Condolences
                        isOwner={data?.data?.is_owner}
                        condolences={
                          data?.data?.remembered_profile?.condolences
                        }
                      />
                    )}
                  </TabLinkContent>

                  <TabLinkContent
                    openTab={openTab}
                    numberTab={5}
                    idTab={"#tributes"}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-7 bg-white shadow-lg rounded-lg p-3">
                      <h2 className="text-primary-color font-bold text-xl sm:my-0 my-3">
                        Tributes{" "}
                      </h2>

                      {!userInfo?.access_token && (
                        <h4 className="font-medium text-tertiary-color">
                          Please,{" "}
                          <span>
                            <Link
                              className="text-secondary-color underline"
                              to={"/sign-in"}
                            >
                              Log In
                            </Link>
                          </span>
                          , to leave a tribute.
                        </h4>
                      )}

                      <UploadTribute
                        idRemembered={data?.data?.remembered_profile?.id}
                      />
                    </div>

                    {!data?.data?.remembered_profile?.tributes?.length ? (
                      <h2 className="text-center font-bold text-xl text-primary-color my-5">
                        There's no tributes in this profile yet...
                      </h2>
                    ) : (
                      <Tributes
                        isOwner={data?.data?.is_owner}
                        tributes={data?.data?.remembered_profile?.tributes}
                      />
                    )}
                  </TabLinkContent>
                </div>
              </div>
            </div>
          </article>
        </div>
      </article>
    </section>
  );
};

export default ProfileRemembered;

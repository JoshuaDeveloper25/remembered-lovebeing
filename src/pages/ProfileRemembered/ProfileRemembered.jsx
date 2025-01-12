import MansoryGallery from "../../pages/ProfileRemembered/components/MansoryGallery";
import ResponsiveMoreInfoRemembered from "./components/ResponsiveMoreInfoRemembered";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TabLinkContent from "../../pages/MyProfiles/components/TabLinkContent";
import UploadProfileImage from "../../components/UploadProfileImage";
import UploadGalleryImage from "../../components/UploadGalleryImage";
import UploadCoverImage from "../../components/UploadCoverImage";
import TabLink from "../../pages/MyProfiles/components/TabLink";
import FormChangeStatus from "./components/FormChangeStatus";
import CondolenceHeader from "./components/CondolenceHeader";
import getFastApiErrors from "../../utils/getFastApiErrors";
import AboutRemembered from "./components/AboutRemembered";
import FormEditProfile from "./components/FormEditProfile";
import FollowRemember from "./components/FollowRemember";
import QRCodeGenerate from "./components/QRCodeGenerate";
import { getLivedDays } from "../../utils/getLivedDays";
import TributeHeader from "./components/TributeHeader";
import UploadPost from "../../components/UploadPost";
import AppContext from "../../context/AppProvider";
import Condolences from "./components/Condolences";
import { TfiPencilAlt } from "react-icons/tfi";
import { useParams } from "react-router-dom";
import Tributes from "./components/Tributes";
import { useContext, useState } from "react";
import Modal from "../../components/Modal";
import Post from "../../components/Post";
import { toast } from "react-toastify";
import axios from "axios";
import TabsResponsive from "./components/TabsResponsive";
import ModalEditRememberedProfile from "./components/ModalEditRememberedProfile";

const ProfileRemembered = () => {
  const currentYear = new Date().getFullYear();
  const [bornYear, setBornYear] = useState(1900 || currentYear);
  const [bornMonth, setBornMonth] = useState("January");
  const [bornDay, setBornDay] = useState(1);
  const [passedYear, setPassedYear] = useState(1900 || currentYear);
  const [passedMonth, setPassedMonth] = useState("January");
  const [passedDay, setPassedDay] = useState(1);

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
    <section className="container-page my-10">
      <article className="rounded-lg">
        {/* Cover Image */}
        <div className="relative">
          <img
            loading="lazy"
            decoding="async"
            src={
              data?.data?.remembered_profile?.cover_images
                ? `${data?.data?.remembered_profile?.cover_images?.cloud_front_domain}/${data?.data?.remembered_profile?.cover_images?.aws_file_name}`
                : `https://images.unsplash.com/photo-1506353187171-d49740268889?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
            }
            className="sm:h-[40vh] h-[25vh] w-full object-cover shadow-2xl min-[1200px]:rounded-t-lg rounded-t-none z-10"
          />

          {/* If we are the owner we have access to change photo */}
          {data?.data?.is_owner && (
            <div className="absolute bottom-3 right-3 cursor-pointer">
              <UploadCoverImage
                idRemembered={data?.data?.remembered_profile?.id}
              />
            </div>
          )}
        </div>

        <div className="min-[870px]:px-1">
          {/* User Image */}
          {/* Responsive - from 768px to bottom */}
          <div className="min-[870px]:hidden mb-3 sticky h-[56px] top-0 z-[49] bg-white border shadow-lg">
            <div className="flex justify-between gap-4 items-center h-full sm:px-5 px-2 py-2 sticky z-20">
              <div className="flex gap-2 items-center">
                <div>
                  <img
                    className="sm:w-[40px] w-[35px] sm:h-[40px] h-[35px] object-cover mx-auto rounded-full shadow-lg"
                    loading="lazy"
                    decoding="async"
                    src={
                      data?.data?.remembered_profile?.profile_images
                        ? `${data?.data?.remembered_profile?.profile_images?.cloud_front_domain}/${data?.data?.remembered_profile?.profile_images?.aws_file_name}`
                        : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                    }
                  />

                  {!data?.data?.is_owner ? null : (
                    <div className="min-[870px]:block hidden absolute bottom-0 left-16 z-[100] cursor-pointer">
                      <UploadProfileImage
                        idRemembered={data?.data?.remembered_profile?.id}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="font-bold capitalize leading-3 text-base ">
                    {data?.data?.remembered_profile?.epitaph ||
                      "In loving memory of"}
                  </h2>
                  <h3 className="text-gray-600 font-semibold text-sm leading-4">
                    {data?.data?.remembered_profile?.first_name}{" "}
                    {data?.data?.remembered_profile?.last_name}
                  </h3>
                </div>
              </div>

              {/* Status */}
              {data?.data?.is_owner && (
                <div className="text-sm">
                  <p className="inline">Status:</p>
                  <p
                    className={`capitalize inline font-semibold ms-1.5 ${
                      data?.data?.remembered_profile?.status_privacy ===
                      "public"
                        ? "text-green-500"
                        : "text-red-500"
                    } `}
                  >
                    {data?.data?.remembered_profile?.status_privacy}
                  </p>
                </div>
              )}

              <div>
                <ResponsiveMoreInfoRemembered
                  rememberedId={data?.data?.remembered_profile?.id}
                  status={data?.data?.remembered_profile?.status_privacy}
                  totalProfileCountTabs={data?.data?.remembered_profile}
                  setEditRememberedProfile={setEditRememberedProfile}
                  setStatusOptionSelected={setStatusOptionSelected}
                  totalLengthPosts={
                    data?.data?.remembered_profile?.posts?.length
                  }
                  setChangeStatusModal={setChangeStatusModal}
                  statusOptionSelected={statusOptionSelected}
                  changeStatusMutation={changeStatusMutation}
                  handleChangeStatus={handleChangeStatus}
                  changeStatusModal={changeStatusModal}
                  isOwner={data?.data?.is_owner}
                  setOpenTab={setOpenTab}
                />
              </div>
            </div>
          </div>

          {/* Modal to edit rememberedProfile */}
          <ModalEditRememberedProfile
            titleModal={"Edit Remembered Profile..."}
            handleSubmit={handleSubmit}
            setOpenModal={setEditRememberedProfile}
            openModal={editRememberedProfile}
            modalForm={true}
            editableWidth={
              "sm:max-w-[700px] max-w-full sm:px-8 px-0 h-full"
            }
            crudModalClassName={"sm:px-4 px-0 "}
            formContainerClassName={
              "max-h-[34rem] overflow-y-auto"
            }
            modalContentClassNames={"sm:relative static"}
          >
            <FormEditProfile
              setEditRememberedProfile={setEditRememberedProfile}
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
          </ModalEditRememberedProfile>

          {/* Desktop - from 768px to up! */}
          <div className="grid min-[870px]:grid-cols-4 grid-cols-1 items-start min-[1150px]:gap-3 sm:gap-1 gap-0 px-2.5">
            <article className="col-span-1 sticky top-11 min-w-52 ">
              <div className="text-center border bg-white shadow-2xl rounded-xl md:-mt-12 py-5 px-4 min-[870px]:block hidden">
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
                  <span className="block font-bold mb-1 text-sm">
                    {" "}
                    Lifetime:
                  </span>{" "}
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

                <p className="text-muted-color text-xs font-bold mt-2 leading-4">
                  Managed by:{" "}
                  <span className="font-bold">
                    {data?.data?.remembered_profile?.owner?.name}
                  </span>
                </p>

                {!data?.data?.is_owner && userInfo?.access_token && (
                  <FollowRemember
                    idRemembered={data?.data?.remembered_profile?.id}
                  />
                )}

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

              {/* Going to dissapear on 870 px from up */}
              {data?.data?.is_owner ? (
                <div
                  className={`border-s-8 ${
                    data?.data?.remembered_profile?.status_privacy === "public"
                      ? "border-green-500"
                      : "border-red-500"
                  } bg-white shadow-2xl rounded-s-none rounded-xl mt-4 py-5 px-4 min-[870px]:block hidden`}
                >
                  <h3 className="font-bold text-muted-color">
                    Memorial Status:
                  </h3>

                  <div className="flex items-center justify-between my-2">
                    <h2 className="font-semibold">Status:</h2>
                    {data?.data?.remembered_profile?.status_privacy ===
                    "public" ? (
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
                      setChangeStatusModal={setChangeStatusModal}
                      setStatusOptionSelected={setStatusOptionSelected}
                      statusOptionSelected={statusOptionSelected}
                      isPending={changeStatusMutation?.isPending}
                      status={data?.data?.remembered_profile?.status_privacy}
                    />
                  </Modal>
                </div>
              ) : null}
            </article>

            <article className="col-span-3 min-[870px]:mt-8 mt-0 mb-8">
              <ul
                className="min-[870px]:flex hidden gap-3 list-none flex-wrap my-3 py-2.5 px-1 bg-white/80 flex-row border-2 border-tertiary-color/10 rounded shadow-lg"
                role="tablist"
              >
                {/* About */}
                <TabLink
                  setOpenTab={setOpenTab}
                  linkTab={"#about"}
                  textTab={"About"}
                  openTab={openTab}
                  numberTab={1}
                  countTab={false}
                  enableCountTab={false}
                />

                {/* Media */}
                <TabLink
                  setOpenTab={setOpenTab}
                  textTab={"Media"}
                  linkTab={"#media"}
                  openTab={openTab}
                  numberTab={3}
                  countTab={
                    data?.data?.remembered_profile?.gallery_images?.length
                  }
                />

                {/* Tributes */}
                <TabLink
                  setOpenTab={setOpenTab}
                  linkTab={"#tributes"}
                  textTab={"Tributes"}
                  openTab={openTab}
                  numberTab={5}
                  countTab={data?.data?.remembered_profile?.tributes?.length}
                />

                {/* Condolences */}
                <TabLink
                  setOpenTab={setOpenTab}
                  linkTab={"#condolences"}
                  textTab={"Condolences"}
                  openTab={openTab}
                  numberTab={4}
                  countTab={data?.data?.remembered_profile?.condolences?.length}
                />

                {/* Posts */}
                <TabLink
                  setOpenTab={setOpenTab}
                  linkTab={"#posts"}
                  textTab={"Posts"}
                  openTab={openTab}
                  numberTab={2}
                  countTab={data?.data?.remembered_profile?.posts?.length}
                />

                {/* QR Code */}
                {data?.data?.is_owner && (
                  <TabLink
                    setOpenTab={setOpenTab}
                    linkTab={"#qrCode"}
                    textTab={"Qr Code"}
                    openTab={openTab}
                    numberTab={6}
                    countTab={false}
                    enableCountTab={false}
                  />
                )}
              </ul>

              <div className="min-[870px]:hidden block mb-1">
                <TabsResponsive setOpenTab={setOpenTab} openTab={openTab} />
              </div>

              <div className="flex flex-col min-w-0 break-words w-full">
                <div className="flex-auto">
                  <div className="tab-content tab-space">
                    {/* About */}
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

                    {/* Posts */}
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
                          statusPlan={
                            data?.data?.remembered_profile?.status_plan
                          }
                          idRemembered={data?.data?.remembered_profile?.id}
                          isOwner={data?.data?.is_owner}
                          galleryImages={
                            data?.data?.remembered_profile?.gallery_images
                          }
                        />
                      </div>

                      {!data?.data?.remembered_profile?.posts?.length ? (
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
                        data?.data?.remembered_profile?.posts?.map((post) => {
                          return (
                            <Post
                              isOwner={data?.data?.is_owner}
                              rememberName={
                                data?.data?.remembered_profile?.first_name
                              }
                              totalComments={
                                data?.data?.remembered_profile?.posts?.comments
                              }
                              post={post}
                              key={post?.id}
                            />
                          );
                        })
                      )}
                    </TabLinkContent>

                    {/* Media */}
                    <TabLinkContent
                      openTab={openTab}
                      numberTab={3}
                      idTab={"#media"}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-3 rounded-lg shadow-lg mb-7">
                        <h2 className="text-primary-color font-bold text-xl">
                          Photos{" "}
                        </h2>

                        <UploadGalleryImage
                          params={params}
                          isOwner={data?.data?.is_owner}
                          idRemembered={data?.data?.remembered_profile?.id}
                          imagesGallery={
                            data?.data?.remembered_profile?.gallery_images
                          }
                          status={
                            data?.data?.remembered_profile?.status_privacy
                          }
                          statusPlan={
                            data?.data?.remembered_profile?.status_plan
                          }
                        />
                      </div>

                      {/* Mansory Design */}
                      <MansoryGallery
                        ownerName={data?.data?.remembered_profile?.owner?.name}
                        isOwner={data?.data?.is_owner}
                        galleryImages={
                          data?.data?.remembered_profile?.gallery_images
                        }
                        params={params}
                        idRemembered={data?.data?.remembered_profile?.id}
                        status={data?.data?.remembered_profile?.status_privacy}
                        statusPlan={data?.data?.remembered_profile?.status_plan}
                      />
                    </TabLinkContent>

                    {/* Condolences */}
                    <TabLinkContent
                      openTab={openTab}
                      numberTab={4}
                      idTab={"#condolences"}
                    >
                      <CondolenceHeader
                        userInfo={userInfo}
                        isOwner={data?.data?.is_owner}
                        idRemembered={data?.data?.remembered_profile?.id}
                      />

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

                    {/* Tributes */}
                    <TabLinkContent
                      openTab={openTab}
                      numberTab={5}
                      idTab={"#tributes"}
                    >
                      <TributeHeader
                        userInfo={userInfo}
                        idRemembered={data?.data?.remembered_profile?.id}
                      />

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

                    {/* QR Code */}
                    {data?.data?.is_owner && (
                      <TabLinkContent
                        openTab={openTab}
                        numberTab={6}
                        idTab={"#qrCode"}
                      >
                        <QRCodeGenerate
                          isOwner={data?.data?.is_owner}
                          idRemembered={data?.data?.remembered_profile?.id}
                          qrImages={data?.data?.remembered_profile?.qr_images}
                          statusPlan={
                            data?.data?.remembered_profile?.status_plan
                          }
                        />
                      </TabLinkContent>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </article>
    </section>
  );
};

export default ProfileRemembered;

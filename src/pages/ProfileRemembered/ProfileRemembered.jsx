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
import { useQuery } from "@tanstack/react-query";
import Tributes from "./components/Tributes";
import { useContext, useState } from "react";
import Post from "../../components/Post";
import axios from "axios";

const ProfileRemembered = () => {
  const [showMembers, setShowMembers] = useState(false);
  const { userInfo } = useContext(AppContext);
  const [openTab, setOpenTab] = useState(1);
  const params = useParams();

  // --> 🧓 Get certain profile by remember id
  const { data, isPending, error } = useQuery({
    queryKey: [`profile`, params?.id],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/get-profile/${params?.id}`
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
      await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${params?.id}`),
  });

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
              className="max-h-[24rem] w-full shadow-2xl min-[1200px]:rounded-t-lg rounded-t-none object-cover z-10"
            />

            <div className="absolute bottom-3 right-3 cursor-pointer">
              <UploadCoverImage />
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
                <UploadProfileImage />
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
          </div>
        </div>

        {/* Desktop - from 768px to up */}
        <div className="grid md:grid-cols-4 grid-cols-1 items-start md:gap-8 px-5 mb-4">
          <article className="col-span-1 sticky top-0 min-w-44 text-center border md:mb-0 mb-8 bg-white shadow-2xl rounded-xl md:-mt-12 py-5 px-4 md:block hidden">
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
                    <UploadProfileImage />
                  </div>
                </>
              )}
            </div>

            <h3 className="font-bold text-sm text-muted-color mt-3 capitalize">
              {data?.data?.remembered_profile?.epitaph || "In loving memory of"}
            </h3>
            <h3 className="font-bold capitalize text-xl">
              {data?.data?.remembered_profile?.first_name}{" "}
              {data?.data?.remembered_profile?.last_name}
            </h3>
            <p className="text-muted-color mt-2 text-xs leading-4">
              <span className="block font-bold mb-1 text-sm"> Lifetime:</span>{" "}
              {data?.data?.remembered_profile?.birth_date}{" "}
              <span className="font-bold mx-1">X</span>{" "}
              {data?.data?.remembered_profile?.death_date}{" "}
              <span className="block font-bold">
                {getLivedDays(
                  data?.data?.remembered_profile?.birth_date,
                  data?.data?.remembered_profile?.death_date
                )}{" "}
              </span>
            </p>

            <div className="flex justify-center gap-5 my-6">
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
          </article>

          <article className="col-span-3 my-8">
            <button
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
            ) : null}

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
                    <AboutRemembered rememberedProfile={data?.data} />
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
                      />
                    </div>

                    {/* Mansory Design */}
                    <MansoryGallery
                      galleryImages={
                        data?.data?.remembered_profile?.gallery_images
                      }
                      params={params}
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

                      <UploadCondolence isOwner={data?.data?.is_owner} />
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

                      <UploadTribute />
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

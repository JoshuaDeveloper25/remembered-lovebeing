import TabLinkContent from "../pages/MyProfiles/components/TabLinkContent";
import MansoryGallery from "../pages/Settings/components/MansoryGallery";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import UploadProfileImage from "../helpers/UploadProfileImage";
import UploadGalleryImage from "../helpers/UploadGalleryImage";
import TabLink from "../pages/MyProfiles/components/TabLink";
import UploadCoverImage from "../helpers/UploadCoverImage";
import { getLivedDays } from "../utils/getLivedDays";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import { useState } from "react";
import axios from "axios";

const RememberProfile = ({ queryKey, apiUrl }) => {
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [profilePosition, setProfilePosition] = useState("left");
  const [profileShapeImage, setProfileShapeImage] = useState("circle");
  const [openTab, setOpenTab] = useState(1);
  const params = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: [`${queryKey}`, params?.id],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/${apiUrl}/${params?.id}`
      ),
  });

  const ownProfilesQuery = useQuery({
    queryKey: ["ownProfiles"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/get-own-profiles`
      ),
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
    <section className="container-page">
      <article className=" rounded-lg">
        {/* Cover Image */}
        <div className="relative">
          <img
            loading="lazy"
            decoding="async"
            src={
              data?.data?.cover_images
                ? `${data?.data?.cover_images?.cloud_front_domain}/${data?.data?.cover_images?.aws_file_name}`
                : `https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
            }
            className="max-h-[36rem] w-full shadow-2xl min-[1200px]:rounded-t-lg rounded-t-none object-cover z-10"
          />

          <div className="absolute bottom-3 right-3 z-[100] cursor-pointer">
            <UploadCoverImage />
          </div>
        </div>

        {/* User Image */}
        {/* Responsive - from 768px to bottom */}
        <div className="md:hidden flex sm:flex-col lg:flex-row items-start lg:items-start sm:items-center text-start lg:text-start sm:text-center gap-5 lg:px-10 px-5">
          {/* {triggerEffect === 1 ? (
                <div
                  className={`${
                    profileShapeImage === "circle" ? "box" : null
                  } ${
                    profilePosition === "center"
                      ? "max-w-lg mx-auto"
                      : profilePosition === "right"
                      ? "left-[80%]"
                      : ""
                  }`}
                >
                  {profileShapeImage === "circle" ? (
                    <div className={`content`}>
                      <img
                        loading="lazy"
                        decoding="async"
                        src={
                          data?.data?.profile_images
                            ? `${data?.data?.profile_images?.cloud_front_domain}/${data?.data?.profile_images?.aws_file_name}`
                            : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                        }
                      />
                    </div>
                  ) : (
                    <div
                      className={`img-hanger ${
                        profilePosition === "center"
                          ? "mx-auto my-0"
                          : profilePosition === "right"
                          ? "min-[1130px]:ms-[55rem] me-0"
                          : ""
                      }}`}
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src={
                          data?.data?.profile_images
                            ? `${data?.data?.profile_images?.cloud_front_domain}/${data?.data?.profile_images?.aws_file_name}`
                            : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                        }
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="-mt-20 ms-5">
                  {profileShapeImage === "circle" ? (
                    <img
                      loading="lazy"
                      decoding="async"
                      className={`w-36 h-36 object-cover rounded-full
                    
                     ${
                       profilePosition === "center"
                         ? "mx-auto"
                         : profilePosition === "right"
                         ? "ms-auto"
                         : ""
                     }`}
                      src={
                        data?.data?.profile_images
                          ? `${data?.data?.profile_images?.cloud_front_domain}/${data?.data?.profile_images?.aws_file_name}`
                          : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                      }
                    />
                  ) : (
                    <img
                      loading="lazy"
                      decoding="async"
                      className={`rounded-none h-36 w-36 object-cover
                   ${
                     profilePosition === "center"
                       ? "mx-auto"
                       : profilePosition === "right"
                       ? "ms-auto"
                       : ""
                   }`}
                      src={
                        data?.data?.profile_images
                          ? `${data?.data?.profile_images?.cloud_front_domain}/${data?.data?.profile_images?.aws_file_name}`
                          : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                      }
                    />
                  )}
                </div>
              )} */}

          <div className="sm:max-w-none max-w-[5rem] sm:-mt-20 -mt-10 relative z-20">
            <img
              className="sm:h-[168px] w-full sm:w-[168px] h-full rounded-full"
              loading="lazy"
              decoding="async"
              src={
                data?.data?.profile_images
                  ? `${data?.data?.profile_images?.cloud_front_domain}/${data?.data?.profile_images?.aws_file_name}`
                  : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
              }
            />
            <div className="absolute bottom-3 right-3 z-[100] cursor-pointer">
              <UploadProfileImage />
            </div>
          </div>

          <div className="lg:self-end">
            <h2 className="font-semibold text-gray-500">
              {data?.data?.epitaph || "In loving memory of"}
            </h2>
            <h3 className="text-2xl font-bold mb-1">{data?.data?.name}</h3>
            <h3 className="text-gray-500">
              <span className="font-bold">Lifetime</span>:{" "}
              {data?.data?.birth_date} <span className="font-bold">X</span>{" "}
              {data?.data?.death_date}
              <span className="block">
                {getLivedDays(data?.data?.birth_date, data?.data?.death_date)}{" "}
              </span>
            </h3>
          </div>
        </div>

        {/* Desktop - from 768px to up */}
        <div className="grid md:grid-cols-4 grid-cols-1 items-start md:gap-8 px-5">
          <article className="col-span-1 sticky top-0 min-w-44 text-center border md:mb-0 mb-8 bg-white shadow-2xl rounded-xl md:-mt-12 py-5 px-4 md:block hidden">
            <div className="relative">
              <img
                className="w-36 h-36 object-cover mx-auto rounded-full shadow-lg"
                src={
                  data?.data?.profile_images
                    ? `${data?.data?.profile_images?.cloud_front_domain}/${data?.data?.profile_images?.aws_file_name}`
                    : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                }
              />
              <div className="absolute bottom-3 right-14 z-[100]">
                <UploadProfileImage />
              </div>
            </div>
            <h3 className="font-bold text-sm text-gray-500 mt-3 capitalize">
              {data?.data?.epitaph || "In loving memory of"}
            </h3>
            <h3 className="font-bold capitalize text-xl">{data?.data?.name}</h3>
            <p className="text-gray-600 mt-2 text-xs leading-4">
              <span className="block font-bold mb-1 text-sm"> Lifetime:</span>{" "}
              {data?.data?.birth_date} <span className="font-bold mx-1">X</span>{" "}
              {data?.data?.death_date}{" "}
              <span className="block font-bold">
                {getLivedDays(data?.data?.birth_date, data?.data?.death_date)}{" "}
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
            <p className="text-gray-600 text-xs font-bold mt-2 leading-4">
              Member since Nov 15, 2021
            </p>
          </article>

          <article className="col-span-3 my-8">
            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
              <h2 className="font-bold text-primary-color text-xl mb-2">
                My family members...
              </h2>
              <Carousel rememberedProfiles={ownProfilesQuery?.data?.data} />
            </div>

            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <TabLink
                setOpenTab={setOpenTab}
                textTab={"Media"}
                linkTab={"#media"}
                // iconTab={<FaCross className="text-primary-color" />}
                openTab={openTab}
                numberTab={1}
              />

              <TabLink
                setOpenTab={setOpenTab}
                linkTab={"#favourites"}
                textTab={"Favourites"}
                // iconTab={<FaHeart className="text-red-500" />}
                openTab={openTab}
                numberTab={2}
              />
            </ul>

            <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg w-full mb-6 shadow-lg">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <TabLinkContent
                    openTab={openTab}
                    numberTab={1}
                    idTab={"#media"}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-7">
                      <h2 className="text-primary-color font-bold text-xl sm:my-0 my-3">
                        Photos
                      </h2>

                      <UploadGalleryImage />
                    </div>

                    {/* Mansory Design */}
                    <MansoryGallery
                      ownProfilesQuery={ownProfilesQuery}
                      params={params}
                    />
                  </TabLinkContent>

                  <TabLinkContent
                    openTab={openTab}
                    numberTab={2}
                    idTab={"#favourites"}
                  ></TabLinkContent>
                </div>
              </div>
            </div>
          </article>
        </div>
      </article>
    </section>
  );
};

export default RememberProfile;

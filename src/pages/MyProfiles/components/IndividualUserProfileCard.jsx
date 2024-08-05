import UploadUserProfileImage from "../../../components/UploadUserProfileImage";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";
import AppContext from "../../../context/AppProvider";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const IndividualUserProfileCard = () => {
  const { userInfo } = useContext(AppContext);

  const userStatsQuery = useQuery({
    queryKey: ["userStats"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/user-stats`
      ),
  });

  const userStats = userStatsQuery?.data?.data;

  return (
    <article className="md:sticky static top-0 col-span-1 min-w-52 text-center border md:mb-0 mb-8 bg-white shadow-2xl rounded-xl md:-mt-36 py-5 px-4">
      <div className="relative">
        <img
          className="w-36 h-36 object-cover mx-auto rounded-full shadow-lg"
          src={
            userInfo?.profile_image
              ? `${userInfo?.profile_image?.cloud_front_domain}/${userInfo?.profile_image?.aws_file_name}`
              : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
          }
        />
        {/* {!data?.data?.is_owner ? null : ( */}
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] cursor-pointer">
          <UploadUserProfileImage />
        </div>
        {/* )} */}
      </div>

      <h3 className="font-bold capitalize mt-6 text-xl">{userInfo?.name}</h3>
      <p className="text-gray-600 font-semibold text-xs mt-2 leading-4">
        {userInfo?.email}
      </p>
      <p className="text-gray-600 text-sm mt-2 leading-4">
        A passionate developer with the need of learning new things...
      </p>

      <div className="flex justify-center  items-center my-6">
        <div className="border-r border-tertiary-color/50 px-2">
          <h3 className="text-sm text-tertiary-color font-bold">
            {userStats?.posts_count}
          </h3>
          <h2 className="text-xs text-tertiary-color">Posts</h2>
        </div>

        <div className="border-r border-tertiary-color/50 px-2">
          <h3 className="text-sm text-tertiary-color font-bold">
            {userStats?.gallery_images_count}
          </h3>
          <h2 className="text-xs text-tertiary-color">Media</h2>
        </div>

        <div className="border-r border-tertiary-color/50 px-2">
          <h3 className="text-sm text-tertiary-color font-bold">
            {userStats?.tributes_count}
          </h3>
          <h2 className="text-xs text-tertiary-color">Tributes</h2>
        </div>

        <div className="px-2">
          <h3 className="text-sm text-tertiary-color font-bold">
            {userStats?.condolences_count}
          </h3>

          <div className="relative group cursor-pointer">
            <span className="text-sm text-tertiary-color block overflow-hidden text-ellipsis whitespace-nowrap max-w-[80px]">
              Con...
            </span>
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden w-max px-2 py-1 text-white bg-black rounded-md text-sm group-hover:block">
              Condolences
            </span>
          </div>
        </div>
      </div>

      {/* Social Media */}
      {/* <div className="flex justify-center gap-5 my-6">
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
      </div> */}
      <p className="text-gray-600 text-xs font-bold mt-2 leading-4">
        Member since Nov 15, 2021
      </p>
    </article>
  );
};

export default IndividualUserProfileCard;

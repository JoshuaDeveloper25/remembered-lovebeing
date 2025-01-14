import UploadUserProfileImage from "../../../components/UploadUserProfileImage";
import AppContext from "../../../context/AppProvider";
import { useContext } from "react";
import formatDate from "../../../utils/formatDate";

const IndividualUserProfileCard = ({ userStats }) => {
  const { userInfo } = useContext(AppContext);

  return (
    <article className="md:block hidden md:sticky static top-0 col-span-1 min-w-52 text-center border md:mb-0 mb-8 bg-white shadow-2xl rounded-xl md:-mt-36 py-5 px-4">
      <div className="relative">
        <img
          className="w-[100px] h-[100px] object-cover mx-auto rounded-full shadow-lg"
          src={
            userInfo?.profile_image
              ? `${userInfo?.profile_image?.cloud_front_domain}/${userInfo?.profile_image?.aws_file_name}`
              : `https://i.pinimg.com/474x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg`
          }
        />
        <div className="absolute -bottom-3 left-[55%] z-[100] cursor-pointer">
          <UploadUserProfileImage />
        </div>
      </div>

      <h3 className="font-bold capitalize mt-4 text-xl">{userInfo?.name}</h3>
      <p className="text-gray-600 font-semibold text-xs mt-2 leading-4">
        {userInfo?.email}
      </p>

      <div className="flex justify-center  items-center mt-3">
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

      <p className="text-muted-color text-xs rounded-md mt-3.5">
        Member since:{" "}
        <span className="font-bold">{formatDate(userInfo?.created_at)}</span>
      </p>
    </article>
  );
};

export default IndividualUserProfileCard;

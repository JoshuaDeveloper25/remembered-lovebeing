import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { PiCakeFill } from "react-icons/pi";
import { GiTombstone } from "react-icons/gi";
import { FaEarthAmericas } from "react-icons/fa6";

const Memorial = ({ item, t }) => {
  return (
    <article className=" bg-white shadow-xl rounded-sm animation-fade hover:scale-image">
      {/* Cover of Remembered */}
      <div className="coverMemorial [clip-path:polygon(100%_0%,100%_100%,50%_65%,0%_100%,0%_0%)] h-28">
        <div className="flex justify-center items-center h-[60%]">
          <h2 className="text-center font-bold italic text-white tracking-wider text-sm">
            {t("In loving memory of...")}
          </h2>
        </div>
      </div>

      {/* Profile */}
      <div>
        <img
          className="profile-image border-2 border-white mx-auto -mt-14 sticky z-50 w-24 h-24 rounded-full"
          src={
            item?.profile_images
              ? `${item?.profile_images?.cloud_front_domain}/${item?.profile_images?.aws_file_name}`
              : `https://i.pinimg.com/474x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg`
          }
        />

        <h3 className="text-center capitalize font-bold py-1">
          {item?.first_name} {item?.last_name}
        </h3>

        <div className="w-10 h-1 mx-auto bg-primary-color"></div>
      </div>

      {/* Rest Info */}
      <div className="px-4">
        <div className="flex justify-between my-6">
          <p className="text-xs">
            <PiCakeFill className="inline-block size-6 align-bottom" />:{" "}
            {item?.birth_date === null ? t("No Date...") : item?.birth_date}
          </p>
          <p className="text-xs ">
            <GiTombstone className="inline-block size-6 align-bottom" />:{" "}
            {item?.death_date === null ? t("No Date...") : item?.death_date}
          </p>
        </div>

        <p className="flex items-center gap-1.5 text-xs text-start">
          <FaEarthAmericas size={16} />{" "}
          <span className="font-extrabold"> {t("Birth Place")}:</span>{" "}
          {
            <div className="relative group cursor-pointer">
              {/* Desktop one */}
              <span className="text-sm text-tertiary-color overflow-hidden text-ellipsis whitespace-nowrap max-w-[80px] sm:block hidden">
                {item?.birth_country?.substring(0, 10) || t("No Country")}...
              </span>

              {/* Responsive one */}
              <div className="sm:block hidden">
                <span className="text-sm text-tertiary-color overflow-hidden sm:hidden block max-w-[8rem]">
                  {item?.birth_country || t("No Country")}...
                </span>
              </div>

              <div className="sm:block hidden">
                {" "}
                {item?.birth_country ? (
                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden w-max px-2 py-1 text-white bg-black rounded-md text-sm group-hover:block">
                    {item?.birth_country}
                  </span>
                ) : (
                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden w-max px-2 py-1 text-white bg-black rounded-md text-sm group-hover:block">
                    {t("No Country")}...
                  </span>
                )}
              </div>
            </div>
          }
        </p>

        <p className="text-sm text-tertiary-color overflow-hidden sm:hidden block max-w-[8rem] mt-1">
          {item?.birth_country || t("No Country...")}
        </p>

        <Link
          to={`/remembered-profile/${item?.slug}`}
          className={`btn bg-[#00A2B3] text-white hover:bg-[#00A2B3]/80 w-full inline-block text-center animation-fade rounded-sm text-sm my-4`}
        >
          <FaEye className="inline-block me-1" />
          {t("View")}
        </Link>
      </div>
    </article>
  );
};

export default Memorial;

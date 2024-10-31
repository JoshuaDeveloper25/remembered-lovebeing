import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const FavouriteProfile = ({ item, isPending }) => {
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
    <div className="relative shadow-2xl border rounded-sm p-4">
      <div className="flex items-center gap-2">
        <img
          src={
            item?.profile_images?.cloud_front_domain
              ? `${item?.profile_images?.cloud_front_domain}/${item?.profile_images?.aws_file_name}`
              : "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
          }
          className="h-20 w-20 object-cover rounded-full border"
          decoding="async"
          loading="lazy"
        />

        <div>
          <Link target="_blank" to={`/remembered-profile/${item?.slug}`}>
            <h2 className="capitalize font-bold text-xl leading-6 max-w-xs">
              {`${item?.first_name} ${item?.last_name}`}
            </h2>
          </Link>
          <p className="text-tertiary-color block">
            <span className="font-medium">Lifetime:</span>{" "}
            {`${item?.birth_date ?? "No Date"} - ${
              item?.death_date ?? "No Date"
            }`}
          </p>
        </div>
      </div>

      <button
        className="flex items-center mt-3 justify-center gap-2 w-full py-1 rounded-sm font-medium  bg-blue-100 text-blue-500  hover:bg-blue-500 hover:text-white transition-colors"
        type="button"
      >
        <FaCheckCircle className="inline " /> Following
      </button>
    </div>
  );
};

export default FavouriteProfile;

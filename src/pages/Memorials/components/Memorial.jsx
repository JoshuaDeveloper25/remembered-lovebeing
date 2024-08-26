import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const Memorial = ({ item }) => {
  return (
    <article className=" bg-white shadow-xl rounded-sm animation-fade hover:scale-image">
      {/* Cover */}
      <div className="coverMemorial [clip-path:polygon(100%_0%,100%_100%,50%_65%,0%_100%,0%_0%)] h-28">
        <div className="flex justify-center items-center h-[60%]">
          <h2 className="text-center font-bold italic text-white tracking-wider text-sm">
            In loving memory of...
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
              : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
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
            <span className="font-bold">Birth:</span> {item?.birth_date === null ? 'No Date...' : item?.birth_date}
          </p>
          <p className="text-xs ">
            <span className="font-bold">Death:</span> {item?.death_date === null ? 'No Date...' : item?.death_date}
          </p>
        </div>

        <p className="text-xs text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit in ea.
        </p>

        <Link
          to={`/remembered-profile/${item?.id}`}
          className={`btn bg-[#00A2B3] text-white hover:bg-[#00A2B3]/80 w-full inline-block text-center animation-fade rounded-sm text-sm my-4`}
        >
          <FaEye className="inline-block me-1" />
          View
        </Link>
      </div>
    </article>
  );
};

export default Memorial;

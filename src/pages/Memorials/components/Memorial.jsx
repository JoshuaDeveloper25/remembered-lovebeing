import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";


const Memorial = ({ item }) => {
  return (
    <article className="bg-white shadow-xl rounded-sm animation-fade hover:scale-image">
      {/* Cover */}
      <div className="bg-black/85 [clip-path:polygon(100%_0%,100%_100%,50%_65%,0%_100%,0%_0%)] h-28">
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
              : `https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
          }
        />

        <h3 className="text-center capitalize font-bold py-1">{item?.name}</h3>

        <div className="w-10 h-1 mx-auto bg-primary-color"></div>
      </div>

      {/* Rest Info */}
      <div className="px-4">
        <p className="text-xs text-center my-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit in ea.
        </p>

        <Link
          to={`/remembered-profile-preview/${item?.id}`}
          className={`btn bg-[#00A2B3] text-white hover:bg-[#00A2B3]/80 w-full inline-block text-center animation-fade rounded-sm text-sm`}
        >
          <FaEye className="inline-block me-1" />
          View
        </Link>
      </div>

      <div className="mt-5 bg-fourth-color/85 text-white [clip-path:polygon(50%_16%,55%_34%,100%_36%,100%_2%,100%_100%,0%_100%,0%_37%,46%_34%)] py-4">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:mt-0 mt-6">
          <p className="text-xs md:mt-6">
            <span className="font-bold">Birth:</span> {item?.birth_date}
          </p>
          <p className="text-xs md:mt-6">
            <span className="font-bold">Death:</span> {item?.death_date}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Memorial;

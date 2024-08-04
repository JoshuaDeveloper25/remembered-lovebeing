import formatDate from "../../../utils/formatDate";
import { RiImageAddFill } from "react-icons/ri";
import { FiUserPlus } from "react-icons/fi";
import { MdPostAdd } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const New = ({ item }) => {
  const statusIcons = [
    {
      eventType: "post created",
      eventIcon: <MdPostAdd size={28} />,
    },

    {
      eventType: "post updated",
      eventIcon: <FaEdit size={28} />,
    },

    {
      eventType: "tribute created",
      eventIcon: <MdPostAdd size={28} />,
    },

    {
      eventType: "image added",
      eventIcon: <RiImageAddFill size={28} />,
    },

    {
      eventType: "profile created",
      eventIcon: <FiUserPlus size={28} />,
    },
  ];

  const newInformation = statusIcons.find(
    (statusIcon) => statusIcon?.eventType === item?.event_type
  );

  return (
    <article className="relative text-center shadow-lg bg-white px-4 py-3 mb-5 rounded-sm">
      <div className="absolute right-1/2 transform translate-x-1/2 -top-6 text-white bg-secondary-color inline-block rounded-full p-3">
        {newInformation?.eventIcon}
      </div>
      <h2 className="text-muted-color capitalize font-bold mt-9">
        {item?.event_type}
      </h2>
      <h4 className="text-[.6rem] mb-2 text-tertiary-color font-medium">
        Created: {formatDate(item?.created_at)}
      </h4>
      <p className="max-w-[18rem] text-sm mx-auto text-tertiary-color">
        {item?.description}
      </p>
    </article>
  );
};

export default New;

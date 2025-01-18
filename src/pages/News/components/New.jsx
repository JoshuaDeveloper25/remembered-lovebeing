import { RiImageEditFill, RiImageAddFill } from "react-icons/ri";
import { BiCommentEdit, BiCommentAdd } from "react-icons/bi";
import AppContext from "../../../context/AppProvider";
import { HiMiniDocumentPlus } from "react-icons/hi2";
import formatDate from "../../../utils/formatDate";
import { MdEditDocument } from "react-icons/md";
import { PiFlowerFill } from "react-icons/pi";
import { FiUserPlus } from "react-icons/fi";
import { useContext } from "react";

const New = ({ item, t }) => {
  const { languageSelected } = useContext(AppContext);

  const statusIcons = [
    {
      eventType: "post created",
      eventIcon: <HiMiniDocumentPlus size={28} />,
      boxIcon: "bg-[#008000]",
    },

    {
      eventType: "post updated",
      eventIcon: <MdEditDocument size={28} />,
      boxIcon: "bg-secondary-color",
    },

    {
      eventType: "image added",
      eventIcon: <RiImageAddFill size={28} />,
      boxIcon: "bg-[#008000]",
    },

    {
      eventType: "image updated",
      eventIcon: <RiImageEditFill size={28} />,
      boxIcon: "bg-secondary-color",
    },

    {
      eventType: "new comment",
      eventIcon: <BiCommentAdd size={28} />,
      boxIcon: "bg-[#008000]",
    },

    {
      eventType: "comment updated",
      eventIcon: <BiCommentEdit size={28} />,
      boxIcon: "bg-secondary-color",
    },

    {
      eventType: "tribute created",
      eventIcon: <PiFlowerFill size={28} />,
      boxIcon: "bg-yellow-500",
    },

    {
      eventType: "profile created",
      eventIcon: <FiUserPlus size={28} />,
      boxIcon: "bg-[#008000]",
    },
  ];

  const newInformation = statusIcons.find(
    (statusIcon) => statusIcon?.eventType === item?.event_type
  );

  return (
    <article className="relative text-center shadow-lg bg-white px-4 py-3 mb-5 rounded-sm">
      <div
        className={`absolute right-1/2 transform translate-x-1/2 -top-6 text-white ${newInformation?.boxIcon} inline-block rounded-full p-3`}
      >
        {newInformation?.eventIcon}
      </div>

      <h2 className="text-muted-color capitalize font-bold mt-9">
        {t(item?.event_type)}
      </h2>

      <h4 className="text-[.6rem] mb-2 text-tertiary-color font-medium">
        {t("Created")}:{" "}
        {formatDate(
          item?.created_at,
          languageSelected === "es" ? "spanish" : "english"
        )}
      </h4>

      <p className="max-w-[18rem] text-sm mx-auto text-tertiary-color">
        {item.description}
      </p>
    </article>
  );
};

export default New;

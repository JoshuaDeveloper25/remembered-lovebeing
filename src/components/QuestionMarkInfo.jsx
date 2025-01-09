import { FaQuestionCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const QuestionMarkInfo = ({ children, toolTipId }) => {
  return (
    <>
      <a data-tooltip-id={toolTipId}>
        <FaQuestionCircle className="text-yellow-300" />
      </a>

      <Tooltip id={toolTipId}>{children}</Tooltip>
    </>
  );
};

export default QuestionMarkInfo;

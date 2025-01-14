import { Tooltip } from "react-tooltip";

const AlertUserExample = ({ toolTipId, children }) => {
  return (
    <>
      <a data-tooltip-id={toolTipId}>{children}</a>

      <Tooltip id={toolTipId}>
        <div className="text-center">
          {"This is a sample profile and cannot be edited."}
        </div>
      </Tooltip>
    </>
  );
};

export default AlertUserExample;

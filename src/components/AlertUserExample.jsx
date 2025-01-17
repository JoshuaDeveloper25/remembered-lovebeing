import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";

const AlertUserExample = ({ toolTipId, children }) => {
  const { t } = useTranslation();

  return (
    <>
      <a data-tooltip-id={toolTipId}>{children}</a>

      <Tooltip id={toolTipId}>
        <div className="text-center">
          {t("This is a sample profile and cannot be edited.")}
        </div>
      </Tooltip>
    </>
  );
};

export default AlertUserExample;

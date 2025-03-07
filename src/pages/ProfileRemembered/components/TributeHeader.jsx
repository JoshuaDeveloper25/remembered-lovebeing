import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import UploadTribute from "./UploadTribute";
import { Link } from "react-router-dom";
import { useState } from "react";

const TributeHeader = ({
  t,
  userInfo,
  idRemembered,
  isAlbertEinstein,
  isOwner,
}) => {
  const [tributeDesc, setTributeDesc] = useState(false);

  return (
    <div className="flex flex-col gap-6 sm:flex-row justify-between items-center mb-7 bg-white shadow-lg rounded-lg p-3">
      <div className="flex-1">
        <div className="bg-primary-color rounded-sm">
          {/* Title */}
          <h2>
            <button
              className={`flex gap-4 justify-between w-full items-center rounded-none px-5 py-4 dark:bg-primary-color/80 font-medium text-white`}
              onClick={() => setTributeDesc(!tributeDesc)}
              type="button"
            >
              {t("Tributos: Un Tributo Personal")}
              {tributeDesc ? (
                <FaChevronUp className="text-white inline" />
              ) : (
                <FaChevronDown className="text-white inline" />
              )}
            </button>
          </h2>

          {/* Content */}
          {tributeDesc && (
            <div className="relative">
              <div
                className={
                  "absolute top-0 z-50 right-0 left-0 w-full h-full  text-white"
                }
              >
                <div className={`bg-black/60 p-5 backdrop-blur-lg`}>
                  <strong>{t("Description")}: </strong>
                  {
                    t("This section is designed for family and friends to share memories and special messages about their loved one. Here those who knew them can express their feelings and cherish significant moments.")
                  }{" "}
                  <span className="block mt-3">
                    <strong>{t("Example")}:</strong>{" "}
                    <i>
                      “
                      {t(
                        "I will always remember how Jennifer made us laugh with her funny stories. Her warmth and kindness made every encounter special. We will miss you so much."
                      )}
                      ”
                    </i>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {!userInfo?.access_token && (
        <h4 className="font-medium text-tertiary-color">
          {t("Please")},{" "}
          <span>
            <Link className="text-secondary-color underline" to={"/sign-in"}>
              {t("Log in")}
            </Link>
          </span>
          , {t("to leave a tribute")}.
        </h4>
      )}

      <UploadTribute
        isOwner={isOwner}
        isAlbertEinstein={isAlbertEinstein}
        idRemembered={idRemembered}
      />
    </div>
  );
};

export default TributeHeader;

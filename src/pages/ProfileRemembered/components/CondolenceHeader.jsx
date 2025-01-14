import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import UploadCondolence from "./UploadCondolence";
import { Link } from "react-router-dom";
import { useState } from "react";

const CondolenceHeader = ({
  userInfo,
  isOwner,
  idRemembered,
  isAlbertEinstein,
}) => {
  const [condolenceDesc, setCondolenceDesc] = useState(false);

  return (
    <div className="flex flex-col gap-6 sm:flex-row justify-between items-center mb-7 bg-white shadow-lg rounded-lg p-3">
      <div className="flex-1">
        <div className="bg-primary-color rounded-sm">
          {/* Title */}
          <h2>
            <button
              className={`flex gap-4 justify-between w-full items-center rounded-none px-5 py-4 dark:bg-primary-color/80 font-medium text-white`}
              onClick={() => setCondolenceDesc(!condolenceDesc)}
              type="button"
            >
              Condolences: A Message of Solidarity
              {condolenceDesc ? (
                <FaChevronUp className="text-white inline" />
              ) : (
                <FaChevronDown className="text-white inline" />
              )}
            </button>
          </h2>

          {/* Content */}
          {condolenceDesc && (
            <div className="relative">
              <div
                className={
                  "absolute top-0 z-50 right-0 left-0 w-full h-full  text-white"
                }
              >
                <div className={`bg-black/50 p-5 backdrop-blur-lg`}>
                  <strong>Description: </strong>This section allows everyone to
                  express their feelings of support and condolences. It is a
                  space where comfort and solidarity can be offered, regardless
                  of whether you personally knew the loved one. Your message can
                  be a source of comfort for the family and friends during this
                  difficult time.{" "}
                  <span className="block mt-3">
                    <strong>Example:</strong>{" "}
                    <i>
                      “My deepest condolences. Although I did not know Jennifer,
                      my heart is with her family in this time of loss. May they
                      find peace and strength. ”
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
          Please,{" "}
          <span>
            <Link className="text-secondary-color underline" to={"/sign-in"}>
              Log In
            </Link>
          </span>
          , to leave a condolence.
        </h4>
      )}

      <UploadCondolence
        isAlbertEinstein={isAlbertEinstein}
        idRemembered={idRemembered}
        isOwner={isOwner}
      />
    </div>
  );
};

export default CondolenceHeader;

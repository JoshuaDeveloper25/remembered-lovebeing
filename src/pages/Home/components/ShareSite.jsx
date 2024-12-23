import { CopyToClipboard } from "react-copy-to-clipboard";
import { useLocation } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ShareSite = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const fullUrl = `${window.location.origin}${location.pathname}`;

  const onCopy = () => {
    toast.success("Copied to clipboard!");
  };

  return (
    <section className="bg-primary-color-light">
      <div className="container-page py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="sm:text-start text-center text-white text-3xl font-serif uppercase tracking-widest font-medium">
              {t("Share the site with friends")}:
            </h2>
          </div>

          <ul className="flex items-center gap-3">
            {/* Facebook Share */}
            <li className="size-10">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  fullUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="animation-fade p-3 rounded-full w-full h-full hover:bg-primary-color hover:text-white bg-white text-primary-color-light" />
              </a>
            </li>

            {/* Twitter Share */}
            <li className="size-10">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  fullUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitterX className="animation-fade p-3 rounded-full w-full h-full hover:bg-primary-color hover:text-white bg-white text-primary-color-light" />
              </a>
            </li>

            {/* Email Share */}
            <li className="size-10">
              <a
                href={`mailto:?subject=Check this out&body=${encodeURIComponent(
                  fullUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdOutlineMail className="animation-fade p-3 rounded-full w-full h-full hover:bg-primary-color hover:text-white bg-white text-primary-color-light" />
              </a>
            </li>

            {/* Copy Link */}
            <CopyToClipboard onCopy={onCopy} text={fullUrl}>
              <button className="size-10 cursor-pointer">
                <IoIosLink className="animation-fade p-3 rounded-full w-full h-full hover:bg-primary-color hover:text-white bg-white text-primary-color-light" />
              </button>
            </CopyToClipboard>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ShareSite;

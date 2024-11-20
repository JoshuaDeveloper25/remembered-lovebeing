import { Link, useLocation } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import { toast } from "react-toastify";

const ShareSite = () => {
  const location = useLocation();

  const unsecuredCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Unable to copy to clipboard");
      console.log("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  };

  const copyToClipboard = (content) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content);
    } else {
      unsecuredCopyToClipboard(content);
    }
  };

  return (
    <section className="bg-primary-color-light">
      <div className="container-page px-3 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="sm:text-start text-center text-white text-3xl">
              Share the site with friends:
            </h2>
          </div>

          <ul className="flex items-center gap-3">
            <li className="size-10">
              <Link to={"#"}>
                <FaFacebookF className="animation-fade p-3 rounded-full w-full h-full hover:bg-black hover:text-white bg-white text-primary-color-light" />
              </Link>
            </li>

            <li className="size-10">
              <Link to={"#"}>
                <BsTwitterX className="animation-fade p-3 rounded-full w-full h-full hover:bg-black hover:text-white bg-white text-primary-color-light" />
              </Link>
            </li>

            <li className="size-10">
              <Link to={"#"}>
                <MdOutlineMail className="animation-fade p-3 rounded-full w-full h-full hover:bg-black hover:text-white bg-white text-primary-color-light" />
              </Link>
            </li>

            <button
              onClick={() => copyToClipboard(location?.pathname)}
              className="size-10 cursor-pointer"
            >
              <IoIosLink className="animation-fade p-3 rounded-full w-full h-full hover:bg-black hover:text-white bg-white text-primary-color-light" />
            </button>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ShareSite;

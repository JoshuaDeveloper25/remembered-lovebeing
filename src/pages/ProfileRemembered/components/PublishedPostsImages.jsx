// import ReactImageGrid from "@cordelia273/react-image-grid";
import Photogrid from "react-facebook-photo-grid";
import { MdImageNotSupported } from "react-icons/md";

const PublishedPostsImages = ({ setToggleModal, galleryImages, t }) => {
  const imagesToString = galleryImages?.map((item) =>
    `${item?.cloud_front_domain}/${encodeURIComponent(item?.aws_file_name)}`
  );

  return !galleryImages?.length ? (
    <div className="bg-gray-300 text-center rounded py-16">
      <MdImageNotSupported className="inline-block object-cover size-20 text-primary-color" />
      <h2 className="text-primary-color font-bold text-lg">
        {t("No Image Available")}
      </h2>
    </div>
  ) : (
    <div className="galleryPost relative">
      <button
        className="bg-transparent absolute inset-0"
        onClick={() => setToggleModal(true)}
      ></button>

      <div className="container-mansory">
        <Photogrid images={imagesToString} />
      </div>
    </div>
  );
};

export default PublishedPostsImages;

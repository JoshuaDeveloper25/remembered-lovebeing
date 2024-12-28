import ReactImageGrid from "@cordelia273/react-image-grid";
import { MdImageNotSupported } from "react-icons/md";

const PublishedPostsImages = ({ setToggleModal, galleryImages }) => {
  const imagesToString = galleryImages?.map(
    (item) => `${item?.cloud_front_domain}/${item?.aws_file_name}`
  );

  return !galleryImages?.length ? (
    <div className="bg-gray-300 text-center rounded py-16">
      <MdImageNotSupported className="inline-block object-cover size-20 text-primary-color" />
      <h2 className="text-primary-color font-bold text-lg">
        No Image Available
      </h2>
    </div>
  ) : (
    <div className="galleryPost ">
      <ReactImageGrid
        className={"max-w-[500px] mx-auto"}
        images={imagesToString}
      />
    </div>
  );
};

export default PublishedPostsImages;

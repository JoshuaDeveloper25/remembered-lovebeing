import { MdImageNotSupported } from "react-icons/md";

const PublishedPostsImages = ({ setToggleModal, galleryImages }) => {
  return !galleryImages?.length ? (
    <div className="bg-gray-300 text-center rounded py-16">
      <MdImageNotSupported className="inline-block object-cover size-20 text-primary-color" />
      <h2 className="text-primary-color font-bold text-lg">
        No Image Available
      </h2>
    </div>
  ) : (
    <div className="galleryPost h-screen max-h-72 overflow-y-auto">
      <div
        className={"gallery"}
        onClick={() => setToggleModal(true)}
      >
        {galleryImages?.map((remember, index) => {
          return (
            <div
              key={index}
              className="pics"
            >
              <img
                loading="lazy"
                decoding="async"
                className="w-full"
                src={
                  remember?.id
                    ? `${remember?.cloud_front_domain}/${remember?.aws_file_name}`
                    : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PublishedPostsImages;

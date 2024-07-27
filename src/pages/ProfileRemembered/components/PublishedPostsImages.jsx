import { MdImageNotSupported } from "react-icons/md";
import lgShare from "lightgallery/plugins/share";
import lgHash from "lightgallery/plugins/hash";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";
import { useParams } from "react-router-dom";

const PublishedPostsImages = ({ rememberName, galleryImages }) => {
  const params = useParams();

  return !galleryImages?.length ? (
    <div className="bg-gray-300 text-center rounded py-16">
      <MdImageNotSupported className="inline-block object-cover size-20 text-primary-color" />
      <h2 className="text-primary-color font-bold text-lg">
        No Image Available
      </h2>
    </div>
  ) : (
    <div className="galleryPost h-screen max-h-72 overflow-y-auto">
      <LightGallery
        elementClassNames={"gallery"}
        plugins={[lgZoom, lgShare, lgHash]}
        speed={500}
      >
        {galleryImages?.map((remember, index) => {
          return (
            <div
              key={index}
              className="pics"
              data-src={`${remember?.cloud_front_domain}/${remember?.aws_file_name}`}
              data-sub-html={`<h4>Uploaded by - ${rememberName}</h4><p> This is a souvenir from this lovebeing...</p>`}
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
      </LightGallery>
    </div>
  );
};

export default PublishedPostsImages;

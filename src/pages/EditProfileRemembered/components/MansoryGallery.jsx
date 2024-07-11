import { v4 as uuidv4 } from "uuid";

const MansoryGallery = ({ ownProfilesQuery, params }) => {
  const galleryImagesProfile = ownProfilesQuery?.data?.data
    ?.map((item) => item)
    ?.filter((item) => item?.id === +params?.id)[0]?.gallery_images;

  return (
    <>
      {galleryImagesProfile?.length !== 0 ? (
        <div className="gallery">
          {galleryImagesProfile?.map((item) => (
            <div
              className="pics"
              key={uuidv4()}
              onClick={() =>
                getImg(`${item?.cloud_front_domain}/${item?.aws_file_name}`)
              }
            >
              <img
                src={`${item?.cloud_front_domain}/${item?.aws_file_name}`}
                className="w-full rounded-md"
                decoding="async"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-xl my-8 text-primary-color font-bold">
          There's no images uploaded yet...
        </h2>
      )}
    </>
  );
};
export default MansoryGallery;

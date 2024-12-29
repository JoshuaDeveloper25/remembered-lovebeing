import RememberedMedia from "./RememberedMedia";
import { IoIosWarning } from "react-icons/io";
import LightGallery from "lightgallery/react";
import React, { useRef } from "react";

const MansoryGallery = ({
  ownerName,
  isOwner,
  statusPlan,
  idRemembered,
  galleryImages,
}) => {
  const refGallery = useRef(null);

  const handleImageClick = (indexImage) => {
    const imagesOpen = refGallery.current.querySelectorAll(".pics")[indexImage];
    imagesOpen.click();
  };

  return (
    <>
      {galleryImages?.length !== 0 ? (
        <div className="py-3 px-3 bg-white rounded-lg shadow-2xl">
          {isOwner && statusPlan === "free" && galleryImages?.length >= 5 ? (
            <div className="mt-2 mb-3">
              <h3 className=" font-semibold text-center py-2.5 shadow-lg rounded-sm text-gray-900 text-lg  bg-yellow-400 animate-pulse ">
                <IoIosWarning className="inline-block size-8 me-1.5 align-middle" />
                You have reached the limit of 5 images
              </h3>
            </div>
          ) : null}

          <div ref={refGallery}>
            <LightGallery elementClassNames="hidden">
              {galleryImages?.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <RememberedMedia
                      ownerName={ownerName}
                      idRemembered={idRemembered}
                      item={item}
                      key={item?.id}
                      isOwner={isOwner}
                    />
                  </React.Fragment>
                );
              })}
            </LightGallery>
          </div>

          <div className="gallery">
            {galleryImages?.map((item, index) => (
              <RememberedMedia
                ownerName={ownerName}
                idRemembered={idRemembered}
                onClickImage={() => handleImageClick(index)}
                item={item}
                key={item?.id}
                isOwner={isOwner}
              />
            ))}
          </div>
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
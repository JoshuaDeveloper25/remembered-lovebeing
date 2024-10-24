const AvailablePhotoGallery = ({
  selectedGalleryImageInfo,
  setSelectedGalleryImageInfo,
  item,
}) => {
  const active = selectedGalleryImageInfo.find(
    (image) => image?.id === item?.id
  );

  const handleSelectedImage = () => {
    const infoImageGallery = {
      id: item?.id,
      domain: item?.cloud_front_domain,
      awsFile: item?.aws_file_name,
    };

    if (active) {
      setSelectedGalleryImageInfo((prev) =>
        prev.filter((image) => image.id !== item?.id)
      );

      return;
    }

    // Select the image and add it to the array
    setSelectedGalleryImageInfo([
      ...selectedGalleryImageInfo,
      infoImageGallery,
    ]);
  };

  return (
    <>
      <div
        onClick={handleSelectedImage}
        className={`transition-all duration-150 ${
          active &&
          "transition-all duration-150 outline-2 outline-dotted rounded-md p-1.5 bg-gray-200"
        }`}
      >
        <img
          src={`${item?.cloud_front_domain}/${item?.aws_file_name}`}
          className="h-36 w-36 object-cover rounded-md hover:opacity-80 animation-fade cursor-pointer"
          decoding="async"
          loading="lazy"
        />
      </div>
    </>
  );
};

export default AvailablePhotoGallery;

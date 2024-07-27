import { useState } from "react";

const AvailablePhotoGallery = ({
  selectedGalleryImageInfo,
  setSelectedGalleryImageInfo,
  item,
}) => {
  const [selected, setSelected] = useState(false);

  const handleSelectedImage = () => {
    const infoImageGallery = {
      id: item?.id,
      domain: item?.cloud_front_domain,
      awsFile: item?.aws_file_name,
    };

    if (selected) {
      // Unselect the image and remove it from array
      const newSelectedGalleryImageInfo = selectedGalleryImageInfo.filter(
        (image) => image.id !== item.id
      );
      setSelectedGalleryImageInfo(newSelectedGalleryImageInfo);
    } else {
      // Select the image and add it to the array
      setSelectedGalleryImageInfo([
        ...selectedGalleryImageInfo,
        infoImageGallery,
      ]);
    }
    
    setSelected(!selected);
  };

  return (
    <div
      onClick={handleSelectedImage}
      className={`transition-all duration-150 ${
        selected &&
        "transition-all duration-150  outline-2 outline-dotted outline-offset-4 rounded-md p-1"
      }`}
    >
      <img
        src={`${item?.cloud_front_domain}/${item?.aws_file_name}`}
        className="h-36 w-36 object-cover rounded-md"
        decoding="async"
        loading="lazy"
      />
    </div>
  );
};

export default AvailablePhotoGallery;

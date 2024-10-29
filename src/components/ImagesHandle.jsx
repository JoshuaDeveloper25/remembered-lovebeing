import { uploadResizedImage } from "../utils/resizeImageFile";
import { IoCloudUploadSharp } from "react-icons/io5";
import { LuFileInput, LuPencilLine } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import ReactImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import React from "react";

const ImagesHandle = ({ setImages, images }) => {
  const onChange = async (imageList, addUpdateIndex) => {
    // Redimention images before the state function
    const resizedImageList = await Promise.all(
      imageList.map(async (image) => {
        const resizedFile = await uploadResizedImage(image.file, 700, 700, 85);
        const reader = new FileReader();

        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve({
              dataURL: reader.result,
              file: resizedFile,
            });
          };
          reader.readAsDataURL(resizedFile);
        });
      })
    );

    setImages(resizedImageList);
  };

  return (
    <ReactImageUploading
      acceptType={["jpg", "jpeg", "png"]}
      multiple={true}
      onChange={onChange}
      value={images}
    >
      {({
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <div className="upload__image-wrapper">
          <div className="mb-5">
            <div className="mb-6">
              <h3 className="font-semibold">Upload a file</h3>
              <p className="text-muted-color">Attach the file below</p>
            </div>
            <button
              {...dragProps}
              type="button"
              onClick={onImageUpload}
              className={`${
                isDragging
                  ? "border-primary-color-light animation-fade"
                  : "hover:border-primary-color-light animation-fade"
              } w-full bg-white text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto`}
            >
              <LuFileInput className="text-primary-color-light size-9 mx-auto" />
              {isDragging ? (
                <span className="font-semibold mt-4 uppercase">
                  Drop it here!
                </span>
              ) : (
                <>
                  <span className="font-semibold mt-2">
                    Drag file(s) here to upload
                  </span>
                  <span className="text-muted-color my-1">
                    Alternatively, you can select a file by
                  </span>
                  <span className="font-bold text-primary-color-light">
                    clicking here
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Images uploaded by user */}
          {images?.length !== 0 && (
            <ul className="flex gap-5 overflow-x-auto w-full max-w-lg my-5 py-5">
              {images?.map((item, idx) => (
                <li key={idx} className="h-32 min-w-32 relative">
                  <div className="h-32 min-w-32 relative">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={`${item?.dataURL}`}
                      alt="Image"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="image-item__btn-wrapper absolute flex gap-2 -right-3 -top-3">
                    <button
                      className="bg-blue-500/85 hover:bg-blue-500/90 hover:text-secondary rounded-full text-white p-1"
                      type="button"
                      onClick={() => onImageUpdate(idx)}
                    >
                      <LuPencilLine size={20} />
                    </button>

                    <button
                      className="hover:bg-red-500/90 hover:text-secondary bg-red-500/85 rounded-full text-white p-1"
                      type="button"
                      onClick={() => onImageRemove(idx)}
                    >
                      <IoClose size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </ReactImageUploading>
  );
};

export default ImagesHandle;

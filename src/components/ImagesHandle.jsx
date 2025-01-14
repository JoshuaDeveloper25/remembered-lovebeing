import { uploadResizedImage } from "../utils/resizeImageFile";
import { LuFileInput, LuPencilLine } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import ReactImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";

const ImagesHandle = ({ setImages, images }) => {
  const [isPending, setIsPending] = useState(false);

  const onChange = async (imageList, addUpdateIndex) => {
    try {
      setIsPending(true);

      // Redimention images before the state function
      const resizedImageList = await Promise.all(
        imageList.map(async (image) => {
          const resizedFile = await uploadResizedImage(
            image.file,
            750,
            750,
            90
          );
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
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
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
        <div className="upload__image-wrapper relative w-full">
          <div className="mb-5">
            <div className="mb-6">
              <h3 className="font-semibold">
                Upload a file{" "}
                <span className="text-red-400 text-sm">(jpg, jpeg, png)*</span>
              </h3>
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
              } w-full bg-white text-base rounded  h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed`}
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
                  <span className="font-bold text-white btn btn-blue text-sm w-fit mx-auto">
                    Browse a file (s)
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Images uploaded by user */}
          {images?.length !== 0 && (
            <div className="absolute top-[284px]">
              <h2>
                Selected media:{" "}
                <span className="font-extrabold"> ({images?.length})</span>
              </h2>
            </div>
          )}

          {isPending ? (
            <ul className="flex gap-5 overflow-x-auto w-full py-5">
              {[1, 2, 3, 4]?.map((item, idx) => (
                <li key={idx} className="h-32 min-w-32 relative">
                  <div className="h-32 min-w-32 relative bg-tertiary-color/50 animate-pulse"></div>
                </li>
              ))}
            </ul>
          ) : (
            images?.length !== 0 && (
              <ul className="flex gap-5 overflow-x-auto w-full pt-5 pb-1 rounded-md scrollbar">
                {images?.map((item, idx) => (
                  <li
                    key={idx}
                    className="h-[128px] w-[128px] min-w-[128px] relative rounded-md"
                  >
                    <div className="h-[128px] w-[128px] min-w-[128px] relative shadow-xl rounded-md">
                      <img
                        loading="lazy"
                        decoding="async"
                        src={`${item?.dataURL}`}
                        alt="Image"
                        className="h-full w-full object-cover rounded-md"
                      />
                    </div>

                    <div className="image-item__btn-wrapper  absolute flex gap-2 -right-3 -top-3">
                      <button
                        className="bg-primary-color-light/85 hover:bg-primary-color-light/90 hover:opacity-80 rounded-full text-white p-1"
                        type="button"
                        onClick={() => onImageUpdate(idx)}
                      >
                        <LuPencilLine size={20} />
                      </button>

                      <button
                        className="hover:bg-red-500/90 bg-red-500/85 hover:opacity-80 rounded-full text-white p-1"
                        type="button"
                        onClick={() => onImageRemove(idx)}
                      >
                        <IoClose size={20} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      )}
    </ReactImageUploading>
  );
};

export default ImagesHandle;

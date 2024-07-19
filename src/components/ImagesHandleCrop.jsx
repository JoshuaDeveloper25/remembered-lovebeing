import { uploadResizedImage } from "../utils/resizeImageFile";
import ButtonForm from "./ButtonForm";
import { useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";

const ImagesHandleCrop = ({
  imgRef,
  isPending,
  previewCanvasRef,
  setCrop,
  crop,
  circle,
}) => {
  const [imgSrc, setImgSrc] = useState();
  const [error, setError] = useState("");

  const MIN_DIMENSION = circle ? 200 : 250;
  const ASPECT_RATIO = circle ? 1 : 10 / 3.5;

  const onSelectFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const resizedFile = await uploadResizedImage(file, 700, 700, 85);

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageUrl = reader.result?.toString() || "";
        const imageElement = new Image();
        imageElement.src = imageUrl;

        imageElement.addEventListener("load", () => {
          // const { naturalWidth, naturalHeight } = imageElement;

          // if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          //   setError("Image must be at least 150 x 150 pixels.");
          //   return setImgSrc("");
          // }

          setImgSrc(imageUrl);
          setError("");
        });
      });
      
      reader.readAsDataURL(resizedFile); // make sure that resizedFile is a Blob or File type.
      // reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error resizing image:", error);
    }
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );

    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <div>
      <label className="block mb-3 w-fit">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          name="uploadImages"
          accept="png, jpeg"
          onChange={onSelectFile}
          className="block w-full text-sm text-tertiary-color file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-black file:text-white hover:file:text-tertiary-color hover:file:bg-black/90"
        />
      </label>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      {imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop={circle ? true : false}
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
            keepSelection
            crop={crop}
          >
            <img
              loading="lazy"
              decoding="async"
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>

          <ButtonForm
            isPending={isPending}
            statusOff={"Save Changes"}
            statusOn={"Saving Changes..."}
          />
        </div>
      )}

      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </div>
  );
};

export default ImagesHandleCrop;
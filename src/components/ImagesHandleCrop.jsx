import { FaFolderOpen } from "react-icons/fa";
import { uploadResizedImage } from "../utils/resizeImageFile";
import ButtonForm from "./ButtonForm";
import { useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import { LuFileInput } from "react-icons/lu";

const ImagesHandleCrop = ({
  imgRef,
  isPending,
  previewCanvasRef,
  setCrop,
  crop,
  circle,
  onCancel
}) => {
  const [imgSrc, setImgSrc] = useState();
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const MIN_DIMENSION = circle ? 125 : 250;
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
          setImgSrc(imageUrl);
          setError("");
        });
      });

      reader.readAsDataURL(resizedFile);
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

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Handle the file (you can call onSelectFile here)
      onSelectFile({ target: { files: [file] } });
    }
  };

  return (
    <div>
      {imgRef?.current ? null : (
        <>
          <div className="mb-6">
            <h3 className="font-semibold">Upload a file</h3>
            <p className="text-muted-color">Attach the file below</p>
          </div>

          <label
            className={`relative block mb-3 cursor-pointer text-center border-2 border-dashed rounded-sm py-10 px-1 ${
              dragging
                ? "border-primary-color-light"
                : "hover:border-primary-color-light"
            } ${dragging ? "animation-fade" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <span className="sr-only">Choose photo</span>
            <LuFileInput className="text-primary-color-light size-9 mx-auto" />
            <h3 className="font-semibold mt-2">Drag file(s) here to upload</h3>
            <p className="text-muted-color my-1">
              Alternatively, you can select a file by
            </p>
            <p className="font-bold text-primary-color-light">clicking here</p>

            <input
              type="file"
              name="uploadImages"
              accept="image/png, image/jpeg"
              onChange={onSelectFile}
              className="sr-only block w-full text-sm text-tertiary-color file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-black file:text-white hover:file:text-tertiary-color hover:file:bg-black/90"
            />
          </label>
        </>
      )}

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
        </div>
      )}

      <div className="flex justify-end items-center gap-3 mt-4">
        <button className="btn border-2 w-auto" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button
          className={`btn btn-blue w-auto`}
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <>
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-5 h-5 text-tertiary-color animate-spin dark:text-tertiary-color fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>{" "}
                {"Uploading Files..."}
                <span className="sr-only">{"Uploading Files..."}</span>
              </div>
            </>
          ) : (
            "Upload File"
          )}
        </button>
      </div>

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

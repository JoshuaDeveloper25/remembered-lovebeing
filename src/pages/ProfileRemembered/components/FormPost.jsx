import AvailablePhotoGallery from "./AvailablePhotoGallery";
import ButtonForm from "../../../components/ButtonForm";
import Modal from "../../../components/Modal";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";

const FormPost = ({
  error,
  setOpenModalCreatePost,
  galleryImages,
  tempSelectedGalleryImageInfo,
  setTempSelectedGalleryImageInfo,
  createPostMutation,
}) => {
  const [selectedGalleryImageInfo, setSelectedGalleryImageInfo] = useState([]);
  const [openAvailableGalleryImages, setOpenAvailableGalleryImages] =
    useState(false);
  const params = useParams();

  const handleSelectedImagesGallery = () => {
    setSelectedGalleryImageInfo(tempSelectedGalleryImageInfo);
    setOpenAvailableGalleryImages(false);
  };

  const handleOpenModal = () => {
    setTempSelectedGalleryImageInfo(selectedGalleryImageInfo);
    setOpenAvailableGalleryImages(true);
  };

  return (
    <>
      <div className="p-4">
        <label htmlFor="content">
          <span className="w-full inline-block text-start">Content</span>
          <textarea
            className=" form-input h-24"
            placeholder={"Description of the post."}
            id="content"
            name="content"
            required={true}
          ></textarea>
        </label>

        <button
          type="button"
          onClick={handleOpenModal}
          className="flex items-center mt-5 text-primary-color group"
        >
          <span className="flex justify-center items-center bg-gray-200 rounded-full  h-12 w-12">
            {" "}
            <BiImageAdd className="rounded-full inline-block" size={26} />{" "}
          </span>
          <span className="group-hover:bg-gray-200 group-hover:text-tertiary-color group-hover:font-medium animation-fade rounded py-2 -ms-3.5 px-4">
            Add photos from your gallery
          </span>
        </button>

        {/* Photos available from gallery modal */}
        <Modal
          editableWidth={"max-w-xl"}
          titleModal={"Photos from Gallery"}
          setOpenModal={setOpenAvailableGalleryImages}
          openModal={openAvailableGalleryImages}
          modalForm={false}
        >
          {!galleryImages?.length ? (
            <h2 className="text-center text-lg bg-red-400 text-white font-medium rounded py-1.5 px-1 animate-pulse">
              Please, upload/add a photo from Media tab!
            </h2>
          ) : (
            <>
              <h2 className="text-center text-base mb-3 bg-primary-color-light text-white font-medium rounded py-1.5 px-1 w-fit">
                Selected Media{" "}
                <span className="font-bold">
                  ({tempSelectedGalleryImageInfo?.length})
                </span>
              </h2>

              <div className="grid border rounded py-3 min-[300px]:grid-cols-2 min-[450px]:grid-cols-3 grid-cols-1 place-items-center place-content-centers justify-center items-center gap-4">
                {galleryImages?.map((item) => {
                  return (
                    <AvailablePhotoGallery
                      setSelectedGalleryImageInfo={
                        setTempSelectedGalleryImageInfo
                      }
                      selectedGalleryImageInfo={tempSelectedGalleryImageInfo}
                      item={item}
                      key={item?.id}
                    />
                  );
                })}
              </div>
            </>
          )}

          <button
            className={`disabled:bg-primary-color/40 disabled:pointer-events-none btn btn-blue mt-4`}
            disabled={!galleryImages?.length}
            onClick={handleSelectedImagesGallery}
            type="button"
          >
            Done
          </button>
        </Modal>

        <ul
          className={`${
            selectedGalleryImageInfo.length > 0
              ? "flex gap-5 overflow-x-auto w-full max-w-lg my-5 py-5 border rounded px-5"
              : ""
          } `}
        >
          {selectedGalleryImageInfo?.map((item) => (
            <li key={item?.id} className="h-32 min-w-32 relative">
              <div className="h-32 min-w-32 relative shadow-2xl">
                <img
                  loading="lazy"
                  decoding="async"
                  src={`${item?.domain}/${item?.awsFile}`}
                  alt="Image"
                  className="h-full w-full object-cover rounded "
                />
              </div>
            </li>
          ))}
        </ul>

        {error.length > 0 ? (
          <h2 className="mt-3 text-center border border-red-500 text-red-500 rounded px-3 py-2 font-medium animate-pulse">
            {error}
          </h2>
        ) : null}
      </div>

      <ButtonForm
        setClearCache={setTempSelectedGalleryImageInfo}
        setOpenModal={setOpenModalCreatePost}
        isPending={createPostMutation?.isPending}
        statusOn={"Creating..."}
        statusOff={"Create"}
      />
    </>
  );
};

export default FormPost;

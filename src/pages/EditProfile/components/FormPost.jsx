import AvailablePhotoGallery from "./AvailablePhotoGallery";
import ButtonForm from "../../../components/ButtonForm";
import { FcStackOfPhotos } from "react-icons/fc";
import Modal from "../../../components/Modal";
import { useParams } from "react-router-dom";
import { useState } from "react";

const FormPost = ({
  tempSelectedGalleryImageInfo,
  setTempSelectedGalleryImageInfo,
  createPostMutation,
  rememberedProfiles,
}) => {
  const [selectedGalleryImageInfo, setSelectedGalleryImageInfo] = useState([]);
  const [openAvailableGalleryImages, setOpenAvailableGalleryImages] =
    useState(false);
  const params = useParams();

  const galleryImagesProfile = rememberedProfiles?.data
    ?.map((item) => item)
    ?.filter((item) => item?.id === +params?.id)[0]?.gallery_images;

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
      <label htmlFor="content">
        <span className="w-full inline-block text-start">Content</span>
        <textarea
          className="form-input-focus form-input-normal h-24"
          placeholder={"Description of the post."}
          id="content"
          name="content"
        ></textarea>
      </label>

      <button
        type="button"
        onClick={handleOpenModal}
        className="flex items-center mt-5 text-primary-color"
      >
        <FcStackOfPhotos className="inline-block me-1" size={34} /> Photos
      </button>

      {/* Photos available from gallery modal */}
      <Modal
        editableWidth={"max-w-xl"}
        titleModal={"Photos from Gallery"}
        setOpenModal={setOpenAvailableGalleryImages}
        openModal={openAvailableGalleryImages}
        modalForm={false}
      >
        <div className="grid min-[300px]:grid-cols-2 min-[450px]:grid-cols-3 grid-cols-1 place-items-center place-content-centers justify-center items-center gap-4">
          {galleryImagesProfile?.map((item) => (
            <AvailablePhotoGallery
              setSelectedGalleryImageInfo={setTempSelectedGalleryImageInfo}
              selectedGalleryImageInfo={tempSelectedGalleryImageInfo}
              item={item}
              key={item?.id}
            />
          ))}
        </div>

        <button
          className="btn btn-blue mt-4"
          disabled={rememberedProfiles?.isPending}
          onClick={handleSelectedImagesGallery}
          type="button"
        >
          {rememberedProfiles?.isPending ? (
            <>
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-800 fill-white"
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
                Loading...
                <span className="sr-only">Loading...</span>
              </div>
            </>
          ) : (
            "Done"
          )}
        </button>
      </Modal>

      <ul
        className={`${
          selectedGalleryImageInfo.length > 0
            ? "flex gap-5 overflow-x-auto w-full max-w-lg my-5 py-5"
            : ""
        } `}
      >
        {selectedGalleryImageInfo?.map((item) => (
          <li key={item?.id} className="h-32 min-w-32 relative">
            <div className="h-32 min-w-32 relative">
              <img
                loading="lazy"
                decoding="async"
                src={`${item?.domain}/${item?.awsFile}`}
                alt="Image"
                className="h-full w-full object-cover"
              />
            </div>
          </li>
        ))}
      </ul>

      <ButtonForm
        isPending={createPostMutation?.isPending}
        statusOn={"Creating..."}
        statusOff={"Create"}
      />
    </>
  );
};

export default FormPost;

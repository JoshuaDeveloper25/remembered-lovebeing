import ImagesHandle from "../../../components/ImagesHandle";
import ButtonForm from "../../../components/ButtonForm";

const FormGalleryImages = ({
  setOpenModalGallery,
  isPending,
  setImages,
  images,
}) => {
  return (
    <>
      <div className="p-4">
        <ImagesHandle setImages={setImages} images={images} />
      </div>

      <div className="sticky bottom-0 z-10">
        <ButtonForm
          imagesAvailabe={true}
          images={images}
          setClearCache={setImages}
          setOpenModal={setOpenModalGallery}
          isPending={isPending}
          statusOn={"Uploading..."}
          statusOff={"Upload"}
        />
      </div>
    </>
  );
};

export default FormGalleryImages;

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

      <ButtonForm
        setOpenModal={setOpenModalGallery}
        isPending={isPending}
        statusOn={"Uploading..."}
        statusOff={"Upload"}
      />
    </>
  );
};

export default FormGalleryImages;

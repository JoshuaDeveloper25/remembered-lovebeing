import ImagesHandle from "../../../components/ImagesHandle";
import ButtonForm from "../../../components/ButtonForm";

const FormGalleryImages = ({
  setOpenModalGallery,
  isPending,
  setImages,
  images,
}) => {
  return (
    <div className="flex flex-col justify-between sm:h-full h-svh">
      {/* <div className="grid place-items-center h-full p-4 sm:mt-0 mt-16">
        <ImagesHandle setImages={setImages} images={images} />
      </div> */}

      <div className="h-full p-4 sm:mt-0 mt-16">
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
    </div>
  );
};

export default FormGalleryImages;

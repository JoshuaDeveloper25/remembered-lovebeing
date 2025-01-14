import ImagesHandle from "../../../components/ImagesHandle";

const FormGalleryImages = ({ setImages, images }) => {
  return (
    <div className="self-center w-full p-4">
      <ImagesHandle setImages={setImages} images={images} />
    </div>
  );
};

export default FormGalleryImages;

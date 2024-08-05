import ImagesHandleCrop from "../../../components/ImagesHandleCrop";

const FormUserProfile = ({
  imgRef,
  isPending,
  previewCanvasRef,
  setCrop,
  crop,
}) => {
  return (
    <ImagesHandleCrop
      imgRef={imgRef}
      isPending={isPending}
      previewCanvasRef={previewCanvasRef}
      setCrop={setCrop}
      crop={crop}
      circle={true}
    />
  );
};

export default FormUserProfile;

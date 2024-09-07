import ImagesHandleCrop from "../../../components/ImagesHandleCrop";

const FormProfile = ({
  imgRef,
  isPending,
  previewCanvasRef,
  setCrop,
  crop,
  setOpenModalProfile,
}) => {
  return (
    <ImagesHandleCrop
      imgRef={imgRef}
      isPending={isPending}
      previewCanvasRef={previewCanvasRef}
      setCrop={setCrop}
      crop={crop}
      circle={true}
      onCancel={() => setOpenModalProfile(false)}
    />
  );
};

export default FormProfile;

import ImagesHandleCrop from "../../../components/ImagesHandleCrop";

const FormUserProfile = ({
  imgRef,
  isPending,
  previewCanvasRef,
  setCrop,
  crop,
  setOpenModalProfile,
}) => {
  return (
    <ImagesHandleCrop
      setOpenModalProfile={setOpenModalProfile}
      imgRef={imgRef}
      onCancel={() => setOpenModalProfile(false)}
      isPending={isPending}
      previewCanvasRef={previewCanvasRef}
      setCrop={setCrop}
      crop={crop}
      circle={true}
    />
  );
};

export default FormUserProfile;

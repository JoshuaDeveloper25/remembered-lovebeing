import ImagesHandleCrop from "../../../components/ImagesHandleCrop";

const FormCover = ({
  previewCanvasRef,
  setOpenModalCover,
  setCrop,
  crop,
  imgRef,
  isPending,
}) => {
  return (
    <ImagesHandleCrop
      imgRef={imgRef}
      onCancel={() => setOpenModalCover(false)}
      isPending={isPending}
      previewCanvasRef={previewCanvasRef}
      setCrop={setCrop}
      crop={crop}
      circle={false}
    />
  );
};

export default FormCover;

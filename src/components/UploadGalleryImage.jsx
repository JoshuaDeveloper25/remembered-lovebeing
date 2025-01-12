import FormGalleryImages from "../pages/ProfileRemembered/components/FormGalleryImages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../utils/getFastApiErrors";
import { Link, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { MdWorkspacePremium } from "react-icons/md";

const UploadGalleryImage = ({
  imagesGallery,
  status,
  statusPlan,
  isOwner,
  idRemembered,
}) => {
  const [openModalGallery, setOpenModalGallery] = useState(false);
  const [images, setImages] = useState([]);
  const queryClient = useQueryClient();
  const params = useParams();

  // Add an image to the MEDIA tab
  const addGalleryImageMutation = useMutation({
    mutationFn: async (imageInfo) =>
      await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/remembereds/upload-gallery-image/${idRemembered}`,
        imageInfo
      ),
    onSuccess: (res) => {
      toast.success("Upload successfull!");
      queryClient.invalidateQueries(["ownProfiles"]);
      setOpenModalGallery(false);
      setImages([]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmitGalleryImage = (e) => {
    e.preventDefault();

    if (images?.length === 0) {
      return toast.error(`Upload 1 image at least!`);
    }

    const formData = new FormData();

    images.forEach((image, index) => {
      formData.append("files", image.file);
    });

    addGalleryImageMutation?.mutate(formData);
  };

  return !isOwner ? null : (
    <>
      {statusPlan === "free" && imagesGallery?.length >= 6 ? (
        <>
          <Link
            to={`/checkout/?slug=${params?.slug}`}
            style={{ marginTop: "0" }}
            className="relative premium-btn rounded-sm py-2 px-3 hover:bg-white/80 hover:text-yellow-500 animation-fade text-sm"
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span> <MdWorkspacePremium className="inline-block size-6" />{" "}
            Go Pro / <span className="font-bold">$19.99</span> Lifetime
          </Link>
        </>
      ) : (
        <button
          onClick={() => setOpenModalGallery(true)}
          className="btn btn-blue w-auto"
          type="button"
        >
          <FaPlus className="inline-block" /> Add New Photo
        </button>
      )}

      {/* Add Gallery Image Modal */}
      <Modal
        titleModal={"Add Gallery Images"}
        handleSubmit={handleSubmitGalleryImage}
        setOpenModal={setOpenModalGallery}
        // editableWidth={'max-w-xl'}
        openModal={openModalGallery}
        modalForm={true}
        iconTitle={true}
        setClearCache={setImages}
      >
        <FormGalleryImages
          setOpenModalGallery={setOpenModalGallery}
          isPending={addGalleryImageMutation?.isPending}
          setImages={setImages}
          images={images}
        />
      </Modal>
    </>
  );
};

export default UploadGalleryImage;

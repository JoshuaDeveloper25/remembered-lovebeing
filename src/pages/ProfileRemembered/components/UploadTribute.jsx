import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import AppContext from "../../../context/AppProvider";
import Modal from "../../../components/Modal";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import FormTribute from "./FormTribute";
import { toast } from "react-toastify";
import axios from "axios";

const UploadTribute = ({ idRemembered }) => {
  const { userInfo } = useContext(AppContext);
  const [openModalCreateTribute, setOpenModalCreateTribute] = useState(false);
  const queryClient = useQueryClient();
  const remember = useParams();

  const createTributeMutation = useMutation({
    mutationFn: async (info) =>
      await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/tributes/${idRemembered}?remembered_id=${idRemembered}`,
        info
      ),
    onSuccess: (res) => {
      toast.success("tribute uploaded!");
      queryClient.invalidateQueries(["profile"]);
      setOpenModalCreateTribute(false);
    },
    onError: (err) => {
      console.log(getFastApiErrors(err));
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmitTribute = (e) => {
    e.preventDefault();

    const tributeInfo = {
      content: e?.target?.content?.value,
    };

    createTributeMutation?.mutate(tributeInfo);
  };

  return !userInfo?.access_token ? null : (
    <>
      <button
        onClick={() => setOpenModalCreateTribute(true)}
        className="btn btn-blue w-auto"
        type="button"
      >
        <FaPlus className="inline-block" /> Add New Tribute
      </button>

      {/* Add Tribute Modal */}
      <Modal
        titleModal={"Add Tribute"}
        handleSubmit={handleSubmitTribute}
        setOpenModal={setOpenModalCreateTribute}
        openModal={openModalCreateTribute}
        modalForm={true}
      >
        <FormTribute createTributeMutation={createTributeMutation} />
      </Modal>
    </>
  );
};

export default UploadTribute;

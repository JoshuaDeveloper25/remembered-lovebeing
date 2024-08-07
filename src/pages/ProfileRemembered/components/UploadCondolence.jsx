import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import AppContext from "../../../context/AppProvider";
import Modal from "../../../components/Modal";
import FormCondolence from "./FormCondolence";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const UploadCondolence = ({ isOwner }) => {
  const { userInfo } = useContext(AppContext);

  const [openModalCreateCondolence, setOpenModalCreateCondolence] =
    useState(false);
  const queryClient = useQueryClient();
  const remember = useParams();

  const createCondolenceMutation = useMutation({
    mutationFn: async (info) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/condolences/${remember?.id}`,
        info
      ),
    onSuccess: (res) => {
      toast.success("Condolence uploaded!");
      queryClient.invalidateQueries(["profile"]);
      setOpenModalCreateCondolence(false);
    },
    onError: (err) => {
      console.log(getFastApiErrors(err));
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmitCondolence = (e) => {
    e.preventDefault();

    const condolenceInfo = {
      content: e?.target?.content?.value,
    };

    createCondolenceMutation?.mutate(condolenceInfo);
  };

  return isOwner || !userInfo?.access_token ? null : (
    <>
      <button
        onClick={() => setOpenModalCreateCondolence(true)}
        className="btn btn-blue w-auto"
        type="button"
      >
        <FaPlus className="inline-block" /> Add New Condolence
      </button>

      {/* Add Condolence Modal */}
      <Modal
        titleModal={"Add Condolence"}
        handleSubmit={handleSubmitCondolence}
        setOpenModal={setOpenModalCreateCondolence}
        openModal={openModalCreateCondolence}
        modalForm={true}
      >
        <FormCondolence createCondolenceMutation={createCondolenceMutation} />
      </Modal>
    </>
  );
};

export default UploadCondolence;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import AlertUserExample from "../../../components/AlertUserExample";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import AppContext from "../../../context/AppProvider";
import { useTranslation } from "react-i18next";
import Modal from "../../../components/Modal";
import FormCondolence from "./FormCondolence";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const UploadCondolence = ({ isAlbertEinstein, isOwner, idRemembered }) => {
  const { userInfo } = useContext(AppContext);
  const { t } = useTranslation();

  const [openModalCreateCondolence, setOpenModalCreateCondolence] =
    useState(false);
  const queryClient = useQueryClient();
  const remember = useParams();

  const createCondolenceMutation = useMutation({
    mutationFn: async (info) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/condolences/${idRemembered}`,
        info
      ),
    onSuccess: (res) => {
      toast.success(t("Condolence uploaded!"));
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

    if (!condolenceInfo?.content?.trim(" "))
      return toast.error(`Fill up the blank!`);

    createCondolenceMutation?.mutate(condolenceInfo);
  };

  return isOwner || !userInfo?.access_token ? null : (
    <>
      {isAlbertEinstein && !isOwner ? (
        <AlertUserExample toolTipId={"addNewCondolence"}>
          <button
            className="btn btn-blue w-auto pointer-events-none"
            type="button"
          >
            <FaPlus className="inline-block" /> {t("Add New Condolence")}
          </button>
        </AlertUserExample>
      ) : (
        <>
          <button
            onClick={() => setOpenModalCreateCondolence(true)}
            className="btn btn-blue w-auto"
            type="button"
          >
            <FaPlus className="inline-block" /> {t("Add New Condolence")}
          </button>

          {/* Add Condolence Modal */}
          <Modal
            titleModal={t("Add Condolence")}
            handleSubmit={handleSubmitCondolence}
            setOpenModal={setOpenModalCreateCondolence}
            openModal={openModalCreateCondolence}
            modalForm={true}
          >
            <FormCondolence
              setOpenModalCreateCondolence={setOpenModalCreateCondolence}
              createCondolenceMutation={createCondolenceMutation}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default UploadCondolence;

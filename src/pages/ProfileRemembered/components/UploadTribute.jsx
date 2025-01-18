import AlertUserExample from "../../../components/AlertUserExample";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import AppContext from "../../../context/AppProvider";
import { useTranslation } from "react-i18next";
import Modal from "../../../components/Modal";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import FormTribute from "./FormTribute";
import { toast } from "react-toastify";
import axios from "axios";

const UploadTribute = ({ isAlbertEinstein, idRemembered, isOwner }) => {
  const { t } = useTranslation();
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
      toast.success(t("Tribute uploaded!"));
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

    if (!tributeInfo?.content?.trim(" "))
      return toast.error("Fill up the blanks available!");

    createTributeMutation?.mutate(tributeInfo);
  };

  return !userInfo?.access_token ? null : (
    <>
      {isAlbertEinstein && !isOwner ? (
        <AlertUserExample toolTipId={"addNewTribute"}>
          <button
            className="btn btn-blue w-auto pointer-events-none"
            type="button"
          >
            <FaPlus className="inline-block" /> {t("Add New Tribute")}
          </button>
        </AlertUserExample>
      ) : (
        <>
          <button
            onClick={() => setOpenModalCreateTribute(true)}
            className="btn btn-blue w-auto"
            type="button"
          >
            <FaPlus className="inline-block" /> {t("Add New Tribute")}
          </button>

          {/* Add Tribute Modal */}
          <Modal
            titleModal={t("Add Tribute")}
            handleSubmit={handleSubmitTribute}
            setOpenModal={setOpenModalCreateTribute}
            openModal={openModalCreateTribute}
            modalForm={true}
          >
            <FormTribute
              setOpenModalCreateTribute={setOpenModalCreateTribute}
              createTributeMutation={createTributeMutation}
              t={t}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default UploadTribute;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import base64ToFile from "../../../utils/base64ToFile";
import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { FaPlus } from "react-icons/fa6";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const QRCodeGenerate = ({ idRemembered }) => {
  const [generatedCode, setGeneratedCode] = useState("");
  const queryClient = useQueryClient();
  const location = useLocation();
  const canvasRef = useRef(null);

  // This for sending the qr code File object to server
  const uploadQrImageMutation = useMutation({
    mutationFn: async (qrInfo) =>
      await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/remembereds/upload-qr-image/${idRemembered}`,
        qrInfo
      ),
    onSuccess: (res) => {
      toast.success("QR successfully created!");
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleGenerateQRCode = () => {
    setGeneratedCode(`${location?.pathname}`);

    setTimeout(() => {
      const canvas = canvasRef.current.querySelector("canvas");
      const dataURL = canvas.toDataURL("image/png");

      const fileName = `QRCode_${new Date().getTime()}.png`;
      const qrFile = base64ToFile(dataURL, fileName, "image/png");
      const formData = new FormData();

      console.log(qrFile);

      formData.append("file", qrFile);
      uploadQrImageMutation?.mutate(formData);
    }, 100);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-7 bg-white shadow-lg rounded-lg p-3">
        <h2 className="text-primary-color font-bold text-xl sm:my-0 my-3">
          QR Code
        </h2>

        <button
          onClick={handleGenerateQRCode}
          className={`btn btn-blue w-auto`}
          type="button"
        >
          <FaPlus className="inline-block" /> Generate QR Code
        </button>
      </div>

      {generatedCode && (
        <div ref={canvasRef}>
          <QRCodeCanvas value={`http://192.168.100.26:5173${generatedCode}`} />
        </div>
      )}
    </>
  );
};

export default QRCodeGenerate;

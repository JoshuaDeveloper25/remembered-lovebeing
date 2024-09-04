import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import base64ToFile from "../../../utils/base64ToFile";
import { Link, useLocation, useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { FaPlus } from "react-icons/fa6";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { MdWorkspacePremium } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";

const QRCodeGenerate = ({ isOwner, statusPlan, qrImages, idRemembered }) => {
  const [generatedCode, setGeneratedCode] = useState("");
  const queryClient = useQueryClient();
  const location = useLocation();
  const canvasRef = useRef(null);
  const params = useParams();

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

      formData.append("file", qrFile);
      uploadQrImageMutation?.mutate(formData);
    }, 50);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-7 bg-white shadow-lg rounded-lg p-3">
        <h2 className="text-primary-color font-bold text-xl sm:my-0 my-3">
          QR Code
        </h2>

        {statusPlan === "free" && isOwner && (
          <Link
            to={`/checkout/?slug=${params?.slug}`}
            style={{ marginTop: "0" }}
            className="relative premium-btn rounded-sm py-2 px-3 hover:bg-white/80 hover:text-yellow-500 animation-fade text-sm"
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span> <MdWorkspacePremium className="inline-block size-6" />{" "}
            Go Pro / <span className="font-bold">$22</span> Lifetime
          </Link>
        )}

        {!qrImages && statusPlan === "premium" && (
          <button
            onClick={handleGenerateQRCode}
            className={`btn btn-blue w-auto`}
            type="button"
          >
            <FaPlus className="inline-block" /> Generate QR Code
          </button>
        )}
      </div>

      {generatedCode && (
        <div ref={canvasRef} className="hidden">
          <QRCodeCanvas value={`http://192.168.100.26:5173${generatedCode}`} />
        </div>
      )}

      {qrImages ? (
        <div className="shadow-lg bg-white rounded-md py-8">
          <h2 className="text-center text-primary-color font-semibold text-2xl mb-4 font-mono tracking-tighter">
            Congrats! This is going to be your QR Code for life!
          </h2>
          <img
            loading="lazy"
            decoding="async"
            src={
              qrImages
                ? `${qrImages?.cloud_front_domain}/${qrImages?.aws_file_name}`
                : `There's no qr code yet...`
            }
            className="border-2 border-gray-100 shadow-lg mx-auto"
          />
          <div className="text-center mt-3">
            <button type="button" className="btn btn-blue w-auto text-center">
              Download
            </button>
          </div>
        </div>
      ) : statusPlan === "premium" ? (
        <div className="bg-white shadow-lg py-6 rounded-sm">
          <h2 className="text-center text-primary-color font-semibold text-2xl mb-4 font-mono tracking-tighter">
            You haven't generated a QR Code yet...
          </h2>
        </div>
      ) : (
        <div className="bg-white shadow-lg py-6 rounded-sm mt-2 mb-3 px-4">
          {isOwner && (
            <h3 className="font-semibold text-center py-2.5 shadow-lg rounded-sm text-gray-900 text-lg  bg-yellow-400 animate-pulse ">
              <IoIosWarning className="inline-block size-8 me-1.5 align-middle" />
              You have to upgrade to the premium plan to generate a QR Code!
            </h3>
          )}
        </div>
      )}
    </>
  );
};

export default QRCodeGenerate;

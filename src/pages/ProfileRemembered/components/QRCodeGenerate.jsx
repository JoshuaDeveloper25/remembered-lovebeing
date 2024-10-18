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
            disabled={uploadQrImageMutation?.isPending}
            onClick={handleGenerateQRCode}
            className={`btn btn-blue w-auto`}
            type="button"
          >
            {uploadQrImageMutation?.isPending ? (
              <>
                <div role="status" className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="inline w-5 h-5 text-tertiary-color animate-spin dark:text-tertiary-color fill-white me-1.5"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>{" "}
                  Generating QR Code...
                  <span className="sr-only">Generating QR Code...</span>
                </div>
              </>
            ) : (
              <>
                <FaPlus className="inline-block" /> Generate QR Code
              </>
            )}
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

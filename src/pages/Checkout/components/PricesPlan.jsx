import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const PricesPlan = ({ packageName }) => {
  const queryClient = useQueryClient();

  const makeProfilePackagePaymentMutation = useMutation({
    mutationFn: async (paymentInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payments/get-premium-profiles/pay/${
          packageName === "singlePackage" ? 1 : 3
        }`,
        paymentInfo
      ),
    onSuccess: (res) => {
      toast.success("Successfully payment realized!");
      queryClient.invalidateQueries({ queryKey: ["premiumProfilesRemaining"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (!e?.target?.payment_status?.value.trim())
      return toast.error("Fill up the blanks available!");

    makeProfilePackagePaymentMutation.mutate({});
  };

  return (
    <div className="flex flex-col sm:flex-row md:gap-12 gap-4 bg-white rounded-sm shadow-lg p-4">
      {packageName === "singlePackage" ? (
        <div className="min-w-[20rem] hover:scale-105 hover:shadow-2xl animation-fade border shadow-xl rounded-sm text-center py-8 px-7">
          <span className="font-semibold text-primary-color-light uppercase tracking-wider">
            Single Package
          </span>

          <div className="mt-5">
            <h2 className="font-bold text-primary-color-light text-5xl tracking-tighter">
              <span className="align-text-top text-4xl me-3">$</span>
              <span>19.99</span>
            </h2>
            <h3 className="text-primary-color-light">for life</h3>
          </div>

          <ul className="text-muted-color leading-9 my-5">
            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Unlimited images
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Unlimited posts
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Generate QR Code
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Number of Profiles (1)
            </li>
          </ul>
        </div>
      ) : (
        <div className="min-w-[20rem] hover:scale-105 hover:shadow-2xl animation-fade border shadow-xl rounded-sm text-center py-8 px-7">
          <span className="font-semibold text-primary-color-light uppercase tracking-wider">
            Tertiary Package
          </span>
          <div className="mt-5">
            <h2 className="font-bold text-primary-color-light text-5xl tracking-tighter">
              <span className="align-text-top text-4xl me-3">$</span>
              <span>59.99</span>
            </h2>
            <h3 className="text-primary-color-light">for life</h3>
          </div>
          <ul className="text-muted-color leading-9 my-5">
            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Unlimited images
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Unlimited posts
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Generate QR Code
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Number of Profiles (3)
            </li>
          </ul>
        </div>
      )}

      <div className="flex-[30%] px-4 py-8">
        <div>
          <h2 className="font-mono tracking-wider text-4xl text-primary-color uppercase font-semibold">
            Complete your order
          </h2>
          <div className="bg-yellow-500 h-2 w-24 my-3"></div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <div>
            <input
              type="text"
              placeholder="Address Line"
              name="payment_status"
              className="animation-fade px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary-color-light"
            />
          </div>

          <div className="flex gap-4 flex-col sm:flex-row mt-8">
            <button
              type="submit"
              className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-primary-color-light hover:bg-primary-color-light/50 animation-fade font-semibold text-white"
            >
              Complete Purchase
            </button>

            <Link to="/">
              <button
                type="button"
                className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-red-200 border border-red-400 text-red-500 max-md:order-1 animation-fade font-semibold"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PricesPlan;

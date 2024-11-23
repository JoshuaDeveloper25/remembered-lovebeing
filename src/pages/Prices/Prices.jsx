import AppContext from "../../context/AppProvider";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GoStop } from "react-icons/go";

const Prices = () => {
  const { userInfo } = useContext(AppContext);

  return (
    <section className="container-page px-3 py-16">
      <div className="text-center">
        <h2 className="font-mono tracking-wider text-4xl text-primary-color uppercase font-semibold">
          Pricing Plans
        </h2>
        <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
        <p className="text-xl max-w-xl mx-auto  text-muted-color">
          Explore our flexible pricing options and find the plan that best suits
          your needs and budget.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 mt-16">
        <div className="min-w-[20rem] hover:scale-105 hover:shadow-2xl animation-fade border shadow-xl rounded-sm text-center py-11 px-7">
          <span className="font-semibold text-primary-color-light uppercase tracking-wider">
            Free
          </span>

          <div className="mt-5">
            <h2 className="font-bold text-primary-color-light text-5xl tracking-tighter">
              <span className="align-text-top text-4xl me-3">$</span>
              <span>0.00</span>
            </h2>
            <h3 className="text-primary-color-light">for life</h3>
          </div>

          <ul className="text-muted-color leading-9 my-5">
            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Tributes
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Condolences
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <GoStop className="text-yellow-500 size-5 font-bold inline-block" />
              Up to 6 images
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <IoCloseSharp className="text-red-500 size-[1.3rem] font-bold inline-block" />
              No posts
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <IoCloseSharp className="text-red-500 size-[1.3rem] font-bold inline-block" />
              Generate QR Code
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <IoCloseSharp className="text-red-500 size-[1.3rem] font-bold inline-block" />
              Number of Profiles (0)
            </li>
          </ul>
          <Link
            to={
              userInfo?.access_token
                ? "/my-profiles/"
                : "/sign-in?redirect=/my-profiles/"
            }
          >
            <button
              className="btn hover:bg-primary-color-light hover:text-white animation-fade border w-auto rounded-full"
              type="button"
            >
              Select Plan
            </button>
          </Link>
        </div>

        <div className="min-w-[20rem] hover:scale-105 hover:shadow-2xl animation-fade border shadow-xl rounded-sm text-center py-11 px-7 relative">
          <div className="absolute top-5 -left-8">
            <h3 className="bg-red-500 shadow-lg rounded-sm text-white font-semibold tracking-wider font-mono uppercase -rotate-45 px-2">
              MOST POPULAR!
            </h3>
          </div>

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
              Tributes
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Condolences
            </li>

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

          <Link to={`/checkout/?packageName=singlePackage`}>
            <button
              className="btn bg-primary-color-light text-white hover:bg-primary-color-light/55 animation-fade border w-auto rounded-full"
              type="button"
            >
              Select Plan
            </button>
          </Link>
        </div>

        <div className="min-w-[20rem] hover:scale-105 hover:shadow-2xl animation-fade border shadow-xl rounded-sm text-center py-11 px-7">
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
              Tributes
            </li>

            <li className="flex items-center gap-3 border-b py-1">
              <FaCheck className="text-green-500 size-5 font-bold inline-block" />
              Condolences
            </li>

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
          <Link to={`/checkout/?packageName=tertiaryPackage`}>
            <button
              className="btn hover:bg-primary-color-light hover:text-white animation-fade border w-auto rounded-full"
              type="button"
            >
              Select Plan
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Prices;

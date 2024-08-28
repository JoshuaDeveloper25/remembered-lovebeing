import { Link } from "react-router-dom";
import modernDesignPrev from "../../../assets/modern-design.png";

const ModernDesign = () => {
  return (
    <section className="px-3 py-8 ">
      <div className="container-page">
        <h1 className="text-4xl text-fourth-color uppercase font-semibold">
          We offer modern designs.
        </h1>

        <div className="flex flex-col md:flex-row items-center text-modern-color gap-3">
          <div className="flex-1">
            <img
              className="-mt-10"
              src={modernDesignPrev}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-semibold my-4">
              Modern, beautiful design
            </h2>
            <p className="max-w-sm text-xl">
              Memorial Source memorial pages are built with elegant, modern
              design that looks good on all devices.
            </p>

            <Link to={`/memorials`}>
              <button
                type="button"
                className={`btn text-[#00A2B3] animation-fade text-xl hover:bg-[#00A2B3] hover:text-white border border-[#00A2B3] rounded-sm mt-3 w-auto`}
              >
                Preview Memorials
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernDesign;

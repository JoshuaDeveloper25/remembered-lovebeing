import modernDesignPrev from "../../../assets/modern-design.png";

const ModernDesign = () => {
  return (
    <section className="px-3 py-8 bg-white">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernDesign;

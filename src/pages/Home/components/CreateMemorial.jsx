import CarouselCubeCreateMemorials from "./CarouselCubeCreateMemorials";

const CreateMemorial = () => {
  return (
    <section className="px-3 py-14 ">
      <div className="container-page">
        <div className="flex flex-col md:flex-row items-center text-modern-color gap-3">
          <div className="flex-1">
            <h4 className="font-medium uppercase tracking-widest px-2 text-xl border-b-2 border-yellow-500 inline">
              CREATE
            </h4>
            <h2 className="text-4xl text-fourth-color font-semibold my-4">
              Create an online memorial{" "}
              <span className="text-modern-color block font-medium text-3xl">
                Share your loved one's story
              </span>
            </h2>
            <p className="text-muted-color max-w-sm text-xl">
              Create an online memorial. Add photos, videos, messages, gifs, or
              links. Gift cards can also be attached.
            </p>
            <button
              className="btn btn-blue-light w-auto text-xl mt-4"
              type="button"
            >
              Create a Memorial
            </button>
          </div>

          <div className="flex-1">
            <CarouselCubeCreateMemorials />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateMemorial;

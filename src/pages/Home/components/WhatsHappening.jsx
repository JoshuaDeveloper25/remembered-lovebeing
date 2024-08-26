const WhatsHappening = () => {
  return (
    <section className="bg-white py-14">
      <div className="container-page">
        <div className="text-center">
          <h2 className="text-5xl font-semibold text-primary-color tracking-wider">Our Community Today</h2>
        <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
          <p className="text-xl max-w-2xl mx-auto mt-2 mb-8 text-muted-color">
            Discover the number of memorials, tributes and active posts, and how
            our community keep growing up and remembering.
          </p>
        </div>

        <div className=" bg-[#F1EFEC] shadow-lg rounded p-6">
          <div className="flex flex-wrap justify-center items-center md:gap-24 gap-14">
            <div className="text-center">
              <h3 className="font-bold text-4xl mb-2 text-primary-color">
                1,384
              </h3>
              <h5 className="border-b border-black/50 text-xl">Memorials</h5>
            </div>

            <div className="text-center">
              <h3 className="font-bold text-4xl mb-2 text-primary-color">
                1,542
              </h3>
              <h5 className="border-b border-black/50 text-xl">Tributes</h5>
            </div>

            <div className="text-center">
              <h3 className="font-bold text-4xl mb-2 text-primary-color">
                845
              </h3>
              <h5 className="border-b border-black/50 text-xl">Posts</h5>
            </div>

            <div className="text-center">
              <h3 className="font-bold text-4xl mb-2 text-primary-color">
                35,879
              </h3>
              <h5 className="border-b border-black/50 text-xl">Visitors</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsHappening;

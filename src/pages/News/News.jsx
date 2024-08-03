import { MdPostAdd } from "react-icons/md";

const News = () => {
  return (
    <section className="container-page">
      {/* --> Introduction */}
      <div className="text-center mt-9 mb-14">
        <h2 className=" text-primary-color/85 text-3xl font-bold mb-1">News</h2>
      </div>

      <div>
        <article>
        <div className="bg-secondary-color">
          <MdPostAdd className="text-white " />
        </div>
        </article>
      </div>
    </section>
  );
};

export default News;

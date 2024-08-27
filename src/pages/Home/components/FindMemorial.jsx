import { useNavigate } from "react-router-dom";
import memorialAdd from "../../../assets/memorial-add.png";
import { GoSearch } from "react-icons/go";
import { useQueryClient } from "@tanstack/react-query";

const FindMemorial = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/memorials?search=${e?.target?.memorialName?.value}`);
    queryClient.invalidateQueries({ queryKey: ["memorials"] });
  };

  return (
    <section className="px-3 py-8">
      <div className="container-page">
        <div className="flex flex-col-reverse md:flex-row-reverse items-center text-modern-color gap-8">
          <div className="flex-1 md:ms-14">
            <h2 className="text-4xl text-fourth-color font-semibold ">
              Find a Memorial{" "}
            </h2>

            <p className="max-w-sm text-base my-4">
              Find the memorial of a family member or friend. Leave memories or
              send flowers.
            </p>

            <form onSubmit={handleSubmit} className="flex">
              <div className="md:flex-[20%]">
                <input
                  className="w-full py-2 px-2 border border-tertiary-color/30 border-r-0 rounded-sm rounded-e-none outline-none"
                  type="text"
                  name="memorialName"
                />
              </div>

              <div className="flex-1">
                <button
                  className=" bg-primary-color-light px-3 rounded-r-sm text-white py-2 border border-primary-color-light"
                  type="submit"
                >
                  <GoSearch size={24} />
                </button>
              </div>
            </form>
          </div>

          <div className="flex-1 max-w-lg">
            <img
              className="w-full h-full"
              src={memorialAdd}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindMemorial;

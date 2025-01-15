import { useNavigate } from "react-router-dom";
import memorialAdd from "../../../assets/memorial-add.png";
import { GoSearch } from "react-icons/go";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const FindMemorial = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();

    const memorialInfo = {
      memorialName: e?.target?.memorialName?.value,
    };

    if (!memorialInfo?.memorialName.trim("")) {
      return toast.error("Input a name of a memorial please!");
    }

    navigate(`/memorials?search=${memorialInfo?.memorialName}`);
    queryClient.invalidateQueries({ queryKey: ["memorials"] });
  };

  return (
    <section className="px-3 sm:py-8 py-3 sm:border-none border-gray-400 border">
      <div className="container-page">
        <div className="sm:my-12 sm:block hidden">
          <h2 className="font-mono sm:tracking-wider sm:text-4xl text-3xl text-primary-color text-center uppercase font-semibold ">
            {t("Looking for a loved one? Search now!")}
          </h2>
          <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
        </div>

        <div className="flex flex-col-reverse md:flex-row-reverse items-center text-modern-color gap-8">
          <div className="flex-1 md:ms-14">
            <h2 className="sm:text-4xl text-3xl text-fourth-color font-semibold ">
              {t("Find a Memorial")}{" "}
            </h2>

            <p className="text-muted-color max-w-sm text-base my-4">
              {t(
                "Find the memorial of a family member or friend. Leave memories or comments."
              )}
            </p>

            <form onSubmit={handleSubmit} className="flex items-end">
              <div className="md:flex-[20%]">
                <label>
                  <span className="font-medium">{t("Memorial Name")}:</span>
                  <input
                    className="w-full py-2 px-2 border border-tertiary-color/30 text-muted-color border-r-0 rounded-sm rounded-e-none outline-none"
                    placeholder={`${t("Example")}: Jennifer Ramírez`}
                    name="memorialName"
                    type="text"
                  />
                </label>
              </div>

              <div className="flex-1">
                <button
                  className=" bg-primary-color-light hover:bg-primary-color-light/70 animation-fade px-3 rounded-r-sm text-white py-2 border border-primary-color-light"
                  type="submit"
                >
                  <GoSearch size={24} />
                </button>
              </div>
            </form>
          </div>

          <div className="sm:block hidden flex-1 max-w-2xl">
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

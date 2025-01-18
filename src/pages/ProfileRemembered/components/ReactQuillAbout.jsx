import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import AppContext from "../../../context/AppProvider";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import axios from "axios";

const ReactQuillAbout = ({ rememberedProfile, owner }) => {
  const gender = rememberedProfile?.remembered_profile?.gender;
  const lastName = rememberedProfile?.remembered_profile?.last_name;
  const firstName = rememberedProfile?.remembered_profile?.first_name;

  const { languageSelected } = useContext(AppContext);
  const { t } = useTranslation();
  const [value, setValue] = useState(
    !rememberedProfile?.remembered_profile?.remembered_history?.content
      ? languageSelected === "es"
        ? `${`Este sitio conmemorativo fue creado en memoria de nuestro ser querid${
            gender === "male" ? "o" : "a"
          },`} ${firstName} ${lastName}. L${
            gender === "male" ? "o" : "a"
          } recordaremos por siempre.`
        : `${t(
            "This memorial website was created in memory of our loved one,"
          )} ${firstName} ${lastName}. We will remember ${
            gender === "male" ? "him" : "her"
          } forever.`
      : rememberedProfile?.remembered_profile?.remembered_history?.content
  );

  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const options = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const editHistoryMutation = useMutation({
    mutationFn: async (historyInfo) =>
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/about/update-remembered-history/${
          rememberedProfile?.remembered_profile?.id
        }/${rememberedProfile?.remembered_profile?.remembered_history?.id}`,
        historyInfo
      ),
    onSuccess: (res) => {
      toast.success(t("History edited successfully!"));
      queryClient.invalidateQueries(["profile"]);
      setIsEditing(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmitHistory = () => {
    // Eliminar etiquetas HTML vacías
    const cleanedValue = value.replace(/<[^>]+>/g, "").trim();

    const historyInfo = {
      content: cleanedValue,
    };

    // Form validation
    if (!historyInfo?.content)
      return toast.error(`Fill up the blank available!`);

    editHistoryMutation.mutate(historyInfo);
  };

  return (
    <section className="my-8 mt-4 ">
      <div
        className={`react-quill-container ${isEditing ? "editing" : "viewing"}`}
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          readOnly={!isEditing}
          modules={options}
          className="react-quill-editor"
        />
      </div>

      {owner && (
        <div className=" mt-2">
          {isEditing ? (
            <button
              className="bg-secondary-color text-white px-6 py-1 font-semibold rounded-md"
              onClick={handleSubmitHistory}
              type="button"
            >
              {t("Save changes")}
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-secondary-color text-white px-4 py-1 font-medium rounded-md cursor-pointer hover:scale-105 transition-transform mt-2"
              >
                + {t("Do Changes")}
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default ReactQuillAbout;

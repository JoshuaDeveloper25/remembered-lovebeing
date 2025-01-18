import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorValidation from "../../../components/ErrorValidation";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import { useEffect, useRef, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";

const FormKnownFor = ({
  handleSubmitAddKnownFor,
  errorLength,
  isPending,
  bestKnownFor,
}) => {
  const [bestKnownInfoObject, setBestKnownInfoObject] = useState({});
  const queryClient = useQueryClient();
  const qualityRef = useRef("");
  const params = useParams();

  useEffect(() => {
    if (bestKnownInfoObject?.description) {
      qualityRef.current.value = bestKnownInfoObject.description.description;
    }
  }, [bestKnownInfoObject]);

  // Edit best known for or quality
  const editBestKnownMutation = useMutation({
    mutationFn: async (knownForInfo) =>
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/about/update-best-known-for/${
          params?.id
        }/${bestKnownInfoObject?.description?.id}`,
        knownForInfo
      ),
    onSuccess: (res) => {
      toast.success(t("Known for edited successfully!"));
      queryClient.invalidateQueries(["profile"]);
      setBestKnownInfoObject({});
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleEditBestKnownFor = (e) => {
    e.preventDefault();

    const bestKnownInfo = {
      description: e?.target?.quality?.value,
    };

    // Form validation
    if (!bestKnownInfo?.description)
      return toast.error(t(`Fill up the blanks!`));

    editBestKnownMutation.mutate(bestKnownInfo);
    e?.target?.reset();
  };

  return (
    <>
      {/* Editing Quality */}
      {bestKnownInfoObject?.description?.id ? (
        <form
          onSubmit={handleEditBestKnownFor}
          className="flex items-end gap-4"
        >
          <label className="flex-[80%]">
            <span className="font-semibold">Quality:</span>

            <input
              className="outline-none border border-muted-color/20 rounded px-2 py-1.5 block w-full"
              placeholder="Quality"
              name="quality"
              ref={qualityRef}
            />
          </label>

          <button type="submit">Edit</button>

          <button type="button" onClick={() => setBestKnownInfoObject({})}>
            Cancel
          </button>
        </form>
      ) : (
        // Creating Quality
        <form
          onSubmit={handleSubmitAddKnownFor}
          className="flex items-end gap-4"
        >
          <label className="flex-[80%]">
            <span className="font-semibold">Quality:</span>

            <input
              className="outline-none border border-muted-color/20 rounded px-2 py-1.5 block w-full"
              placeholder="Quality"
              name="quality"
            />
          </label>

          <button
            className="flex-1 btn btn-blue"
            disabled={isPending}
            type="submit"
          >
            {isPending ? (
              <>
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-5 h-5 text-tertiary-color animate-spin dark:text-tertiary-color fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>{" "}
                  {"Adding..."}
                  <span className="sr-only">{"Adding..."}</span>
                </div>
              </>
            ) : (
              "Add"
            )}
          </button>
        </form>
      )}

      {errorLength && <ErrorValidation>{errorLength}</ErrorValidation>}

      <ul className="py-5">
        {bestKnownFor?.map((knownFor) => (
          <KnownFor
            setBestKnownInfoObject={setBestKnownInfoObject}
            key={knownFor?.id}
            knownFor={knownFor}
          />
        ))}
      </ul>
    </>
  );
};

export default FormKnownFor;

const KnownFor = ({ knownFor, setBestKnownInfoObject }) => {
  const queryClient = useQueryClient();

  // Delete best known for or quality
  const deleteBestKnownMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/about/delete-best-known-for/${
          knownFor?.id
        }`
      ),
    onSuccess: (res) => {
      toast.success(t("Quality deleted successfully!"));
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleDeleteBestKnownFor = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas eliminar esta cualidad? Esta acción no se puede deshacer.",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBestKnownMutation.mutate({
          onSuccess: () => {
            // Swal.fire({
            //   title: "¡Eliminado!",
            //   text: "La cualidad ha sido eliminada correctamente.",
            //   icon: "success",
            // });
          },
          onError: () => {
            Swal.fire({
              title: "¡Error!",
              text: "Hubo un problema al intentar eliminar la cualidad.",
              icon: "error",
            });
          },
        });
      }
    });
  };

  return (
    <li className="flex items-center mb-3 gap-4">
      <p>{knownFor?.description}</p>

      <div className="flex items-center gap-3">
        <FaPencilAlt
          onClick={() => setBestKnownInfoObject({ description: knownFor })}
          className="border border-secondary-color text-secondary-color hover:bg-secondary-color hover:text-white rounded-md animation-fade size-8 p-2  cursor-pointer"
        />

        <FaTrashCan
          onClick={handleDeleteBestKnownFor}
          className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-md animation-fade size-8 p-2  cursor-pointer"
        />
      </div>
    </li>
  );
};

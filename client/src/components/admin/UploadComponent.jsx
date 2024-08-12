import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function UploadComponent() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Veuillez sélectionner un fichier à téléverser");
      return;
    }

    const toastId = toast.info("Chargement en cours...", { autoClose: false });

    setLoading(true);
    setTimeout(async () => {
      try {
        const formData = new FormData();
        formData.append("station", file);

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/station/upload`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.update(toastId, {
          render: "Le fichier a bien été téléversé",
          type: toast.TYPE.SUCCESS,
        });
      } catch (error) {
        toast.update(toastId, {
          render: "Erreur lors du téléversement du fichier",
          type: toast.TYPE.ERROR,
        });
      } finally {
        toast.dismiss(toastId);
        setLoading(false);
        toast.success("Fichier téléchargé avec succès !");
      }
    }, 25000);
  };

  const handleTruncate = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/station/truncate`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("Table station vidée avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la suppression de la table station");
    }
  };

  return (
    <div className="text-xs w-40">
      <form className="p-4 max-w flex flex-col" onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".csv"
          id="file"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="file"
          className="text-white bg-GreenComp py-1 rounded-sm hover:bg-green-400 hover:text-black hover:cursor-pointer"
        >
          Sélectionner votre fichier
        </label>
        <button
          className={`bg-GreenComp rounded-sm p-1 mt-2 ${loading ? "opacity-50 cursor-not-allowed" : ""} hover:bg-green-400 hover:text-black`}
          type="submit"
          disabled={loading}
        >
          Télécharger
        </button>
        <button
          type="button"
          onClick={handleTruncate}
          className="mt-2 p-1 rounded-sm bg-red-600 text-white hover:bg-red-700 hover:cursor-text-black"
          aria-label="Supprimer la table station"
        >
          Vider les stations
        </button>
      </form>
    </div>
  );
}

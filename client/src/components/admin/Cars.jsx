/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import { CircleX } from "lucide-react";
import { useOutletContext, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import NavbarDesktop from "../NavbarDesktop";
import LoadingComponent from "../map/LoadingComponent";

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const { currentUser } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (currentUser?.role !== "Admin") {
        navigate("/map");
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [currentUser, navigate]);

  const fetchCars = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/car`
      );
      setCars(response.data);
    } catch (error) {
      toast.error("Erreur lors de la récupération des voitures.");
    }
  };

  const deleteCar = async (carId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/car/${carId}`);
      fetchCars();
      toast.success("Voiture supprimée avec succès.");
    } catch (error) {
      toast.error("Erreur lors de la suppression de la voiture.");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleAddCar = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/car`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Voiture ajoutée avec succès!");
      reset();
      fetchCars();
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la voiture.");
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <NavbarDesktop />
      <div className="pl-80 pr-4 pt-4 min-h-screen flex items-center justify-center text-black">
        <SideBar />
        <div className="grid grid-cols-3 gap-5">
          <div className="bg-gradient-to-b from-gray-300 to-white rounded-lg">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Ajouter une voiture</h2>
              <form onSubmit={handleSubmit(handleAddCar)}>
                <div className="mb-4">
                  <label
                    htmlFor="brand"
                    className="text-sm font-medium text-gray-700"
                  >
                    Marque :{" "}
                  </label>
                  <input
                    type="text"
                    id="brand"
                    {...register("brand", {
                      required: true,
                    })}
                    className="mt-1 p-2 w-full shadow-sm sm:text-sm rounded-md text-gray-700 bg-GreenComp"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="model"
                    className="text-sm font-medium text-gray-700"
                  >
                    Modèle :{" "}
                  </label>
                  <input
                    type="text"
                    id="model"
                    {...register("model", {
                      required: true,
                    })}
                    className="mt-1 p-2 w-full shadow-sm sm:text-sm rounded-md text-gray-700 bg-GreenComp"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="socket_type"
                    className="text-sm font-medium text-gray-700"
                  >
                    Type de prise :{" "}
                  </label>
                  <input
                    type="text"
                    id="socketType"
                    {...register("socketType", {
                      required: true,
                    })}
                    className="mt-1 p-2 w-full shadow-sm sm:text-sm rounded-md text-gray-700 bg-GreenComp"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="text-sm font-medium text-gray-700"
                  >
                    Image :{" "}
                  </label>
                  <input
                    type="text"
                    aria-label="image"
                    id="image"
                    {...register("image", {
                      required: true,
                    })}
                    className="mt-1 p-2 w-full shadow-sm sm:text-sm rounded-md text-gray-700 bg-GreenComp"
                  />
                </div>
                <button
                  type="submit"
                  className="py-2 px-4 bg-GreenComp text-white rounded-lg shadow-md hover:bg-teal-800 "
                >
                  Ajouter
                </button>
              </form>
            </div>
          </div>
          {cars.map((car) => (
            <div
              key={car.car_type_id}
              className="bg-gradient-to-b from-gray-300 to-white rounded-lg"
            >
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-64 object-contain"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{car.brand}</h2>
                <p className="text-sm mb-2">{car.model}</p>
                <p className="text-sm">Type de prise : {car.socket_type} 🔌</p>
              </div>
              <button
                aria-label="Supprimer une voiture"
                type="button"
                onClick={() => deleteCar(car.car_type_id)}
                className="p-4"
              >
                <CircleX
                  color="red"
                  className="hover:bg-red-300 hover:rounded-full"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cars;

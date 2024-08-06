import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SideBar from "./SideBar";
import NavbarDesktop from "../NavbarDesktop";

function Cars() {
  const [cars, setCars] = useState([]);

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

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <>
      <NavbarDesktop />
      <div className="pl-80 pr-4 pt-4 min-h-screen flex items-center justify-center text-black">
        <SideBar />
        <div className="grid grid-cols-3 gap-5">
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cars;

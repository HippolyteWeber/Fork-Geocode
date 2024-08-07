import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import UploadComponent from "./UploadComponent";
import AnimatedNumber from "./AnimatedNumber";

export default function StatisticDisplayAdmin() {
  const [totalReservations, setTotalReservations] = useState(null);
  const [totalCars, setTotalCars] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalStations, setTotalStations] = useState(null);

  const fetchTotalReservations = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/reservation/`
      );
      setTotalReservations(data.length);
    } catch (error) {
      toast.error("Erreur lors de la récupération des réservations.");
    }
  };

  const fetchTotalCars = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/car/`
      );
      setTotalCars(data.length);
    } catch (error) {
      toast.error("Erreur lors de la récupération des voitures.");
    }
  };

  const fetchTotalUsers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/`
      );
      setTotalUsers(data.length);
    } catch (error) {
      toast.error("Erreur lors de la récupération des utilisateurs.");
    }
  };

  const fetchTotalStations = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/station/`
      );
      setTotalStations(data.length);
    } catch (error) {
      toast.error("Erreur lors de la récupération des stations.");
    }
  };

  useEffect(() => {
    fetchTotalReservations();
    fetchTotalCars();
    fetchTotalUsers();
    fetchTotalStations();
  }, []);

  return (
    <div className="flex-grow flex justify-center items-center pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {totalReservations !== null && (
          <div
            className="bg-teal-800 p-6 rounded-lg text-center flex flex-col justify-center items-center"
            style={{ width: "200px", height: "200px" }}
          >
            <span className="text-lg font-bold">Total de réservations</span>
            <p className="text-2xl mt-2">
              <AnimatedNumber value={totalReservations} />
            </p>
          </div>
        )}
        {totalCars !== null && (
          <div
            className="bg-teal-800 p-6 rounded-lg text-center flex flex-col justify-center items-center"
            style={{ width: "200px", height: "200px" }}
          >
            <span className="text-lg font-bold">Total de voitures</span>
            <p className="text-2xl mt-2">
              <AnimatedNumber value={totalCars} />
            </p>
          </div>
        )}
        {totalUsers !== null && (
          <div
            className="bg-teal-800 p-6 rounded-lg text-center flex flex-col justify-center items-center"
            style={{ width: "200px", height: "200px" }}
          >
            <span className="text-lg font-bold">Total d'utilisateurs</span>
            <p className="text-2xl mt-2">
              <AnimatedNumber value={totalUsers} />
            </p>
          </div>
        )}
        {totalStations !== null && (
          <div
            className="bg-teal-800 p-6 rounded-lg text-center flex flex-col justify-center items-center"
            style={{ width: "200px", height: "200px" }}
          >
            <span className="text-lg font-bold">Total de stations</span>
            <p className="text-2xl mt-2">
              <AnimatedNumber value={totalStations} />
            </p>
            <UploadComponent />
          </div>
        )}
      </div>
    </div>
  );
}

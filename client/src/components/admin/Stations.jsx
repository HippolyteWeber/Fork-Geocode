import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SideBar from "./SideBar";
import NavbarDesktop from "../NavbarDesktop";
import LoadingComponent from "../map/LoadingComponent";

function Stations() {
  const [stations, setStations] = useState([]);
  const [visibleStations, setVisibleStations] = useState(20);
  const { currentUser } = useOutletContext();
  const [loading, setLoading] = useState(true);
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

  const fetchStations = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/station`
      );
      setStations(response.data);
    } catch (error) {
      toast.error("Erreur lors de la récupération des stations.");
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        setVisibleStations((prevVisibleStations) => prevVisibleStations + 20);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <NavbarDesktop />
      <div className="pl-60 pr-4 pt-4 min-h-screen flex items-center justify-center ">
        <SideBar />
        <table className="table-auto w-full text-white bg-GreenComp">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Enseigne</th>
              <th className="border px-4 py-2">Opérateur</th>
              <th className="border px-4 py-2">Adresse</th>
            </tr>
          </thead>
          <tbody>
            {stations.slice(0, visibleStations).map((station) => (
              <tr key={station.station_id} className="bg-gray-100 text-black">
                <td className="border px-4 py-2">{station.station_id}</td>
                <td className="border px-4 py-2">{station.brand}</td>
                <td className="border px-4 py-2">{station.name}</td>
                <td className="border px-4 py-2">{station.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Stations;

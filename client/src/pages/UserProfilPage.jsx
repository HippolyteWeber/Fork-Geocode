import { useState, useEffect } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { SquarePen, User } from "lucide-react";

import LoadingComponent from "../components/map/LoadingComponent";
import handleLogout from "../lib/logout";
import Navbar from "../components/Navbar";
import Modal from "../components/updateUserModal";

export default function UserProfilPage() {
  const [userInfo, setUserInfo] = useState({});
  const { currentUser, setCurrentUser } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}`
      );
      setUserInfo(response.data);
    } catch (e) {
      toast.error("Utilisateur non existant", e);
    }
  };

  const updateUserData = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/update/${currentUser.user_id}`,
        {
          firstName: userInfo.first_name,
          lastName: userInfo.last_name,
          email: userInfo.email,
        }
      );
      if (response.status === 204) {
        toast.success("Vos informations ont été mises à jour");
        setShowModal(false);
      } else {
        toast.error("erreur lors de la mise à jour des informations");
      }
    } catch (e) {
      toast.error("erreur lors de la mise à jour des informations", e);
    }
  };

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/reservation/`,
          {
            params: { userId: currentUser.user_id },
          }
        );
        setReservations(
          response.data.filter(
            (reservation) => reservation.user_id === currentUser.user_id
          )
        );
      } catch (e) {
        toast.info("Réservation non existante", e);
      }
    };

    const timer = setTimeout(() => {
      setLoading(false);
      if (!currentUser) {
        navigate("/connexion");
      }
      if (currentUser.role === "Admin") {
        navigate("/admin");
      } else {
        fetchUserData(currentUser.user_id);
        fetchReservation();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentUser, navigate]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-row bg-Componentbg px-6 py-4 rounded-br-3xl w-fit">
        <User size={100} />
        <ul className="flex flex-col text-white text-sm gap-2 mt-2 ml-4 md:ml-6 md:text-base">
          <div className="absolute left-60">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-center"
              aria-label="Modifier vos informations"
            >
              <SquarePen />
            </button>
          </div>
          <li className="text-white">{userInfo?.first_name}</li>
          <li className="text-white">{userInfo?.last_name}</li>
          <li className="text-white">{userInfo?.email}</li>
        </ul>
      </div>

      <button
        type="submit"
        onClick={() => handleLogout(setCurrentUser)}
        className="ml-16 mt-4 px-4 py-2 bg-GreenComp text-white rounded-lg border-2 border-gray-500 hover:bg-green-400  hover:text-black hover:border-black"
      >
        Se déconnecter
      </button>

      <div className="flex items-center md:mt-16 md:flex-row md:justify-around md:flex flex-col pb-36">
        <div className="flex flex-col gap-4 p-8 items-center">
          <h1 className="text-white md:text-2xl">Votre véhicule :</h1>
          <div className="flex flex-col md:flex-row justify-end text-white bg-Componentbg rounded-lg p-4">
            <img src={userInfo?.image} alt="" className="w-26 h-20" />
            <div>
              <p>
                <strong>Marque</strong> : {userInfo?.brand}
              </p>
              <p>
                <strong>Model</strong> : {userInfo?.model}
              </p>
              <p>
                <strong>Type de prise</strong> : {userInfo?.socket_type}
              </p>
            </div>
            {/* */}
          </div>
          <Link
            to="/registerCar"
            className="text-white bg-GreenComp border-solid border-2 border-GreyComp rounded-full text-center w-8 h-8 hover:bg-green-400 hover:text-black hover:border-black"
          >
            +
          </Link>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-white md:text-2xl">Vos réservations :</h1>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <div
                className="flex justify-center text-white bg-Componentbg rounded-lg p-4 gap-4 items-center"
                key={reservation.reservation_id}
              >
                <div className="flex flex-col">
                  <p>
                    <strong> Date de début : </strong>
                    {new Date(reservation.start_at).toLocaleString()}
                  </p>
                  <p>
                    <strong>Date de fin : </strong>
                    {new Date(reservation.end_at).toLocaleString()}
                  </p>
                  <p>
                    <strong>Status : </strong>
                    {reservation.status}{" "}
                  </p>
                  <p>
                    <strong>Prix : </strong>
                    {reservation.price} €{" "}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">Vous n'avez pas de réservation</p>
          )}
          <Link
            to="/map"
            className="text-white bg-GreenComp border-solid border-2 border-GreyComp rounded-full text-center w-8 h-8 hover:bg-green-400 hover:text-black hover:border-black"
          >
            +
          </Link>
        </div>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={updateUserData}
        firstName={userInfo.first_name}
        lastName={userInfo.last_name}
        email={userInfo.email}
        setFirstName={(value) =>
          setUserInfo((prevState) => ({
            ...prevState,
            first_name: value,
          }))
        }
        setLastName={(value) =>
          setUserInfo((prevState) => ({
            ...prevState,
            last_name: value,
          }))
        }
        setEmail={(value) =>
          setUserInfo((prevState) => ({
            ...prevState,
            email: value,
          }))
        }
      />
    </div>
  );
}

import { useState, useEffect, useCallback } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { SquarePen, User, CircleX } from "lucide-react";

import LoadingComponent from "../components/map/LoadingComponent";
import handleLogout from "../lib/logout";
import Navbar from "../components/Navbar";
import Modal from "../components/updateUserModal";

export default function UserProfilePage() {
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
      toast.error("Utilisateur non existant");
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
      toast.error("erreur lors de la mise à jour des informations");
    }
  };

  const fetchReservation = useCallback(async () => {
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
      toast.info("Réservation non existante");
    }
  }, [currentUser?.user_id]);

  const deleteReservation = async (reservationId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/reservation/${reservationId}`
      );
      fetchReservation();
      toast.success("Réservation supprimée avec succès.");
    } catch (error) {
      toast.error("Erreur lors de la suppression de la reservation.");
    }
  };

  useEffect(() => {
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
    }, 300);

    return () => clearTimeout(timer);
  }, [currentUser, navigate, fetchReservation]);

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

      <div className="flex  md:mt-16 md:flex-row md:justify-around md:flex flex-col pb-36">
        <div className="flex flex-col gap-4 p-8 items-center">
          <h1 className="text-white md:text-2xl">Votre véhicule :</h1>
          <div className="flex flex-col md:flex-row justify-end text-white bg-Componentbg rounded-lg p-4">
            <img
              src={userInfo?.image}
              alt=""
              className="w-26 h-20 object-contain"
            />
            <ul>
              <li className="font-bold">Marque : {userInfo?.brand}</li>
              <li className="font-bold">Model : {userInfo?.model}</li>
              <li className="font-bold">
                Type de prise : {userInfo?.socket_type}
              </li>
            </ul>
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
                className="flex justify-center text-white bg-Componentbg rounded-lg p-4 gap-4 items-center max-w-64 md:max-w-96"
                key={reservation.reservation_id}
              >
                <ul className="flex flex-col">
                  <li>Nom de station :{reservation.name}</li>
                  <li>
                    Date de début :
                    {new Date(reservation.start_at).toLocaleString()}
                  </li>
                  <li>
                    Date de fin :{new Date(reservation.end_at).toLocaleString()}
                  </li>
                  <li>Status :{reservation.status} </li>
                  <li>Prix :{reservation.price} € </li>
                  <li className="pt-2">
                    <button
                      aria-label="Supprimer une réservation"
                      type="button"
                      onClick={() =>
                        deleteReservation(reservation.reservation_id)
                      }
                    >
                      <CircleX
                        color="red"
                        className="hover:bg-red-300 hover:rounded-full"
                      />
                    </button>
                  </li>
                </ul>
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

import { useState, useEffect } from "react";
import { SquareX, Trash2 } from "lucide-react";
import { useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import SideBar from "./SideBar";
import NavbarDesktop from "../NavbarDesktop";
import LoadingComponent from "../map/LoadingComponent";

function RegisteredUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (currentUser?.role !== "Admin") {
        navigate("/map");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentUser, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          withCredentials: true,
        }
      );
      setUsers(response.data);
    } catch (error) {
      toast.error("Erreur lors de la récupération des utilisateurs.");
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
        {
          withCredentials: true,
        }
      );
      fetchUsers();
      toast.success("Utilisateur supprimé avec succès.");
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <NavbarDesktop />
      <div className="pl-60 pr-4 pt-4 min-h-screen flex flex-col items-center ">
        <SideBar />
        <table className="table-auto w-full text-white bg-GreenComp mt-4">
          <thead>
            <tr>
              <th className="flex justify-center border py-2">
                <Trash2 label="icon" />
              </th>
              <th className="border px-4 py-2">Prénom</th>
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Rôle</th>
            </tr>
          </thead>
          {users && (
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id} className="bg-gray-100 text-black">
                  <td className="border px-4 py-2 text-center">
                    <button
                      aria-label="Supprimer un utilisateur"
                      type="button"
                      className="hover:bg-red-200 rounded-sm"
                      onClick={() => deleteUser(user.user_id)}
                    >
                      <SquareX color="red" />
                    </button>
                  </td>
                  <td className="border px-4 py-2">{user.first_name}</td>
                  <td className="border px-4 py-2">{user.last_name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role_id}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default RegisteredUsers;

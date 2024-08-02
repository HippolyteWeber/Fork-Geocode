import { Link, Navigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import admin from "../../assets/images/admin.png";
import logo from "../../assets/images/Logo.png";
import handleLogout from "../../lib/logout";

function SideBar() {
  const { currentUser } = useOutletContext();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentUser?.role !== "Admin") {
        Navigate("/");
      }
    }, 200);
    return () => clearTimeout(timer);
  });
  const { setCurrentUser } = useOutletContext();
  return (
    <div className="text-white fixed h-full top-0 left-0">
      <div className="mt-28 mb-40 bg-GreenComp p-8 rounded-tr-large rounded-br-srounded">
        <div className="space-y-8">
          <div className="flex items-center">
            <div className="bg-teal-800 p-2 rounded-full">
              <img
                src={admin}
                alt="Admin Avatar"
                className="bg-white p-2 rounded-full"
                style={{ width: "90px", height: "90px" }}
              />
            </div>
          </div>
          <ul className="text-center gap-4">
            <li className="flex items-center space-x-2 py-2">
              <Link
                to="/admin/cars"
                className="w-full rounded-lg border border-white py-2 px-4 hover:border-black hover:text-black"
              >
                Voitures
              </Link>
            </li>
            <li className="flex items-center space-x-2 py-2">
              <Link
                to="/admin/registeredusers"
                className="w-full rounded-lg border border-white py-2 px-4  hover:border-black hover:text-black"
              >
                Utilisateurs
              </Link>
            </li>
            <li className="flex items-center space-x-2 py-2">
              <Link
                to="/admin"
                className="w-full rounded-lg border border-white py-2 px-4  hover:border-black hover:text-black"
              >
                informations
              </Link>
            </li>
            <li className="flex items-center space-x-2 py-2">
              <Link
                to="/admin/stations"
                className="w-full rounded-lg border border-white py-2 px-4  hover:border-black hover:text-black"
              >
                Stations
              </Link>
            </li>
            <li className="flex items-center space-x-2 py-2">
              <button
                type="submit"
                onClick={() => handleLogout(setCurrentUser)}
                className="w-full rounded-lg border border-white py-2 px-4  hover:border-black hover:text-black"
              >
                Se déconnecter
              </button>
            </li>
          </ul>
          <img
            src={logo}
            alt="logo geocode"
            className="rounded-full w-20 h-20"
          />
        </div>
      </div>
    </div>
  );
}

export default SideBar;

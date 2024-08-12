import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "../components/admin/SideBar";
import NavbarDesktop from "../components/NavbarDesktop";
import StatisticDisplayAdmin from "../components/admin/StatisticDisplayAdmin";
import LoadingComponent from "../components/map/LoadingComponent";

function AdminPage() {
  const { currentUser } = useOutletContext();
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <>
      <NavbarDesktop />
      <div className="bg-bg-geocode h-screen flex text-white">
        <SideBar />
        <StatisticDisplayAdmin />
      </div>
    </>
  );
}

export default AdminPage;

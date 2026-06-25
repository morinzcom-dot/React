import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [navigate, user]);

  const tiles = [
    {
      icon: "👥",
      title: "Manage Users",
      subtitle: "View every registered student, owner and admin",
      to: "/admin/users",
    },
    {
      icon: "🏠",
      title: "Manage Listings",
      subtitle: "Review, edit and remove published listings",
      to: "/admin/listings",
    },
    {
      icon: "⏳",
      title: "Pending Owners",
      subtitle: "Approve or reject new owner requests",
      to: "/admin/pending",
    },
  ];

  return (
    <div className="page">
      <Navbar />
      <div className="page-body">
        <div className="page-header">
          <div>
            <h1 className="page-title">🛠 Admin Dashboard</h1>
            <p className="page-subtitle">
              Everything you need to keep the platform running smoothly.
            </p>
          </div>
        </div>

        <div className="grid grid-3">
          {tiles.map((tile) => (
            <button
              key={tile.to}
              className="tile"
              onClick={() => navigate(tile.to)}
            >
              <span className="tile-icon">{tile.icon}</span>
              <span>
                <span className="tile-title">{tile.title}</span>
                <div className="tile-subtitle">{tile.subtitle}</div>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  if (!user) return null;

  const tilesByRole = {
    student: [
      {
        icon: "🏠",
        title: "Browse Listings",
        subtitle: "Find your next student home",
        to: "/user/browse-listings",
      },
      {
        icon: "📌",
        title: "My Bookings",
        subtitle: "Track your booking status",
        to: "/user/my-bookings",
      },
    ],
    owner: [
      {
        icon: "🏠",
        title: "Browse Listings",
        subtitle: "See all listings on the platform",
        to: "/listings",
      },
      {
        icon: "➕",
        title: "Add New Listing",
        subtitle: "Publish a new place for rent",
        to: "/add-listing",
      },
      {
        icon: "📌",
        title: "Bookings",
        subtitle: "See bookings made on your listings",
        to: "/user/my-bookings",
      },
    ],
    admin: [
      {
        icon: "👥",
        title: "Manage Users",
        subtitle: "Review every registered account",
        to: "/admin/users",
      },
    ],
  };

  const tiles = tilesByRole[user.role] || [];

  return (
    <div className="page">
      <Navbar />
      <div className="page-body">
        <div className="page-header">
          <div>
            <h1 className="page-title">Welcome, {user.name} 👋</h1>
            <p className="page-subtitle">
              You are signed in as <strong>{user.role}</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-2">
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

export default Dashboard;

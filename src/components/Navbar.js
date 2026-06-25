import { useNavigate, useLocation } from "react-router-dom";

/**
 * Shared top navigation bar shown on every authenticated page.
 * Links adapt automatically based on the logged-in user's role.
 */
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) return null;

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const linksByRole = {
    student: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/user/browse-listings", label: "Browse Listings" },
      { to: "/user/my-bookings", label: "My Bookings" },
    ],
    owner: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/listings", label: "Listings" },
      { to: "/add-listing", label: "Add Listing" },
      { to: "/user/my-bookings", label: "Bookings" },
    ],
    admin: [
      { to: "/admin", label: "Dashboard" },
      { to: "/admin/users", label: "Users" },
      { to: "/admin/listings", label: "Listings" },
      { to: "/admin/pending", label: "Pending Owners" },
    ],
  };

  const links = linksByRole[user.role] || [];
  const initial = (user.name || "?").trim().charAt(0).toUpperCase();
  const homePath = user.role === "admin" ? "/admin" : "/dashboard";

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand" onClick={() => navigate(homePath)}>
          <span className="navbar-brand-badge">🏠</span>
          Student Housing
        </div>

        <nav className="navbar-links">
          {links.map((link) => (
            <button
              key={link.to}
              className={
                "navbar-link" +
                (location.pathname === link.to ? " active" : "")
              }
              onClick={() => navigate(link.to)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="navbar-user">
          <div className="navbar-user-info">
            <div className="navbar-user-name">{user.name}</div>
            <div className="navbar-user-role">{user.role}</div>
          </div>
          <div className="navbar-avatar">{initial}</div>
          <button className="btn btn-secondary btn-sm" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import EmptyState from "./components/EmptyState";
import { API_BASE_URL } from "./api";

function Listings() {
  const [listings, setListings] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error();
        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      }
    };

    const fetchListings = async () => {
      const res = await fetch(`${API_BASE_URL}/api/listings`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchUser();
    fetchListings();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/listings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      setListings((prev) => prev.filter((listing) => listing.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete listing");
    }
  };

  return (
    <div className="page">
      <Navbar />
      <div className="page-body">
        <div className="page-header">
          <div>
            <h1 className="page-title">🏠 Available Listings</h1>
            <p className="page-subtitle">
              Browse every published student housing listing.
            </p>
          </div>
        </div>

        {loading && <Loading label="Loading listings..." />}

        {!loading && listings.length === 0 && (
          <EmptyState
            icon="🏠"
            title="No listings available"
            subtitle="Check back later for new listings."
          />
        )}

        {!loading && listings.length > 0 && (
          <div className="listing-grid">
            {listings.map((listing) => {
              const isOwner =
                user?.role === "owner" &&
                Number(user.id) === Number(listing.owner_id);

              const isAdmin = user?.role === "admin";

              return (
                <div className="listing-card" key={listing.id}>
                  <h3>{listing.title}</h3>
                  <p className="listing-desc">{listing.description}</p>

                  <div className="listing-price">💰 {listing.price}</div>

                  <div className="listing-meta">
                    <span className="badge">📍 {listing.city}</span>
                    <span className="badge">👤 {listing.owner_name}</span>
                  </div>

                  {(isOwner || isAdmin) && (
                    <div className="listing-actions">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => navigate(`/edit-listing/${listing.id}`)}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(listing.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Listings;

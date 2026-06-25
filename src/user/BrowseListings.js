import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { API_BASE_URL } from "../api";

function BrowseListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/listings`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch(() => {
        alert("❌ Failed to load listings");
        setLoading(false);
      });
  }, []);

  const bookListing = async (listingId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ listingId }),
      });

      if (!res.ok) {
        alert("❌ Booking failed");
        return;
      }

      setListings((prev) => prev.filter((l) => l.id !== listingId));
      alert("✅ Booking successful");
    } catch {
      alert("❌ Server error");
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
              Find a place that fits your budget and city.
            </p>
          </div>
        </div>

        {loading && <Loading label="Loading listings..." />}

        {!loading && listings.length === 0 && (
          <EmptyState
            icon="🏠"
            title="No listings available"
            subtitle="New listings will show up here as soon as owners publish them."
          />
        )}

        {!loading && listings.length > 0 && (
          <div className="listing-grid">
            {listings.map((listing) => (
              <div className="listing-card" key={listing.id}>
                <h3>{listing.title}</h3>
                <p className="listing-desc">{listing.description}</p>

                <div className="listing-price">💰 {listing.price}</div>

                <div className="listing-meta">
                  <span className="badge">📍 {listing.city}</span>
                  <span className="badge">👤 {listing.owner_name}</span>
                </div>

                {user?.role === "student" && (
                  <div className="listing-actions">
                    <button
                      className="btn btn-success btn-block"
                      onClick={() => bookListing(listing.id)}
                    >
                      📌 حجز الآن
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowseListings;

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { API_BASE_URL } from "../api";

const statusBadgeClass = {
  paid: "badge-success",
  cancelled: "badge-danger",
  pending: "badge-warning",
};

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !token) {
      navigate("/");
    }
  }, [user, token, navigate]);

  const endpoint =
    user?.role === "owner"
      ? `${API_BASE_URL}/api/bookings/owner`
      : `${API_BASE_URL}/api/bookings/my`;

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to load bookings");
      }

      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.message);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [endpoint, token]);

  useEffect(() => {
    if (user && token) {
      fetchBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.role]);

  const payNow = async (id) => {
    if (!window.confirm("Confirm fake payment?")) return;

    await fetch(`${API_BASE_URL}/api/bookings/pay/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchBookings();
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchBookings();
  };

  if (!user) return null;

  return (
    <div className="page">
      <Navbar />
      <div className="page-body">
        <div className="page-header">
          <div>
            <h1 className="page-title">
              📌 {user.role === "owner" ? "Bookings on My Listings" : "My Bookings"}
            </h1>
            <p className="page-subtitle">
              Keep track of payment and booking status here.
            </p>
          </div>
        </div>

        {loading && <Loading label="Loading bookings..." />}

        {!loading && error && (
          <div className="alert alert-error">❌ {error}</div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <EmptyState icon="😕" title="No bookings yet" />
        )}

        {!loading &&
          !error &&
          bookings.map((b) => {
            const status = b.status || "pending";

            return (
              <div className="card" key={b.id} style={{ marginBottom: 16 }}>
                <div className="flex-between" style={{ marginBottom: 10 }}>
                  <h3>{b.title}</h3>
                  <span className={`badge ${statusBadgeClass[status] || ""}`}>
                    {status.toUpperCase()}
                  </span>
                </div>

                <div className="listing-meta" style={{ marginBottom: 10 }}>
                  <span className="badge">📍 {b.city}</span>
                  <span className="badge">💰 {b.price} NOK</span>
                  {user.role === "student" && (
                    <span className="badge">👤 {b.owner_name}</span>
                  )}
                  {user.role === "owner" && (
                    <span className="badge">🎓 {b.student_name}</span>
                  )}
                </div>

                {user.role === "student" && status === "pending" && (
                  <div className="listing-actions">
                    <button
                      className="btn btn-success"
                      onClick={() => payNow(b.id)}
                    >
                      💳 Pay Now
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => cancelBooking(b.id)}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                )}

                {status === "paid" && (
                  <p style={{ color: "var(--color-success-dark)", fontWeight: 700 }}>
                    ✅ Paid successfully
                  </p>
                )}

                {status === "cancelled" && (
                  <p style={{ color: "var(--color-danger-dark)", fontWeight: 700 }}>
                    ❌ Booking cancelled
                  </p>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MyBookings;

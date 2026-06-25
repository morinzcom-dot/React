import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { API_BASE_URL } from "../api";

function AdminListings() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchListings = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE_URL}/api/admin/listings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(`HTTP ${res.status} - ${msg}`);
      }

      const data = await res.json();
      setListings(data);
    } catch (err) {
      console.error("FETCH LISTINGS ERROR:", err);
      setError("❌ Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editListing = (id) => navigate(`/admin/listings/edit/${id}`);

  const deleteListing = async (id) => {
    if (!window.confirm("Delete this listing?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/listings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("DELETE LISTING ERROR:", err);
      alert("❌ Failed to delete listing");
    }
  };

  const filtered = listings.filter((l) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return (
      l.title?.toLowerCase().includes(term) ||
      l.city?.toLowerCase().includes(term) ||
      l.owner_name?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="page">
      <Navbar />
      <div className="page-body">
        <div className="page-header">
          <div>
            <h1 className="page-title">Manage Listings</h1>
            <p className="page-subtitle">
              Admin panel for reviewing, editing and deleting listings.
            </p>
          </div>

          <div className="page-actions">
            <input
              placeholder="Search by title, city or owner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 240 }}
            />
            <button className="btn btn-secondary" onClick={() => navigate("/admin")}>
              ← Back to Admin
            </button>
            <button className="btn btn-primary" onClick={fetchListings} title="Refresh">
              ⟳ Refresh
            </button>
          </div>
        </div>

        <div className="table-card">
          {loading && <Loading label="Loading listings..." />}
          {!loading && error && <p style={{ padding: 22, color: "var(--color-danger-dark)", fontWeight: 700 }}>{error}</p>}

          {!loading && !error && (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Owner</th>
                    <th>City</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((l) => (
                    <tr key={l.id}>
                      <td style={{ fontWeight: 700 }}>
                        {l.title}
                        <div style={{ marginTop: 6, fontSize: 12, color: "var(--color-text-muted)", fontWeight: 600 }}>
                          ID: {l.id}
                        </div>
                      </td>

                      <td>
                        <span style={{ fontWeight: 700 }}>{l.owner_name || "-"}</span>
                      </td>

                      <td>{l.city || "-"}</td>

                      <td>
                        <span className="badge">{l.price ? `${l.price} $` : "-"}</span>
                      </td>

                      <td>
                        <div className="flex gap-sm">
                          <button className="btn btn-secondary btn-sm" onClick={() => editListing(l.id)}>
                            ✏️ Edit
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => deleteListing(l.id)}>
                            🗑 Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", padding: 24, color: "var(--color-text-muted)" }}>
                        No listings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminListings;

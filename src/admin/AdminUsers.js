import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { API_BASE_URL } from "../api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load users");
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
      <Navbar />
      <div className="page-body">
        <div className="page-header">
          <div>
            <h1 className="page-title">👥 All Users</h1>
            <p className="page-subtitle">
              {users.length} registered account{users.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        {loading && <Loading label="Loading users..." />}

        {!loading && users.length === 0 && (
          <EmptyState icon="👥" title="No users found" />
        )}

        {!loading &&
          users.map((u) => (
            <div className="card flex-between" key={u.id} style={{ marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 700 }}>
                  {u.name} <span className="badge">{u.role}</span>
                </div>
                <div style={{ color: "var(--color-text-muted)", fontSize: 13.5 }}>
                  {u.email}
                </div>
              </div>

              {u.role === "owner" && (
                <span
                  className={`badge ${
                    u.approved ? "badge-success" : "badge-warning"
                  }`}
                >
                  {u.approved ? "Approved" : "Pending"}
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminUsers;

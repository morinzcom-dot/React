import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { API_BASE_URL } from "../api";

function AdminOwners() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/owners`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setOwners(data);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approve = async (id) => {
    await fetch(`${API_BASE_URL}/api/admin/owners/approve/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });

    setOwners(owners.filter((o) => o.id !== id));
  };

  const reject = async (id) => {
    if (!window.confirm("Reject this owner?")) return;

    await fetch(`${API_BASE_URL}/api/admin/owners/reject/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setOwners(owners.filter((o) => o.id !== id));
  };

  return (
    <div className="page">
      <Navbar />
      <div className="page-body">
        <div className="page-header">
          <div>
            <h1 className="page-title">⏳ Pending Owners</h1>
            <p className="page-subtitle">Approve or reject owner accounts.</p>
          </div>
        </div>

        {loading && <Loading label="Loading owners..." />}

        {!loading && owners.length === 0 && (
          <EmptyState icon="✅" title="No pending owners" />
        )}

        {!loading &&
          owners.map((o) => (
            <div className="card flex-between" key={o.id} style={{ marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 700 }}>{o.name}</div>
                <div style={{ color: "var(--color-text-muted)", fontSize: 13.5 }}>
                  {o.email}
                </div>
              </div>

              <div className="flex gap-sm">
                <button className="btn btn-success btn-sm" onClick={() => approve(o.id)}>
                  ✅ Approve
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => reject(o.id)}>
                  ❌ Reject
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminOwners;

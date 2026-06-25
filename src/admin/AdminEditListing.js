import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { API_BASE_URL } from "../api";

function AdminEditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      alert("Not authenticated");
      navigate("/");
      return;
    }

    fetch(`${API_BASE_URL}/api/admin/listings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Load failed");
        return res.json();
      })
      .then((data) => {
        setTitle(data.title || "");
        setDescription(data.description || "");
        setPrice(data.price ?? "");
        setCity(data.city || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Failed to load listing");
        navigate("/admin/listings");
      });
  }, [id, token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_BASE_URL}/api/admin/listings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        price: Number(price),
        city,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        alert("✅ Listing updated");
        navigate("/admin/listings");
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Failed to update listing");
      });
  };

  if (loading) {
    return (
      <div className="page">
        <Navbar />
        <Loading />
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar />
      <div className="container">
        <div className="card" style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ marginBottom: 22 }}>✏️ Admin Edit Listing</h2>

          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label>Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
              />
            </div>

            <div className="field">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={5}
              />
            </div>

            <div className="form-row">
              <div className="field">
                <label>Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  required
                />
              </div>

              <div className="field">
                <label>City</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  required
                />
              </div>
            </div>

            <div className="flex gap-sm">
              <button className="btn btn-primary" type="submit">
                💾 Save
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate("/admin/listings")}
              >
                ↩ Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminEditListing;

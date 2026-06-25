import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { API_BASE_URL } from "./api";

function AddListing() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "owner") {
      navigate("/");
    }
  }, [navigate, user]);

  const submitListing = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, price, city }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "❌ فشل إضافة الإعلان");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);

      setTitle("");
      setDescription("");
      setPrice("");
      setCity("");
    } catch {
      setMessage("❌ فشل الاتصال بالخادم");
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Navbar />
      <div className="container">
        <div className="card" style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 className="center" style={{ marginBottom: 22 }}>
            ➕ إضافة إعلان جديد
          </h2>

          {!success ? (
            <form className="form" onSubmit={submitListing}>
              <div className="field">
                <label>عنوان الإعلان</label>
                <input
                  placeholder="عنوان الإعلان"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label>وصف الإعلان</label>
                <textarea
                  placeholder="وصف الإعلان"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="field">
                  <label>السعر</label>
                  <input
                    type="number"
                    placeholder="السعر"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label>المدينة</label>
                  <input
                    placeholder="المدينة"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading ? "⏳ جارٍ الحفظ..." : "💾 حفظ الإعلان"}
              </button>

              {message && <div className="alert alert-error">{message}</div>}
            </form>
          ) : (
            <div className="center">
              <div className="alert alert-success" style={{ marginBottom: 20 }}>
                ✅ تم إضافة الإعلان بنجاح
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <button
                  className="btn btn-secondary btn-block"
                  onClick={() => navigate("/listings")}
                >
                  📋 عرض الإعلانات
                </button>

                <button
                  className="btn btn-primary btn-block"
                  onClick={() => setSuccess(false)}
                >
                  ➕ إضافة إعلان آخر
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddListing;

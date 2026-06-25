import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to create account");
        setLoading(false);
        return;
      }

      if (role === "owner") {
        navigate("/waiting-approval");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch {
      setMessage("Failed to connect to the server");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-brand-badge">📝</div>
          <h2>Create your account</h2>
          <p>Join Student Housing in a minute</p>
        </div>

        {message && <div className="alert alert-error">{message}</div>}

        <form className="form" onSubmit={register}>
          <div className="field">
            <label>Full name</label>
            <input
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>I am a</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">🎓 Student</option>
              <option value="owner">🏠 Owner</option>
            </select>
          </div>

          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </div>
      </div>
    </div>
  );
}

export default Register;

import { useNavigate } from "react-router-dom";

function WaitingApproval() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="auth-card center">
        <div className="auth-brand">
          <div className="auth-brand-badge">⏳</div>
          <h2>Waiting for approval</h2>
        </div>

        <p style={{ color: "var(--color-text-muted)" }}>
          Your account has been created successfully. Please wait until an
          admin approves your owner request — you&apos;ll be able to log in
          right after that.
        </p>

        <button
          className="btn btn-primary btn-block"
          style={{ marginTop: 22 }}
          onClick={() => navigate("/")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default WaitingApproval;

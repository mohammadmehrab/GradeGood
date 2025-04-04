import { useState } from "react";
import { useAuth } from "../contexts/authcontext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();

  const handleReset = async () => {
    try {
      setError("");
      setMessage("");
      await resetPassword(email);
      setMessage("Check your inbox for password reset instructions.");
    } catch (err: any) {
      setError("Failed to reset password: " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title">Reset Password</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}
          <input className="form-control mb-3" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <button className="btn btn-warning w-100" onClick={handleReset}>Send Reset Link</button>
        </div>
      </div>
    </div>
  );
}

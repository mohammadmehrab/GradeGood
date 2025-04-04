import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/authcontext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setError("");
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError("Failed to log in: " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <input className="form-control mb-3" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <input className="form-control mb-3" value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <button className="btn btn-primary w-100" onClick={handleLogin}>Log In</button>
          <div className="text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
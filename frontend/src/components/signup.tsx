import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authcontext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async () => {
    try {
      setError("");
      await signup(email, password);
      await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: ""
        })
      })
      navigate("/");
    } catch (err: any) {
      setError("Failed to sign up: " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title">Sign Up</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <input className="form-control mb-3" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <input className="form-control mb-3" value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <button className="btn btn-success w-100" onClick={handleSignup}>Register</button>
        </div>
      </div>
    </div>
  );
}
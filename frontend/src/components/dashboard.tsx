import { useAuth } from "../contexts/authcontext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const { currentUser, login, signup, resetPassword, logout } = useAuth();
  const navigate = useNavigate();

  const [view, setView] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      await login(email, password);
    } catch (err: any) {
      setError("Login failed: " + err.message);
    }
  };

  const handleSignup = async () => {
    try {
      setError("");
      await signup(email, password);
      await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name: "" }),
      });
    } catch (err: any) {
      setError("Signup failed: " + err.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      setError("");
      setMessage("");
      await resetPassword(email);
      setMessage("Check your inbox for password reset instructions.");
    } catch (err: any) {
      setError("Reset failed: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/dashboard");
    } catch {
      alert("Failed to log out");
    }
  };

  if (!currentUser) {
    return (
      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title">
              {view === "login" && "Login"}
              {view === "signup" && "Sign Up"}
              {view === "forgot" && "Reset Password"}
            </h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            <input
              className="form-control mb-3"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
            />
            {view !== "forgot" && (
              <input
                className="form-control mb-3"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
              />
            )}

            {view === "login" && (
              <>
                <button className="btn btn-primary w-100" onClick={handleLogin}>Log In</button>
                <div className="text-center mt-3">
                  <button className="btn btn-link" onClick={() => setView("signup")}>Don't have an account? Sign up</button>
                  <button className="btn btn-link" onClick={() => setView("forgot")}>Forgot Password?</button>
                </div>
              </>
            )}

            {view === "signup" && (
              <>
                <button className="btn btn-success w-100" onClick={handleSignup}>Register</button>
                <div className="text-center mt-3">
                  <button className="btn btn-link" onClick={() => setView("login")}>Already have an account? Log in</button>
                </div>
              </>
            )}

            {view === "forgot" && (
              <>
                <button className="btn btn-warning w-100" onClick={handleResetPassword}>Send Reset Link</button>
                <div className="text-center mt-3">
                  <button className="btn btn-link" onClick={() => setView("login")}>Back to login</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Authenticated view
  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title">Welcome, {currentUser.email}</h2>
          <button className="btn btn-danger mt-3 w-100" onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </div>
  );
}

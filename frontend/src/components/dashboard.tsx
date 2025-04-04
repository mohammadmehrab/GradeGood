import { useAuth } from "../contexts/authcontext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      alert("Failed to log out");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title">Welcome, {currentUser?.email}</h2>
          <button className="btn btn-danger mt-3 w-100" onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </div>
  );
}
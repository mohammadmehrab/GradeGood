import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authcontext";
import { ReactElement } from "react";

export default function PrivateRoute({ children }: { children: ReactElement }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/dashboard" />;
}

import { signInWithGoogle, useAuth } from "../contexts/authcontext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase";

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
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstName: "", lastName: "" }),
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
      <div className="min-h-screen flex items-center justify-center bg-green-100">
        <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden flex">
          {/* Left: Login form */}
          <div className="w-full md:w-1/2 p-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {view === "login" && "Log In"}
              {view === "signup" && "Sign Up"}
              {view === "forgot" && "Reset Password"}
            </h2>

            {error && <div className="text-red-500 mb-2">{error}</div>}
            {message && <div className="text-green-500 mb-2">{message}</div>}

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {view !== "forgot" && (
              <>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-xs text-gray-500 mb-3">
                  It must be a combination of minimum 8 letters, numbers, and
                  symbols.
                </p>
              </>
            )}

            <div className="flex items-center justify-between mb-4 flex-col">
              {view === "login" && (
                <button
                  onClick={() => setView("forgot")}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>

            {view === "login" && (
              <div className="flex flex-col justify-center items-center">
                {/* Email/Password Login */}
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  onClick={handleLogin}
                >
                  Log In
                </button>

                {/* Google Login */}
                <button
                  className="w-full mt-3 border border-blue-600 text-blue-600 py-2 rounded-md flex justify-center items-center gap-2 hover:bg-blue-50"
                  onClick={async () => {
                    try {
                      setError("");
                      await signInWithGoogle();

                      await fetch("http://localhost:3000/users", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          email: auth.currentUser?.email,
                          firstName: "",
                          lastName: "",
                        }),
                      });
                    } catch (err: any) {
                      setError("Google Login failed: " + err.message);
                    }
                  }}
                >
                  <img
                    src="/Google_logo.svg.png"
                    alt="Google G"
                    className="w-5 h-5"
                  />
                  Log In with Google
                </button>

                <div className="text-sm text-center mt-4">
                  Don’t have an account?{" "}
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => setView("signup")}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}

            {view === "signup" && (
              <>
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  onClick={handleSignup}
                >
                  Register
                </button>

                {/* Google Sign Up */}
                <button
                  className="w-full mt-3 border border-blue-600 text-blue-600 py-2 rounded-md flex justify-center items-center gap-2 hover:bg-blue-50"
                  onClick={async () => {
                    try {
                      setError("");
                      await signInWithGoogle();
                      await fetch("http://localhost:3000/users", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          email: auth.currentUser?.email,
                          firstName: "",
                          lastName: "",
                        }),
                      });
                    } catch (err: any) {
                      setError("Google Sign Up failed: " + err.message);
                    }
                  }}
                >
                  <img
                    src="/Google_logo.svg.png"
                    alt="Google G"
                    className="w-5 h-5"
                  />
                  Sign Up with Google
                </button>

                <div className="text-sm text-center mt-4">
                  Already have an account?{" "}
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => setView("login")}
                  >
                    Log In
                  </button>
                </div>
              </>
            )}

            {view === "forgot" && (
              <>
                <button
                  className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
                  onClick={handleResetPassword}
                >
                  Send Reset Link
                </button>
                <div className="text-sm text-center mt-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => setView("login")}
                  >
                    Back to Login
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right: Illustration */}
          <div className="md:w-1/2 bg-green-100 flex items-center justify-center rounded-r-xl">
            <img src="/login.png" alt="Login Illustration" className="flex" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white border border-green-200 shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-10">Dashboard</h2>
  
        <div className="flex flex-col gap-4">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
            onClick={() => navigate("../addevent")}
          >
            Add Event
          </button>
  
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
            onClick={() => navigate("../viewcourses")}
          >
            View Courses
          </button>
  
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
            onClick={() => navigate("../profile")}
          >
            Profile
          </button>
        </div>
  
        <button
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-md transition"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
  
  
}

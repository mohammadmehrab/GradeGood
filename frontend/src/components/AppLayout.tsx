import { Link, Outlet } from "react-router-dom";
import BookSvg from "../assets/Book.svg";
export default function AppLayout() {
  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-white border-b border-green-200">
        <div className="absolute top-2 left-2">
          <div className="flex items-center gap-2">
            <img src={BookSvg} alt="Logo" className="w-6 h-6" />
            <Link to="/" className="text-lg font-semibold text-gray-900">
              GradeGood
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center">
          {/* Nav Links */}
          <div className="flex gap-6 text-sm font-medium text-gray-600">
            <Link to="/about" className="hover:text-green-600">
              About Us
            </Link>
            <Link to="/profile" className="hover:text-green-600">
              Profile
            </Link>
            <Link to="/calendar" className="hover:text-green-600">
              Calendar
            </Link>
            <Link to="/gpacalc" className="hover:text-green-600">
              GPA Calculator
            </Link>
            <Link to="/dashboard" className="hover:text-green-600">
              Dashboard
            </Link>
            <Link to="/addevent" className="hover:text-green-600">
              Add Event
            </Link>
            <Link to="/coursesetup" className="hover:text-green-600">
              Course Setup
            </Link>
            <Link to="/goalset" className="hover:text-green-600">
              Goal Setting
            </Link>
          </div>
        </div>
      </nav>
      <main className="flex-grow overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

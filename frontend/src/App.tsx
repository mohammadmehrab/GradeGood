import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import PrivateRoute from "./components/privateroute";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CourseSetUp from "./pages/CourseSetUp";
import GPAcalc from "./pages/GPAcalc";
import AppLayout from "./components/AppLayout";
import AddEventPage from "./pages/AddEventPage";
import GoalSet from "./pages/GoalSet";
import PomodoroPage from "./pages/PomodoroPage";

function App() {
  return (
    // <div className="min-h-screen">
    //   <nav className="bg-white border-b border-green-200">
    //     <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
    //       <div className="flex items-center gap-2">
    //         <img src={BookSvg} alt="Logo" className="w-6 h-6" />
    //         <Link to="/" className="text-lg font-semibold text-gray-900">
    //           GradeGood
    //         </Link>
    //       </div>

    //       {/* Nav Links */}
    //       <div className="flex gap-6 text-sm font-medium text-gray-600">
    //         <Link to="/profile" className="hover:text-green-600">
    //           Profile
    //         </Link>
    //         <Link to="/inputGrade" className="hover:text-green-600">
    //           Input Grade
    //         </Link>
    //         <Link to="/gpacalc" className="hover:text-green-600">
    //           GPA Calculator
    //         </Link>
    //         <Link to="/dashboard" className="hover:text-green-600">
    //           Dashboard
    //         </Link>
    //       </div>
    //     </div>
    //   </nav>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/coursesetup"
          element={
            <PrivateRoute>
              <CourseSetUp />
            </PrivateRoute>
          }
        />
        <Route
          path="/gpacalc"
          element={
            <PrivateRoute>
              <GPAcalc />
            </PrivateRoute>
          }
        />
        <Route
          path="/addevent"
          element={
            <PrivateRoute>
              <AddEventPage />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/goalset"
          element={
            <PrivateRoute>
              <GoalSet/>
            </PrivateRoute>
          }
        />

        <Route
          path="/pomodoropage"
          element={
            <PrivateRoute>
              <PomodoroPage/>
            </PrivateRoute>
          }
        />
        <Route path="/about" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>

    // </div>
  );
}

export default App;

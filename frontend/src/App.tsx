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
import CalendarPage from "./pages/CalendarPage";
import ViewCourses from "./pages/ViewCourses";

function App() {
  return (
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
              <GoalSet />
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <CalendarPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pomodoropage"
          element={
            <PrivateRoute>
              <PomodoroPage />
            </PrivateRoute>
          }
        />

<Route
          path="/viewcourses"
          element={
            <PrivateRoute>
              <ViewCourses />
            </PrivateRoute>
          }
        />

        <Route path="/about" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import PrivateRoute from "./components/privateroute";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import GradeInputPage from "./pages/GradeInputPage";
import GPAcalc from "./pages/GPAcalc";
import AppLayout from "./components/AppLayout";
import AddEventPage from "./pages/AddEventPage";
import ViewClasses from "./pages/ViewClasses"; 

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
          path="/inputGrade"
          element={
            <PrivateRoute>
              <GradeInputPage />
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
          path="/viewclasses"
          element={
            <PrivateRoute>
              <ViewClasses />
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


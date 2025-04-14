import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import PrivateRoute from "./components/privateroute";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import GradeInputPage from "./pages/GradeInputPage";
import GPAcalc from "./pages/GPAcalc";
import BookSvg from './assets/Book.svg'


function App() {

  return (
    <div>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
        <div className="container">
          <div className="flex flex-row">
            <img src={BookSvg} alt='Logo'/>
            <Link className="navbar-brand" to="/">GradeGood</Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto bg-red-100">
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/inputGrade">Input Grade</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gpacalc">GPA Calculator</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
      <nav className="bg-white">
        <div>
          <div className="flex flex-row">
            <img src={BookSvg} alt='Logo'/>
            <Link className="" to="/">GradeGood</Link>
          </div>
        </div>
      </nav>


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/inputGrade" element={<PrivateRoute><GradeInputPage /></PrivateRoute>} />
        <Route path="/gpacalc" element={<PrivateRoute><GPAcalc /></PrivateRoute>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
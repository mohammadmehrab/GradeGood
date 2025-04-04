import { Link, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import GradeInputPage from './pages/GradeInputPage';
import GPAcalc from './pages/GPAcalc';

function App() {
  return (
    <div>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/inputGrade'>Input</Link>
        <Link to='/gpacalc'>GPA Calculator  </Link>
      </nav>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/inputGrade' element={<GradeInputPage />} /> {/* <-- Update this line */}
        <Route path='/gpacalc' element={<GPAcalc/>}/>
      </Routes>
    </div>
  );
}

export default App;

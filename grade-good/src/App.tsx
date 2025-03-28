import { Link, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'

function App() {

  return (
    <div>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/profile'>Profile</Link>
      </nav>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App

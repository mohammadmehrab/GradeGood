import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)




// const config = {
//     user: import.meta.env.VITE_PGUSER,
//     password: import.meta.env.VITE_PGPASSWORD,
//     host: import.meta.env.VITE_PGHOST,
//     port: import.meta.env.VITE_PGPORT,
//     database: import.meta.env.VITE_PGDATABASE
// }

// export const pool = new pg.Pool(config)

console.log("main test")

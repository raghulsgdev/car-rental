import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Bookings.css'
import './AdminDashboard.css'
import './Overview.css'
import './Report.css'
import './UsersManagement.css'
import './CarsManagement.css'
import './Home.css'
import './MyBookings.css'
import './Payment.css'
import './Profile.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

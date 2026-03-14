import React from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'

function UserDashboard() {
  return (
    <div className="parent">

      <aside className="sidebar">
        <div className="adminSection">

          <span className="material-symbols-outlined adminIcon">
            account_circle
          </span>
          <span className="userLogo">
            USER
          </span>
        </div>

        <ul>
          <li >
            <NavLink className="menuLink" end to={''}>
              <span className="material-symbols-outlined menuIcon">
                home
              </span>
              <span>Home</span>

            </NavLink>
          </li>

          <li>
            <NavLink className="menuLink" to={'cars'}>
              <span className="material-symbols-outlined menuIcon">
                directions_car
              </span>
              <span>Cars</span>
            </NavLink>
          </li>

          <li>
            <NavLink className="menuLink" to={'myBookings'}>
              <span className="material-symbols-outlined menuIcon">
                order_approve
              </span>
              <span>My Bookings</span>
            </NavLink>
          </li>

          <li>
            <NavLink className="menuLink" to={'payment'}>
              <span className="material-symbols-outlined menuIcon">
                payments
              </span>
              <span>Payment Summary</span>
            </NavLink>
          </li>

          <li>
            <NavLink className="menuLink" to={'profile'}>
              <span className="material-symbols-outlined menuIcon">
                account_circle
              </span>
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>

      </aside>

      <main className="mainContent">
        <Outlet />
      </main>
    </div>
  )
}

export default UserDashboard
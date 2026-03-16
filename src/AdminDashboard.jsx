import React, { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";

function AdminDashboard() {

    const navigate = useNavigate()

    return (
        <div className="parent">

            <div className="sidebar">
                <div className="adminSection">
                    <span className="material-symbols-outlined adminIcon">
                        shield_person
                    </span>
                    <span className="logo">
                        ADMIN
                        <span style={{ color: 'gray', fontWeight: '100', marginLeft: '6px' }}>
                            Portal
                        </span>
                    </span>
                </div>

                <ul>
                    <li >
                        <NavLink className="menuLink" end to={''}>
                            <span className="material-symbols-outlined menuIcon">
                                dashboard
                            </span>
                            <span>Dashboard Overview</span>

                        </NavLink>
                    </li>

                    <li>
                        <NavLink className="menuLink" to={'cars'}>
                            <span className="material-symbols-outlined menuIcon">
                                directions_car
                            </span>
                            <span>Cars Management</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className="menuLink" to={'users'}>
                            <span className="material-symbols-outlined menuIcon">
                                diversity_1
                            </span>
                            <span>Users Management</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className="menuLink" to={'bookings'}>
                            <span className="material-symbols-outlined menuIcon">
                                calendar_check
                            </span>
                            <span>Bookings Management</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className="menuLink" to={'report'}>
                            <span className="material-symbols-outlined menuIcon">
                                analytics
                            </span>
                            <span>Reports</span>
                        </NavLink>
                    </li>
                </ul>

                <div className="logOut">
                    <button onClick={() => navigate("/")}>
                        Log Out
                    </button>
                </div>

            </div>

            <main className="mainContent">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminDashboard;
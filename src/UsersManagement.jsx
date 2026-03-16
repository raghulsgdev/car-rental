import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UsersManagement() {

    const [registeredData, setRegisteredData] = useState([])

    const handleRegister = async () => {

        try {
            const usersData = await axios.get("http://127.0.0.1:8000/admin/users-management")
            console.log("Server Response", usersData.data);
            setRegisteredData(usersData.data.usersList)

        } catch (error) {
            console.log("Server Response Error", error);
        }

    }

    useEffect(() => {
        handleRegister()
    }, [])


    return (
        <div>
            <div className="usersPage">

                <div className="usersHeader">
                    <h2>Users Management</h2>
                    <p>Monitor registered users and their activity</p>
                </div>

                <div className="usersTableContainer">
                    <table className="usersTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Total Bookings</th>
                                <th>Status</th>
                                <th>Joined Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                registeredData.map((user, ind) => {
                                    return (
                                        <tr key={ind}>
                                            <td>{user.id}</td>
                                            <td>{user.customer_name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.total_bookings}</td>
                                            <td><span className="active">Active</span></td>
                                            <td>{user.created_at}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default UsersManagement
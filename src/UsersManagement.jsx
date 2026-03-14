import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UsersManagement() {

    const [registeredData, setRegisteredData] = useState([])

    const handleRegister = async () => {

        try {
            const usersData = await axios.get("http://127.0.0.1:8000/users/management")
            console.log("Server Response", usersData.data);
            setRegisteredData(usersData.data.Users)

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
                                            <td>5</td>
                                            <td><span className="active">Active</span></td>
                                            <td>{user.created_at}</td>
                                        </tr>
                                    )
                                })
                            }
                            {/* <tr>
                                <td>1</td>
                                <td>Raghul</td>
                                <td>raghul@gmail.com</td>
                                <td>9876543210</td>
                                <td>5</td>
                                <td><span className="active">Active</span></td>
                                <td>12-03-2024</td>
                            </tr> */}

                            {/* <tr>
                                <td>2</td>
                                <td>Arun</td>
                                <td>arun@gmail.com</td>
                                <td>9123456780</td>
                                <td>2</td>
                                <td><span className="inactive">Inactive</span></td>
                                <td>25-04-2024</td>
                            </tr>

                            <tr>
                                <td>3</td>
                                <td>Kumar</td>
                                <td>kumar@gmail.com</td>
                                <td>9988776655</td>
                                <td>8</td>
                                <td><span className="active">Active</span></td>
                                <td>10-01-2024</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default UsersManagement
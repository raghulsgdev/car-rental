import React, { useState, useEffect } from "react";
import axios from "axios";

function Overview() {

    const [overviewData, setOverviewData] = useState([])
    const [recentBookings, setRecentBookings] = useState([])


    // Summary Count
    const handleAPI = async () => {
        // console.log("API called");

        try {
            const res = await axios.get("http://127.0.0.1:8000/admin/overview")
            console.log("API Data:", res.data);
            setOverviewData(res.data)

        } catch (error) {
            console.log(error)

        }
    }


    // Recent Bookings Tb
    const handleRecentBookings = async () => {
        const userId = localStorage.getItem("User Id")

        try {
            console.log("Hello");
            
            const res = await axios.get(`http://127.0.0.1:8000/admin/recent-bookings`)
            console.log(res.data)
            setRecentBookings(res.data.recentBookingsData || [])

        } catch (error) {
            alert("Server Response Error")

        }

    }

    useEffect(() => {
        handleAPI()
        handleRecentBookings()
    }, [])


    return (
        <div className="overview">

            {/* Summary Count */}
            <div className="top">
                <h2>Dashboard Overview</h2>
                <p>Quick summary of system statistics</p>
            </div>

            <div className="cards">

                <div className="box users">
                    <h3>Total Users 👥</h3>
                    <p className="number">{overviewData.totalUsers}</p>
                </div>

                <div className="box cars">
                    <h3>Total Cars 🚘</h3>
                    <p className="number">{overviewData.totalCars}</p>
                </div>

                <div className="box bookings">
                    <h3>Total Bookings 🗓️</h3>
                    <p className="number">{overviewData.totalBookings}</p>
                </div>

                <div className="box revenue">
                    <h3>Total Revenue 💵</h3>
                    <p className="number">{overviewData.totalRevenue}</p>
                </div>

            </div>

            
            {/* Recent Bookings Tb */}
            <div className="reportTableSection">
                <h3>Recent Bookings</h3>

                <table className="reportTable">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Car</th>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>

                    <tbody>

                        {recentBookings.map((val, ind) => {
                            return (
                                <tr key={ind}>
                                    <td>{val.customer_name}</td>
                                    <td>{val.car_name}</td>
                                    <td>{val.start_date}</td>
                                    <td>₹{val.total_amount}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Overview;
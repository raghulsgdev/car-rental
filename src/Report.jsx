import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Report() {

    const [reportData, setReportData] = useState([])

    // Report Summary
    const handleReports = async () => {

        try {
            const res = await axios.get("http://127.0.0.1:8000/admin/reports")
            setReportData(res.data)

        } catch (error) {
            alert("Server Response Error", error)

        }

    }

    useEffect(() => {
        handleReports()
    }, [])


    return (
        <div>
            <div className="reportPage">

                {/* Report Summary */}
                <div className="reportHeader">
                    <h2>Reports & Analytics</h2>
                    <p>Monitor business performance</p>
                </div>

                <div className="reportCards">

                    <div className="reportBox">
                        <h4>This Month Bookings 🗓️</h4>
                        <p className="reportNumber">{reportData.thisMonthBookings}</p>
                    </div>

                    <div className="reportBox">
                        <h4>This Month Revenue 💵</h4>
                        <p className="reportNumber">₹ {reportData.thisMonthRevenue}</p>
                    </div>

                    <div className="reportBox">
                        <h4>Most Booked Car 🚘</h4>
                        <p className="reportNumber">{reportData.mostBookedCar}</p>
                    </div>

                    <div className="reportBox">
                        <h4>Active Users 👥</h4>
                        <p className="reportNumber">{reportData.activeUsers}</p>
                    </div>

                </div>

                {/* Monthly Report */}
                <div className="reportTableSection">
                    <h3>Monthly Revenue</h3>

                    <table className="reportTable">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Total Bookings</th>
                                <th>Total Revenue</th>
                            </tr>
                        </thead>

                        <tbody>

                            {reportData.monthlyRevenue?.map((val, ind) => {
                                return (
                                    <tr key={ind}>
                                        <td>{val.month}</td>
                                        <td>{val.total_bookings}</td>
                                        <td>₹ {val.total_revenue}</td>
                                    </tr>
                                )

                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default Report
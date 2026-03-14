import React from "react";

function Overview() {
    return (
        <div className="overview">

            <div className="top">
                <h2>Dashboard Overview</h2>
                <p>Quick summary of system statistics</p>
            </div>

            <div className="cards">

                <div className="box users">
                    <h3>Total Users</h3>
                    <p className="number">120</p>
                </div>

                <div className="box cars">
                    <h3>Total Cars</h3>
                    <p className="number">45</p>
                </div>

                <div className="box bookings">
                    <h3>Total Bookings</h3>
                    <p className="number">89</p>
                </div>

                <div className="box revenue">
                    <h3>Total Revenue</h3>
                    <p className="number">₹ 2,45,000</p>
                </div>

            </div>

            <div className="tableSection">

                <div className="tableHeader">
                    <h3>Recent Bookings</h3>
                    <input type="text" placeholder="Search bookings..." className="searchInput" />
                </div>

                <table className="bookingTable">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Customer</th>
                            <th>Car</th>
                            <th>Pickup Date</th>
                            <th>Return Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>#BK101</td>
                            <td>Raghul</td>
                            <td>Hyundai Creta</td>
                            <td>12 Mar 2026</td>
                            <td>15 Mar 2026</td>
                            <td><span className="status active">Active</span></td>
                            <td><button className="viewBtn">View</button></td>
                        </tr>

                        <tr>
                            <td>#BK102</td>
                            <td>Mariyam</td>
                            <td>Toyota Innova</td>
                            <td>10 Mar 2026</td>
                            <td>12 Mar 2026</td>
                            <td><span className="status completed">Completed</span></td>
                            <td><button className="viewBtn">View</button></td>
                        </tr>

                        <tr>
                            <td>#BK103</td>
                            <td>Shaliha</td>
                            <td>Swift Dzire</td>
                            <td>08 Mar 2026</td>
                            <td>09 Mar 2026</td>
                            <td><span className="status cancelled">Cancelled</span></td>
                            <td><button className="viewBtn">View</button></td>
                        </tr>

                    </tbody>
                </table>

            </div>

        </div>
    );
}

export default Overview;
import React from 'react'

function Report() {
    return (
        <div>
            <div className="reportPage">

                <div className="reportHeader">
                    <h2>Reports & Analytics</h2>
                    <p>Monitor business performance</p>
                </div>

                {/* Summary Cards */}
                <div className="reportCards">

                    <div className="reportBox">
                        <h4>This Month Bookings</h4>
                        <p className="reportNumber">32</p>
                    </div>

                    <div className="reportBox">
                        <h4>This Month Revenue</h4>
                        <p className="reportNumber">₹ 1,25,000</p>
                    </div>

                    <div className="reportBox">
                        <h4>Most Booked Car</h4>
                        <p className="reportNumber">Audi Q7</p>
                    </div>

                    <div className="reportBox">
                        <h4>Active Users</h4>
                        <p className="reportNumber">87</p>
                    </div>

                </div>

                {/* Monthly Report Table */}
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
                            <tr>
                                <td>January</td>
                                <td>20</td>
                                <td>₹ 75,000</td>
                            </tr>
                            <tr>
                                <td>February</td>
                                <td>32</td>
                                <td>₹ 1,25,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Recent Bookings */}
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
                            <tr>
                                <td>Raghul</td>
                                <td>BMW X5</td>
                                <td>12-02-2025</td>
                                <td>₹ 12,000</td>
                            </tr>
                            <tr>
                                <td>Mariyam Shaliha</td>
                                <td>Audi Q7</td>
                                <td>15-02-2025</td>
                                <td>₹ 15,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Report
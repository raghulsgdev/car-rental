import React from 'react'

function Bookings() {
  return (
    <div>
      <div className="bookingParenttt">

        <div className="miniConn">

          <div className="pageHeader">
            <h2>Booking Management</h2>
          </div>

          <div className="cardSection">

            <div className="card">
              <h4>Total Bookings</h4>
              <h2>128</h2>
              <p>This Month</p>
            </div>

            <div className="card">
              <h4>Active Rentals</h4>
              <h2>34</h2>
              <p>Currently Running</p>
            </div>

            <div className="card">
              <h4>Completed</h4>
              <h2>76</h2>
              <p>Successfully Returned</p>
            </div>

            <div className="card">
              <h4>Cancelled</h4>
              <h2>18</h2>
              <p>Booking Cancelled</p>
            </div>

          </div>

          {/* <div className="tableSection">

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

          </div> */}

        </div>

      </div>
    </div>
  )
}

export default Bookings
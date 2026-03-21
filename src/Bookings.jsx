import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Bookings() {

  const [recentBookings, setRecentBookings] = useState([])
  const [bookingSummary, setBookingSummary] = useState({})

  const handleBookingSummary = async () => {

    try {

      const res = await axios.get("http://127.0.0.1:8000/admin/bookings-management")
      console.log("Booking Summary:", res.data)
      setBookingSummary(res.data)

    } catch (error) {
      console.log("Server Response Error", error)

    }
  }


  const handleRecentBookings = async () => {

    try {
      const res = await axios.get("http://127.0.0.1:8000/admin/recent-bookings")
      console.log(res.data.recentBookingsData);
      setRecentBookings(res.data.recentBookingsData)

    } catch (error) {
      alert("Server Response Error", error)
    }

  }

  useEffect(() => {
    handleRecentBookings()
    handleBookingSummary()
  }, [])


  const handleAccept = async (acptBooking) => {
    console.log(acptBooking);

    try {

      const res = await axios.post("http://127.0.0.1:8000/admin/booking-action", {
        action: acptBooking,
        status: "Accepted"
      })

      setRecentBookings(prev => {
        return prev.map(item => {
          if (item.id === acptBooking) {
            return { ...item, status: "Accepted" }

          }

          else {
            return item

          }

        })

      })

      console.log(res.data);

    } catch (error) {
      alert("Server Response Error", error)
    }

  }


  const handleReject = async (rjctBooking) => {
    console.log(rjctBooking);

    try {

      const res = await axios.post("http://127.0.0.1:8000/admin/booking-action", {
        action: rjctBooking,
        status: "Rejected"
      })

      setRecentBookings(prev => {

        return prev.map(item => {

          if (item.id === rjctBooking) {
            return { ...item, status: "Rejected" }
          }
          else {
            return item
          }

        })

      })

      console.log(res.data);

    } catch (error) {
      alert("Server Response Error", error)
    }

  }



  return (
    <div>
      <div className="bookingParenttt">
        <div className="miniConn">

          <div className="pageHeader">
            <h2>Booking Management</h2>
          </div>

          <div className="cardSection">

            <div className="card">
              <h4>Total Bookings 🗓️</h4>
              <h2>{bookingSummary.totalBookings}</h2>
              <p>This Month</p>
            </div>

            <div className="card">
              <h4>Active Rentals 🟢</h4>
              <h2>{bookingSummary.totalActives}</h2>
              <p>Currently Running</p>
            </div>

            <div className="card">
              <h4>Completed ✅</h4>
              <h2>{bookingSummary.totalCompleted}</h2>
              <p>Successfully Returned</p>
            </div>

            <div className="card">
              <h4>Cancelled ❎</h4>
              <h2>{bookingSummary.totalCancelled}</h2>
              <p>Booking Cancelled</p>
            </div>

          </div>

        </div>

        <div className="tableSection">

          <div className="tableHeader">
            <h3>Recent Bookings</h3>
            {/* <input type="text" placeholder="Search bookings..." className="searchInput" /> */}
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

              {
                recentBookings.map((val) => {

                  return (

                    <tr key={val.id}>

                      <td>{val.id}</td>
                      <td>{val.customer_name}</td>
                      <td>{val.car_name}</td>
                      <td>{val.start_date}</td>
                      <td>{val.end_date}</td>
                      <td>
                        <span className="status active">
                          {val.user_status}
                        </span>
                      </td>

                      <td>

                        {
                          val.status === "Accepted" ?
                            <span className='status accept'>Accepted</span>
                            : val.status === "Rejected" ?
                              <span className='status reject'>Rejected</span>
                              : <>
                                <button className="acceptBtn" onClick={() => handleAccept(val.id)}>
                                  Accept
                                </button>

                                <button className="rejectBtn" onClick={() => handleReject(val.id)}>
                                  Reject
                                </button>
                              </>
                        }

                      </td>
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

export default Bookings 
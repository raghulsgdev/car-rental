import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Payment() {

    const [paymentSummary, setPaymentSummary] = useState({
        // totalBookings: 0,
        // totalPaidAmount: 0,
        // pendingAmount: 0
    })

    const [selectedBookingId, setSelectedBookingId] = useState(null)

    const [paymentPending, setPaymentPending] = useState({
        pending_amount: ""
    })

    const [payPending, setPayPending] = useState(false)


    const handlePendingPay = async () => {

        const bookingId = selectedBookingId

        try {
            const res = await axios.put(`http://127.0.0.1:8000/users/pending-pay/${bookingId}`, paymentPending)
            console.log(res.data)

            if (res.data.Message === "Paid Successfully") {
                alert("Payment Successful")
                setPayPending(false)
                
                await handlePaymentSummary()
                await handleRecentPayments()

            }


        } catch (error) {
            console.log("Server Error", error)

        }

    }

    const [recentPayments, setRecentPayments] = useState([])

    const handleRecentPayments = async () => {

        const userId = localStorage.getItem("User Id")

        try {
            const res = await axios.get(`http://127.0.0.1:8000/users/recent-payments/${userId}`)
            console.log(res.data)
            setRecentPayments(res.data.recentPayments)

        } catch (error) {
            console.log("Server Error", error)

        }

    }

    const handlePaymentSummary = async () => {

        const userId = localStorage.getItem("User Id")

        try {
            const res = await axios.get(`http://127.0.0.1:8000/users/payment-summary/${userId}`)
            console.log(res.data);
            setPaymentSummary(res.data)

        } catch (error) {
            alert("Server Response Error", error)

        }
    }

    useEffect(() => {
        handlePaymentSummary()
        handleRecentPayments()
    }, [])



    return (
        <div>
            <main className="paymentParent">

                <header className="paymentHeader">
                    <h1>Payment Summary</h1>
                    <p>View your booking payments and transaction details</p>
                </header>

                <section className="paymentCards">

                    <div className="paymentCard">
                        <h3>Total Bookings 🗓️</h3>
                        <p className="paymentNumber">{paymentSummary?.totalBookings}</p>
                    </div>

                    <div className="paymentCard">
                        <h3>Total Amount Paid 💵</h3>
                        <p className="paymentNumber">{paymentSummary?.totalPaidAmount}</p>
                    </div>

                    <div className="paymentCard">
                        <h3>Pending Payment ⌛</h3>
                        <p className="paymentNumber">{paymentSummary?.pendingAmount}</p>
                        <button className='payNowBtn' onClick={() => {

                            const pendingBooking = recentPayments.find(
                                (val) => val.payment_status !== "Paid"
                            )

                            if (!pendingBooking) {
                                alert("No pending payment")
                                return
                            }

                            console.log("Selected booking:", pendingBooking)

                            setSelectedBookingId(pendingBooking.booking_id)
                            setPayPending(true)
                        }}>
                            Pay Now
                        </button>
                    </div>

                </section>

                {payPending &&
                    <section className='pendingAmtSec'>
                        <div className='pendingAmt'>
                            <h2>Pay Pending</h2>

                            <input
                                type="text"
                                className='inpp'
                                placeholder='Enter the Amount'
                                value={paymentPending.pending_amount}
                                onChange={(e) => setPaymentPending({ ...paymentPending, pending_amount: e.target.value })}
                            />

                            <button className='submitBtn' onClick={() => handlePendingPay()}>Pay</button>
                        </div>
                    </section>
                }

                <section className="paymentHistory">
                    <h2>Recent Payments</h2>
                    <div className="paymentTable">
                        <table>
                            <thead className="tbHeader">
                                <tr>
                                    <th>Car</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    recentPayments.map((val, ind) => (

                                        <tr key={ind} className="tableRow">
                                            <td>{val.car_name}</td>
                                            <td>{val.payment_date}</td>
                                            <td>{val.paid_amount}</td>
                                            <td className="statusPaid">{val.payment_status}</td>
                                        </tr>

                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Payment